// front/src/services/api.js
// import axios from 'axios';

// export async function searchDocs(query, filter, page = 1, rows = 15) {
//   const params = { query, page, rows, filter };
//   const response = await axios.get('http://localhost:5000/api/search', { params });
//   return response.data;
// }

// import axios from 'axios';

// export async function searchDocs(query, filter, page = 1, rows = 15, sort = 'desc') {
//   const params = { query, page, rows, filter, sort };
//   const response = await axios.get('http://localhost:5000/api/search', { params });
//   return response.data;
// }

// front/src/services/api.js
// import axios from 'axios';

// export async function searchDocs(query, filter, page = 1, rows = 15, sort = 'desc') {
//   const params = { query, page, rows, filter, sort };
//   const response = await axios.get('http://localhost:5000/api/search', { params });
//   return response.data;
// }

// Code 02

// front/src/services/api.js
// import axios from 'axios';

// export async function searchDocs(
//   query,
//   filter,
//   page = 1,
//   rows = 15,
//   sort = 'desc',
//   year = ''
// ) {
//   const params = { query, page, rows, filter, sort };
//   if (year) params.year = year;   // ← include only when non-empty
//   const response = await axios.get('http://localhost:5000/api/search', { params });
//   return response.data;
// }

// Code 03

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

