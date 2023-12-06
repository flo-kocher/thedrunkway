import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import { Card, Avatar, IconButton } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from 'react-query';
import SearchScreen from './screens/Search';
import FavoritesScreen from './screens/Favorites';

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

function HomeScreen() {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
      </View>
  );
}

function Home1Screen({ navigation }) {
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

function Home2Screen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home 2</Text>
            <Button
                title="Go to Home 1"
                onPress={() => navigation.navigate('Home 2')}
            />
        </View>
    );
}

function HomeScreenStacked() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home 1"
                component={Home1Screen}
                options={
                    ({navigation}) => ({
                        headerLeft: (() => <Button title="ButtonSettings" onPress={() => navigation.navigate('Settings')}/>)
                    })
                }
            />
            <HomeStack.Screen name="Home 2" component={Home2Screen} />
        </HomeStack.Navigator>
    )
    // <NavigationContainer>
    //     <Tab.Navigator screenOptions={{ headerShown: false }}>
    //         <Tab.Screen name="First">
    //             {() => (
    //                 <SettingsStack.Navigator>
    //                     <SettingsStack.Screen
    //                         name="Settings"
    //                         component={SettingsScreen}
    //                     />
    //                     <SettingsStack.Screen name="Profile" component={ProfileScreen} />
    //                 </SettingsStack.Navigator>
    //             )}
    //         </Tab.Screen>
    //         <Tab.Screen name="Second">
    //             {() => (
    //                 <HomeStack.Navigator>
    //                     <HomeStack.Screen name="Home" component={HomeScreen} />
    //                     <HomeStack.Screen name="Details" component={DetailsScreen} />
    //                 </HomeStack.Navigator>
    //             )}
    //         </Tab.Screen>
    //     </Tab.Navigator>
    // </NavigationContainer>
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName, ionicons = true;

                            if (route.name === 'Home') {
                                iconName = focused
                                    ? 'ios-information-circle'
                                    : 'ios-information-circle-outline';
                            } else if (route.name === 'Search') {
                                iconName = focused
                                    ? 'search-circle'
                                    : 'search-circle-outline';
                            } else if (route.name === 'Favorites') {
                                ionicons = false;
                                iconName = focused
                                    ? 'favorite'
                                    : 'favorite-outline';
                            } else if (route.name === 'Settings') {
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
                    <Tab.Screen name="Home" component={HomeScreenStacked} />
                    <Tab.Screen name="Search" component={SearchScreen} />
                    <Tab.Screen name="Favorites" component={FavoritesScreen} />
                    <Tab.Screen name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
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
