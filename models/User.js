import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  blogs: [
    {
      type: Schema.Types.Mixed,
      required: true,
    },
  ],
  created_at: {
    type: Schema.Types.String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
