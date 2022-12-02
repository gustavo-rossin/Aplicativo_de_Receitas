export const verifyFavorite = (setFav, id) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const isFav = favorites.some((e) => +e.id === +id);
  if (isFav) {
    setFav(true);
  } else {
    setFav(false);
  }
};

export const saveFavorite = (arr, apiResponse, title) => {
  const favoriteObject = {
    id: apiResponse[0].idMeal || apiResponse[0].idDrink,
    type: title === 'Meals' ? 'meal' : 'drink',
    nationality: apiResponse[0].strArea || '',
    category: apiResponse[0].strCategory,
    alcoholicOrNot: apiResponse[0].strAlcoholic || '',
    name: apiResponse[0].strDrink || apiResponse[0].strMeal,
    image: apiResponse[0].strDrinkThumb || apiResponse[0].strMealThumb,
  };
  const newFavorites = [...arr, favoriteObject];
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
};

export const removeFavorite = (arr, id) => {
  const filterFavorite = arr.filter((e) => +e.id !== +id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavorite));
};
