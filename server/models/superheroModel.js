import mongoose from 'mongoose';

const superheroSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    }
});

export default mongoose.model('Superhero', superheroSchema);