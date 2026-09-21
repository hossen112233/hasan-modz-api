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

// 🔻 আপনার আসল মেইন VIP LUA SCRIPT 🔻
const LUA_SCRIPT = `
-- ২. প্রফেশনাল ওয়েলকাম অ্যালার্ট
local M = gg.alert([[
  ╭━━━  ◈  𝗖𝗢𝗜𝗡 𝗚𝗨𝗔𝗥𝗗𝗜𝗔𝗡  ◈  ━━━╮
      ⚡ 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 𝗩𝗜𝗣 𝗕𝗢𝗧 ⚡
  ╰━━━━━━━━━━━━━━━━━━━━━╯
  
  ▸ 𝗗𝗔𝗧𝗘      : 11 JUN 2026
  ▸ 𝗬𝗢𝗨𝗧𝗨𝗕𝗘  : © Coin Guardian Bot$
  ▸ 𝗬𝗢𝗨𝗧𝗨𝗕𝗘  : Hasan Modzs$
  
  ───────────────────────
  ▸ 𝗦𝗧𝗔𝗧𝗨𝗦    : 🟢 𝗢𝗡𝗟𝗜𝗡𝗘 & 𝗔𝗖𝗧𝗜𝗩𝗘
  ───────────────────────
]], "✅ 𝗦𝗧𝗔𝗥𝗧", "❌ 𝗘𝗫𝗜𝗧")

if M ~= 1 then 
  gg.clearResults()
  os.exit() 
end

-- CENTRAL STORAGE ENGINE & TOGGLE STATE TRACKERS
local ENGINE_ACTIVE = false
local STATE_DRAGON = false
local STATE_STRIKER_POSE = false

local CACHE = {
    red_x = {},
    red_x_base = {}
}

-- 1. THE ONE-TIME SEARCH ENGINE
function START_ENGINE()
    gg.toast("🔥 💠 𝐈𝐍𝐈𝐓𝐈𝐀𝐋𝐈𝐙𝐈𝐍𝐆 𝐄𝐍𝐆𝐈𝐍𝐄... 𝐏𝐋𝐄𝐀𝐒𝐄 𝐖𝐀𝐈𝐓 💠 🔥")
    
    pcall(function()
        -- Cache Red X Power & Base (235.0)
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
        gg.alert("💠━━━━━━━━ ⚡ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗦𝗧𝗔𝗧𝗨𝗦 ⚡ ━━━━━━━━💠\\n\\n✅ 𝗔𝗟𝗟 𝗛𝗔𝗖𝗞 𝗔𝗖𝗧𝗜𝗩𝗔𝗧𝗘𝗗\\n✨ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬!\\n\\n🚀 𝗔𝗹𝗹 𝗠𝗲𝗺𝗼𝗿𝘆 𝗣𝗼𝗶𝗻𝘁𝗲𝗿𝘀 𝗖𝗮𝗰𝗵𝗲𝗱\\n⚡ 𝗜𝗻𝘀𝘁𝗮𝗻𝘁 𝗧𝗼𝗴𝗴𝗹𝗲 𝗥𝗲𝗮𝗱𝘆\\n\\n💠━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━💠")
    end)
end

-- REQUIREMENT CHECK RUNTIME CONTROLLER
local function checkEngine()
    if not ENGINE_ACTIVE then
        gg.alert("⚠️ 𝗔𝗟𝗟 𝗛𝗔𝗖𝗞 𝗡𝗢𝗧 𝗔𝗖𝗧𝗜𝗩𝗔𝗧𝗘𝗗\\n\\nPlease Click 'ALL HACK ACTIVATED' At The Top Of The Menu First.")
        return false
    end
    return true
end

-- ONE-CLICK TOGGLE: DRAGON ULTRA FORCE
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
            gg.toast("🐉 𝗗𝗥𝗔𝗚𝗢𝗡 𝗨𝗟𝗧𝗥𝗔 𝗙𝗢𝗥𝗖𝗘 : 𝗢𝗡 ✅")
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
            gg.toast("🐉 𝗗𝗥𝗔𝗚𝗢𝗡 𝗨𝗟𝗧𝗥𝗔 𝗙𝗢𝗥𝗖𝗘 : 𝗢𝗙𝗙 ❌")
        end
        collectgarbage("collect")
    end)
end

-- ONE-CLICK TOGGLE: STRIKER POSE (Edit 235 -> 0)
function TOGGLE_STRIKER_POSE()
    if not checkEngine() then return end
    
    pcall(function()
        STATE_STRIKER_POSE = not STATE_STRIKER_POSE
        
        if STATE_STRIKER_POSE then
            if #CACHE.red_x > 0 then
                for i, v in ipairs(CACHE.red_x) do v.value = 0 end
                gg.setValues(CACHE.red_x)
            end
            gg.toast("🎯 𝗦𝗧𝗥𝗜𝗞𝗘𝗥 𝗣𝗢𝗦𝗘 : 𝗢𝗡 ✅")
        else
            if #CACHE.red_x > 0 then
                for i, v in ipairs(CACHE.red_x) do v.value = 235 end
                gg.setValues(CACHE.red_x)
            end
            gg.toast("🎯 𝗦𝗧𝗥𝗜𝗞𝗘𝗥 𝗣𝗢𝗦𝗘 : 𝗢𝗙𝗙 ❌")
        end
        collectgarbage("collect")
    end)
end

function Exit()
    gg.toast("♻️ 𝗧𝗛𝗜𝗦 𝗦𝗖𝗥𝗜𝗣𝗧 𝗖𝗔𝗡 𝗕𝗘 𝗥𝗘𝗨𝗦𝗘𝗗 ♻️")
    os.exit()
end

function HOME()
    local dragonStatus      = STATE_DRAGON and " [ 🟢 ON ]" or " [ 🔴 OFF ]"
    local strikerPoseStatus = STATE_STRIKER_POSE and " [ 🟢 ON ]" or " [ 🔴 OFF ]"

    local SN = gg.choice({
        "◈🟩◈ 𝗔𝗟𝗟 𝗛𝗔𝗖𝗞 𝗔𝗖𝗧𝗜𝗩𝗔𝗧𝗘𝗗 ◈🟩◈",
        "🐉▰◈ 𝗗𝗥𝗔𝗚𝗢𝗡 𝗨𝗟𝗧𝗥𝗔 𝗙𝗢𝗥𝗖𝗘 ◈▰🐉" .. dragonStatus,
        "🎯▰◈ 𝗦𝗧𝗥𝗜𝗞𝗘𝗥 𝗣𝗢𝗦𝗘 ◈▰🎯" .. strikerPoseStatus,
        "❌▰◈ 𝗘𝗫𝗜𝗧 ◈▰❌\\n\\n═══════════════════════════\\n             𝗖𝗟𝗘𝗔𝗡 𝗔𝗡𝗗 𝗥𝗘𝗙𝗥𝗘𝗦𝗛\\n═══════════════════════════" 
    }, nil, "┌───────────────────────────┐\\n  ◽ 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 𝗖𝗢𝗜𝗡 𝗚𝗨𝗔𝗥𝗗𝗜𝗔𝗡 𝗩𝗜𝗣 ◽\\n├───────────────────────────┤\\n  🌐 𝗦𝗧𝗔𝗧𝗨𝗦   : 𝗦𝗠𝗢𝗢𝗧𝗛 𝗥𝗨𝗡 (𝟰.𝟲 𝗚𝗕)\\n  👑 𝗢𝗪𝗡𝗘𝗥    : 𝗛𝗩𝗦𝗛 𝗚𝗔𝗠𝗜𝗡𝗚\\n  🔘 𝗩𝗘𝗥𝗦𝗜𝗢𝗡  : 𝟯𝟲.𝟬𝟬.𝟱𝟱\\n└───────────────────────────┘")

    if SN == 1 then START_ENGINE() end
    if SN == 2 then TOGGLE_DRAGON() end
    if SN == 3 then TOGGLE_STRIKER_POSE() end
    if SN == 4 then Exit() end
end

-- ৩. অটো-মেনু পপআপ
HOME()

while true do
    if gg.isVisible(true) then
        gg.setVisible(false)
        HOME()
    end
    gg.sleep(100)
end
`;

// Base Root Path
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
    // 1. Keys/Key_Name (Object format from Admin Panel)
    const snap1 = await db.ref("Keys/" + token).once("value");
    const snap2 = await db.ref("keys/" + token).once("value");
    
    // 2. Simple list/array search
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
    
