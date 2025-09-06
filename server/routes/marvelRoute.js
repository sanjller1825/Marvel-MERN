
import express from 'express';
import { getMarvelInfo } from '../controllers/marvelController.js';

const router = express.Router();

router.get("/", getMarvelInfo);

export default router;