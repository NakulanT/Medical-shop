import mongoose from 'mongoose';
console.log("kkasdasd")
console.log(process.env.MONGO_URI)
console.log("asdasd")

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB: Connectted'))
  .catch((err) => console.log(err.message));
