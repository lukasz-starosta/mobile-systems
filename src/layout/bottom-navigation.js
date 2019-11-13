import React from 'react';
import { Icon } from 'react-native-ui-kitten';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DashboardScreen from '../screens/dashboard';
import ExploreScreen from '../screens/explore';
import FavoritesScreen from '../screens/favorites';
import ProfileScreen from '../screens/profile';

const politechnikaColor = '#750104';
const basicColor = '#606060';

const routes = {
  Dashboard: {
    title: 'Tablica',
    iconName: 'layout',
  },
  Explore: {
    title: 'Przeglądaj',
    iconName: 'compass-outline',
  },
  Favorites: {
    title: 'Moje koła',
    iconName: 'star-outline',
  },
  Profile: {
    title: 'Profil',
    iconName: 'person-outline',
  },
};

const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: { screen: DashboardScreen },
    Explore: { screen: ExploreScreen },
    Favorites: { screen: FavoritesScreen },
    Profile: { screen: ProfileScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      return {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name={routes[routeName].iconName}
            width={25}
            height={25}
            fill={tintColor}
          />
        ),
        title: routes[routeName].title,
        tabBarOptions: {
          activeTintColor: politechnikaColor,
          inactiveTintColor: basicColor,
        },
      };
    },
  },
);

export default createAppContainer(TabNavigator);
