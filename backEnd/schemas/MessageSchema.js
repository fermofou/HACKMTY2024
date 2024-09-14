import mongoose, {Schema, model} from 'mongoose';
import Poll from './PollSchema.js';

export const messageSchema = new Schema({
  type: String,
  content: {
    content: String,
    poll: Poll
  }
})

const Message = model('Message', messageSchema);
export default Message;