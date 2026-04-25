import { useQuery } from "@tanstack/react-query";
import StatCard from "../../components/StatCard.tsx";
import api from "../../api/client.ts";

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
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back. Here is a quick overview.</p>
        </div>
      </header>

      <section className="dashboard__stats">
        <StatCard label="Movies" value="4,567" change="+10%" />
        <StatCard label="Games" value="2,345" change="+8%" />
        <StatCard label="TV Shows" value="1,234" change="+7%" />
        <StatCard label="Recommendations" value="23,456" change="+12%" />
      </section>

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
