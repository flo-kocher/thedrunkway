import {Alert, Share, StyleSheet} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import React from "react";

const ShareLink = ({idDrink}) => {
    // console.log(idDrink);

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Viens télécharger l\'application TheDrunkWay sur le PlayStore ! \n' +
                    'https://www.thecocktaildb.com/drink/'+idDrink,
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
                       color={'white'}
                       style={styles.shareIcon}
        />
    );
};

export default ShareLink;

const styles = StyleSheet.create({
    shareIcon: {
        marginEnd: 10,
        marginTop: 10
    }
});
