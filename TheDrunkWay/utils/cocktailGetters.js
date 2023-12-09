export const getIngredientList = (cocktail) => {
    let n = 16;
    let ingredient = 'strIngredient', measure = 'strMeasure';
    let ingredients = [];
    for(let i = 1; i < n; i++) {
        let current = ingredient+i.toString();
        if (cocktail[current]) {
            ingredients[i-1] = [cocktail[current], cocktail[measure+i.toString()]];
        } else {
            break;
        }
    }
    // console.log(ingredients)
    return ingredients
}
