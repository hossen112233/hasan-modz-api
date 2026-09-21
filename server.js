const express = require("express");
const admin = require("firebase-admin");
const app = express();

const PORT = process.env.PORT || 10000;

// Firebase Admin Initializer
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

// 🔻 আপনার আসল VIP LUA SCRIPT 🔻
const LUA_SCRIPT = `
local M = gg.alert("╭━━━  ◈  𝗖𝗢𝗜𝗡 𝗚𝗨𝗔𝗥𝗗𝗜𝗔𝗡  ◈  ━━━╮\\n    ⚡ 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 𝗩𝗜𝗣 𝗕𝗢𝗧 ⚡\\n╰━━━━━━━━━━━━━━━━━━━━━╯", "✅ 𝗦𝗧𝗔𝗥𝗧", "❌ 𝗘𝗫𝗜𝗧")

if M ~= 1 then 
  gg.clearResults()
  os.exit() 
end

local ENGINE_ACTIVE = false
local STATE_DRAGON = false
local STATE_STRIKER_POSE = false

local CACHE = {
    red_x = {},
    red_x_base = {}
}

function START_ENGINE()
    gg.toast("🔥 💠 𝐈𝐍𝐈𝐓𝐈𝐀𝐋𝐈𝐙𝐈𝐍𝐆 𝐄𝐍𝐆𝐈𝐍𝐄... 𝐏𝐋𝐄𝐀𝐒𝐄 𝐖𝐀𝐈𝐓 💠 🔥")
    pcall(function()
        gg.clearResults()
        gg.searchNumber("235.0", gg.TYPE_DOUBLE)
        if gg.getResultCount() > 0 then
            CACHE.red_x = gg.getResults(1000)
            CACHE.red_x_base = {}
            for i, v in ipairs(CACHE.red_x) do
                table.insert(CACHE.red_x_base, {address = v.address - 8, flags = gg.TYPE_DOUBLE})
            end
        end
        gg.clearResults()
        collectgarbage("collect")
        ENGINE_ACTIVE = true
        gg.alert("✅ ALL HACK ACTIVATED SUCCESSFULLY!")
    end)
end

local function checkEngine()
    if not ENGINE_ACTIVE then
        gg.alert("⚠️ ALL HACK NOT ACTIVATED\\n\\nPlease Click 'ALL HACK ACTIVATED' First.")
        return false
    end
    return true
end

function TOGGLE_DRAGON()
    if not checkEngine() then return end
    pcall(function()
        STATE_DRAGON = not STATE_DRAGON
        if STATE_DRAGON then
            if #CACHE.red_x_base > 0 then
                local edits = {}
                for i, v in ipairs(CACHE.red_x_base) do
                    table.insert(edits, {address = v.address, flags = gg.TYPE_DOUBLE, value = 50.788889908, freeze = true})
                end
                gg.setValues(edits)
                gg.addListItems(edits) 
            end
            if #CACHE.red_x > 0 then
                for i, v in ipairs(CACHE.red_x) do v.value = 8960 end
                gg.setValues(CACHE.red_x)
            end
            gg.toast("🐉 DRAGON ULTRA FORCE : ON ✅")
        else
            local list = gg.getListItems()
            if #list ~= 0 then
                local reverts = {}
                for i, v in ipairs(list) do
                    table.insert(reverts, {address = v.address, flags = gg.TYPE_DOUBLE, value = 0.7, freeze = false})
                end
                gg.setValues(reverts)
                gg.removeListItems(list)
            end
            if #CACHE.red_x > 0 then
                for i, v in ipairs(CACHE.red_x) do v.value = 235 end
                gg.setValues(CACHE.red_x)
            end
            gg.toast("🐉 DRAGON ULTRA FORCE : OFF ❌")
        end
        collectgarbage("collect")
    end)
end

function TOGGLE_STRIKER_POSE()
    if not checkEngine() then return end
    pcall(function()
        STATE_STRIKER_POSE = not STATE_STRIKER_POSE
        if STATE_STRIKER_POSE then
            if #CACHE.red_x > 0 then
                for i, v in ipairs(CACHE.red_x) do v.value = 0 end
                gg.setValues(CACHE.red_x)
            end
            gg.toast("🎯 STRIKER POSE : ON ✅")
        else
            if #CACHE.red_x > 0 then
                for i, v in ipairs(CACHE.red_x) do v.value = 235 end
                gg.setValues(CACHE.red_x)
            end
            gg.toast("🎯 STRIKER POSE : OFF ❌")
        end
        collectgarbage("collect")
    end)
end

function Exit()
    gg.toast("♻️ THIS SCRIPT CAN BE REUSED ♻️")
    os.exit()
end

function HOME()
    local dragonStatus      = STATE_DRAGON and " [ 🟢 ON ]" or " [ 🔴 OFF ]"
    local strikerPoseStatus = STATE_STRIKER_POSE and " [ 🟢 ON ]" or " [ 🔴 OFF ]"

    local SN = gg.choice({
        "◈🟩◈ ALL HACK ACTIVATED ◈🟩◈",
        "🐉 DRAGON ULTRA FORCE" .. dragonStatus,
        "🎯 STRIKER POSE" .. strikerPoseStatus,
        "❌ EXIT"
    }, nil, "◽ WELCOME TO COIN GUARDIAN VIP ◽")

    if SN == 1 then START_ENGINE() end
    if SN == 2 then TOGGLE_DRAGON() end
    if SN == 3 then TOGGLE_STRIKER_POSE() end
    if SN == 4 then Exit() end
end

HOME()

while true do
    if gg.isVisible(true) then
        gg.setVisible(false)
        HOME()
    end
    gg.sleep(100)
end
`;

// Root Endpoint
app.get("/", (req, res) => {
  res.send("⚡ HASAN MODZS VIP FIREBASE SERVER IS ONLINE ⚡");
});

// Verification Endpoint
app.get("/api/verify", async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).send("Access Denied: No Token Provided!");
  }

  try {
    const snap1 = await db.ref("Keys/" + token).once("value");
    const snap2 = await db.ref("keys/" + token).once("value");
    
    const snap3 = await db.ref("Keys").once("value");
    const snap4 = await db.ref("keys").once("value");

    let isValid = snap1.exists() || snap2.exists();

    if (!isValid) {
      const keysData = snap3.val() || snap4.val();
      if (keysData) {
        if (typeof keysData === "object") {
          isValid = Object.values(keysData).includes(token) || Object.keys(keysData).includes(token);
        } else if (Array.isArray(keysData)) {
          isValid = keysData.includes(token);
        }
      }
    }

    if (isValid) {
      res.setHeader("Content-Type", "text/plain");
      return res.status(200).send(LUA_SCRIPT);
    } else {
      return res.status(403).send("Access Denied: Invalid VIP Key!");
    }
  } catch (error) {
    console.error("Firebase Error:", error);
    return res.status(500).send("Error connecting to database!");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
