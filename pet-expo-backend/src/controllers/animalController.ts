import { Request, Response } from 'express';
import Animal from '../models/animalModel';

export const getAnimals = async (req: Request, res: Response) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const createAnimal = async (req: Request, res: Response) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    res.status(201).json(animal);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const updateAnimal = async (req: Request, res: Response) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!animal) {
      res.status(404).json({ error: 'Animal not found' });
      return;
    }
    res.json(animal);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const deleteAnimal = async (req: Request, res: Response) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) {
      res.status(404).json({ error: 'Animal not found' });
      return;
    }
    res.status(204).json({ message: 'Animal deleted successfully' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const searchAnimals = async (req: Request, res: Response) => {
  try {
    const animals = await Animal.find(req.query);
    res.json(animals);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
