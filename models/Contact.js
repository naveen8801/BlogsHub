import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const ConatctUsSchema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true,
  },
  query: {
    type: Schema.Types.String,
    required: true,
  },
  created_at: {
    type: Schema.Types.String,
    required: true,
  },
});

const ContactUsDB =
  mongoose.models.ConatctUs || mongoose.model('ConatctUs', ConatctUsSchema);

export default ContactUsDB;
