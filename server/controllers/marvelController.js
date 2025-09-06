import axios from 'axios';
import CryptoJS from 'crypto-js';

export const getMarvelInfo = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const ts = Date.now().toString();
    const preHash = ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY;
    const hash = CryptoJS.MD5(preHash).toString();

    const endpoint = "characters"; // siempre buscamos personajes

    const params = {
      ts,
      apikey: process.env.MARVEL_PUBLIC_KEY,
      hash,
      name,      // coincidencia exacta
      limit: 1,
    };

    const url = `https://gateway.marvel.com/v1/public/${endpoint}`;
    const { data } = await axios.get(url, { params });

    const results = data.data.results;

    // ✅ Condición: si no existe, devolver mensaje
    if (!results || results.length === 0) {
      return res.json([{ title: "No encontrado", description: "Este superhéroe o villano no pertenece a Marvel.", thumbnail: null }]);
    }

    res.json(results);
  } catch (err) {
    console.error("Error Marvel API:", err.message);
    res.status(500).json({ error: "Error consultando Marvel API" });
  }
};
