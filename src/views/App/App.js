import React from 'react';
import { food } from '../../data/food';
import Autocomplete from '../../components/Autocomplete/Autocomplete';
import * as S from './app.styled';

const App = () => {
  return (
    <S.Layout>
      <Autocomplete
        data={food}
        placeholder="Search for food"
        label="Food autocomplete"
        id="foodAutocomplete"
      />
    </S.Layout>
  );
};

export default App;
