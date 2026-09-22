# DoNow Backend (Neon PostgreSQL + Render Deployment Guide)

यह DoNow का कोर बैकएंड इंजन है जो **Neon Serverless PostgreSQL** और **Render Web Service** के लिए तैयार किया गया है।

---

## स्टेप 1: Neon Database Setup (2 मिनट)

1. **[Neon.tech](https://neon.tech)** पर लॉगिन करें और अपना प्रोजेक्ट खोलें।
2. डैशबोर्ड पर आपको **"Connection Details"** दिखेंगे:
   - वहाँ से **`postgres://...` (Connection String)** कॉपी कर लें।
3. Neon डैशबोर्ड के बाएं मेनू में **"SQL Editor"** पर क्लिक करें।
4. `backend/schema.sql` फाइल का सारा कोड कॉपी करके Neon SQL Editor में पेस्ट करें और **"Run"** दबा दें।
   - इससे सारी टेबल्स (`users`, `partners`, `orders`, `ratings`, `emergency_alerts`, `services`) बन जाएंगी।

---

## स्टेप 2: Render पर डिप्लॉय करना (3 मिनट)

1. **[Render.com](https://render.com)** पर लॉगिन करें।
2. **"New +"** बटन दबाकर **"Web Service"** चुनें।
3. अपना GitHub अकाउंट कनेक्ट करके अपनी रिपोजिटरी (`donow-customer-app` या `donow-backend`) चुनें।
4. सेटिंग्स भरें:
   - **Name:** `donow-backend`
   - **Region:** Singapore / Frankfurt
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. नीचे **"Environment Variables"** में जाएँ और Add करें:
   - **Key:** `DATABASE_URL`
   - **Value:** *(अपनी Neon वाली connection string यहाँ पेस्ट करें)*
6. **"Create Web Service"** पर क्लिक कर दें!

---

## स्टेप 3: लाइव टेस्ट करना

जैसे ही Render पर डिप्लॉयमेंट **"Live"** हो जाए, आपको आपकी लाइव URL मिलेगी:
`https://donow-backend.onrender.com`

ब्राउज़र में इसे खोलें:
- `https://donow-backend.onrender.com/api/health` -> `{"status":"ok", "database":"connected"}`

इसके बाद `lib/config/api_config.dart` में यही URL डाल दें, और आपकी Customer App सीधे लाइव डेटाबेस से चलने लगेगी!
