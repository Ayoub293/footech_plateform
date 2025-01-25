const mongoose = require('mongoose');
debugger; // Check if the file is loaded

const connectDB = async () => {
  try {
    // الاتصال بقاعدة البيانات باستخدام المتغيرات من ملف .env
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connected");
    debugger; // After DB connection
  } catch (err) {
    console.error("Database connection error:", err);
    debugger; // If there is an error while connecting
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
