import mongoose, {Schema, model} from 'mongoose';

export const personSchema = new Schema({
  balance: Number,
  first_name: String,
  last_name: String
})

const Person = model('Person', personSchema);
export default Person;