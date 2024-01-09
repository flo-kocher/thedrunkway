import React from 'react';
import {StyleSheet, View, ImageBackground, Text, Button, TouchableOpacity, Dimensions} from 'react-native';
import FavoriteState from "./FavoriteState";

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
    }
});

export default function CocktailListItem({navigation, cocktail}) {
    cocktail = cocktail.item;

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
}
