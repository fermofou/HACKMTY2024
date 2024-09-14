import mongoose, {Schema, model} from 'mongoose';
import Savings from './SavingsSchema.js';
import Message from './MessageSchema.js';

const eventSchema = new Schema({
  account_id: String,
  name: String,
  goal: Number,
  deadline: Date,
  savings: Savings,
  chat: [Message]
});

const Event = model('Event', eventSchema);
export default Event;