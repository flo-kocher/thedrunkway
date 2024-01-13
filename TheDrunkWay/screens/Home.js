import {
    Text,
    View,
    StyleSheet, FlatList, ScrollView, ActivityIndicator,
} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import CocktailListItem from "../components/CocktailListItem";
import checkStatus from "../utils/checkStatus";
import LetterBtn from "../components/LetterBtn";
import RectangleBtn from "../components/RectangleBtn";
import { useQuery, useQueryClient, useMutation } from 'react-query';

const getRandomCocktails = () => {
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(checkStatus)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            return data.drinks;
        })
        .catch(error => {
            console.log(error.message);
        });
}

const genFullData = async (labels, callback) => {
    let promises = labels.map(async (year) => {
            let result = await getRandomCocktails();
            return result;
        }),
        dataResults = await Promise.all(promises);

    let fullData = {
        labels,
        datasets: [
            {
                label: "25th percentile",
                data: dataResults
            },
        ],
    };

    callback(fullData);
}

const Home = ({navigation}) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const searchByAlcohol = ['Alcoholic', 'Non alcoholic'];
    // équivalent de type de préparation ?
    const searchByCategory = ['Ordinary drink', 'Cocktail'];

    const getRandomCocktails = async (number) => {
        let randomCocktailsList = [];
        try {
            for(let i = 0; i < number; i++) {
                const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
                const json = await response.json();
                randomCocktailsList.push(json.drinks[0])
            }
            setData(randomCocktailsList);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRandomCocktails(6);
    }, []);

    return (
        <View style={{flex: 1, marginTop: StatusBar.currentHeight || 0}}>
            <Text>Random cocktail selection</Text>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    renderItem={item => <CocktailListItem navigation={navigation} cocktail={item} mode={'grid'}/>}
                    key={'_'}
                    keyExtractor={(item, index) => "_" + String(index)}
                    numColumns={3}
                    style={styles.resultView}
                />
            )}

            <Text>Filter by alcohol</Text>
            {/*<FlatList*/}
            {/*    data={searchByAlcohol}*/}
            {/*    renderItem={item => <RectangleBtn style={styles.text} searchBy={item}/>}*/}
            {/*    key={'_'}*/}
            {/*    keyExtractor={(item, index) => "_" + String(index)}*/}
            {/*    numColumns={3}*/}
            {/*    style={styles.resultView}*/}
            {/*/>*/}
            <ScrollView>
                {searchByAlcohol.map((value, index) => <RectangleBtn key={index} style={styles.text} searchBy={value}/>)}
            </ScrollView>

            <Text>Filter by category</Text>
            <ScrollView>
                {searchByCategory.map((value, index) => <RectangleBtn key={index} style={styles.text} searchBy={value}/>)}
            </ScrollView>
        </View>
    );
};

export default Home;

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
