import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from './profile';
import FoodForm from './foodform';
import FoodList from './foodlist';

const Tab = createBottomTabNavigator();

export default Navbar = ({db}) => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Add hrana" component={FoodForm} initialParams={{ db: db }}/>
        <Tab.Screen name="Vij hrana" component={FoodList} initialParams={{ db: db }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};