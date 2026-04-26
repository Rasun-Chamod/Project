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

const MoviesList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["media", "movies"],
    queryFn: async () => {
      const response = await api.get("/api/media/movies/");
      return response.data as MediaItem[];
    },
  });

  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  if (isError) {
    return <p>Unable to load movies.</p>;
  }

  return <MediaGrid items={data ?? []} emptyLabel="No movies added yet." />;
};

export default MoviesList;
