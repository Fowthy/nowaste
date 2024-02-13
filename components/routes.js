import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import Profile from './profile';
import FoodForm from './foodform';
import FoodList from './foodlist';
import Login from './login';
import AdminPanel from './adminpanel';
import FoodItem from './fooditem';

const Tab = createBottomTabNavigator();

const Routes = ({ db }) => {
  const [initializing, setInitializing] = React.useState(true);
  const auth = getAuth();
  const [user, setUser] = React.useState();
  const [role, setRole] = React.useState();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setRole(userDoc.data()?.role);
      }
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, [initializing]);

  if (initializing) return null;

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      switch (route.name) {
        case 'Profile':
          iconName = focused ? 'person' : 'person-outline';
          break;
        case 'Add hrana':
          iconName = focused ? 'add-circle' : 'add-circle-outline';
          break;
        case 'Vij hrana':
          iconName = focused ? 'list' : 'list-outline';
          break;
        default:
          iconName = 'circle';
          break;
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  });

  const tabBarOptions = {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
          {user ? (
            <>
              {role === 'restaurant' && <Tab.Screen name="Add hrana" component={FoodForm} initialParams={{ db }} />}
              <Tab.Screen name="Vij hrana" component={FoodList} initialParams={{ db }} />
              <Tab.Screen name="FoodItem" component={FoodItem} />
              <Tab.Screen name="Profile" component={Profile} />
              {role === 'admin' && <Tab.Screen name="Admin Panel" component={AdminPanel} />}
            </>
          ) : (
            <>
              <Tab.Screen name="Vij hrana" component={FoodList} initialParams={{ db }} />
              <Tab.Screen name="FoodItem" component={FoodItem} />
              <Tab.Screen name="Login" component={Login} />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Routes;
