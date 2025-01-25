const express = require('express');
const { processMatchData } = require('../controllers/matchController'); // استيراد الدالة من الـ Controller
const router = express.Router();

// Route لتحليل أداء اللاعبين في المباراة
router.post('/analyze-performance', (req, res) => {
  const data = req.body; // البيانات التي تأتي من الـ frontend

  // إضافة نقطة توقف هنا لمتابعة البيانات
  console.log("Received Match Data:", data); // أو وضع Breakpoint هنا

  try {
    const analysisResults = processMatchData(data); // تحليل البيانات باستخدام الـ Controller

    // إرسال النتيجة بعد التحليل
    res.json({
      success: true,
      analysisResults: analysisResults,
    });
  } catch (error) {
    // في حالة حدوث خطأ
    res.status(500).json({
      success: false,
      message: 'Error analyzing performance data',
      error: error.message,
    });
  }
});

module.exports = router;
