import React from "react";
import { ExternalLink, Info, Pencil, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { getCreatorImage, useFallbackImage } from "../utils/creatorImage.js";

// A compact creator preview used on the homepage grid.
export default function CreatorCard({ creator }) {
  return (
    <article className="creator-card">
      <Link className="card-image-link" to={`/creators/${creator.id}`}>
        <img
          src={getCreatorImage(creator)}
          alt=""
          className="creator-image"
          loading="lazy"
          onError={useFallbackImage}
        />
      </Link>
      <div className="creator-card-body">
        <div>
          <p className="card-kicker">
            <UserRound size={14} aria-hidden="true" />
            <span>Creator</span>
          </p>
          <h2>{creator.name}</h2>
          <p>{creator.description}</p>
        </div>
        <div className="card-actions" aria-label={`${creator.name} actions`}>
          <a href={creator.url} target="_blank" rel="noreferrer" title="Open creator page">
            <ExternalLink size={18} aria-hidden="true" />
            <span className="sr-only">Open creator page</span>
          </a>
          <Link to={`/creators/${creator.id}`} title="View details">
            <Info size={18} aria-hidden="true" />
            <span className="sr-only">View details</span>
          </Link>
          <Link to={`/creators/${creator.id}/edit`} title="Edit creator">
            <Pencil size={18} aria-hidden="true" />
            <span className="sr-only">Edit creator</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
