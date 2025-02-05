import React from 'react';
import {StyleSheet, View, ImageBackground, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import FavoriteState from "./FavoriteState";

const windowDimensions = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        margin: windowDimensions.width*1.5/100,
        width: windowDimensions.width*30/100,
        height: windowDimensions.width*30/100,
    },
    cocktail_icon: {
        flex: 1,
        justifyContent: 'space-between',        
    },
    cocktail_name: {
        alignItems: 'center',
    },
    list_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default function CocktailListItem({navigation, cocktail, mode, previousScreen}) {

    if (mode === 'grid')
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Cocktail', {cocktail, previousScreen})}>
                <View style={styles.container}>
                    <ImageBackground source={{uri: cocktail.strDrinkThumb}} style={{flex: 1}}>
                        <View style={styles.cocktail_icon}>
                            <FavoriteState data={cocktail}/>
                            <View style={styles.cocktail_name}>
                                <Text style={{color: '#fff', textAlign: 'center', fontSize: 14, fontWeight: 'bold'}}>{cocktail.strDrink}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        );
    else
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Cocktail', {cocktail, previousScreen})}>
                <View style={styles.list_view}>
                    <Image style={{width: 60, height: 60}} source={{uri: cocktail.strDrinkThumb}}/>
                    <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>{cocktail.strDrink}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FavoriteState data={cocktail}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
}
