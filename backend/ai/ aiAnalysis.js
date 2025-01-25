const tf = require('@tensorflow/tfjs'); // استيراد مكتبة TensorFlow.js

// إنشاء نموذج الذكاء الاصطناعي
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [4] })); // عدد المدخلات
model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' }); // تحديد الخسارة والمُحسن

// دالة لتحليل بيانات اللاعبين
const analyzePlayerData = (playerData) => {
  // تحويل بيانات اللاعبين إلى Tensor
  const xs = tf.tensor2d(playerData, [playerData.length, 4]);

  // إضافة نقطة توقف هنا لمتابعة الـ input
  console.log("Player Data Tensor:", xs); // أو ضع Breakpoint هنا لمتابعة التحويل إلى Tensor

  const predictions = model.predict(xs); // إجراء التنبؤات باستخدام النموذج

  // إضافة نقطة توقف هنا لمتابعة التنبؤات
  console.log("Predictions:", predictions.arraySync()); // أو ضع Breakpoint هنا لمتابعة النتيجة

  return predictions.arraySync();
};

// تصدير الدالة لاستخدامها في أماكن أخرى
module.exports = analyzePlayerData;
