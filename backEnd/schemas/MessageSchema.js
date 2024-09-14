import mongoose, {Schema, model} from 'mongoose';
import { pollSchema } from './PollSchema.js';

export const messageSchema = new Schema({
  type: String,
  content: {
    content: String,
    author: String,
    poll: pollSchema
  }
})

const Message = model('Message', messageSchema);
export default Message;