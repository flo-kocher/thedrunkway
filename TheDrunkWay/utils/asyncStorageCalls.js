import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkFirstLaunch = async () => {
    try {
        let firstLaunch = await AsyncStorage.getItem('notFirstLaunch')
        if (firstLaunch == null) {
            await AsyncStorage.setItem('notFirstLaunch', 'true')
            return true;
        }
    } catch (error) {
        console.log(error)
    }
    return false;
}

export const getAllKeys = async () => {
    let keys = []
    try {
        keys = await AsyncStorage.getAllKeys()
    } catch(error) {
        console.log(error)
    }
    // On ne prend pas l'élément 'EXPO_CONSTANTS_INSTALLATION_ID' du Storage
    // qui s'introduit quand on refresh la page par exemple
    return keys.filter(function(l) { return l !== 'EXPO_CONSTANTS_INSTALLATION_ID' && l !== 'notFirstLaunch' });
}

export const storeCocktail = async (cocktail) => {
    try {
        await AsyncStorage.setItem(cocktail.idDrink, JSON.stringify(cocktail));
    } catch (error) {
        console.log(error);
    }
};

export const removeCocktail = async (cocktail) => {
    try {
        await AsyncStorage.removeItem(cocktail.idDrink);
    } catch (error) {
        console.log(error);
    }
};

export const getCocktail = async (drinkId) => {
    try {
        const savedCocktail = await AsyncStorage.getItem(drinkId);
        const currentCocktail = JSON.parse(savedCocktail);
        return currentCocktail;
    } catch (error) {
        console.log(error);
    }
};

export const updateFavoriteCocktail = async (cocktail, isFavorite) => {
    if (isFavorite) {
        await storeCocktail(cocktail);
    } else {
        await removeCocktail(cocktail);
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

export const updateIsFavoriteValue = async (drinks) => {
    if(drinks){
        let favCocktails = await getAllCocktails();
        for (let i = 0; i < drinks.length; i++){
            drinks[i].isFavorite = favCocktails.map(fav=>fav.idDrink).includes(drinks[i].idDrink);
        }
    }
    return drinks;
}
