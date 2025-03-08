import mongoose from 'mongoose';

const URLSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
});

const URL = mongoose.model('URL', URLSchema);

export default URL;
