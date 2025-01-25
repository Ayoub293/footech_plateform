require('dotenv').config(); // استيراد dotenv لقراءة الـ .env

const analyzePlayerData = require('../ai/aiAnalysis'); // استيراد الخوارزمية

// دالة لمعالجة بيانات المباراة
const processMatchData = (data) => {
  // هنا البيانات هيكون فيها اللاعبين وأدائهم
  const playerData = data.players.map(player => player.performance);

  // إضافة نقطة توقف هنا لمتابعة playerData
  console.log("Player Data for Analysis:", playerData); // أو وضع Breakpoint هنا في حالة استخدام debugger

  const analysisResults = analyzePlayerData(playerData); // إرسال البيانات للخوارزمية

  const apiKey = process.env.API_KEY; // الحصول على الـ API key من المتغير البيئي
  console.log("Your API Key:", apiKey); // استخدم الـ API key في الكود الخاص بك

  // إرجاع نتائج التحليل
  return analysisResults;
};

// تصدير الدالة لاستخدامها في الـ Routes
module.exports = { processMatchData };
