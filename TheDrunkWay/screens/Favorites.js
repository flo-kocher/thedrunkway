import {
    StyleSheet,
    Text,
    View,
    Button, TextInput, FlatList,
} from "react-native";
import React, {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import FavCocktailItem from "../components/FavCocktailItem"

const value = {
    name: "Florentin Kocher",
    job: "Software Developer"
};

const storeUser = async (idDrinkStr) => {
    let idDrink = Number(idDrinkStr);
    if (isNaN(idDrink) || idDrink === 0) {
        console.log("idDrink is NaN")
        return
    }
    try {
        await AsyncStorage.setItem(idDrink, JSON.stringify(idDrink));
    } catch (error) {
        console.log(error);
    }
};

const getUser = async (idDrink) => {
    try {
        const savedUser = await AsyncStorage.getItem(idDrink);
        const currentUser = JSON.parse(savedUser);
        console.log(currentUser);
    } catch (error) {
        console.log(error);
    }
};

const getAll = async () => {
    try {
        const savedData = await AsyncStorage.getAllKeys();
        console.log(savedData);
    } catch (error) {
        console.log(error);
    }
};

const removeData = async () => {
    try {
        const savedUser = await AsyncStorage.clear();
    } catch (error) {
        console.log(error);
    }
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
                <Button title={'store'} onPress={() => storeUser(text)}/>
                <Button title={'get'} onPress={() => getUser(text)}/>
                <Button title={'remove'} onPress={() => removeData()}/>
                <Button title={'get all'} onPress={() => getAll()}/>
            </View>
        </View>
    );
}

function DisplayFavorites({navigation}) {
    const favCocktails = [
        {
            id: 1,
            name: "Alocol"
        },
        {
            id: 2,
            name: "AZE"
        }
    ]
    console.log(favCocktails)

    return (
        <View style={styles.view}>
            <Text>Favorites display</Text>
            <FlatList data={favCocktails} renderItem={({item}) => <FavCocktailItem data={item}/>}/>
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
            <FavoritesStack.Screen name="DisplayFavorites" component={DisplayFavorites} />
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
