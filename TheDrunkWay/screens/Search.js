import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    Button,
    FlatList
} from "react-native";
import React, {useState} from "react";
import checkStatus from "../utils/checkStatus";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { SearchBar } from '@rneui/themed';
import CocktailListItem from '../components/CocktailListItem';
import {getCocktail, updateIsFavoriteValue} from "../utils/asyncStorageCalls";

const Search = ({navigation}) => {
    console.log(navigation, 'search')
    const queryClient = useQueryClient();
    const [cocktailName, setCocktailName] = useState("");
    const numColumns = 2;
    const { isLoading, isError, error, data: cocktailsByName, refetch } = useQuery('cocktailsName', () => getCocktails(cocktailName), {
        refetchOnWindowFocus: false,
        enabled: false // disable this query from automatically running
    });

    // const handleClick = () => {
    //     // manually refetch
    //     refetch();
    // };

    const updateCocktailName = (name) => {
        setCocktailName(name);
    };

    const getCocktails = (name) => {
        if(name != ""){
            return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name)
                .then(checkStatus)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    data.drinks = updateIsFavoriteValue(data.drinks);
                    return data.drinks;
                })
                .catch(error => {
                    console.log(error.message);
                });
        }
    }

    return <>
        <View style={styles.view}>
            {/* drinkId 11000 = mojito */}
            <Button title="Test cocktail page" onPress={async () => navigation.navigate('Cocktail', await getCocktail(11000))}/>
            <View style={styles.researchView}>
                <SearchBar
                    placeholder="Tapez ici..."
                    onChangeText={updateCocktailName}
                    value={cocktailName}
                    searchIcon={null}
                />
                <Button title="Recherche" onPress={refetch}/>
            </View>
            <View >
                {cocktailsByName != null ?
                    isLoading ? <Text>Chargement...</Text> :
                    <View>
                        <FlatList
                            data={cocktailsByName}
                            renderItem={item => <CocktailListItem navigation={navigation} cocktail={item}/>}
                            keyExtractor={(item, index) => String(index)}
                            numColumns={numColumns}
                            style={styles.resultView}
                        />
                    </View>
                    :
                    <Text>Faites une recherche par nom</Text>
                }
            </View>
        </View>
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
