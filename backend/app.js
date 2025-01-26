// استيراد المكتبات
require('dotenv').config();  // تحميل المتغيرات من ملف .env
const express = require('express');
const mongoose = require('mongoose');

// إنشاء السيرفر
const app = express();

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// إعدادات السيرفر
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
