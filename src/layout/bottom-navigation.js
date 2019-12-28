import React from 'react';
import { Icon } from 'react-native-ui-kitten';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DashboardScreen from '../screens/dashboard';
import ExploreScreen from '../screens/explore';
import FavoritesScreen from '../screens/favorites';
import ProfileScreen from '../screens/profile';
import colors from '../constants/colors';

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

function Navigation(props) {
  const AppContainer = getAppContainer(props);
  return <AppContainer />;
}

const getAppContainer = passedProps => {
  const TabNavigator = createBottomTabNavigator(
    {
      Dashboard: {
        screen: props => <DashboardScreen {...props} {...passedProps} />,
      },
      Explore: {
        screen: props => <ExploreScreen {...props} {...passedProps} />,
      },
      Favorites: {
        screen: props => <FavoritesScreen {...props} {...passedProps} />,
      },
      Profile: {
        screen: props => <ProfileScreen {...props} {...passedProps} />,
      },
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
            activeTintColor: colors.politechnika,
            inactiveTintColor: colors.basic,
          },
        };
      },
    },
  );
  return createAppContainer(TabNavigator);
};

export default Navigation;
