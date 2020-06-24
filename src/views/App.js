import React from 'react';
import { food } from '../data/food';
import Autocomplete from '../components/Autocomplete/Autocomplete';

const App = () => {
  return <Autocomplete data={food} />;
};

export default App;
