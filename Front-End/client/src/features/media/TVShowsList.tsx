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

const TVShowsList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["media", "tvshows"],
    queryFn: async () => {
      const response = await api.get("/api/media/tvshows/");
      return response.data as MediaItem[];
    },
  });

  if (isLoading) {
    return <p>Loading TV shows...</p>;
  }

  if (isError) {
    return <p>Unable to load TV shows.</p>;
  }

  return <MediaGrid items={data ?? []} emptyLabel="No TV shows added yet." />;
};

export default TVShowsList;
