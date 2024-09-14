import mongoose, {Schema, model} from 'mongoose';

const savingsSchema = new Schema({
  montlyPayment: Number,
  months: Number
});

const Savings = model('Savings', savingsSchema);
export default Savings;