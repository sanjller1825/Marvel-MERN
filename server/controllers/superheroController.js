import Superhero from '../models/superheroModel.js';

export const getAllSuperheroes = async (req, res) => {
    try {
        const superheroes = await Superhero.find();
        if(!superheroes || superheroes.length === 0) {
        return res.status(404).json({ message: "Superhero not found" });
    } 
    return res.status(200).json(superheroes);
    }catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const create = async (req, res) => {
    try {
        const newSuperhero = new Superhero(req.body);
        const { name } = newSuperhero;
        const superheroExists = await Superhero.findOne({ name});
        if(superheroExists) {
            return res.status(400).json({ message: "Superhero already exists" });
        }
        const savedSuperhero = await newSuperhero.save();
        return res.status(201).json(savedSuperhero);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const deleteSuperhero = async (req, res) => {
    try {
        const { id } = req.params;
        const superheroExists = await Superhero.findById(id);
        if(!superheroExists) {
            return res.status(404).json({ message: "Superhero not found" });
        }
        await Superhero.findByIdAndDelete(id);
        res.status(200).json({ message: "Superhero deleted successfully" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const updateSuperhero = async (req, res) => {
    try {
        const { id } = req.params;
        const superheroExists = await Superhero.findById(id);
        if(!superheroExists) {
            return res.status(404).json({ message: "Superhero not found" });
        }
        const updatedSuperhero = await Superhero.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Superhero updated successfully" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getSuperheroById = async (req, res) => {
    try {
        const { id } = req.params;
        const superheroExist = await Superhero.findById(id);
        if(!superheroExist) {
            return res.status(404).json({ message: "Superhero not found" });
        }
        res.status(200).json(superheroExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}