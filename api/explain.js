module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    let explanation = `दस्तावेज़ समीक्षा गाइड:
1. जारीकर्ता: लेटरहेड, मुहर (Stamp) और कोर्ट/थाने/अधिवक्ता का नाम व बार काउंसिल नंबर जांचें।
2. कानूनी धाराएं: यदि चेक बाउंस है तो Section 138 NI Act (15 दिन का समय), पुलिस नोटिस है तो BNSS Section 35, अथवा उपभोक्ता कानूनी नोटिस।
3. समय-सीमा (Deadline): कानूनी नोटिस में 15 से 30 दिन का समय दिया जाता है।
4. स्कैम अलर्ट: यदि किसी पत्र में तुरंत UPI या डिजिटल अरेस्ट (Digital Arrest) की धमकी देकर पैसे मांगे जाएं, तो यह 100% फ्रॉड है। तुरंत 1930 पर कॉल करें।
5. परामर्श: मूल दस्तावेज़ के साथ अपने नजदीकी जिला विधिक सेवा प्राधिकरण (DLSA) या पंजीकृत अधिवक्ता से संपर्क करें।`;

    res.status(200).json({ explanation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
