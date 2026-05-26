import React from "react";
import { Save } from "lucide-react";

export default function CreatorForm({
  form,
  isSaving,
  onChange,
  onSubmit,
  submitLabel,
}) {
  return (
    // The same form is reused for both adding and editing creators.
    <form className="creator-form" onSubmit={onSubmit}>
      <label>
        <span>Name</span>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Creator name"
          required
        />
      </label>

      <label>
        <span>URL</span>
        <input
          name="url"
          type="url"
          value={form.url}
          onChange={onChange}
          placeholder="https://example.com"
          required
        />
      </label>

      <label>
        <span>Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="What do they create?"
          rows="5"
          required
        />
      </label>

      <label>
        <span>Image URL</span>
        <input
          name="imageURL"
          type="url"
          value={form.imageURL}
          onChange={onChange}
          placeholder="https://example.com/photo.jpg"
        />
        <small>Use a direct image link, not a webpage or profile link.</small>
      </label>

      <button type="submit" disabled={isSaving}>
        <Save size={18} aria-hidden="true" />
        <span>{isSaving ? "Saving..." : submitLabel}</span>
      </button>
    </form>
  );
}
