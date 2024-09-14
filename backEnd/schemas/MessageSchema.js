import mongoose, {Schema, model} from 'mongoose';
import { pollSchema } from './PollSchema.js';

export const messageSchema = new Schema({
  type: String,
  content: {
    text: String,
    author: String,
    author_id: String,
    poll: pollSchema
  }
})

const Message = model('Message', messageSchema);
export default Message;