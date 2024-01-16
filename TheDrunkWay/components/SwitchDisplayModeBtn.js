import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

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
