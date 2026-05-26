import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { Plus, Sparkles } from "lucide-react";
import AddCreator from "./pages/AddCreator.jsx";
import EditCreator from "./pages/EditCreator.jsx";
import ShowCreators from "./pages/ShowCreators.jsx";
import ViewCreator from "./pages/ViewCreator.jsx";

// App owns the shared shell and the top-level routes for the Creatorverse.
export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header container-fluid">
        <NavLink className="brand" to="/">
          <Sparkles size={26} aria-hidden="true" />
          <span>Creatorverse</span>
        </NavLink>
        <nav className="site-nav" aria-label="Primary navigation">
          <NavLink to="/">Creators</NavLink>
          <NavLink className="add-link" to="/new">
            <Plus size={18} aria-hidden="true" />
            <span>Add Creator</span>
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ShowCreators />} />
          <Route path="/new" element={<AddCreator />} />
          <Route path="/creators/:id" element={<ViewCreator />} />
          <Route path="/creators/:id/edit" element={<EditCreator />} />
        </Routes>
      </main>
    </div>
  );
}
