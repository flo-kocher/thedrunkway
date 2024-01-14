import {
    Text,
    View,
    StyleSheet, 
    ScrollView, 
    ActivityIndicator,
    Dimensions
} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState, useRef } from "react";
import CocktailListItem from "../components/CocktailListItem";
import checkStatus from "../utils/checkStatus";
import RectangleBtn from "../components/RectangleBtn";
import FilterBtn from "../components/FilterBtn";
import { useQuery } from 'react-query';
import { SearchBar } from '@rneui/themed';

const windowDimensions = Dimensions.get('window');

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

    const [textSearch, setTextSearch] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("c");
    const [isLoading, setLoading] = useState(true);
    const [randomCocktails, setRandomCocktails] = useState([]);
    const { GlassIsLoading, data: glasses } = useQuery('glasses', () => getGlasses());
    const { CategoryIsLoading, data: categories } = useQuery('categories', () => getCategories());
    const { IngredientIsLoading, data: ingredients } = useQuery('ingredients', () => getIngredients());
    const { AlcoholicIsLoading, data: alcoholic } = useQuery('alcoholic', () => getAlcoholic());

    const updateTextSearch = (text) => {
        // refGlassScrollView.current.scrollTo({x: 0, y: 0, animated: false});
        setTextSearch(text);
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

    const selectFilter = (filter) => {
        setSelectedFilter(filter);
    }

    useEffect(() => {
        getRandomCocktails(6);
    }, []);

    return (
        <ScrollView style={{flex: 1, marginTop: StatusBar.currentHeight || 0, backgroundColor: '#FAFAFF', width: '100%'}}>
            <Text style={styles.title}>Random cocktail selection</Text>
            {!randomCocktails || isLoading ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.randomCocktails}>
                    {randomCocktails.map((cocktail, index) => <CocktailListItem key={"_" + String(index)} navigation={navigation} cocktail={cocktail} mode={'grid'}/>)}
                </View>
            )}

            <View style={{borderColor: '#30343F', borderWidth: 1, borderRadius: 45, margin: 5, marginVertical: 15}}/>
            <View style={styles.filters}>
                <FilterBtn key={"CategoriesFilter"} searchBy={"Categories"} selected={selectedFilter == "c"} handleClick={() => selectFilter("c")}/>
                <FilterBtn key={"AlcoholicTypesFilter"} searchBy={"Alcoholic types"} selected={selectedFilter == "a"} handleClick={() => selectFilter("a")}/>
                <FilterBtn key={"IngredientsFilter"} searchBy={"Ingredients"} selected={selectedFilter == "i"} handleClick={() => selectFilter("i")}/>
                <FilterBtn key={"GlassesFilter"} searchBy={"Glasses"} selected={selectedFilter == "g"} handleClick={() => selectFilter("g")}/>
            </View>

            <SearchBar
                placeholder="Filter the list here..."
                onChangeText={updateTextSearch}
                value={textSearch}
                inputStyle={styles.searchBarInput}
                inputContainerStyle={styles.searchBarInputContainer}
                containerStyle={styles.searchBarContainer}
                leftIconContainerStyle={styles.searchBarLeftIcon}
                rightIconContainerStyle={styles.searchBarRightIcon}
            />
            {selectedFilter == "a" ? 
            
                !alcoholic || AlcoholicIsLoading ? 
                <ActivityIndicator /> :
                <View style={styles.filterGridScrollView}>
                    {alcoholic.map((alcohol, index) => <RectangleBtn key={index} searchBy={alcohol.strAlcoholic} handleClick={() => handleClick("a", alcohol.strAlcoholic)}/>)}
                </View>
            
            : selectedFilter == "c" ?
            
                !categories || CategoryIsLoading ? 
                <ActivityIndicator /> :
                <View style={styles.filterGridScrollView}>
                    {categories.map((category, index) => <RectangleBtn key={index} searchBy={category.strCategory} handleClick={() => handleClick("c", category.strCategory)}/>)}
                </View>
            
            : selectedFilter == "i" ? 
            
                !ingredients || IngredientIsLoading ? 
                <ActivityIndicator /> :
                textSearch == "" ?
                    <View ref={refIngredientScrollView} style={styles.filterGridScrollView}>
                        {ingredients.map((ingredient, index) => <RectangleBtn key={index} searchBy={ingredient.strIngredient1} handleClick={() => handleClick("i", ingredient.strIngredient1)}/>)}
                    </View>
                    :
                    <View ref={refIngredientScrollView} style={styles.filterGridScrollView}>
                        {ingredients.filter((ingredient) => ingredient.strIngredient1.toLowerCase().includes(textSearch.toLowerCase())).map((ingredient, index) => <RectangleBtn key={index} searchBy={ingredient.strIngredient1} handleClick={() => handleClick("i", ingredient.strIngredient1)}/>)}
                    </View>
            : 
            
                !glasses || GlassIsLoading ? 
                <ActivityIndicator /> :
                textSearch == "" ?
                    <View ref={refGlassScrollView} style={styles.filterGridScrollView}>
                        {glasses.map((glass, index) => <RectangleBtn key={index} searchBy={glass.strGlass} handleClick={() => handleClick("g", glass.strGlass)}/>)}
                    </View>
                    :
                    <View ref={refGlassScrollView} style={styles.filterGridScrollView}>
                        {glasses.filter((glass) => glass.strGlass.toLowerCase().includes(textSearch.toLowerCase())).map((glass, index) => <RectangleBtn key={index} searchBy={glass.strGlass} handleClick={() => handleClick("g", glass.strGlass)}/>)}
                    </View>
            }
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#30343F',
        margin: 5,
    },
    randomCocktails: {
        flexDirection: 'row',
        flexWrap:'wrap',
        // marginBottom: 15,
    },
    filters:{
        flexDirection: 'row',
    },
    filterGridScrollView:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    searchBarInput: {
        backgroundColor: '#FAFAFF',
    },
    searchBarInputContainer:{
        backgroundColor: '#FAFAFF',
        borderColor: '#30343F',
        borderWidth: 2 ,
        borderRadius: 10,
    },
    searchBarContainer:{
        backgroundColor: '#30343F',
        borderWidth: 0,
        borderColor: '#FAFAFF',    
        borderRadius: 12,
        padding: 0,
        paddingBottom:2,
        margin: 5
    },
    searchBarLeftIcon:{
        backgroundColor: '#FAFAFF',
    },
    searchBarRightIcon:{
        backgroundColor: '#FAFAFF',
    },
});
