import React from 'react';
import {StyleSheet, View, ImageBackground, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import FavoriteState from "./FavoriteState";
import {MaterialIcons} from "@expo/vector-icons";

const windowDimensions = Dimensions.get('window');
// const screenDimensions = Dimensions.get('screen');

const styles = StyleSheet.create({
    photo: {
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#C0C0C0',
        margin: 10,
        width: windowDimensions.width*30/100,
        height: windowDimensions.width*30/100,
    },
    cocktail_icon: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cocktail_name: {
        alignItems: 'center'
    },
    list_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default function CocktailListItem({navigation, cocktail, mode}) {
    cocktail = cocktail.item;

    if (mode === 'grid')
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Cocktail', cocktail)}>
                <View style={styles.container}>
                    <ImageBackground source={{uri: cocktail.strDrinkThumb}} style={{flex: 1}}>
                        <View style={styles.cocktail_icon}>
                            <FavoriteState data={cocktail}/>
                            <View style={styles.cocktail_name}>
                                <Text style={{color: '#fff', textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>{cocktail.strDrink}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        );
    else
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Cocktail', cocktail)}>
                <View style={styles.list_view}>
                    <Image style={{width: 60, height: 60}} source={{uri: cocktail.strDrinkThumb}}/>
                    <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>{cocktail.strDrink}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FavoriteState data={cocktail}/>
                        <MaterialIcons name={'more-vert'}
                                       size={30}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
}
