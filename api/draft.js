const { generateLegalDraft, LEGAL_SOURCES } = require('../lib/legalEngine');

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
    const category = payload.category || 'consumer';
    const sources = LEGAL_SOURCES[category] || LEGAL_SOURCES.consumer;
    const draftText = generateLegalDraft(payload);

    res.status(200).json({
      draft: draftText,
      sources: sources
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
