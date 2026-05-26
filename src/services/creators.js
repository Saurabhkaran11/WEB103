import { seedCreators } from "../data/seedCreators";
import { hasSupabaseConfig, supabase } from "../supabase/client";

const storageKey = "creatorverse-local-creators";

// Local storage is a small preview mode. Supabase takes over as soon as env keys exist.
const readLocalCreators = () => {
  const savedCreators = window.localStorage.getItem(storageKey);
  return savedCreators ? JSON.parse(savedCreators) : seedCreators;
};

const writeLocalCreators = (creators) => {
  window.localStorage.setItem(storageKey, JSON.stringify(creators));
};

// Trim form values in one place before saving them anywhere.
const normalizeCreator = (creator) => ({
  name: creator.name.trim(),
  url: creator.url.trim(),
  description: creator.description.trim(),
  imageURL: creator.imageURL?.trim() || null,
});

export async function getCreators() {
  if (!hasSupabaseConfig) {
    return readLocalCreators();
  }

  // Supabase returns the rows and any error separately, so each call handles both.
  const { data, error } = await supabase
    .from("creators")
    .select()
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function getCreator(id) {
  if (!hasSupabaseConfig) {
    return readLocalCreators().find((creator) => String(creator.id) === String(id));
  }

  const { data, error } = await supabase
    .from("creators")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function addCreator(creator) {
  const nextCreator = normalizeCreator(creator);

  if (!hasSupabaseConfig) {
    const creators = readLocalCreators();
    const createdCreator = { ...nextCreator, id: crypto.randomUUID() };
    writeLocalCreators([...creators, createdCreator]);
    return createdCreator;
  }

  const { data, error } = await supabase
    .from("creators")
    .insert(nextCreator)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateCreator(id, creator) {
  const nextCreator = normalizeCreator(creator);

  if (!hasSupabaseConfig) {
    const creators = readLocalCreators();
    writeLocalCreators(
      creators.map((item) =>
        String(item.id) === String(id) ? { ...item, ...nextCreator } : item,
      ),
    );
    return { id, ...nextCreator };
  }

  const { data, error } = await supabase
    .from("creators")
    .update(nextCreator)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteCreator(id) {
  if (!hasSupabaseConfig) {
    writeLocalCreators(
      readLocalCreators().filter((creator) => String(creator.id) !== String(id)),
    );
    return;
  }

  const { error } = await supabase.from("creators").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
