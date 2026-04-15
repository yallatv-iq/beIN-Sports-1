const express = require("express");
const https = require("https");
const http = require("http");
const app = express();

// عرض واجهة المشغل
app.use(express.static("public"));

// مسار تشغيل البث المباشر متخفياً
app.get("/api/stream", (req, res) => {
    // الرابط المجرد الذي قمت باصطياده
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).send("رابط البث مفقود");
    }

    // تجهيز البصمة والمصدر (Referer) التي يطلبها السيرفر الأصلي
    const options = {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
            "Referer": "https://x.com/",
            "Origin": "https://x.com/",
            "Accept": "*/*"
        }
    };

    // السماح للمشغل الخاص بك بقراءة البث
    res.setHeader("Access-Control-Allow-Origin", "*");
    
    // جلب البث وتمريره مباشرة إلى المشغل (Stream Piping)
    const client = targetUrl.startsWith("https") ? https : http;
    
    const proxyRequest = client.get(targetUrl, options, (proxyResponse) => {
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
        proxyResponse.pipe(res);
    });

    proxyRequest.on("error", (err) => {
        console.error("خطأ في الاتصال:", err);
        res.status(500).send("تعذر جلب البث من السيرفر الأصلي.");
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("السيرفر يعمل وجاهز لتمرير البث..."));
