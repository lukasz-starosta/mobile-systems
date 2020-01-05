import React from 'react';
import { Picker } from 'react-native';
import { categories } from '../constants/categories';

export const CategoriesSelect = ({ style, selectedOption, onSelect }) => (
  <Picker selectedValue={selectedOption} style={style} onValueChange={onSelect}>
    {categories.map(category => (
      <Picker.Item
        label={category.name}
        value={category.name}
        key={category.name}
      />
    ))}
  </Picker>
);
