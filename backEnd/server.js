import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import Event from './schemas/EventSchema.js';

dotenv.config();
const app = express();

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

// Routes for events
app.post('/event', async (req, res) => {
    
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

    // Crear evento
    const event = new Event({
        account_id: data.objectCreated.account_number,
        name: req.body.name,
        goal: req.body.goal,
        deadline: req.body.deadline,
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