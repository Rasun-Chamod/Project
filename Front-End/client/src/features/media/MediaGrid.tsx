import { useState } from "react";

interface MediaItem {
  id: number;
  title: string;
  synopsis?: string;
  genres?: string[];
  thumbnail?: string | null;
  rating_average?: string | number | null;
  release_date?: string | null;
}

interface MediaGridProps {
  items: MediaItem[];
  emptyLabel: string;
}

const MediaGrid = ({ items, emptyLabel }: MediaGridProps) => {
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);

  if (!items.length) {
    return <p className="media-grid__empty">{emptyLabel}</p>;
  }

  return (
    <>
      <div className="media-grid">
        {items.map((item) => (
          <article
            key={item.id}
            className="card media-card"
            onClick={() => setActiveItem(item)}
          >
            {item.thumbnail ? (
              <img src={item.thumbnail} alt={item.title} />
            ) : (
              <div className="media-card__placeholder">No Image</div>
            )}
            <div className="media-card__body">
              <h3>{item.title}</h3>
              {item.genres?.length ? (
                <span className="media-card__genre">
                  {item.genres.join(", ")}
                </span>
              ) : null}
              {item.rating_average ? (
                <span className="media-card__rating">
                  {item.rating_average}
                </span>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {activeItem ? (
        <div className="media-modal" role="dialog" aria-modal="true">
          <button
            type="button"
            className="media-modal__overlay"
            onClick={() => setActiveItem(null)}
            aria-label="Close"
          />
          <div className="media-modal__content">
            <button
              type="button"
              className="media-modal__close"
              onClick={() => setActiveItem(null)}
              aria-label="Close"
            >
              ×
            </button>
            {activeItem.thumbnail ? (
              <img
                className="media-modal__image"
                src={activeItem.thumbnail}
                alt={activeItem.title}
              />
            ) : (
              <div className="media-modal__image media-card__placeholder">
                No Image
              </div>
            )}
            <div className="media-modal__body">
              <h3>{activeItem.title}</h3>
              <div className="media-modal__meta">
                {activeItem.genres?.length ? (
                  <span>{activeItem.genres.join(", ")}</span>
                ) : null}
                {activeItem.rating_average ? (
                  <span>Rating: {activeItem.rating_average}</span>
                ) : null}
                {activeItem.release_date ? (
                  <span>Release: {activeItem.release_date}</span>
                ) : null}
              </div>
              {activeItem.synopsis ? (
                <p>{activeItem.synopsis}</p>
              ) : (
                <p>No description available.</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MediaGrid;
