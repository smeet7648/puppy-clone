import mongoose from 'mongoose';

const puppySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  breed: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'both'], required: true },
  ageMonths: { type: Number, default: 2 },
  ageLabel: { type: String, required: true },
  origin: { type: String, enum: ['local', 'imported'], default: 'local' },
  status: { type: String, enum: ['available', 'reserved', 'sold'], default: 'available' },
  images: [{ type: String }],
  videoUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  healthInfo: { type: String, default: 'Microchipped, fully dewormed, up-to-date vaccinations, vet health passport & certificate' },
  price: { type: String, default: 'Price on request' },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  soldAt: { type: Date, default: null }
});

export const PuppyModel = mongoose.models.Puppy || mongoose.model('Puppy', puppySchema);
export default PuppyModel;
