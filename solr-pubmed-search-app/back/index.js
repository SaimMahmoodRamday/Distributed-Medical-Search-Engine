
// back/index.js

const express = require('express');
const axios   = require('axios');
const cors    = require('cors');

// NEW SDK import
const { GoogleGenAI } = require('@google/genai');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// initialize once with your API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || 'AIzaSyBHaeYf4UyE_DfMRW1H9nQYSnSQ4Un1i_A'
});

// ========== SEARCH + QUERY-BACKOFF ROUTE ==========
app.get('/api/search', async (req, res) => {
  const {
    query,
    filter = 'all',
    page   = 1,
    rows   = 15,
    sort   = 'desc',
    year,
  } = req.query;

  const solrUrl = 'http://localhost:8983/solr/pubmed/select';
  const start   = (page - 1) * rows;

  async function doSolrSearch(q) {
    const solrParams = {
      wt:    'json',
      start,
      rows,
      sort:  `published_date ${sort}`,
      defType: 'lucene',
    };

    if (filter === 'all') {
      // Build OR across fields: title, abstract, keywords
      const escaped = q.replace(/([+\-!(){}\[\]^"~*?:\\\/])/g, '\\$1');
      solrParams.q = `title:\"${escaped}\"^10 OR abstract:\"${escaped}\"^2 OR keywords:\"${escaped}\"^5`;
    } else {
      // Field-specific phrase search
      const escaped = q.replace(/([+\-!(){}\[\]^"~*?:\\\/])/g, '\\$1');
      solrParams.q = `${filter}:\"${escaped}\"`;
    }
    if (year) solrParams.fq = `pub_year:${year}`;

    const { data } = await axios.get(solrUrl, { params: solrParams });
    return data.response;
  }

  try {
    // First try user query
    let response = await doSolrSearch(query);

    // If no hits, ask Gemini for a disease name and retry
    if (response.numFound === 0) {
      // console.log('Gemini Search Backoff');
      const gen = await ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: `Provide the exact disease name for query: \"${query}\"`,
      });
      const repr = gen.text.trim();
      response = await doSolrSearch(repr);
    }

    res.json({ docs: response.docs, numFound: response.numFound });
  } catch (err) {
    console.error('Error in search route:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// ========== SUMMARY ROUTE ==========
app.post('/api/summary', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Missing title.' });

  try {
    const response = await ai.models.generateContent({
      model:    'gemini-2.0-flash-001',
      contents: `What does this medical research article titled \"${title}\" mean?`,
    });
    res.json({ summary: response.text });
  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({ error: 'AI summary failed.' });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
