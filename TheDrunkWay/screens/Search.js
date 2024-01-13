import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Button,
    FlatList, TouchableOpacity
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
        if(searchType == "Name" && value != ""){
            return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + value)
                .then(checkStatus)
                .then(response => response.json())
                .then(data => {
                    data.drinks = updateIsFavoriteValue(data.drinks);
                    return data.drinks;
                })
                .catch(error => {
                    console.log(error.message);
                });
        }
        if(searchType == "Letter" && value != ""){
            return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=' + value)
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
                    placeholder="Tapez ici..."
                    onChangeText={updateCocktailName}
                    value={cocktailName}
                    searchIcon={null}
                />
                <Button title="Recherche" onPress={() => handleClick("Name", cocktailName)}/>
                <Text>Search by letter</Text>
                <ScrollView
                    horizontal={true}>
                    {letters.map((value, index) => <LetterBtn key={index} style={styles.text} letter={value} handleClick={() => handleClick("Letter", value)}/>)}
                </ScrollView>
            </View>
            <View >
                {cocktails != null ?
                    isLoading ? <Text>Chargement...</Text> :
                        viewMode === 'list' ?
                            <FlatList
                                data={cocktails}
                                renderItem={item => <CocktailListItem navigation={navigation} cocktail={item} mode={viewMode}/>}
                                key={'_'}
                                keyExtractor={(item, index) => "_"+String(index)}
                                numColumns={1}
                                style={styles.resultView}
                            />
                            :
                            <FlatList
                                data={cocktails}
                                renderItem={item => <CocktailListItem navigation={navigation} cocktail={item} mode={viewMode}/>}
                                key={'#'}
                                keyExtractor={(item, index) => "#"+String(index)}
                                numColumns={3}
                                style={styles.resultView}
                            />
                            // <ScrollView>
                            //     {cocktails.map((item, index) => <CocktailListItem key={"#"+String(index)} navigation={navigation} cocktail={item} mode={viewMode}/>)}
                            // </ScrollView>
                            // :
                            // <ScrollView>
                            //     {cocktails.map((item, index) => <CocktailListItem key={"#"+String(index)} navigation={navigation} cocktail={item} mode={viewMode}/>)}
                            // </ScrollView>
                    :
                    <Text>Do a research by name or by letter</Text>
                }
            </View>
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
    resultView: {
        // width: '100%',
        // height: "10px"
    }
});
