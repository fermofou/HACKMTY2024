import mongoose, { Schema, model } from "mongoose";

export const personSchema = new Schema(
  {
    balance: Number,
    first_name: String,
    last_name: String,
  },
  {
    collection: "people", // Explicitly set the collection name to 'people'
  }
);

const Person = model("Person", personSchema);
export default Person;
