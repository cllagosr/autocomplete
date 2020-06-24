import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as S from './autocomplete.styled';
import FuzzySearch from 'fuzzy-search';
import useClickOutside from '../../hooks/useClickOutside';

const Autocomplete = ({ data }) => {
  let searcher = new FuzzySearch(data);
  const maxNumItems = 4;

  const listRef = useRef();

  const [filteredData, setFilteredData] = useState([]);
  const [wrapperRef, openDropdown, setOpenDropdown] = useClickOutside(true);

  // handles the index of the selected value in the list
  const [index, setIndex] = useState(-1);
  const [typedValue, setTypedValue] = useState('');

  const handleOnClick = (index) => {
    setTypedValue(filteredData[index]);
    setOpenDropdown(false);
  };

  const handleOnFocus = () => {
    if (filteredData.length > 0) {
      setOpenDropdown(true);
    }
  };

  const handleOnChange = (event) => {
    const value = event.target.value;
    setTypedValue(value);

    if (value.length > 2) {
      let searcherResult = searcher.search(event.target.value);

      if (searcherResult.length === 0) {
        setOpenDropdown(false);
      } else {
        setOpenDropdown(true);
        setFilteredData(searcherResult);
      }
    }

    if (value === '') {
      setFilteredData([]);
    }
  };

  const handleKeyDown = (event) => {
    if (!openDropdown) {
      return;
    }

    const keyCode = event.keyCode;
    const dataLength = filteredData.length;

    const currentScrollTop = listRef.current.scrollTop;
    const wrapperHeight = listRef.current.clientHeight;
    const itemHeight = wrapperHeight / (dataLength - 1);

    if (keyCode === 38) {
      // arrow up
      if (index > 0) {
        setIndex(index - 1);
        if (currentScrollTop >= index * itemHeight) {
          listRef.current.scrollTop = currentScrollTop - itemHeight;
        }
      } else {
        setIndex(dataLength - 1);
        listRef.current.scrollTop = itemHeight * dataLength;
      }
    }

    if (keyCode === 40) {
      // arrow down
      if (index < dataLength - 1) {
        setIndex(index + 1);
        if (currentScrollTop + wrapperHeight <= (index + 1) * itemHeight) {
          listRef.current.scrollTop = currentScrollTop + itemHeight;
        }
      } else {
        setIndex(0);
        listRef.current.scrollTop = 0;
      }
    }

    if (keyCode === 13) {
      // enter
      setTypedValue(filteredData[index]);
      setOpenDropdown(false);
    }

    if (keyCode === 27) {
      // esc
      setOpenDropdown(false);
    }
  };

  return (
    <S.InputWrapper ref={wrapperRef}>
      <S.Input
        type="text"
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onKeyDown={handleKeyDown}
        value={typedValue}
      />
      {openDropdown && (
        <S.ListWrapper ref={listRef} maxNumItems={maxNumItems}>
          {filteredData.map((item, i) => {
            return (
              <S.ListItem
                key={i}
                selected={index === i}
                onClick={() => handleOnClick(i)}>
                {item}
              </S.ListItem>
            );
          })}
        </S.ListWrapper>
      )}
    </S.InputWrapper>
  );
};

Autocomplete.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Autocomplete;
