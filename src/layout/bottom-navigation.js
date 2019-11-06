import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from 'react-native-ui-kitten';

const getIcon = (style, name, fill) => (
  <Icon {...style} name={name} fill={fill} />
);

const getColorBasedOnSelected = selected => {
  const politechnikaColor = '#750104';
  const basicColor = '#606060';
  return selected ? politechnikaColor : basicColor;
};

export class Navigation extends React.Component {
  state = {
    selectedIndex: 0,
  };

  onTabSelect = selectedIndex => {
    this.setState({selectedIndex});
  };

  isTabSelected = tabIndex => tabIndex === this.state.selectedIndex;

  render() {
    return (
      <BottomNavigation
        style={{position: 'absolute', bottom: 0}}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onTabSelect}
        appearance="noIndicator">
        <BottomNavigationTab
          title="Tablica"
          titleStyle={{color: getColorBasedOnSelected(this.isTabSelected(0))}}
          icon={style =>
            getIcon(
              style,
              'layout',
              getColorBasedOnSelected(this.isTabSelected(0)),
            )
          }
        />
        <BottomNavigationTab
          title="Przeglądaj"
          titleStyle={{color: getColorBasedOnSelected(this.isTabSelected(1))}}
          icon={style =>
            getIcon(
              style,
              'compass-outline',
              getColorBasedOnSelected(this.isTabSelected(1)),
            )
          }
        />
        <BottomNavigationTab
          title="Moje koła"
          titleStyle={{color: getColorBasedOnSelected(this.isTabSelected(2))}}
          icon={style =>
            getIcon(
              style,
              'star-outline',
              getColorBasedOnSelected(this.isTabSelected(2)),
            )
          }
        />
        <BottomNavigationTab
          title="Profil"
          titleStyle={{color: getColorBasedOnSelected(this.isTabSelected(3))}}
          icon={style =>
            getIcon(
              style,
              'person-outline',
              getColorBasedOnSelected(this.isTabSelected(3)),
            )
          }
        />
      </BottomNavigation>
    );
  }
}
