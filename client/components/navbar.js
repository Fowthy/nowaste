import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import the necessary Firebase functions

import Profile from './profile';
import FoodForm from './foodform';
import FoodList from './foodlist';
import Login from './login'; // Import your Login component

const Tab = createBottomTabNavigator();

export default function Navbar({ db }) {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  // Handle user state changes
  function handleAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const auth = getAuth();
    const subscriber = onAuthStateChanged(auth, handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null; // or a loading spinner
  }

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'Add hrana') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else if (route.name === 'Vij hrana') {
                iconName = focused ? 'list' : 'list-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          {user ? (
            <>
              <Tab.Screen name="Profile" component={Profile} />
              <Tab.Screen name="Vij hrana" component={FoodList} initialParams={{ db: db }} />
              <Tab.Screen name="Add hrana" component={FoodForm} initialParams={{ db: db }} />
            </>
          ) : (
            <>
              <Tab.Screen name="Login" component={Login} />
              <Tab.Screen name="Vij hrana" component={FoodList} initialParams={{ db: db }} />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}
