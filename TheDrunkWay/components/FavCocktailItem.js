import { View, Text } from 'react-native';

export default function FavCocktailItem(props) {
    const item = props.data;

    return (
        <View>
            <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>{item.strDrink}</Text>
        </View>
    );
}
