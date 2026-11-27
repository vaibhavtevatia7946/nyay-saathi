# ⚖️ Nyay Saathi (न्याय साथी)
> **Bolo, complaint ready.** — AI-powered citizen legal drafting & redressal platform for India.

Live Production URL: **[https://nyay-saathi-eight.vercel.app](https://nyay-saathi-eight.vercel.app)**

---

## 🚀 Key Features

1. **10 Indian Languages with Regional Voice Recognition:**
   - Speak or type in Hindi, English, Marathi, Tamil, Telugu, Bengali, Gujarati, Punjabi, Kannada, or Malayalam.
   - Generates authentic court-ready Cause Titles and Prayers in regional languages.

2. **2024 New Criminal Laws Up-to-Date:**
   - **Bharatiya Nyaya Sanhita, 2023 (BNS)**: Section 318 for cheating & fraud (replaces IPC 420).
   - **Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)**: Section 173 for FIR, Zero FIR, and Section 173(4) SP complaints.
   - **Consumer Protection Act, 2019**: Pecuniary thresholds (District <= ₹50 Lakh, State <= ₹2 Crore, National > ₹2 Crore) and Section 69 2-year limitation.
   - **Right to Information Act, 2005**: Section 6(1), Section 6(3) transfer, Section 7(1) 30-day timeline, and Section 19(1) First Appeal.

3. **📁 Evidence & Annexure PDF Bundle Builder:**
   - Upload multiple bills, payment proofs, and WhatsApp chat screenshots.
   - Automatically labels them `Annexure C-1`, `Annexure C-2`, generates a certified Index of Documents, and merges them with the formal complaint for 1-click download.

4. **💬 1-Click WhatsApp & Email Notice Sender:**
   - Enter the opposite party's phone number and send a formatted legal notice directly to their WhatsApp chat.

5. **🚨 Digital Arrest & Fake Notice Scam Inspector:**
   - Identifies fraudulent police/CBI/FedEx notices and "Digital Arrest" extortion threats with red-flag detection and 1930 Helpline links.

6. **📅 15-Day / 30-Day Calendar Reminders:**
   - One-click deadline sync for Google Calendar & Apple Calendar (.ics).

7. **📍 Pincode & City-based Free Legal Aid (DLSA) & Court Finder:**
   - Instant Google Maps directions to the nearest District Legal Services Authority (DLSA) for free government lawyers, District Consumer Court, and Cyber Police Stations.

8. **🌐 1-Click Bilingual UI Toggle:**
   - Instant switch between friendly **Hinglish** and professional **English** with persistent `localStorage` preference.

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, Modern ES6+ JavaScript, Web Speech API (Dictation & Synthesis)
- **Backend:** Node.js (native http, zero external dependencies for PDF & routing)
- **Deployment:** Vercel Serverless Functions (`api/health.js`, `api/draft.js`, `api/pdf.js`, `api/explain.js`)

---

## 🏃 Local Development

```bash
cd nyay-saathi
npm start
# Server runs on http://localhost:3001
```

---

## 📄 License
MIT License
