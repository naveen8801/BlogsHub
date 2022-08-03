import mongoose from 'mongoose';

export const connectToDB = async () =>
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to DB');
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
