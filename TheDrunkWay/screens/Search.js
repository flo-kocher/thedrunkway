import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Button,
    TouchableOpacity, 
    ActivityIndicator
} from "react-native";
import React, {useState} from "react";
import checkStatus from "../utils/checkStatus";
import { useQuery, useQueryClient } from 'react-query';
import { SearchBar } from '@rneui/themed';
import CocktailListItem from '../components/CocktailListItem';
import { updateIsFavoriteValue } from "../utils/asyncStorageCalls";
import { Ionicons } from "@expo/vector-icons";
import LetterBtn from "../components/LetterBtn";

const Search = ({navigation}) => {
    // console.log(navigation, 'search')
    const queryClient = useQueryClient();
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const [cocktailName, setCocktailName] = useState("");
    const [viewMode, setViewMode] = useState("grid");
    const [searchType, setSearchType] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const { isLoading, data: cocktails } = useQuery(['cocktails', {searchType, searchValue}], () => getCocktails(searchType, searchValue));

    const updateCocktailName = (name) => {
        setCocktailName(name);
    };

    const updateViewMode = () => {
        if(viewMode === 'grid') {
            setViewMode('list');
        } else {
            setViewMode('grid')
        }
    };

    const handleClick = (searchType, searchValue) => {
        setSearchType(searchType);
        setSearchValue(searchValue);
    };

    const getCocktails = (searchType, value) => {
        //searchType = s or f (s = by name, f = by letter)
        if(value != ""){
            return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?' + searchType + '=' + value)
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
            <View style={styles.researchView}>
                <View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity onPress={() => updateViewMode()}>
                        {viewMode === 'grid' ?
                            <Ionicons name={'list'}
                                      size={30}
                            /> :
                            <Ionicons name={'grid'}
                                      size={30}
                            />
                        }
                    </TouchableOpacity>
                </View>
                <Text>Search by name</Text>
                <SearchBar
                    placeholder="Enter a cocktail name..."
                    onChangeText={updateCocktailName}
                    value={cocktailName}
                    searchIcon={null}
                />
                <Button title="Search" onPress={() => handleClick("s", cocktailName)}/>
                <Text>Search by letter</Text>
                <ScrollView horizontal={true}>
                    {letters.map((value, index) => <LetterBtn key={index} style={styles.text} letter={value} handleClick={() => handleClick("f", value)}/>)}
                </ScrollView>
            </View>
            {isLoading ?                 
                <ActivityIndicator /> 
                :
                cocktails == null ?
                    <Text>Do a research by name or by letter</Text> :
                    <ScrollView contentContainerStyle={viewMode == "grid" ? styles.resultGridScrollView : styles.resultListScrollView}>
                        {cocktails.map((cocktail, index) => <CocktailListItem key={"_" + String(index)} navigation={navigation} cocktail={cocktail} mode={viewMode} previousScreen={"Search"}/>)}
                    </ScrollView>
            }
        </View>
    </>;
};
export default Search;

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
        margin: 5,
        marginBottom: 10
    },
    resultGridScrollView:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    resultListScrollView:{
        flexDirection: 'column',
    }
});
