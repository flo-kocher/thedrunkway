import {
    Text,
    View,
    StyleSheet, 
    ScrollView, 
    ActivityIndicator,
} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState, useRef } from "react";
import CocktailListItem from "../components/CocktailListItem";
import checkStatus from "../utils/checkStatus";
import RectangleBtn from "../components/RectangleBtn";
import { useQuery } from 'react-query';
import { SearchBar } from '@rneui/themed';

// const getRandomCocktails = () => {
//     return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
//         .then(checkStatus)
//         .then(response => response.json())
//         .then(data => {
//             // console.log(data);
//             return data.drinks;
//         })
//         .catch(error => {
//             console.log(error.message);
//         });
// }

// const genFullData = async (labels, callback) => {
//     let promises = labels.map(async (year) => {
//             let result = await getRandomCocktails();
//             return result;
//         }),
//         dataResults = await Promise.all(promises);

//     let fullData = {
//         labels,
//         datasets: [
//             {
//                 label: "25th percentile",
//                 data: dataResults
//             },
//         ],
//     };

//     callback(fullData);
// }

const Home = ({navigation}) => {
    const refIngredientScrollView = useRef();
    const refGlassScrollView = useRef();

    const [glassSearch, setGlassSearch] = useState("");
    const [ingredientSearch, setIngredientSearch] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [randomCocktails, setRandomCocktails] = useState([]);
    const { GlassIsLoading, data: glasses } = useQuery('glasses', () => getGlasses());
    const { CategoryIsLoading, data: categories } = useQuery('categories', () => getCategories());
    const { IngredientIsLoading, data: ingredients } = useQuery('ingredients', () => getIngredients());
    const { AlcoholicIsLoading, data: alcoholic } = useQuery('alcoholic', () => getAlcoholic());

    const updateGlassSearch = (text) => {
        refGlassScrollView.current.scrollTo({x: 0, y: 0, animated: false});
        setGlassSearch(text);
    }
    
    const updateIngredientSearch = (text) => {
        refIngredientScrollView.current.scrollTo({x: 0, y: 0, animated: false});
        setIngredientSearch(text);
    }

    const getRandomCocktails = async (number) => {
        let randomCocktailsList = [];
        try {
            for(let i = 0; i < number; i++) {
                const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
                const json = await response.json();
                randomCocktailsList.push(json.drinks[0])
            }
            setRandomCocktails(randomCocktailsList);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getGlasses = () => {
        return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list')
            .then(checkStatus)
            .then(response => response.json())
            .then(data => {
                return data.drinks
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    const getCategories = () => {
        return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
            .then(checkStatus)
            .then(response => response.json())
            .then(data => {
                return data.drinks
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    const getIngredients = () => {
        return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
            .then(checkStatus)
            .then(response => response.json())
            .then(data => {
                return data.drinks
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    const getAlcoholic = () => {
        return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list')
            .then(checkStatus)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                return data.drinks
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    const handleClick = (searchType, searchValue) => {
        navigation.navigate("CategoriesSearchResult", {searchType, searchValue});
    }

    useEffect(() => {
        getRandomCocktails(6);
    }, []);

    return (
        <ScrollView style={{flex: 1, marginTop: StatusBar.currentHeight || 0}}>
            <Text>Random cocktail selection</Text>
            {!randomCocktails || isLoading ? (
                <ActivityIndicator />
            ) : (
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap'}}
                  >
                    {randomCocktails.map((cocktail, index) => <CocktailListItem key={"_" + String(index)} navigation={navigation} cocktail={cocktail} mode={'grid'}/>)}
                </View>
            )}

            {/* <ScrollView> */}
                <Text>Cocktails by alcoholic type</Text>
                {
                    !alcoholic || AlcoholicIsLoading ? 
                    <ActivityIndicator /> :
                    <ScrollView horizontal={true}>
                        {alcoholic.map((alcohol, index) => <RectangleBtn key={index} style={styles.text} searchBy={alcohol.strAlcoholic} handleClick={() => handleClick("a", alcohol.strAlcoholic)}/>)}
                    </ScrollView>
                }

                <Text>Cocktails by category</Text>
                {
                    !categories || CategoryIsLoading ? 
                    <ActivityIndicator /> :
                    <ScrollView horizontal={true} persistentScrollbar={true}>
                        {categories.map((category, index) => <RectangleBtn key={index} style={styles.text} searchBy={category.strCategory} handleClick={() => handleClick("c", category.strCategory)}/>)}
                    </ScrollView>
                }

                <Text>Cocktails by ingredient</Text> 
                <SearchBar
                    placeholder="Filter ingredients here..."
                    onChangeText={updateIngredientSearch}
                    value={ingredientSearch}
                />
                {
                    !ingredients || IngredientIsLoading ? 
                    <ActivityIndicator /> :
                    ingredientSearch == "" ?
                        <ScrollView ref={refIngredientScrollView} horizontal={true} persistentScrollbar={true}>
                            {ingredients.map((ingredient, index) => <RectangleBtn key={index} style={styles.text} searchBy={ingredient.strIngredient1} handleClick={() => handleClick("i", ingredient.strIngredient1)}/>)}
                        </ScrollView>
                        :
                        <ScrollView ref={refIngredientScrollView} horizontal={true} persistentScrollbar={true}>
                            {ingredients.filter((ingredient) => ingredient.strIngredient1.toLowerCase().includes(ingredientSearch.toLowerCase())).map((ingredient, index) => <RectangleBtn key={index} style={styles.text} searchBy={ingredient.strIngredient1} handleClick={() => handleClick("i", ingredient.strIngredient1)}/>)}
                        </ScrollView>
                }
                <Text>Cocktails by glass</Text>
                <SearchBar
                    placeholder="Filter glasses here..."
                    onChangeText={updateGlassSearch}
                    value={glassSearch}
                />
                {
                    !glasses || GlassIsLoading ? 
                    <ActivityIndicator /> :
                    glassSearch == "" ?
                        <ScrollView ref={refGlassScrollView} horizontal={true} showsHorizontalScrollIndicator={true} persistentScrollbar={true}>
                            {glasses.map((glass, index) => <RectangleBtn key={index} style={styles.text} searchBy={glass.strGlass} handleClick={() => handleClick("g", glass.strGlass)}/>)}
                        </ScrollView>
                        :
                        <ScrollView ref={refGlassScrollView} horizontal={true} showsHorizontalScrollIndicator={true} persistentScrollbar={true}>
                            {glasses.filter((glass) => glass.strGlass.toLowerCase().includes(glassSearch.toLowerCase())).map((glass, index) => <RectangleBtn key={index} style={styles.text} searchBy={glass.strGlass} handleClick={() => handleClick("g", glass.strGlass)}/>)}
                        </ScrollView>
                }
            {/* </ScrollView> */}
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 3,
    },
    input: {
        borderWidth: 1,
        width: '100%',
        padding: 5
    },
    view: {
        margin: 5,
        flex: 1
    },
    button: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 3,
    },
    containerBorder: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#C0C0C0',
        margin: 10,
    },
    researchView: {
        marginBottom: 5
    },
});
