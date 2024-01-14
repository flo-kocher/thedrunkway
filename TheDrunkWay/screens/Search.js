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
import {useTranslation} from "react-i18next";

const Search = ({navigation}) => {
    const {t} = useTranslation();

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
                <Text style={styles.text}>{t('search_cocktail')}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <SearchBar
                        placeholder={t('searchbar_search_cocktail')}
                        onChangeText={updateCocktailName}
                        value={cocktailName}
                        searchIcon={null}
                        inputStyle={styles.searchBarInput}
                        inputContainerStyle={styles.searchBarInputContainer}
                        containerStyle={styles.searchBarContainer}
                        leftIconContainerStyle={styles.searchBarLeftIcon}
                        rightIconContainerStyle={styles.searchBarRightIcon}    
                    />
                    <TouchableOpacity onPress={() => handleClick("s", cocktailName)}>
                        <Ionicons name={'search'} color={'#30343F'} size={35} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.researchView}>
                <Text style={styles.text}>{t('search_letter')}</Text>
                <ScrollView horizontal={true}>
                    {letters.map((value, index) => <LetterBtn key={index} style={styles.text} letter={value} handleClick={() => handleClick("f", value)}/>)}
                </ScrollView>
            </View>

            {isLoading ?                 
                <ActivityIndicator color={'#1985A1'} size={60} style={{marginTop: 50}}/> 
                :
                cocktails == null ?
                    <Text style={{textAlign: 'center'}}>{t('searchbar_search_letter')}</Text> :
                    <>
                        <View style={{alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={() => updateViewMode()}>
                                {viewMode === 'grid' ?
                                    <Ionicons name={'list'} color={'#30343F'} size={30} /> :
                                    <Ionicons name={'grid'} color={'#30343F'} size={30} />
                                }
                            </TouchableOpacity>
                        </View>
                        <ScrollView contentContainerStyle={viewMode == "grid" ? styles.resultGridScrollView : styles.resultListScrollView}>
                            {cocktails.map((cocktail, index) => <CocktailListItem key={"_" + String(index)} navigation={navigation} cocktail={cocktail} mode={viewMode} previousScreen={"Search"}/>)}
                        </ScrollView>
                    </>
            }
        </View>
    </>;
};
export default Search;

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: '500',
    },
    view: {
        flex: 1
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
        margin: 5,
        width: '85%'
    },
    searchBarLeftIcon:{
        backgroundColor: '#FAFAFF',
    },
    searchBarRightIcon:{
        backgroundColor: '#FAFAFF',
    },
});
