import React, { useState, useEffect } from "react";

// simple debounce hook (basic version) function useDebounce(value, delay) { const [debounceValue, setDebounceValue] = useState(value);

useEffect(() => { const t = setTimeout(() => { setDebounceValue(value); }, delay);

return () => clearTimeout(t);

}, [value]);

return debounceValue; }

// simple localStorage hook (basic) function useLocalStorage(key, initial) { const [val, setVal] = useState(() => { const data = localStorage.getItem(key); if (data) return JSON.parse(data); return initial; });

useEffect(() => { localStorage.setItem(key, JSON.stringify(val)); }, [val]);

return [val, setVal]; }

export default function App() { const [products, setProducts] = useState([]); const [search, setSearch] = useLocalStorage("search", "");

const debounced = useDebounce(search, 500);

useEffect(() => { fetch("/data.json") .then((res) => res.json()) .then((data) => setProducts(data)) .catch((err) => console.log(err)); }, []);

const filtered = products.filter((p) => p.name.toLowerCase().includes(debounced.toLowerCase()) );

return ( <div style={{ padding: "20px" }}> <h2>Product Search</h2>

<input
    type="text"
    placeholder="search..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <button onClick={() => setSearch("")}>Clear</button>

  <div>
    {filtered.length > 0 ? (
      filtered.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h4>{item.name}</h4>
          <p>{item.description}</p>
        </div>
      ))
    ) : (
      <p>No Results Found</p>
    )}
  </div>
</div>

); }