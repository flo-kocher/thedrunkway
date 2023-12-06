import React from "react";
import {StyleSheet, View, Text, FlatList} from 'react-native';
import FavCocktailItem from "../components/FavCocktailItem"

const FavoritesDisplay = ({cocktailsData}) => {

    return (
        <View style={{ margin: 40 }}>
            <Text>Favorites display</Text>
            <FlatList data={cocktailsData} renderItem={({item}) => <FavCocktailItem data={item}/>}/>

        </View>
    );
}

export default FavoritesDisplay;

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
