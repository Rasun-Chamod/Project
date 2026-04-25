import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/client.ts";

interface LibraryItem {
  id: number;
  title: string;
  media_type: "movie" | "game" | "tv";
  synopsis?: string;
  thumbnail?: string | null;
  release_date?: string | null;
  rating_average?: string | null;
}

const MEDIA_TYPES = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "game", label: "Games" },
  { value: "tv", label: "TV Shows" },
];

const LibraryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get("type") ?? "all";
  const [filter, setFilter] = useState(initialFilter);
  const [query, setQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["library", filter],
    queryFn: async () => {
      const params = filter === "all" ? {} : { type: filter };
      const response = await api.get("/api/media/library/", { params });
      return response.data as LibraryItem[];
    },
  });

  useEffect(() => {
    const nextFilter = searchParams.get("type") ?? "all";
    if (nextFilter !== filter) {
      setFilter(nextFilter);
    }
  }, [filter, searchParams]);

  const updateFilter = (next: string) => {
    setFilter(next);
    if (next === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ type: next });
    }
  };

  const filtered = useMemo(() => {
    if (!data) return [];
    const term = query.trim().toLowerCase();
    if (!term) return data;
    return data.filter((item) => item.title.toLowerCase().includes(term));
  }, [data, query]);

  return (
    <div className="library">
      <header className="library__header">
        <div>
          <h2>Library</h2>
          <p>Browse all movies, games, and TV shows in your database.</p>
        </div>
        <div className="library__controls">
          <input
            type="search"
            placeholder="Search titles"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="library__filters">
            {MEDIA_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                className={filter === type.value ? "is-active" : ""}
                onClick={() => updateFilter(type.value)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {isLoading ? (
        <p>Loading library...</p>
      ) : (
        <div className="library__grid">
          {filtered.map((item) => (
            <article key={item.id} className="card library__card">
              {item.thumbnail ? (
                <img src={item.thumbnail} alt={item.title} />
              ) : (
                <div className="library__placeholder">
                  {item.media_type.toUpperCase()}
                </div>
              )}
              <div className="library__meta">
                <span className="library__type">{item.media_type}</span>
                <h3>{item.title}</h3>
                {item.synopsis && <p>{item.synopsis}</p>}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
