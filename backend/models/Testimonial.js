import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  quote: { type: String, required: true },
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 5 },
  createdAt: { type: Date, default: Date.now }
});

export const TestimonialModel = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
export default TestimonialModel;
