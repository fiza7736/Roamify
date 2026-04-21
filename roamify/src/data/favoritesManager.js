const FAV_KEY = 'roamify_favorites';

export const getFavorites = () => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(FAV_KEY) || '[]');
  } catch {
    return [];
  }
};

export const saveFavorites = (favs) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  }
};

export const toggleFavorite = (id) => {
  let favs = getFavorites();
  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id);
  } else {
    favs.push(id);
  }
  saveFavorites(favs);
  return favs;
};
