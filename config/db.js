
const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin-luke:tjdlsgh77@cluster0.7nvvdwb.mongodb.net/FitPulse', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB; 