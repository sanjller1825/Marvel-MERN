import express from 'express';
import { getAllSuperheroes, getSuperheroById, create, updateSuperhero, deleteSuperhero } from '../controllers/superheroController.js';

const router = express.Router();

router.get('/', getAllSuperheroes);
router.get('/:id', getSuperheroById);
router.post('/', create);
router.put('/:id', updateSuperhero);
router.delete('/:id', deleteSuperhero);

export default router;