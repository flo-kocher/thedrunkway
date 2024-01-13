import {Alert, Share} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import React from "react";

const ShareLink = ({idDrink}) => {
    // console.log(idDrink);

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Viens télécharge notre application ! TheDrunkWay sur le PlayStore ;). \n' +
                    'https://www.thecocktaildb.com/drink/'+idDrink,
                // je crois pas utile le 'title', supposer être pour Android mais je le vois affiché nul part
                title:
                    'TheDrunkWay staff vous incite à ne pas consommer',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            }
            // for iOS users
            else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <MaterialIcons name={'share'}
                       size={30}
                       onPress={onShare}
        />
    );
};

export default ShareLink;
