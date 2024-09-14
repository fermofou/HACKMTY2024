import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import Event from './schemas/EventSchema.js';

dotenv.config();
const app = express();

const API_BASE = "http://api.nessieisreal.com";

app.use(json());

// Example defining a route in Express
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

// Example specifying the port and starting the server
const port = process.env.PORT || 3000; // You can use environment variables for port configuration
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    mongoose.connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("Connected to MongoDB")
      })
      .catch(err => console.log("FAILED TO CONNECT TO MONGO: ", err));
});

const getRandomInt = max => {
    return Math.floor(Math.random() * max);
}

const generateAccountNumber = () => {
    const rand1 = getRandomInt(9999).toString().padStart(4, "0");
    const rand2 = getRandomInt(9999).toString().padStart(4, "0");
    const rand3 = getRandomInt(9999).toString().padStart(4, "0");
    const rand4 = getRandomInt(9999).toString().padStart(4, "0");
    return rand1 + rand2 + rand3 + rand4;
}

const getAccountBalance = async (account_id) => {
    const response = await fetch(`${API_BASE}/accounts/${account_id}?key=${process.env.CAPITAL_ONE_API_KEY}`);
    const data = await response.json();
    return data.balance;
}

app.get("/events_savings", async (req, res) => {
    const account_id = req.query.account_id;
    
    // Get all events
    const events = await Event.find({
        "participants.account_id": account_id
    }).exec();
    
    events.sort((a, b) => a.deadline < b.deadline);

    const mappedEvents = await Promise.all(events.map(async (event) => {
        const amount = await getAccountBalance(event.account_id);
        const type = event.savings == undefined ? "event" : "savings";
        return {
            balance: amount,
            type,
            deadline: event.deadline,
            name: event.name,
            participantCount: event.participants.length,
            percentage: Math.round((amount / event.goal) * 100)
        };
    }));
    res.status(200).json(mappedEvents);
});

// Routes for events
app.post('/event', async (req, res) => {
    
    // crear tarjeta
    const accountNumber = generateAccountNumber();

    const response = await fetch(`${API_BASE}/customers/${process.env.VIRTUAL_USER}/accounts?key=${process.env.CAPITAL_ONE_API_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "type": "Checking",
            "nickname": req.body.name,
            "rewards": 0,
            "balance": 0,
            "account_number": accountNumber
        })
    });
    const data = await response.json();

    // Crear evento
    const event = new Event({
        account_id: data.objectCreated._id,
        name: req.body.name,
        goal: req.body.goal,
        deadline: req.body.deadline,
        participants: req.body.participants.map(participant => ({
            account_id: participant.account_id,
            first_name: participant.first_name,
            last_name: participant.last_name,
            contribution: 0,
            percentage: participant.percentage
        }))
    });

    try {
        await event.save();
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong, try again later."
        })
    }

    res.status(200).json({
        message: "Event created successfuly"
    });
});

app.post("/savings", async (req, res) => {
    // crear tarjeta
    const accountNumber = generateAccountNumber();

    const response = await fetch(`http://api.nessieisreal.com/customers/${process.env.VIRTUAL_USER}/accounts?key=${process.env.CAPITAL_ONE_API_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "type": "Checking",
            "nickname": req.body.name,
            "rewards": 0,
            "balance": 0,
            "account_number": accountNumber
        })
    });
    const data = await response.json();

    const montlyPayment = req.body.goal / req.body.months / req.body.participants.length;

    // Crear evento
    const event = new Event({
        account_id: data.objectCreated._id,
        name: req.body.name,
        goal: req.body.goal,
        deadline: req.body.deadline,
        participants: req.body.participants.map(participant => ({
            account_id: participant.account_id,
            first_name: participant.first_name,
            last_name: participant.last_name,
            contribution: 0,
            percentage: participant.percentage
        })),
        savings: {
            months: req.body.months,
            montlyPayment
        }
    });

    try {
        await event.save();
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong, try again later."
        })
    }

    res.status(200).json({
        message: "Event created successfuly"
    });
});