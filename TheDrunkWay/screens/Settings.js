import {
    Text,
    View,
    StyleSheet,
    FlatList
} from "react-native";
import React from "react";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {languageResources} from "../i18n";
import languagesList from "../services/languagesList.json";
import LanguageBtn from "../components/LanguageBtn";

function Settings() {
    const {t} = useTranslation();

    const changeLng = lng => {
        i18next.changeLanguage(lng);
    }

    return (
        <View style={styles.view}>
            <Text style={styles.title}>{t('change_language')}</Text>
            <View style={styles.languageList}>
                <FlatList data={Object.keys(languageResources)} renderItem={({item}) => (
                    <View>
                        <LanguageBtn lgName={languagesList[item].nativeName} isoCode={item} handleClick={() => changeLng(item)}/>
                    </View>
                )}/>
            </View>
        </View>
    );
}

export default Settings;

const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        margin: 5,
        paddingBottom: 20
    },
    languageList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    languageName: {
        padding: 5,
        fontSize: 17
    }
});
