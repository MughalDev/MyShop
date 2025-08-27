import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch } from 'react-redux';
import store from '../redux/store';
import { loadFavorites } from '../redux/productSlice';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import { Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['myshoplite://', 'https://myshoplite.com', 'http://localhost:8080'],
  config: {
    screens: {
      Home: {
        screens: {
          List: '',
          Cart: 'cart',
          Favorites: 'favorites',
        },
      },
      Details: 'product/:productId',
    },
  },
  async getInitialURL() {
    return await Linking.getInitialURL();
  },
};

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'List') {
          iconName = 'pricetag-outline'; // Product
        } else if (route.name === 'Cart') {
          iconName = 'cart-outline'; // Cart
        } else if (route.name === 'Favorites') {
          iconName = 'heart-outline'; // Favorites
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="List" component={ProductListScreen} options={{ title: 'Products' }} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} />
  </Tab.Navigator>
);

const AppContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="Details"
          component={ProductDetailsScreen}
          options={{ title: 'Product Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContent;
