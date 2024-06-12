import { Router } from 'express';
import { getAnimals, createAnimal, updateAnimal, deleteAnimal, searchAnimals } from '../controllers/animalController';

const router = Router();

router.get('/animals', getAnimals);
router.post('/animals', createAnimal);
router.put('/animals/:id', updateAnimal);
router.delete('/animals/:id', deleteAnimal);
router.get('/animals/search', searchAnimals);

export default router;
