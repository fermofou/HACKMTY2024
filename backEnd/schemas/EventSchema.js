import mongoose, { Schema, model } from "mongoose";
import { savingsSchema } from "./SavingsSchema.js";
import { messageSchema } from "./MessageSchema.js";
import { participantSchema } from "./ParticipantSchema.js";

const eventSchema = new Schema({
  name: String,
  goal: Number,
  deadline: Date,
  savings: savingsSchema,
  chat: [messageSchema],
  participants: [participantSchema],
  card_number: String,
  balance: Number,
});

const Event = model("Event", eventSchema);
export default Event;
