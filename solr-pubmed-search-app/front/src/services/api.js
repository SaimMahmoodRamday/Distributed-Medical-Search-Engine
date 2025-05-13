
// front/src/services/api.js
import axios from 'axios';

const BASE = 'http://localhost:5000/api';

export async function searchDocs(
  query,
  filter,
  page = 1,
  rows = 15,
  sort = 'desc',
  year = ''
) {
  const params = { query, page, rows, filter, sort };
  if (year) params.year = year;
  const response = await axios.get(`${BASE}/search`, { params });
  return response.data;
}

// NEW: fetches AI summary for a given title
export async function getSummary(title) {
  const response = await axios.post(`${BASE}/summary`, { title });
  return response.data.summary;
}

