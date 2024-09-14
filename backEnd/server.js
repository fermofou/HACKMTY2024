import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./schemas/EventSchema.js";
import Message from "./schemas/MessageSchema.js";
import Poll from "./schemas/PollSchema.js";

dotenv.config();
const app = express();

const API_BASE = "http://api.nessieisreal.com";

app.use(json());

// Example defining a route in Express
app.get("/", (req, res) => {
  res.send("<h1>Hello, Express.js Server!</h1>");
});

// Example specifying the port and starting the server
const port = process.env.PORT || 3000; // You can use environment variables for port configuration
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log("FAILED TO CONNECT TO MONGO: ", err));
});

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const generateAccountNumber = () => {
  const rand1 = getRandomInt(9999).toString().padStart(4, "0");
  const rand2 = getRandomInt(9999).toString().padStart(4, "0");
  const rand3 = getRandomInt(9999).toString().padStart(4, "0");
  const rand4 = getRandomInt(9999).toString().padStart(4, "0");
  return rand1 + rand2 + rand3 + rand4;
};

export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getAccountBalance = async (account_id) => {
  const response = await fetch(
    `${API_BASE}/accounts/${account_id}?key=${process.env.CAPITAL_ONE_API_KEY}`
  );
  const data = await response.json();
  return data.balance;
};

app.get("/events_savings", async (req, res) => {
  const account_id = req.query.account_id;

  // Get all events
  const events = await Event.find({
    "participants.account_id": account_id,
  }).exec();

  events.sort((a, b) => a.deadline < b.deadline);

  const mappedEvents = await Promise.all(
    events.map(async (event) => {
      const amount = await getAccountBalance(event.account_id);
      const type = event.savings == undefined ? "event" : "savings";
      return {
        balance: amount,
        type,
        deadline: event.deadline,
        name: event.name,
        participantCount: event.participants.length,
        percentage: Math.round((amount / event.goal) * 100),
      };
    })
  );
  res.status(200).json(mappedEvents);
});

// Routes for events
app.post("/event", async (req, res) => {
  // crear tarjeta
  const accountNumber = generateAccountNumber();

  const response = await fetch(
    `${API_BASE}/customers/${process.env.VIRTUAL_USER}/accounts?key=${process.env.CAPITAL_ONE_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "Checking",
        nickname: req.body.name,
        rewards: 0,
        balance: 0,
        account_number: accountNumber,
      }),
    }
  );
  const data = await response.json();

  // Crear evento
  const event = new Event({
    account_id: data.objectCreated._id,
    name: req.body.name,
    goal: req.body.goal,
    deadline: req.body.deadline,
    participants: req.body.participants.map((participant) => ({
      account_id: participant.account_id,
      first_name: participant.first_name,
      last_name: participant.last_name,
      contribution: 0,
      percentage: participant.percentage,
    })),
  });

  try {
    await event.save();
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, try again later.",
    });
  }

  res.status(200).json({
    message: "Event created successfuly",
  });
});
/*/ para llamar:
a pagar:
{
        "_id": "66e5ee429683f20dd5189bb5",
        "type": "Checking",
        "nickname": "Trip to France",
        "rewards": 0,
        "balance": 1000,
        "account_number": "3044059486028205",
        "customer_id": "66e5bba19683f20dd5189b7d"
}
cuenta que pagará:

 {
        "_id": "66e5fb989683f20dd5189bc6",
        "type": "Savings",
        "nickname": "Cuenta1_J",
        "rewards": 0,
        "balance": 10000,
        "account_number": "1738902110012010",
        "customer_id": "66e5dd669683f20dd5189b92"
    }


body de /transfer:
{
    "userIdAcc": "66e5fb989683f20dd5189bc6",
    "accountPayId": "66e5ee429683f20dd5189bb5",
    "amount": 100
}

/*/
app.post("/transfer", async (req, res) => {
  const date = getCurrentDate();
  try {
    const response = await fetch(
      `${API_BASE}/accounts/${req.body.userIdAcc}/transfers?key=${process.env.CAPITAL_ONE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          medium: "balance",
          payee_id: req.body.accountPayId,
          transaction_date: date,
          status: "pending",
          amount: req.body.amount,
          description: "pago",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response data:", data); // Debugging: Log the parsed response data

    const transferId = data.objectCreated._id;
    console.log("transferId", transferId);

    // Call the checkTransfer function asynchronously to avoid blocking the response
    setTimeout(async () => {
      try {
        // Await the async function checkTransfer
        const transferStatusMessage = await checkTransfer(transferId);
        console.log(`Transfer ID ${transferId}: ${transferStatusMessage}`);
      } catch (error) {
        console.error(
          `Error checking transfer status for ID ${transferId}:`,
          error
        );
      }
    }, 45000); // Wait for 45 seconds

    // Respond immediately to the client
    res.status(200).json({
      message: "Transfer initiated, status will be checked after 45 seconds.",
      transferId,
    });
  } catch (error) {
    console.error("Error during transfer creation:", error);
    res.status(500).json({ error: error.message });
  }
});

const checkTransfer = async (transferId) => {
  console.log(
    "45 seconds have passed. Checking transfer status for transfer ID:",
    transferId
  );

  try {
    const response = await fetch(
      `${API_BASE}/transfers/${transferId}?key=${process.env.CAPITAL_ONE_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const status = data.status;

    if (status === "executed") {
      console.log("Transfer created successfully");
    } else if (status === "cancelled") {
      console.log("Transaction unsuccessful");
    } else {
      console.log("Transaction pending");
    }
  } catch (error) {
    console.error("Error during fetch operation:", error);
  }
};

app.post("/savings", async (req, res) => {
  // crear tarjeta
  const accountNumber = generateAccountNumber();

  const response = await fetch(
    `${API_BASE}/customers/${process.env.VIRTUAL_USER}/accounts?key=${process.env.CAPITAL_ONE_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "Checking",
        nickname: req.body.name,
        rewards: 0,
        balance: 0,
        account_number: accountNumber,
      }),
    }
  );
  const data = await response.json();

  const montlyPayment =
    req.body.goal / req.body.months / req.body.participants.length;

  // Crear evento
  const event = new Event({
    account_id: data.objectCreated._id,
    name: req.body.name,
    goal: req.body.goal,
    deadline: req.body.deadline,
    participants: req.body.participants.map((participant) => ({
      account_id: participant.account_id,
      first_name: participant.first_name,
      last_name: participant.last_name,
      contribution: 0,
      percentage: participant.percentage,
    })),
    savings: {
      months: req.body.months,
      montlyPayment,
    },
  });

  try {
    await event.save();
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, try again later.",
    });
  }

  res.status(200).json({
    message: "Event created successfuly",
  });
});

// mandar chat
app.post("/chat", async (req, res) => {
  const event_id = req.body.event_id;
  const author_id = req.body.author_id;
  const author = req.body.author;
  const text = req.body.content;

  const message = new Message({
    type: "chat",
    content: {
      text,
      author,
      author_id,
    },
  });

  const event = await Event.findById(event_id).exec();
  event.chat.push(message);

  event.save();

  res.sendStatus(200);
});

// mandar poll
app.post("/poll", async (req, res) => {
  const event_id = req.body.event_id;
  const author_id = req.body.author_id;
  const author = req.body.author;
  const title = req.body.title;
  const options = req.body.options;

  const poll = new Poll({
    title,
    options: options.map((option) => ({
      ...option,
      count: 0,
    })),
  });

  const message = new Message({
    type: "poll",
    content: {
      author,
      author_id,
      poll,
    },
  });

  const event = await Event.findById(event_id).exec();
  event.chat.push(message);

  event.save();

  res.sendStatus(200);
});

/* APIS FALTANTES */

// contestar poll
// checar todos los mensajes

// individual event
//  your contribution
//  all contributions

// get card details
// todos los contactos
