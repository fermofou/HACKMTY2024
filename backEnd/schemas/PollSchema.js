import mongoose, {Schema, model} from 'mongoose';

export const pollSchema = new Schema({
  title: String,
  options: [{
    name: String,
    count: Number
  }]
});

const Poll = model('Poll', pollSchema);
export default Poll;