import { useQuery } from "@tanstack/react-query";
import api from "../../api/client.ts";
import MediaGrid from "./MediaGrid.tsx";

interface MediaItem {
  id: number;
  title: string;
  synopsis?: string;
  genres?: string[];
  thumbnail?: string | null;
  rating_average?: string | number | null;
  release_date?: string | null;
}

const GamesList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["media", "games"],
    queryFn: async () => {
      const response = await api.get("/api/media/games/");
      return response.data as MediaItem[];
    },
  });

  if (isLoading) {
    return <p>Loading games...</p>;
  }

  if (isError) {
    return <p>Unable to load games.</p>;
  }

  return <MediaGrid items={data ?? []} emptyLabel="No games added yet." />;
};

export default GamesList;
