// pages/api/dictionary.js

export default async function handler(req, res) {
    const { word } = req.query;
  
    if (!word) {
      return res.status(400).json({ error: 'Word is required' });
    }
  
    const apiKey = process.env.SPANISH_API_KEY; // Store your API key in .env
    const url = `https://www.dictionaryapi.com/api/v3/references/spanish/json/${word}?key=${apiKey}`;

    try {
      // const response = await fetch(url);
      const res = await fetch(`/api/dictionary?word=${word}`);
      const data = await response.json();
  
      if (!response.ok) {
        return res.status(500).json({ error: 'Error fetching dictionary data' });
      }
  
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching dictionary data:', error); // Log the actual error for debugging
      return res.status(500).json({ error: 'Server error, please try again later' });
    }
  }