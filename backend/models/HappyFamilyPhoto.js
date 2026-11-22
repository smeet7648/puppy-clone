import mongoose from 'mongoose';

const happyFamilyPhotoSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const HappyFamilyPhotoModel = mongoose.models.HappyFamilyPhoto || mongoose.model('HappyFamilyPhoto', happyFamilyPhotoSchema);
export default HappyFamilyPhotoModel;
