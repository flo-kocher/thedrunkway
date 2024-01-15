import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import React, {useState, useLayoutEffect} from "react";
import checkStatus from "../utils/checkStatus";
import { useQuery } from 'react-query';
import CocktailListItem from '../components/CocktailListItem';
import { updateIsFavoriteValue } from "../utils/asyncStorageCalls";
import { Ionicons } from "@expo/vector-icons";
import SwitchDisplayModeBtn from "../components/SwitchDisplayModeBtn";

const CategoriesSearchResult = ({navigation, route}) => {

    const [viewMode, setViewMode] = useState("grid");
    const { isLoading, data: cocktails } = useQuery(['cocktailsCategories', {searchtype: route.params.searchType, searchValue: route.params.searchValue}],
                                            () => getCocktails(route.params.searchType, route.params.searchValue));

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
            <SwitchDisplayModeBtn updateViewMode={updateViewMode} viewMode={viewMode}/>
            ),
            headerRightContainerStyle: {marginRight: 10 },
        });
    }, [viewMode]);
                                        
    const updateViewMode = () => {
        if(viewMode === 'grid') {
            setViewMode('list');
        } else {
            setViewMode('grid')
        }
    };

    const getCocktails = (searchType, value) => {
        //searchType = i, a, c or g (i = by ingredients, a = by alcohol categorie, c = by category, g = by glass)
        if(value != ""){
            return fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?' + searchType + '=' + value)
                .then(checkStatus)
                .then(response => response.json())
                .then(data => {
                    data.drinks = updateIsFavoriteValue(data.drinks);
                    return data.drinks;
                })
                .catch(error => {
                    console.log(error.message);
                })
        }
    }

    return <>
        <View style={styles.view}>
            {isLoading ?                 
                <ActivityIndicator /> 
                :
                cocktails == null ?
                    <Text>No results</Text> :
                    <ScrollView contentContainerStyle={viewMode == "grid" ? styles.resultGridScrollView : styles.resultListScrollView}>
                        {cocktails.map((cocktail, index) => <CocktailListItem key={"_" + String(index)} navigation={navigation} cocktail={cocktail} mode={viewMode} previousScreen={"CategoriesSearchResult"}/>)}
                    </ScrollView>

            }
        </View>
    </>;
};
export default CategoriesSearchResult;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: '100%',
    },
    switchButton: {
        alignSelf: 'flex-end',
        margin: 5,
    }, 
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    resultGridScrollView:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    resultListScrollView:{
        flexDirection: 'column',
    }
});
