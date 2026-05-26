import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Users } from "lucide-react";
import CreatorCard from "../components/CreatorCard.jsx";
import { getCreators } from "../services/creators.js";
import { hasSupabaseConfig } from "../supabase/client.js";

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    // Keep loading logic close to the page so status messages stay easy to follow.
    async function loadCreators() {
      try {
        const data = await getCreators();
        setCreators(data);
        setStatus("ready");
      } catch (error) {
        setStatus(error.message);
      }
    }

    loadCreators();
  }, []);

  return (
    <>
      <section className="home-hero" aria-labelledby="creatorverse-title">
        <div className="hero-overlay">
          <h1 id="creatorverse-title">Creatorverse</h1>
          <div className="hero-actions">
            <a role="button" className="hero-button" href="#creators">
              <Users size={20} aria-hidden="true" />
              <span>View All Creators</span>
            </a>
            <Link role="button" className="hero-button" to="/new">
              <Plus size={20} aria-hidden="true" />
              <span>Add a Creator</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="creators" className="page-section container">
        <div className="page-heading">
          <div>
            <p className="eyebrow">Creator Directory</p>
            <h2>Featured Creators</h2>
            <p>
              Browse creators worth following for tech, science, cooking,
              learning, and creative work.
            </p>
          </div>
          <Link role="button" className="primary-button" to="/new">
            <Plus size={18} aria-hidden="true" />
            <span>Add Creator</span>
          </Link>
        </div>

        {status === "loading" && <p className="notice">Loading creators...</p>}
        {!hasSupabaseConfig && (
          <p className="notice">
            Supabase is not connected yet, so changes are being saved in this
            browser only.
          </p>
        )}
        {status !== "loading" && status !== "ready" && (
          <p className="notice error">{status}</p>
        )}
        {status === "ready" && creators.length === 0 && (
          <p className="notice">No creators yet. Add the first one.</p>
        )}

        <div className="creator-grid">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </section>
    </>
  );
}
