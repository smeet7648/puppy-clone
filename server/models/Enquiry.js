import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  puppyId: { type: String, default: null },
  puppyName: { type: String, default: null },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

export const EnquiryModel = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
export default EnquiryModel;
