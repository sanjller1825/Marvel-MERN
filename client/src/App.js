import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Asegúrate de importar el CSS

const API_BASE = "http://localhost:8000/api";

function App() {
  const [superheroes, setSuperheroes] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [marvelResults, setMarvelResults] = useState({});
  const [error, setError] = useState("");

  // 🔹 Cargar superhéroes
  const loadSuperheroes = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/superheroes`);
      setSuperheroes(data);
    } catch (err) {
      console.error(err);
      setError("Error cargando registros.");
    }
  };

  useEffect(() => {
    loadSuperheroes();
  }, []);

  // 🔹 Crear superhéroe
  const addSuperhero = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Ingresa un nombre.");

    try {
      await axios.post(`${API_BASE}/superheroes`, form);
      setForm({ name: "" });
      loadSuperheroes();
    } catch (err) {
      console.error(err);
      setError("Error creando el registro.");
    }
  };

  // 🔹 Eliminar superhéroe con confirmación
  const removeSuperhero = async (id) => {
    if (!window.confirm("¿Deseas eliminar este superhéroe?")) return;
    if (!id) return setError("Id inválido");

    try {
      await axios.delete(`${API_BASE}/superheroes/${id}`);
      loadSuperheroes();
    } catch (err) {
      console.error(err);
      setError("Error eliminando el registro.");
    }
  };

  // 🔹 Consultar Marvel API
  const fetchMarvelInfo = async (sh) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(
        `${API_BASE}/marvel?name=${encodeURIComponent(sh.name)}`
      );
      setMarvelResults((prev) => ({ ...prev, [sh._id]: data }));
    } catch (err) {
      console.error(err);
      setError("Error consultando Marvel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Mis Superhéroes (MERN + Marvel API)</h1>

      {/* Formulario */}
      <form onSubmit={addSuperhero}>
        <input
          placeholder="Nombre del superhéroe"
          value={form.name}
          onChange={(e) => setForm({ name: e.target.value })}
        />
        <button type="submit">Agregar</button>
      </form>

      {/* Mensaje de error */}
      {error && <p className="error">{error}</p>}

      {/* Lista o mensaje si la base de datos está vacía */}
      {superheroes.length === 0 ? (
        <p className="not-found">No hay superhéroes en la base de datos.</p>
      ) : (
        <ul className="superhero-list">
          {superheroes.map((sh) => (
            <li key={sh._id} className="superhero-item">
              <div className="hero-header">
                <strong>{sh.name}</strong>
                <div className="hero-buttons">
                  <button onClick={() => fetchMarvelInfo(sh)}>Ver información</button>
                  <button onClick={() => removeSuperhero(sh._id)}>Eliminar</button>
                </div>
              </div>

              {/* Resultados Marvel */}
              {marvelResults[sh._id] && marvelResults[sh._id].length > 0 && (
                <div className="marvel-results">
                  {marvelResults[sh._id].map((item) => {
                    const thumb = item.thumbnail
                      ? `${item.thumbnail.path}.${item.thumbnail.extension}`
                      : "";
                    const title = item.name || item.title;
                    const description =
                      item.description || "Sin descripción.";

                    return (
                      <article key={item.id}>
                        {thumb && <img src={thumb} alt={title} />}
                        <h3>{title}</h3>
                        <p>{description}</p>
                      </article>
                    );
                  })}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

