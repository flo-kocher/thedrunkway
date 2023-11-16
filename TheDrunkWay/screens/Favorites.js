import {
    StyleSheet,
    Text,
    View,
    Button, TextInput, FlatList,
} from "react-native";
import React, {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import FavoritesDisplay from "./FavoritesDisplay";
import {clearStorage, getAllCocktails, getCocktail, storeCocktail} from "../utils/asyncStorageCalls";

const value = {
    name: "Florentin Kocher",
    job: "Software Developer"
};

function SetupFavorites({ navigation }) {
    const [text, onChangeText] = React.useState('');

    return (
        <View style={styles.view}>
            <Text>Utilisation de la librairie 'react-native-async-storage'</Text>
            <View style={styles.view}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
            </View>
            <View style={styles.researchView}>
                <Button title={'store'} onPress={() => storeCocktail(text)}/>
                <Button title={'get'} onPress={() => getCocktail(text)}/>
                <Button title={'remove'} onPress={() => clearStorage()}/>
                <Button title={'get all'} onPress={() => getAllCocktails()}/>
            </View>
        </View>
    );
}

const FavoritesStack = createNativeStackNavigator();

const Search = ({navigation}) => {

    return <>

        <FavoritesStack.Navigator>
            <FavoritesStack.Screen
                name="Setup favorites"
                component={SetupFavorites}
                options={
                    ({navigation}) => ({
                        headerLeft: (() => <Button title="Go to Favorites Display" onPress={() => navigation.navigate('DisplayFavorites')}/>)
                    })
                }
            />
            <FavoritesStack.Screen name="DisplayFavorites" component={FavoritesDisplay} />
        </FavoritesStack.Navigator>
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
