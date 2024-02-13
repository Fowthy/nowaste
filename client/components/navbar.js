import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for tab icons
import { View } from 'react-native';

import Profile from './profile';
import FoodForm from './foodform';
import FoodList from './foodlist';

const Tab = createBottomTabNavigator();

export default Navbar = ({db}) => {
  return (
    <View  style={{ width: '100%', height: '100%' }}>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Select an icon based on the route name
            if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Add hrana') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'Vij hrana') {
              iconName = focused ? 'list' : 'list-outline';
            }

            // Return an Ionicon
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato', // Color for the active tab
          inactiveTintColor: 'gray', // Color for the inactive tabs
        }}
      >
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Add hrana" component={FoodForm} initialParams={{ db: db }}/>
        <Tab.Screen name="Vij hrana" component={FoodList} initialParams={{ db: db }}/>
      </Tab.Navigator>
    </NavigationContainer>
    </View>
  );
};
