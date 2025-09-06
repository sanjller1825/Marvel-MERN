import axios from 'axios';
import CryptoJS from 'crypto-js';

export const getMarvelInfo = async (req, res) => {
  try {
    const { name, type = "character", partialMatch = false } = req.query;

    const ts = Date.now().toString();
    const preHash = ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY;
    const hash = CryptoJS.MD5(preHash).toString();

    let endpoint = "";
    let params = {
      ts,
      apikey: process.env.MARVEL_PUBLIC_KEY,
      hash,
      limit: partialMatch === "true" ? 10 : 1,
    };

    if (type === "character") {
      endpoint = "characters";
      if (partialMatch === "true") {
        params.nameStartsWith = name;
      } else {
        params.name = name;
      }
    } else {
      endpoint = "comics";
      if (partialMatch === "true") {
        params.titleStartsWith = name;
      } else {
        params.title = name;
      }
    }

    const url = `https://gateway.marvel.com/v1/public/${endpoint}`;
    const { data } = await axios.get(url, { params });

    res.json(data.data.results);
  } catch (err) {
    console.error("Error Marvel API:", err.message);
    res.status(500).json({ error: "Error consultando Marvel API" });
  }
};
