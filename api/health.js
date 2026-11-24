module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: 'ok',
    llm: true,
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    version: '1.0.0'
  });
};
