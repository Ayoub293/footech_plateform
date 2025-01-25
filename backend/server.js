// استيراد المكتبات
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

// استيراد الميدل وير
const authMiddleware = require('./middleware/authMiddleware');
const validateUser = require('./utils/validation');

// تحميل المتغيرات البيئية
dotenv.config();

// تهيئة تطبيق Express
const app = express();

// إعدادات الـ Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Routes

// Route للـ اختبار
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route محمي باستخدام authMiddleware
app.get('/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route!');
});

// Route التسجيل مع التحقق من البيانات
app.post('/register', validateUser, (req, res) => {
  res.send('User registered successfully');
});

// Route تحليل أداء اللاعبين (مثال على .post بشكل صحيح)
app.post('/analyze-performance', (req, res) => {
  const data = req.body; // البيانات اللي جايه من الـ frontend

  // قم بمعالجة البيانات هنا
  res.send('Data analyzed');
});

// بدء تشغيل السيرفر
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
