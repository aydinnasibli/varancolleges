import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  content: { type: String },
  excerpt: { type: String },
  author: { type: String },
  date: { type: Date, default: Date.now },
  image: { type: String },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
