import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatorForm from "../components/CreatorForm.jsx";
import { addCreator } from "../services/creators.js";

const emptyForm = {
  name: "",
  url: "",
  description: "",
  imageURL: "",
};

// AddCreator handles the new-creator flow, then returns the user to the homepage.
export default function AddCreator() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

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
      await addCreator(form);
      navigate("/");
    } catch (saveError) {
      setError(saveError.message);
      setIsSaving(false);
    }
  };

  return (
    <section className="form-page container">
      <div className="form-heading">
        <p className="eyebrow">New Creator</p>
        <h1>Add a content creator</h1>
        <p>Add the creator's core details and a direct image link for their card.</p>
      </div>
      {error && <p className="notice error">{error}</p>}
      <CreatorForm
        form={form}
        isSaving={isSaving}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Add Creator"
      />
    </section>
  );
}
