import React, {useState} from "react";
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    ScrollView,
    ActivityIndicator, FlatList
} from 'react-native';
import CocktailIngredientListItem from "../components/CocktailIngredientListItem";
import CocktailInstructionItem from "../components/CocktailInstructionItem";
import {getIngredientList} from "../utils/cocktailGetters";
import CocktailTag from "../components/CocktailTag";
import {FontAwesome} from "@expo/vector-icons";
import ShareLink from "../components/ShareLink";
import { useQuery } from 'react-query';
import checkStatus from "../utils/checkStatus";
import {useTranslation} from "react-i18next";

const Cocktail = ({navigation, route}) => {
    const {t} = useTranslation();

    const cocktailInfo = route.params.cocktail;
    const { isLoading, data: cocktail } = useQuery(['cocktail', {cocktailID : cocktailInfo.idDrink}], () => getCocktail(cocktailInfo.idDrink));
    const [ingredientList, setIngredientsList] = useState([]);
    const [tags, setTags] = useState([]);

    const getCocktail = (cocktailID) => {
        if(route.params.previousScreen == "CategoriesSearchResult"){
            return fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + cocktailID)
                .then(checkStatus)
                .then(response => response.json())
                .then(data => {
                    setIngredientsList(getIngredientList(data.drinks[0]));
                    if (data.drinks[0].strTags) {
                        setTags(data.drinks[0].strTags.split(','));
                    }
                    return data.drinks[0];
                })
                .catch(error => {
                    console.log(error.message);
                })
        }
        else{
            setIngredientsList(getIngredientList(cocktailInfo));
            if (cocktailInfo.strTags) {
                setTags(cocktailInfo.strTags.split(','));
            }
            return cocktailInfo;
        }
    }

    return (<View>
        {
            !cocktail || isLoading ?
            <ActivityIndicator/> :
            <ScrollView>
                <View style={styles.view}>
                    <View style={styles.row_1}>
                        <ImageBackground source={{uri: cocktail.strDrinkThumb}} style={styles.img}>
                            <View style={styles.more}>
                                <ShareLink idDrink={cocktail.idDrink}/>
                            </View>
                            <Text style={styles.title}>{cocktail.strDrink}</Text>
                        </ImageBackground>
                    </View>
                    <View style={styles.row_2}>
                        <View style={styles.subtitle_view1}>
                            <View style={styles.subtitle_view_item}>
                                <Text style={styles.subtitle1}>{t('alcoholic_type')}</Text>
                                <Text>{cocktail.strAlcoholic}</Text>
                            </View>
                            <View style={styles.subtitle_view_item}>
                                <Text style={styles.subtitle1}>{t('category')}</Text>
                                <Text>{cocktail.strCategory}</Text>
                            </View>
                        </View>
                        <View style={styles.subtitle_view2}>
                            <View style={styles.subtitle_view_item}>
                                <View style={styles.subtitle_view_glass}>
                                    <Text style={styles.subtitle1}>{t('glass')}</Text><FontAwesome style={styles.glass} name={'glass'}/>
                                </View>
                                <Text>{cocktail.strGlass}</Text>
                            </View>
                        </View>
                        <Text style={styles.subtitle2}>{t('ingredients')}</Text>
                        <View style={styles.ingredient_list}>
                            <ScrollView>
                                {ingredientList.map((value, index) => <CocktailIngredientListItem key={index} data={value}/>)}
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.row_3}>
                        <Text style={styles.subtitle2}>{t('instructions')}</Text>
                        <View style={styles.instructions}>
                            <ScrollView>
                                {
                                    cocktail[t('strInstructions')] !== null ?
                                        cocktail[t('strInstructions')].split('.').map((value, index) => <CocktailInstructionItem key={index} index={index} data={value}/>) :
                                        cocktail.strInstructions.split('.').map((value, index) => <CocktailInstructionItem key={index} index={index} data={value}/>)
                                }
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.row_4}>
                        <ScrollView horizontal={true}>
                            {tags.map((value, index) => <CocktailTag key={index} style={styles.text} data={value}/>)}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        }
        </View>
    );
}

export default Cocktail;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: "column",
    },
    more: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#ffffff',
        marginStart: 20,
        marginTop: 60,
        marginBottom: 5,
    },
    subtitle_view1: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    subtitle_view2: {
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    subtitle_view_item: {
        alignItems: 'center',
    },
    subtitle_view_glass: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    subtitle1: {
        fontWeight: 'bold',
        fontSize: 17,
    },
    subtitle2: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 5,
        marginStart: 10,
    },
    text: {
        fontSize: 17,
    },
    glass: {
        marginStart: 3,
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
        marginTop: 10,
        marginBottom: 15,
        marginStart: 30,
    },
    row_3: {
        flex: 3,
        marginStart: 5,
    },
    instructions: {
        marginStart: 15,
        marginEnd: 15,
        marginTop: 10,
        marginBottom: 5,
    },
    row_4: {
        flex: 1,
    }
})
