const mealApi = async (type, filter) => {
    console.log(type, filter)
    switch (filter) {
        case 'ingrediente':
            const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${type}`)
            const data = await result.json();
            return data;
        case 'nome':
            const result1 = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${type}`)
            const data1 = await result1.json();
            return data1;
        case 'primeira-letra':
            if (type.length > 1) {
                return global.alert('Your search must have only 1 (one) character')
            } else {
                const result2 = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${type}`)
                const data2 = await result2.json()
                return data2;
            }
        default:
            break;
    }
}

export default mealApi;