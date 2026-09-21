const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// 🔗 আপনার ফায়ারবেস রিয়েলটাইম ডাটাবেজ লিঙ্ক
const FIREBASE_URL = "https://hasan-modz-minmenu-default-rtdb.firebaseio.com/keys.json";

// 📌 আপনার আসল Lua Script কোডটি নিচে পেস্ট করবেন
const LUA_SCRIPT = `
    gg.toast("✅ ACCESS GRANTED - HASAN MODZS VIP")
    -- আপনার সম্পূর্ণ গেম গার্ডিয়ান Lua Script এখানে থাকবে
`;

app.get('/api/verify', async (req, res) => {
    const userToken = req.query.token;

    if (!userToken) {
        res.setHeader('Content-Type', 'text/html');
        return res.status(400).send('<h2 style="color:orange;text-align:center;margin-top:20%;">⚠️ Token is required!</h2>');
    }

    try {
        const response = await axios.get(FIREBASE_URL);
        const firebaseKeys = response.data;
        let isValidKey = false;

        if (firebaseKeys) {
            Object.keys(firebaseKeys).forEach(keyId => {
                const item = firebaseKeys[keyId];
                if (item === userToken || item.key === userToken || item.token === userToken) {
                    isValidKey = true;
                }
            });
        }

        if (isValidKey) {
            res.setHeader('Content-Type', 'text/plain');
            return res.status(200).send(LUA_SCRIPT);
        } else {
            res.setHeader('Content-Type', 'text/html');
            return res.status(403).send('<h2 style="color:red;text-align:center;margin-top:20%;">❌ Access Denied: Invalid or Expired Key!</h2>');
        }

    } catch (error) {
        res.setHeader('Content-Type', 'text/html');
        return res.status(500).send('<h2 style="color:red;text-align:center;margin-top:20%;">❌ Firebase Connection Error!</h2>');
    }
});

app.get('/', (req, res) => {
    res.send('<h1 style="text-align:center;margin-top:20%;">⚡ HASAN MODZS VIP FIREBASE SERVER IS ONLINE ⚡</h1>');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
