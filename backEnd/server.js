import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./schemas/EventSchema.js";
import Message from "./schemas/MessageSchema.js";
import Poll from "./schemas/PollSchema.js";
import cors from "cors";
import Person from "./schemas/PersonSchema.js";

dotenv.config();
const app = express();

const API_BASE = "http://api.nessieisreal.com";

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(json());
app.use(cors(corsOptions));

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

const generateCardNumber = () => {
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

app.get("/events_savings", async (req, res) => {
  const account_id = req.query.account_id;

  // Get all events
  const events = await Event.find({
    "participants.account_id": account_id,
  }).exec();

  events.sort((a, b) => a.deadline < b.deadline);

  res.status(200).json(events);
});

// Routes for events
app.post("/event", async (req, res) => {
  // crear tarjeta
  const card_number = generateCardNumber();

  // Crear evento
  const event = new Event({
    account_id: data.objectCreated._id,
    name: req.body.name,
    goal: parseFloat(req.body.goal),
    deadline: req.body.deadline,
    participants: req.body.participants.map((participant) => ({
      account_id: participant.account_id,
      first_name: participant.first_name,
      last_name: participant.last_name,
      contribution: parseFloat(0),
      percentage: participant.percentage,
    })),
    card_number,
    balance: 0,
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

app.post("/savings", async (req, res) => {
  // crear tarjeta
  const card_number = generateCardNumber();

  // Crear evento
  const event = new Event({
    account_id: data.objectCreated._id,
    name: req.body.name,
    goal: parseFloat(req.body.goal),
    deadline: deadline,
    participants: req.body.participants.map((participant) => ({
      account_id: participant.account_id,
      first_name: participant.first_name,
      last_name: participant.last_name,
      contribution: parseFloat(0),
      percentage: participant.percentage,
    })),
    savings: {
      months,
      montlyPayment,
    },
    card_number,
    balance: 0,
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
    "event_id": "eventMongoId",
    "amount": 100
}

/*/
app.post("/transfer", async (req, res) => {
  const userIdAcc = req.body.userIdAcc;
  const event_id = req.body.event_id;
  const amount = req.body.amount;

  //   console.log("event_id", event_id);
  const event = await Event.findById(event_id).exec();
  //   console.log("event", event);
  if (!event) {
    return res.status(404).send("Event not found");
  }

  const person = await Person.findById(userIdAcc).exec();

  if (person.balance >= amount) {
    person.balance -= amount;
    event.balance += amount;
    person.save();
    event.save();
    logToChat(
      event._id,
      `${participant.first_name} deposited $${Intl.NumberFormat().format(
        data.amount
      )}.`
    );
  } else {
    res.status(401).send("Not enough funds");
  }
});

const getAuthorName = (event, author_id) => {
  let author = "";
  for (const participant of event.participants) {
    if (participant.account_id == author_id) {
      author = participant.first_name + " " + participant.last_name;
    }
  }
  return author;
};

// mandar chat
app.post("/chat", async (req, res) => {
  const event_id = req.body.event_id;
  const author_id = req.body.author_id;

  const event = await Event.findById(event_id).exec();
  const author = getAuthorName(event, author_id);

  const text = req.body.text;

  const message = new Message({
    type: "chat",
    content: {
      text,
      author,
      author_id,
    },
  });

  event.chat.push(message);

  event.save();

  res.sendStatus(200);
});

// mandar poll
app.post("/poll", async (req, res) => {
  const event_id = req.body.event_id;
  const author_id = req.body.author_id;
  const title = req.body.title;
  const options = req.body.options;

  const event = await Event.findById(event_id).exec();
  const author = getAuthorName(event, author_id);

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

  event.chat.push(message);

  event.save();

  res.sendStatus(200);
});

const logToChat = async (eventId, message) => {
  const event = await Event.findById(eventId).exec();
  event.chat.push({
    type: "log",
    content: {
      text: message,
    },
  });
  event.save();
};

// contestar poll
app.post("/answer_poll", async (req, res) => {
  const event_id = req.body.event_id;
  const poll_index = req.body.poll_index;
  const option = req.body.option;
  const account_id = req.body.account_id;

  const event = await Event.findById(event_id).exec();
  const message = event.chat[poll_index];

  if (message.type != "poll") {
    return res.status(404).send("Not a poll");
  }

  const poll = message.content.poll;
  let already_voted = false;
  for (let vote of poll.voted) {
    if (vote.user == account_id) {
      already_voted = true;
      break;
    }
  }
  if (already_voted) {
    return res.status(401).send("Already voted");
  }

  poll.options[option].count++;
  poll.voted.push({ user: account_id, option });

  const winner = getPollWinner(poll, event);

  if (winner == -1) {
    logToChat(event_id, `Poll tied. No option was chosen.`);
  } else if (winner >= 0) {
    const change = poll.options[winner].cost;
    let changeMessage = "Goal stays the same.";
    if (change > 0) {
      changeMessage = `Goal increased to $${Intl.NumberFormat().format(
        event.goal + change
      )}.`;
    } else if (change < 0) {
      changeMessage = `Goal decreased to $${Intl.NumberFormat().format(
        event.goal + change
      )}.`;
    }
    event.goal += change;
    logToChat(event_id, `'${poll.options[winner].name}' won. ${changeMessage}`);
  }

  await event.save();

  res.sendStatus(200);
});

const getPollWinner = (poll, event) => {
  if (poll.voted.length == event.participants.length) {
    let maxVotes = 0;
    let winningOption = -1;
    let winningOptionCount = 0;
    for (let i = 0; i < poll.options.length; i++) {
      if (poll.options[i].count > maxVotes) {
        maxVotes = poll.options[i].count;
        winningOption = i;
        winningOptionCount = 1;
      } else if (poll.options[i].count == maxVotes) {
        winningOptionCount++;
      }
    }

    if (winningOptionCount == 1) {
      return winningOption;
    } else {
      return -1;
    }
  } else {
    return -2;
  }
};

// checar todos los mensajes
app.get("/chat/:event_id", async (req, res) => {
  const event_id = req.params.event_id;

  let event = await Event.findById(event_id).exec();

  const newChat = event.chat.map((msg) => {
    if (msg.type === "poll") {
      let done = false;
      let win = -2;
      const winner = getPollWinner(msg.content.poll, event);
      if (winner > -2) {
        done = true;
        win = winner;
      }
      return {
        type: "poll",
        content: {
          author: msg.content.author,
          author_id: msg.content.author_id,
          poll: {
            title: msg.content.poll.title,
            options: msg.content.poll.options,
            voted: msg.content.poll.voted,
            done,
            winner: win,
          },
        },
      };
    }
    return msg;
  });

  res.status(200).json(newChat);
});

// individual event
//  your contribution
//  all contributions
app.get("/event/:event_id", async (req, res) => {
  const event_id = req.params.event_id;

  let event = await Event.findById(event_id).exec();

  res.status(200).json(event);
});

// get card details
app.get("/card/:event_id", async (req, res) => {
  const event_id = req.params.event_id;
  const event = await Event.findById(event_id).exec();

  const balance = event.balance;
  const card_number = event.card_number.match(/.{1,4}/g).join(" ");

  const deadline = new Date(event.deadline);
  const expiry_date =
    deadline.getMonth().toString().padStart(2, "0") +
    " / " +
    deadline.getFullYear().toString().substr(2);

  const cvv = getRandomInt(999).toString().padStart(3, "0");

  const name = event.name;

  res.status(200).json({
    balance,
    card_number,
    expiry_date,
    cvv,
    name,
  });
});

app.get("/clients", async (req, res) => {
  try {
    const people = await Person.find().exec();
    res.status(200).json(people);
  } catch (error) {
    console.error("Error during fetch operation:", error);
    res.status(500).json({ error: error.message });
  }
});
