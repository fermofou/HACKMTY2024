import mongoose, {Schema, model} from 'mongoose';

export const participantSchema = new Schema({
  account_id: String,
  first_name: String,
  last_name: String,
  contribution: Number,
  percentage: Number
});

const Participant = model('Participant', participantSchema);
export default Participant;