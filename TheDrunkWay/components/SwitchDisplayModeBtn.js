import React from 'react';
import {StyleSheet, View, ImageBackground, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import FavoriteState from "./FavoriteState";
import {MaterialIcons} from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const windowDimensions = Dimensions.get('window');
// const screenDimensions = Dimensions.get('screen');

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

export default function SwitchDisplayModeBtn({updateViewMode, viewMode}) {


    return (
        <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={() => updateViewMode()}>
                {viewMode === 'grid' ?
                    <Ionicons name={'list'} color={'#30343F'} size={30} /> :
                    <Ionicons name={'grid'} color={'#30343F'} size={30} />
                }
            </TouchableOpacity>
        </View>
    );
}
