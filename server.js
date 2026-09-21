const express = require('express');
const admin = require('firebase-admin');
const app = express();

// Firebase Admin Setup
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

// 📌 এখানে আপনার আসল মেইন VIP LUA কোডটি থাকবে
const VIP_SCRIPT = `
gg.toast("🔥 WELCOME TO HASAN MODZ VIP SCRIPT 🔥")
gg.alert("✅ VIP Access Granted! Loading Full Script...")

-- আপনার আসল মেনু ও গেম ফিচার কোড নিচে বসান:
local menu = gg.choice({
    '1. Feature 1',
    '2. Feature 2',
    '3. Exit'
}, nil, 'HvsH Gaming VIP Menu')

if menu == 1 then
    gg.toast("Feature 1 Activated")
elseif menu == 2 then
    gg.toast("Feature 2 Activated")
else
    os.exit()
end
`;

app.get('/api/verify', async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).send('Access Denied: No Token Provided');
  }

  try {
    // Check both 'keys' and 'Keys' nodes from Firebase
    const snapshotLower = await db.ref('keys/' + token).once('value');
    const snapshotUpper = await db.ref('Keys/' + token).once('value');

    let keyData = snapshotLower.val() || snapshotUpper.val();

    if (keyData) {
      res.setHeader('Content-Type', 'text/plain');
      return res.send(VIP_SCRIPT);
    } else {
      return res.status(403).send('Access Denied: Invalid or Expired VIP Key');
    }
  } catch (error) {
    console.error('Firebase Error:', error);
    return res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
