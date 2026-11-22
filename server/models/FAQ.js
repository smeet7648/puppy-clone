import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: 'General' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const FAQModel = mongoose.models.FAQ || mongoose.model('FAQ', faqSchema);
export default FAQModel;
