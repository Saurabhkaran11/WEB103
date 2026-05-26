const fallbackImage = "/creator-placeholder.svg";

// Supabase columns sometimes end up camelCase, snake_case, or lowercase.
export function getCreatorImage(creator) {
  return (
    creator.imageURL ||
    creator.imageUrl ||
    creator.image_url ||
    creator.imageurl ||
    fallbackImage
  );
}

export function useFallbackImage(event) {
  event.currentTarget.src = fallbackImage;
}
