import { Schema, model } from 'mongoose';

const animalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

const Animal = model('Animal', animalSchema);

export default Animal;
