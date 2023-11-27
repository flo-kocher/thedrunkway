import AsyncStorage from "@react-native-async-storage/async-storage";

let inFav = ["11000", "15841", "178358", "178336"];

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
    try {
        await AsyncStorage.setItem(cocktail.idDrink, JSON.stringify(cocktail));
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

export const updateIsFavoriteValue = async (drinks) => {
    let favCocktails = await getAllCocktails();
    for (let i = 0; i < drinks.length; i++){
            drinks[i].isFavorite = favCocktails.map(fav=>fav.idDrink).includes(drinks[i].idDrink);
    }
    // console.log(drinks);
    return drinks;
}

export const addToFavorites = (cocktailID) => {


    // j'ai fais le fait qu'on puisse voir les cocktails on a mis en favoris sur
    // la page de Search

    // mnt faire en sorte qu'on puisse enelver un cocktail des favoris
    // et que on ait du coup une update direct
    // d'abord avec un true qui devient false et false=>true
    // puis avec un Coeur


    for (let i = 0; i < inFav.length; i++){
        if (cocktailID === inFav[i]) {
            console.log('in fav')
        }
    }

};
