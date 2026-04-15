const express = require("express");
const app = express();

// إخبار السيرفر بعرض ملفات واجهة الويب (المشغل) من مجلد public
app.use(express.static("public"));

// مسار تخطي الحماية
app.get("/api/proxy", async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: "Missing channel ID" });

  const targetUrl = `http://a2.apk-api.com/api/channel/${id}`;

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        // بصمة الأندرويد السحرية لتخطي حظر السيرفر
        "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 11; SM-G998B Build/RP1A.200720.012)",
        "Accept": "application/json, text/plain, */*"
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "فشل الاتصال بسيرفر التطبيق" });
  }
});

// تشغيل السيرفر
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
