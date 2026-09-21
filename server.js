const express = require("express");
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 10000;

// Firebase Admin Setup
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  } catch (err) {
    console.error("Firebase Config Error:", err);
  }
}

const db = admin.database();

app.get("/", (req, res) => {
  res.send("⚡ HASAN MODZS API IS RUNNING ⚡");
});

// Verification Endpoint
app.get("/api/verify", async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).send("Access Denied: No Token Provided!");
  }

  try {
    // 1. Check Key in Firebase
    const snap1 = await db.ref("Keys/" + token).once("value");
    const snap2 = await db.ref("keys/" + token).once("value");

    if (snap1.exists() || snap2.exists()) {
      // 2. Fetch Script from 3rd file (script.lua)
      const scriptPath = path.join(__dirname, "script.lua");
      
      if (fs.existsSync(scriptPath)) {
        const luaCode = fs.readFileSync(scriptPath, "utf8");
        res.setHeader("Content-Type", "text/plain");
        return res.status(200).send(luaCode);
      } else {
        return res.status(500).send("Error: script.lua file missing!");
      }
    } else {
      return res.status(403).send("Access Denied: Invalid VIP Key!");
    }
  } catch (error) {
    console.error("Verification Error:", error);
    return res.status(500).send("Server/Database Error");
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
      
