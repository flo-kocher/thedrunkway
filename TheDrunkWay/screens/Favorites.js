import {
    StyleSheet,
    View,
    Text, ActivityIndicator, ScrollView, TouchableOpacity,
} from "react-native";
import React, {useState} from "react";
import { useFocusEffect } from '@react-navigation/native';
import {getAllCocktails} from "../utils/asyncStorageCalls";
import CocktailListItem from "../components/CocktailListItem";
import {Ionicons} from "@expo/vector-icons";

const value = {
    name: "Florentin Kocher",
    job: "Software Developer"
};

function SetupFavorites({ navigation }) {

    const [cocktailsData, setCocktailsData] = useState([]);
    const [viewMode, setViewMode] = useState("grid");

    const updateViewMode = () => {
        if(viewMode === 'grid') {
            setViewMode('list');
        } else {
            setViewMode('grid')
        }
    };

    const readItemsFromStorage = async () => {
        const items = await getAllCocktails();
        // A l'affichage des favoris, on met les valuers isFavorite à true, parce que en
        // storage, elles sont stockées à false
        items.forEach((item) =>
            item.isFavorite = true
        )
        setCocktailsData(items);
    };

    useFocusEffect(
        React.useCallback(() => {
            readItemsFromStorage();

            return () => {
            };
        }, [])
    )

    return (
        <View style={styles.view}>
            <View style={{alignItems: 'flex-end', margin: 5, marginBottom: 10}}>
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
            <ScrollView>
                {/* Utiliser ces boutons pour clear/print les cocktails en favoris */}
                {/*<View style={styles.researchView}>*/}
                {/*    <Button title={'Clear storage'} onPress={() => clearStorage()}/>*/}
                {/*    <Button title={'Print all cocktails'} onPress={() => getAllCocktails()}/>*/}
                {/*</View>*/}
                <Text>My favorite cocktails</Text>
                {!cocktailsData ? (
                    <ActivityIndicator />
                ) : (
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'}}
                    >
                        <ScrollView contentContainerStyle={viewMode == "grid" ? styles.resultGridScrollView : styles.resultListScrollView}>
                            {cocktailsData.map((cocktail, index) => <CocktailListItem key={"_" + String(index)} navigation={navigation} cocktail={cocktail} mode={viewMode}/>)}
                        </ScrollView>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const Favorites = ({navigation}) => {

    return <>
        <SetupFavorites navigation={navigation}/>
    </>;
};

export default Favorites;

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
        marginBottom: 5
    },
    resultGridScrollView:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    resultListScrollView:{
        flexDirection: 'column',
    },
    resultView: {
        // width: '100%',
        // height: "10px"
    }
});
