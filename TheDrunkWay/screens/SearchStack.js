import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cocktail from "./Cocktail";
import Search from "./Search";

const Stack = createNativeStackNavigator();

export default function SearchStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SearchBar" component={Search} options={{headerShown: false}}/>
            <Stack.Screen name="Cocktail" component={Cocktail} />
        </Stack.Navigator>
    );
}
