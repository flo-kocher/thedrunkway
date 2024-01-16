import {
    StyleSheet,
    View,
    ActivityIndicator, 
    ScrollView, 
} from "react-native";
import React, {useState, useLayoutEffect} from "react";
import { useFocusEffect } from '@react-navigation/native';
import {getAllCocktails} from "../utils/asyncStorageCalls";
import CocktailListItem from "../components/CocktailListItem";
import SwitchDisplayModeBtn from "../components/SwitchDisplayModeBtn";

function SetupFavorites({ navigation }) {
    const [cocktailsData, setCocktailsData] = useState([]);
    const [viewMode, setViewMode] = useState("grid");

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
            <ScrollView>
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
    view: {
        flex: 1
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
});
