const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { generateLegalDraft, textToPdf, LEGAL_SOURCES } = require('./lib/legalEngine');

const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

function requestHandler(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health Endpoint
  if ((pathname === '/health' || pathname === '/api/health') && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      llm: true,
      hasGeminiKey: !!GEMINI_API_KEY,
      version: '1.0.0'
    }));
    return;
  }

  // Draft Endpoint
  if (pathname === '/api/draft' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const category = payload.category || 'consumer';
        const sources = LEGAL_SOURCES[category] || LEGAL_SOURCES.consumer;
        const draftText = generateLegalDraft(payload);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          draft: draftText,
          sources: sources
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // PDF Endpoint
  if (pathname === '/api/pdf' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const draft = payload.draft || 'NO CONTENT';
        const pdfBuffer = textToPdf(draft);

        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="Nyay_Saathi_Draft.pdf"',
          'Content-Length': pdfBuffer.length
        });
        res.end(pdfBuffer);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Explain Endpoint
  if (pathname === '/api/explain' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const explanation = `दस्तावेज़ समीक्षा गाइड:
1. जारीकर्ता: लेटरहेड, मुहर (Stamp) और कोर्ट/थाने/अधिवक्ता का नाम व बार काउंसिल नंबर जांचें।
2. कानूनी धाराएं: यदि चेक बाउंस है तो Section 138 NI Act (15 दिन का समय), पुलिस नोटिस है तो BNSS Section 35, अथवा उपभोक्ता कानूनी नोटिस।
3. समय-सीमा (Deadline): कानूनी नोटिस में 15 से 30 दिन का समय दिया जाता है।
4. स्कैम अलर्ट: यदि किसी पत्र में तुरंत UPI या डिजिटल अरेस्ट (Digital Arrest) की धमकी देकर पैसे मांगे जाएं, तो यह 100% फ्रॉड है। तुरंत 1930 पर कॉल करें।
5. परामर्श: मूल दस्तावेज़ के साथ अपने नजदीकी जिला विधिक सेवा प्राधिकरण (DLSA) या पंजीकृत अधिवक्ता से संपर्क करें।`;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ explanation }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Serve index.html or static files
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, 'index.html');
  }

  fs.readFile(filePath, (readErr, content) => {
    if (readErr) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml'
    };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    res.end(content);
  });
}

const server = http.createServer(requestHandler);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`⚖️ AI Nyay Saathi server running at http://localhost:${PORT}`);
  });
}

// Export request handler directly for Vercel
module.exports = requestHandler;
