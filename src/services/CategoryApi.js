const categoryApi = async (type) => {
  if (type === 'Drinks') {
    const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await result.json();
    return data.drinks;
  }
  if (type === 'Meals') {
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await result.json();
    return data.meals;
  }
};

export default categoryApi;
