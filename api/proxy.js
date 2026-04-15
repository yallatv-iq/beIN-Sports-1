export default async function handler(req, res) {
    // 1. السماح للمتصفح بالوصول وتخطي الـ CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ error: 'Missing channel ID' });
    }

    // 2. الرابط الأصلي المستهدف
    const targetUrl = `http://a2.apk-api.com/api/channel/${id}`;

    try {
        // 3. الاتصال متخفياً كأنك هاتف أندرويد
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                // هذه هي البصمة السحرية التي تخدع سيرفر التطبيق
                'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 11; SM-G998B Build/RP1A.200720.012)',
                'Accept': 'application/json, text/plain, */*'
            }
        });
        
        const data = await response.json();
        
        // 4. إرسال البيانات النظيفة إلى مشغلك
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch from target server' });
    }
}
