import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Button, FlatList, Image, TouchableOpacity} from 'react-native';
import { Card, Avatar, IconButton } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from 'react-query';
import Favorites from './screens/Favorites';
import Cocktail from "./screens/Cocktail";
import Search from "./screens/Search";
import {useTranslation} from "react-i18next";
import {languageResources} from "./i18n";
import languagesList from "./services/languagesList.json"
import i18next from "i18next";

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

function Home() {
    return (
        <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0}}>
            {/*<ScrollView style={styles.scrollView}>*/}
            {/*    <Text>Home 1: ScrollView</Text>*/}
            {/*    <Image source={img_example}/>*/}
            {/*    <Image source={img_example}/>*/}
            {/*    <Image source={img_example}/>*/}
            {/*    <Image source={img_example}/>*/}
            {/*</ScrollView>*/}
            <FlatList
                styles={{margin: 5}}
                columnWrapperStyle={styles.row}
                data={[{title: 'Title Text', key: 'item1'},
                    {title: 'Title Text', key: 'item2'},
                    {title: 'Title Text', key: 'item3'},
                    {title: 'Title Text', key: 'item4'},
                    {title: 'Title Text', key: 'item5'}, {title: 'Title Text', key: 'item10'},
                    {title: 'Title Text', key: 'item6'},
                    {title: 'Title Text', key: 'item8'},
                    {title: 'Title Text', key: 'item9'},
                ]}
                numColumns={2}
                renderItem={({item, index, separators}) => (
                    // <Image source={img_example}/>
                    <Card.Title
                        title="Card Title"
                        subtitle="Card Subtitle"
                        left={(props) => <Avatar.Icon {...props} icon="folder" />}
                        right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
                    />
                )}
            />
        </View>
    );
}

function Settings() {
    const changeLng = lng => {
        i18next.changeLanguage(lng);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList data={Object.keys(languageResources)} renderItem={({item}) => (
                <TouchableOpacity
                onPress={() => changeLng(item)}>
                <Text>{languagesList[item].nativeName}</Text>
                </TouchableOpacity>
            )}/>
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
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name={t('home')} component={Home} />
            <Tab.Screen name={t('search')} component={Search} />
            <Tab.Screen name={t('favorites')} component={Favorites} />
            <Tab.Screen name={t('settings')} component={Settings} />
        </Tab.Navigator>
    )
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Root" component={Root} options={{headerShown: false}}/>
                    <Stack.Screen name="Cocktail" component={Cocktail}/>
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        justifyContent: 'space-around'
    },
});
