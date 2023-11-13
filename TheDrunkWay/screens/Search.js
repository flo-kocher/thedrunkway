import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Button,
    FlatList
} from "react-native";
import React, {useState} from "react";
import checkStatus from "../utils/checkStatus";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { SearchBar } from '@rneui/themed';

const Search = ({navigation}) => {
    const queryClient = useQueryClient();
    const [cocktailName, setCocktailName] = useState("");

    const { isLoading, isError, error, data: cocktailsByName } = useQuery(['cocktailsName', cocktailName], () => getCocktails(cocktailName), {
        refetchOnWindowFocus: false,
        enabled: false // disable this query from automatically running
    });

    const handleClick = () => {
        // manually refetch
        refetch();
    };

    const updateCocktailName = (name) => {
        setCocktailName(name);
    };

    const getCocktails = (name) => {
        if(name != ""){
            return fetch('www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name)
            .then(checkStatus)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return data;
            })  
            .catch(error => {
                console.log(error.message);
            });
        }
    }
    
    const ListeCocktails = ({item : cocktail}) => {   
        return <>
            <View style={styles.containerBorder}>
                <View style={styles.cocktail}>
                    <Text style={{color: '#fefefe'}}>{cocktail.strDrink}</Text>
                </View>
            </View>
        </>
    }

    return <>
        <View style={styles.view}>
            <View >
                <SearchBar
                    placeholder="Tapez ici..."
                    onChangeText={updateCocktailName}
                    value={cocktailName}
                    searchIcon={null}
                />
                <Button title="Recherche" onPress={handleClick}/>
            </View>
            <View style={styles.containerBorder}>
                {cocktailsByName != null ? 
                    <View>
                        {isLoading ? <Text>Loading...</Text> : 
                            <FlatList
                                data={cocktailsByName}
                                renderItem={ListeCocktails}
                                keyExtractor={item => item.id}
                            />
                            // <Text>Faites une recherche par nom</Text>
                        }
                    </View> : 
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
    cocktail: {
        borderRadius: 1,
        backgroundColor: "#2c75ff",
        padding: 10,
    }
});