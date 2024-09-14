import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();
const app = express();

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