import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from 'react-query';
import Favorites from './screens/Favorites';
import Cocktail from "./screens/Cocktail";
import Search from "./screens/Search";
import CategoriesSearchResult from "./screens/CategoriesSearchResult";
import {useTranslation} from "react-i18next";
import {languageResources} from "./i18n";
import languagesList from "./services/languagesList.json"
import i18next from "i18next";
import Home from "./screens/Home";
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0 // 5000
        }
    }
});

const img_example = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width: 64,
    height: 64,
};

function Settings() {
    const {t} = useTranslation();

    const changeLng = lng => {
        i18next.changeLanguage(lng);
    }

    return (
        <View style={{flex: 1}}>
            <Text style={{paddingBottom: 10}}>{t('change_language')}</Text>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList data={Object.keys(languageResources)} renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => changeLng(item)}>
                        <Text>{languagesList[item].nativeName}</Text>
                    </TouchableOpacity>
                )}/>
            </View>
        </View>
    );
}

function Root() {
    const {t} = useTranslation();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName, ionicons = true;

                    if (route.name === t('home')) {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === t('search')) {
                        iconName = focused
                            ? 'search-circle'
                            : 'search-circle-outline';
                    } else if (route.name === t('favorites')) {
                        ionicons = false;
                        iconName = focused
                            ? 'favorite'
                            : 'favorite-outline';
                    } else if (route.name === t('settings')) {
                        iconName = focused
                            ? 'settings'
                            : 'settings-outline';
                    }

                    // You can return any component that you like here!
                    if (ionicons) {
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else {
                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    }
                },
                tabBarActiveTintColor: '#C1666B',
                tabBarInactiveTintColor: '#30343F',
            })}
        >
            <Tab.Screen name={t('home')} component={Home} />
            <Tab.Screen name={t('search')} component={Search} />
            <Tab.Screen name={t('favorites')} component={Favorites} options={{headerTitle: t('favorite_cocktails')}}/>
            <Tab.Screen name={t('settings')} component={Settings} />
        </Tab.Navigator>
    )
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaView style={{flex: 1}}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Root" component={Root} options={{headerShown: false}}/>
                        <Stack.Screen name="CategoriesSearchResult" component={CategoriesSearchResult} options={({ route }) => ({ title: route.params.name })}/>
                        <Stack.Screen name="Cocktail" component={Cocktail} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        justifyContent: 'space-around'
    },
});
