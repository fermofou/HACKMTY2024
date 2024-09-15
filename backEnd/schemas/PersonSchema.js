import mongoose, {Schema, model} from 'mongoose';

export const personSchema = new Schema({
  balance: Number,
  first_name: String,
  last_name: String
})

const Message = model('Person', personSchema);
export default Message;