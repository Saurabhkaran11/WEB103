import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreatorForm from "../components/CreatorForm.jsx";
import { deleteCreator, getCreator, updateCreator } from "../services/creators.js";

const emptyForm = {
  name: "",
  url: "",
  description: "",
  imageURL: "",
};

// This page loads the existing creator first so the form starts with real values.
export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("loading");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCreator() {
      try {
        const creator = await getCreator(id);
        if (!creator) {
          setStatus("Creator not found.");
          return;
        }
        setForm({
          name: creator.name,
          url: creator.url,
          description: creator.description,
          imageURL: creator.imageURL || "",
        });
        setStatus("ready");
      } catch (loadError) {
        setStatus(loadError.message);
      }
    }

    loadCreator();
  }, [id]);

  const handleChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      await updateCreator(id, form);
      navigate(`/creators/${id}`);
    } catch (saveError) {
      setError(saveError.message);
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    // A quick browser confirm is enough for this prework app's delete guard.
    const shouldDelete = window.confirm("Delete this creator?");
    if (!shouldDelete) {
      return;
    }

    try {
      await deleteCreator(id);
      navigate("/");
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  if (status === "loading") {
    return <p className="notice page-section container">Loading creator...</p>;
  }

  if (status !== "ready") {
    return <p className="notice error page-section container">{status}</p>;
  }

  return (
    <section className="form-page container">
      <div className="form-heading">
        <p className="eyebrow">Edit Creator</p>
        <h1>Update creator details</h1>
        <p>Change the creator's information or remove them from the directory.</p>
      </div>
      {error && <p className="notice error">{error}</p>}
      <CreatorForm
        form={form}
        isSaving={isSaving}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
      <button className="danger-button contrast" type="button" onClick={handleDelete}>
        <Trash2 size={18} aria-hidden="true" />
        <span>Delete Creator</span>
      </button>
    </section>
  );
}
