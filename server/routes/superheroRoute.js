import express from 'express';
import { getAllSuperheroes, getSuperheroById, create, updateSuperhero, deleteSuperhero } from '../controllers/superheroController.js';

const router = express.Router();

router.get('/superheroes', getAllSuperheroes);
router.get('/superheroes/:id', getSuperheroById);
router.post('/superheroes', create);
router.put('/superheroes/:id', updateSuperhero);
router.delete('/superheroes/:id', deleteSuperhero);

export default router;