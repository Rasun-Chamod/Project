import { useQuery } from "@tanstack/react-query";
import api from "../../api/client";

interface DownloadItem {
  id: number;
  media_title: string;
  media_type?: string;
  file_size_bytes?: number;
  download_token?: string;
}

const formatSize = (size?: number) => {
  if (!size) return "Unknown";
  const gb = size / 1024 ** 3;
  if (gb >= 1) return `${gb.toFixed(2)} GB`;
  const mb = size / 1024 ** 2;
  if (mb >= 1) return `${mb.toFixed(2)} MB`;
  const kb = size / 1024;
  if (kb >= 1) return `${kb.toFixed(2)} KB`;
  return `${size} B`;
};

const DownloadsPage = () => {
  const { data } = useQuery({
    queryKey: ["downloads"],
    queryFn: async () => {
      const response = await api.get("/api/downloads/");
      return response.data as DownloadItem[];
    },
  });

  const handleDownload = (item: DownloadItem) => {
    const base = import.meta.env.VITE_API_URL;
    const url = `${base}/api/downloads/${item.id}/`;
    window.location.href = url;
  };

  return (
    <div className="downloads">
      <h2>Available downloads</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Size</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {(data ?? []).map((item) => (
            <tr key={item.id}>
              <td>{item.media_title}</td>
              <td>{item.media_type ?? "-"}</td>
              <td>{formatSize(item.file_size_bytes)}</td>
              <td>
                <button type="button" onClick={() => handleDownload(item)}>
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DownloadsPage;
