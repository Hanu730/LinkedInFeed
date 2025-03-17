const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/linkedin', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=urn:li:organization:108904`,
      {
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy running at http://localhost:${port}`);
});
