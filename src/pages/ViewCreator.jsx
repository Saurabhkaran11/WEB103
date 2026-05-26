import { ExternalLink, Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCreator } from "../services/creators.js";
import { getCreatorImage, useFallbackImage } from "../utils/creatorImage.js";

// Detail pages are addressable by ID, which gives each creator their own URL.
export default function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadCreator() {
      try {
        const data = await getCreator(id);
        setCreator(data);
        setStatus(data ? "ready" : "Creator not found.");
      } catch (error) {
        setStatus(error.message);
      }
    }

    loadCreator();
  }, [id]);

  if (status === "loading") {
    return <p className="notice page-section container">Loading creator...</p>;
  }

  if (!creator) {
    return <p className="notice error page-section container">{status}</p>;
  }

  return (
    <section className="detail-layout container">
      <img
        src={getCreatorImage(creator)}
        alt=""
        className="detail-image"
        onError={useFallbackImage}
      />
      <div className="detail-copy">
        <p className="eyebrow">Creator Details</p>
        <h1>{creator.name}</h1>
        <p>{creator.description}</p>
        <div className="detail-actions">
          <a
            role="button"
            className="primary-button"
            href={creator.url}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={18} aria-hidden="true" />
            <span>Visit Page</span>
          </a>
          <Link
            role="button"
            className="secondary-button secondary"
            to={`/creators/${creator.id}/edit`}
          >
            <Pencil size={18} aria-hidden="true" />
            <span>Edit Creator</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
