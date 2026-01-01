import { useQuery } from "@tanstack/react-query";
import api from "../../api/client";

interface MediaItem {
  id: number;
  title: string;
  description?: string;
  media_type?: string;
}

const RecommendationsPage = () => {
  const { data: movieData } = useQuery({
    queryKey: ["recommendations", "movies"],
    queryFn: async () => {
      const response = await api.get("/api/recommendations/movies/");
      return response.data as MediaItem[];
    },
  });

  const { data: gameData } = useQuery({
    queryKey: ["recommendations", "games"],
    queryFn: async () => {
      const response = await api.get("/api/recommendations/games/");
      return response.data as MediaItem[];
    },
  });

  return (
    <div className="recommendations">
      <section>
        <h2>Movie recommendations</h2>
        <div className="recommendations__grid">
          {(movieData ?? []).map((item) => (
            <article key={item.id} className="card">
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Game recommendations</h2>
        <div className="recommendations__grid">
          {(gameData ?? []).map((item) => (
            <article key={item.id} className="card">
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecommendationsPage;
