import { useQuery } from "@tanstack/react-query";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import api from "../../api/client.ts";

ChartJS.register(ArcElement, Tooltip, Legend);

interface GenreStat {
  genre: string;
  count: number;
}

interface TimeStat {
  label: string;
  minutes: number;
}

const buildPieData = (rows: GenreStat[]) => ({
  labels: rows.map((row) => row.genre),
  datasets: [
    {
      label: "Genre distribution",
      data: rows.map((row) => row.count),
      backgroundColor: ["#6366F1", "#22C55E", "#F97316", "#EC4899", "#14B8A6"],
    },
  ],
});

const AnalyticsPage = () => {
  const { data: genreStats } = useQuery({
    queryKey: ["analytics", "genres"],
    queryFn: async () => {
      const response = await api.get("/api/analytics/genres/");
      return response.data as GenreStat[];
    },
  });

  const { data: timeStats } = useQuery({
    queryKey: ["analytics", "time"],
    queryFn: async () => {
      const response = await api.get("/api/analytics/time-spent/");
      return response.data as TimeStat[];
    },
  });

  return (
    <div className="analytics">
      <section className="analytics__section">
        <h2>Genres you enjoy</h2>
        {genreStats && genreStats.length > 0 ? (
          <Pie data={buildPieData(genreStats)} />
        ) : (
          <p>No genre data yet.</p>
        )}
      </section>

      <section className="analytics__section">
        <h2>Time spent</h2>
        <ul>
          {(timeStats ?? []).map((row) => (
            <li key={row.label}>
              <strong>{row.label}</strong>: {row.minutes} minutes
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AnalyticsPage;
