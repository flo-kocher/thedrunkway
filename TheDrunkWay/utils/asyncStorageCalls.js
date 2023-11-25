import AsyncStorage from "@react-native-async-storage/async-storage";

const getAllKeys = async () => {
    let keys = []
    try {
        keys = await AsyncStorage.getAllKeys()
    } catch(error) {
        console.log(error)
    }
    // On ne prend pas l'élément 'EXPO_CONSTANTS_INSTALLATION_ID' du Storage
    // qui s'introduit quand on refresh la page par exemple
    return keys.filter(function(l) { return l !== 'EXPO_CONSTANTS_INSTALLATION_ID' });
}

export const storeCocktail = async (cocktail) => {
    /*
        Dans le cocktailData on va tout mettre, juste renommer peut être
        la key 'strDrink' en 'name'
     */
    let cocktailData = {
        'name': cocktail.strDrink
    }
    try {
        await AsyncStorage.setItem(cocktail.idDrink, JSON.stringify(cocktailData));
    } catch (error) {
        console.log(error);
    }
};

export const getCocktail = async (drinkId) => {
    try {
        const savedCocktail = await AsyncStorage.getItem(drinkId);
        const currentCocktail = JSON.parse(savedCocktail);
        console.log(currentCocktail);
        return currentCocktail;
    } catch (error) {
        console.log(error);
    }
};

export const getAllCocktails = async () => {
    try {
        let result = [];
        const keys = await getAllKeys();
        for (const key of keys) {
            const val = await AsyncStorage.getItem(key);
            result.push(JSON.parse(val));
        }
        console.log(result)
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const clearStorage = async () => {
    try {
        const savedCocktails = await AsyncStorage.clear();
    } catch (error) {
        console.log(error);
    }
};
