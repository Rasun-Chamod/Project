import StatCard from "../../components/StatCard.tsx";
import { GamesList, MoviesList, TVShowsList } from "../media/index.ts";

const RecommendationsPage = () => {
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
        <h2>Latest movies</h2>
        <MoviesList />
      </section>

      <section>
        <h2>Latest TV shows</h2>
        <TVShowsList />
      </section>

      <section>
        <h2>Latest games</h2>
        <GamesList />
      </section>
    </div>
  );
};

export default RecommendationsPage;
