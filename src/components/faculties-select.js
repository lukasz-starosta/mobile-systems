import React from 'react';
import { Picker } from 'react-native';
import { faculties } from '../constants/faculties';

export const FacultiesSelect = ({ style, selectedOption, onSelect }) => (
  <Picker selectedValue={selectedOption} style={style} onValueChange={onSelect}>
    {faculties.map(faculty => (
      <Picker.Item
        label={faculty.name}
        value={faculty.abbr}
        key={faculty.abbr}
      />
    ))}
  </Picker>
);
