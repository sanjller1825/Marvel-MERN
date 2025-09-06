import mongoose from 'mongoose';

const superheroSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        required: true 
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Superhero', superheroSchema);