import React from "react";
import {StyleSheet, View, Text, FlatList, ImageBackground, ScrollView, SectionList} from 'react-native';
import CocktailIngredientListItem from "../components/CocktailIngredientListItem";
import {getIngredientList} from "../utils/cocktailGetters";
import CocktailTag from "../components/CocktailTag";

const Cocktail = ({navigation, route}) => {
    const cocktail = route.params;

    let tags = [];
    if (cocktail.strTags) {
        tags = cocktail.strTags.split(',');
    }

    let ingredientList = getIngredientList(cocktail);

    return (
        <ScrollView>
        <View style={styles.view}>
            <View style={styles.row_1}>
                <ImageBackground source={{uri: cocktail.strDrinkThumb}} style={styles.img}>
                    <Text style={styles.title}>{cocktail.strDrink}</Text>
                </ImageBackground>
            </View>
            <View style={styles.row_2}>
                <View style={styles.subtitle_view}>
                    <Text style={styles.subtitle1}>{cocktail.strAlcoholic} {cocktail.strCategory}</Text>
                </View>
                <Text style={styles.subtitle2}>Ingredients</Text>
                <View style={styles.ingredient_list}>
                    <ScrollView>
                        {ingredientList.map((value, index) => <CocktailIngredientListItem key={index} data={value}/>)}
                    </ScrollView>
                </View>
            </View>
            <View style={styles.row_3}>
                <Text style={styles.subtitle2}>Instructions</Text>
                <Text style={styles.text}>Served in a {cocktail.strGlass}</Text>
                <Text style={styles.text}>{cocktail.strInstructions}</Text>
            </View>
            <View style={styles.row_4}>
                <ScrollView
                    horizontal={true}>
                    {tags.map((value, index) => <CocktailTag key={index} style={styles.text} data={value}/>)}
                </ScrollView>
            </View>
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
        fontSize: 80,
        color: '#ffffff',
        marginStart: 30,
        marginBottom: 30,
    },
    subtitle_view: {
        marginTop: 20,
        marginBottom: 20,
        marginEnd: 30,
    },
    subtitle1: {
        fontSize: 40,
    },
    subtitle2: {
        fontSize: 30,
    },
    text: {
        fontSize: 15,
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
        // alignItems: 'flex-end',
    },
    ingredient_list: {
        marginStart: 20,
    },
    row_3: {
        flex: 3,
    },
    row_4: {
        flex: 1,
    }
})
