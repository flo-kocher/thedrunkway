import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import { UserProvider } from "./context/userContext";
import { ColocProvider } from "./context/colocContext";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Inscription from './screens/Inscription';
import Connexion from './screens/Connexion';
import Profil from './screens/Profil';
import Colocations from './screens/Colocations';
import NewColocation from './screens/NewColocation';
import ServicesColoc from './screens/ServicesColoc';
import Vote from './screens/Vote';
import ServiceToVote from './screens/ServiceToVote';
import ValidationService from './screens/ValidationService';
import AdminColoc from './screens/AdminColoc';
import NewService from './screens/NewService';
import Messagerie from './screens/Messagerie';
import DescriptionService from './screens/DescriptionService';
import ColocMembres from './screens/ColocMembres';
import UpdateProfil from './screens/UpdateProfil';
import { useColoc } from "./context/colocContext";
import { useUser } from "./context/userContext";
import { useQuery } from 'react-query';
import checkStatus from "./utils/checkStatus";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  unmountOnBlur: true,
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0 // 5000
		}
	}
});

const ConnexionStackNavigator = () => {
  return (
    <UserProvider> 
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Connexion" component={Connexion}/>
        <Stack.Screen name="Inscription" component={Inscription}/>
        <Stack.Screen options={{ headerShown: false }} name="Connecté" component={ConnectedDrawerNavigator}/>
      </Stack.Navigator>
    </UserProvider>
  );
}

const ConnectedDrawerNavigator = () => {
  return (
      <ColocProvider>
        <Tab.Navigator initialRouteName="Mes colocations" screenOptions={{
          headerStyle: {
            backgroundColor: "#9AC4F8",
          },
          headerTintColor: "white",
          headerBackTitle: "Back",
          unmountOnBlur: true,
          tabBarItemStyle: {
            borderRightWidth: 0.5,
            borderLeftWidth: 0.5,
            borderTopWidth: 1,
            borderBottomWidth: 0.5,
          },
          tabBarIconStyle: { 
            display: "none",
          },
          tabBarLabelStyle: {
            fontSize: 15,
            top: -14
          }}}>
          <Tab.Screen options={{ title: 'Colocations' }} name="Mes colocations" component={ColocationStackNavigator}/>
          <Tab.Screen  options={{ title: 'Profil' }} name="ProfilStack" component={ProfilStackNavigator}/>
          {/* <Drawer.Screen name="Déconnexion" component={Connexion}/> */}
        </Tab.Navigator>
      </ColocProvider>
  );
}

const ColocationStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Colocations" screenOptions={screenOptionStyle}>
      <Stack.Screen options={{ headerShown: false }} name="Colocations" component={Colocations}/>
      <Stack.Screen name="Ajout d'une colocation" component={NewColocation}/>
      <Stack.Screen options={{ headerShown: false }} name="Colocation" component={ColocationTabNavigator}/>
    </Stack.Navigator>
  );
}

const ProfilStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Profil" screenOptions={screenOptionStyle}>
      <Stack.Screen options={{ headerShown: false }} name="Profil" component={Profil}/>
      <Stack.Screen name="Mise à jour du profil" component={UpdateProfil}/>
    </Stack.Navigator>
  );
}

const ColocationTabNavigator = () => {
  const currentColoc = useColoc();
  const [user] = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  const { isLoading, isError, error, data: listeColocAsAdmin } = useQuery(['listeColocAsAdmin', user.id], () => getUserColocsAsAdmin(user.id));

  const getUserColocsAsAdmin = userId => {
    return fetch('http://sterne.iutrs.unistra.fr:8080/api/users/' + userId +'/coloc/admin')
      .then(checkStatus)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          setIsAdmin(data.filter(coloc => coloc.id === currentColoc.id).length > 0 ? true : false);
          return data;
      })  
      .catch(error => {
          console.log(error.message);
      });
  }

  return (
    <Drawer.Navigator initialRouteName="Services" screenOptions={screenOptionStyle}>
        <Drawer.Screen name="Services" component={ServicesStackNavigator}/>
        <Drawer.Screen name="Services en attente" component={ServiceToVoteStackNavigator}/>
        <Drawer.Screen name="Messagerie" component={Messagerie}/>
        <Drawer.Screen name="Membres" component={ColocMembres}/>
        {isAdmin ? <Drawer.Screen name="Administration" component={AdminColoc}/> : null }
    </Drawer.Navigator>
  );
}

const ServicesStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Liste Services" screenOptions={screenOptionStyle}>
        <Stack.Screen options={{ title: 'Services',  headerShown: false,  }} name="Liste Services" component={ServicesColoc}/>
        <Stack.Screen options={{ title: 'Description du service' }} name="DescriptionService" component={DescriptionService}/>
        <Stack.Screen options={{ title: 'Validation du service' }} name="ValidationService" component={ValidationService}/>
        <Stack.Screen name="Ajout d'un service" component={NewService}/>
    </Stack.Navigator>
  );
}

const ServiceToVoteStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Services en attente" screenOptions={screenOptionStyle}>
        <Stack.Screen options={{ headerShown: false }} name="ServicesToVote" component={ServiceToVote}/>
        <Stack.Screen name="Vote" component={Vote}/>
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        //API connection, etc here

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return <>
    <QueryClientProvider client={queryClient}>
        <NavigationContainer>
            <ConnexionStackNavigator/>
        </NavigationContainer>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </>;
}
