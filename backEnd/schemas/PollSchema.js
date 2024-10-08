import mongoose, {Schema, model} from 'mongoose';

export const pollSchema = new Schema({
  title: String,
  options: [{
    name: String,
    cost: Number,
    count: Number
  }],
  voted: [{
    user: String,
    option: Number
  }]
});

const Poll = model('Poll', pollSchema);
export default Poll;