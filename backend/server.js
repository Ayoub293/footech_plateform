// استيراد المكتبات
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

// استيراد الميدل وير والوظائف المساعدة
const authMiddleware = require('./middleware/authMiddleware');
const validateUser = require('./utils/validation');

// تحميل المتغيرات البيئية
dotenv.config();

// تهيئة تطبيق Express
const app = express();

// إعدادات الـ Middleware
app.use(cors());
app.use(express.json()); // لتحليل البيانات المرسلة كـ JSON
app.use(morgan('dev')); // لتسجيل الطلبات أثناء التطوير

// الاتصال بقاعدة البيانات
//mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  //.then(() => {
   // console.log("Database connected");
 // })
  //.catch((err) => {
   // console.error("Database connection error:", err);
 // });

// Routes

// Route للـ اختبار
app.get('/', (req, res) => {
  res.send('Welcome to Footech Server');
});

// Route محمي باستخدام authMiddleware
app.get('/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route!');
});

// Route التسجيل مع التحقق من البيانات
app.post('/register', validateUser, (req, res) => {
  const { username, password } = req.body;

  // يمكن إضافة منطق تسجيل المستخدم هنا
  res.status(201).json({
    message: 'User registered successfully',
    user: { username },
  });
});

// Route تحليل أداء اللاعبين
app.post('/analyze-performance', (req, res) => {
  const data = req.body;

  // معالجة البيانات
  console.log('Analyzing performance data:', data);

  res.status(200).json({
    message: 'Data analyzed successfully',
    analyzedData: data, // مجرد مثال، عدل حسب متطلباتك
  });
});

// Route الإحصائيات العامة (مثال إضافي)
app.get('/statistics', (req, res) => {
  res.status(200).json({
    message: 'Here are the platform statistics',
    stats: {
      users: 1200,
      matchesAnalyzed: 350,
    },
  });
});

// بدء تشغيل السيرفر
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
