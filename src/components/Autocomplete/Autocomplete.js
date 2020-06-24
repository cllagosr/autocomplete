import React from 'react';
import PropTypes from 'prop-types';
import * as S from './autocomplete.styled';

const Autocomplete = ({data}) => {
  const handleOnChange = (event) => {
    console.log(event.target.value)
  }

  return (
    <S.InputWrapper>
      <S.Input type="text" onChange={handleOnChange}/>
      <S.ListWrapper>
        {data.map((item, index) => <li key={index}>{item}</li> )}
      </S.ListWrapper>
    </S.InputWrapper>
  );
};

Autocomplete.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Autocomplete;
