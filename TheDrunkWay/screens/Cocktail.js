import React from "react";
import {StyleSheet, View, Text, FlatList, ImageBackground, ScrollView} from 'react-native';
import CocktailIngredientListItem from "../components/CocktailIngredientListItem";
import {getIngredientList} from "../utils/cocktailGetters";

const Cocktail = ({navigation, route}) => {
    const cocktail = route.params;

    return (
        <ScrollView style={styles.view}>
            <View style={styles.row_1}>
                <ImageBackground source={{uri: cocktail.strDrinkThumb}} style={styles.img}>
                    <Text style={styles.title}>{cocktail.strDrink}</Text>
                </ImageBackground>
            </View>
            <View style={styles.row_2}>
                <View style={styles.subtitle_view}>
                    <Text style={styles.subtitle}>{cocktail.strAlcoholic} {cocktail.strCategory}</Text>
                </View>
                <View style={styles.ingredient_list}>
                    <FlatList
                        data={getIngredientList(cocktail)}
                        renderItem={item => <CocktailIngredientListItem data={item}/>}
                    />
                </View>
            </View>
            <View style={styles.row_3}>
                <Text style={styles.text}>Served in a {cocktail.strGlass}</Text>
                <Text style={styles.text}>{cocktail.strInstructions}</Text>
            </View>
            <View style={styles.row_4}>
                <Text style={styles.text}>Tags: {cocktail.strTags}</Text>
            </View>
        </ScrollView>
    );
}

export default Cocktail;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: "column",
    },
    title: {
        fontSize: 100,
        color: '#ffffff',
        marginStart: 30,
        marginBottom: 30,
    },
    subtitle_view: {
        marginTop: 20,
        marginBottom: 40,
        marginEnd: 30,
    },
    subtitle: {
        fontSize: 50,
    },
    text: {
        fontSize: 30,
    },
    img: {
        flex: 1,
        justifyContent: "flex-end",
    },
    row_1: {
        flex: 2
    },
    row_2: {
        flex: 4,
        alignItems: 'flex-end',
    },
    ingredient_list: {
        // alignItems: 'center',
    },
    row_3: {
        flex: 3,
    },
    row_4: {
        flex: 1,
    }
})
