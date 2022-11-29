const drinkApi = async (type, filter) => {
  let result;
  if (filter === 'ingrediente') result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${type}`);

  if (filter === 'nome') result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${type}`);

  if (filter === 'primeira-letra') {
    if (type.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${type}`);
  }

  const data = await result.json();

  return data;
};

export default drinkApi;
