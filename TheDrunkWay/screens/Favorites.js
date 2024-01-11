import {
    StyleSheet,
    View,
    Button,
    PermissionsAndroid
} from "react-native";
import React, {useState} from "react";
import { useFocusEffect } from '@react-navigation/native';
import FavoritesDisplay from "./FavoritesDisplay";
import {clearStorage, getAllCocktails} from "../utils/asyncStorageCalls";

const value = {
    name: "Florentin Kocher",
    job: "Software Developer"
};

const requestCameraPermission = async () => {
    try {
        // console.log(PermissionsAndroid.PERMISSIONS)
        const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (hasPermission) {
            console.log('true');
        } else {
            console.log('false')
        }

        const granted = await PermissionsAndroid.request(
            // pour par exemple : PermissionsAndroid.PERMISSIONS.SEND_SMS, pour certaines versions de Android,
            // il ne reconnaît pas les permissions donc il return 'never_ask_again'
            // donc il faut https://stackoverflow.com/questions/76311685/permissionandroid-request-always-returns-never-ask-again-without-any-prompt-r
            // demander la version d'android avant

            // pour Android 13 pas de permission nécessaire pour WRITE_EXTERNAL_STORAGE
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Cool Photo App Camera Permission',
                message:
                    'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        // il va pas là quand je demande la permission d'un WRITE EXTERNAL STORAGE
        console.log(granted)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
        } else {
            console.log('Camera permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};

function SetupFavorites({ navigation }) {

    const [cocktailsData, setCocktailsData] = useState([]);

    const readItemsFromStorage = async () => {
        const items = await getAllCocktails();
        setCocktailsData(items);
    };

    useFocusEffect(
        React.useCallback(() => {
            console.log('useFocusEffect')
            readItemsFromStorage();

            return () => {
            };
        }, [])
    )

    return (
        <View style={styles.view}>
            <Button title="request permissions" onPress={requestCameraPermission} />
            <View style={styles.researchView}>
                <Button title={'Clear storage'} onPress={() => clearStorage()}/>
                <Button title={'Print all cocktails'} onPress={() => getAllCocktails()}/>
            </View>
            <FavoritesDisplay cocktailsData={cocktailsData}/>
        </View>
    );
}

const Search = ({navigation}) => {

    return <>
        <SetupFavorites/>
    </>;
};

export default Search;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 3,
    },
    input: {
        borderWidth: 1,
        width: '100%',
        padding: 5
    },
    view: {
        margin: 5,
        flex: 1
    },
    button: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 3,
    },
    containerBorder: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#C0C0C0',
        margin: 10,
    },
    researchView: {
        marginBottom: 5
    },
    resultView: {
        // width: '100%',
        // height: "10px"
    }
});
