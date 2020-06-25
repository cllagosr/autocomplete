import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as S from './autocomplete.styled';
import FuzzySearch from 'fuzzy-search';
import useClickOutside from '../../hooks/useClickOutside';

const Autocomplete = ({ data, label, placeholder, id }) => {
  let searcher = new FuzzySearch(data);
  const maxNumItems = 4;

  const listRef = useRef();

  const [filteredData, setFilteredData] = useState([]);
  const [noDataFound, setNoDataFound] = useState(false);
  const [wrapperRef, openDropdown, setOpenDropdown] = useClickOutside();

  // handles the index of the selected value in the list
  const [index, setIndex] = useState(-1);
  const [typedValue, setTypedValue] = useState('');

  const getHightlightedList = (value, list) => {
    let regExp = new RegExp(value, 'i');

    const highlightedList = list.map((item) => {
      const matchingValue = item.match(regExp);
      if (matchingValue !== null) {
        return {
          value: item,
          html: item.replace(regExp, `<b>${matchingValue[0]}</b>`),
        };
      }
      return { value: item, html: item };
    });

    return highlightedList;
  };

  const handleOnClick = (index) => {
    setTypedValue(filteredData[index].value);
    setIndex(index);
    setOpenDropdown(false);
  };

  const handleOnChange = (event) => {
    const value = event.target.value;
    setTypedValue(value);

    if (value.length > 2) {
      let searcherResult = searcher.search(event.target.value);

      if (searcherResult.length === 0) {
        setOpenDropdown(false);
        setNoDataFound(true);
      } else {
        setOpenDropdown(true);
        setNoDataFound(false);
        const highlightedList = getHightlightedList(value, searcherResult);
        setFilteredData(highlightedList);
      }
    } else if (value === '') {
      setFilteredData([]);
      setNoDataFound(false);
    } else {
      setOpenDropdown(false);
      setNoDataFound(false);
    }
  };

  const handleKeyDown = (event) => {
    if (!openDropdown) {
      setIndex(-1);
      return;
    }

    const keyCode = event.keyCode;
    const dataLength = filteredData.length;

    const currentScrollTop = listRef.current.scrollTop;
    const listMaxHeight = listRef.current.clientHeight;
    const itemHeight = listRef.current.scrollHeight / dataLength;

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
      return;
    }

    if (keyCode === 40) {
      // arrow down
      if (index < dataLength - 1) {
        setIndex(index + 1);
        if (currentScrollTop + listMaxHeight <= (index + 1) * itemHeight) {
          listRef.current.scrollTop = currentScrollTop + itemHeight;
        }
      } else {
        setIndex(0);
        listRef.current.scrollTop = 0;
      }
      return;
    }

    if (keyCode === 13) {
      // enter
      setTypedValue(filteredData[index].value);
      setOpenDropdown(false);
      return;
    }

    if (keyCode === 27) {
      // esc
      setOpenDropdown(false);
    }
  };

  return (
    <S.InputWrapper ref={wrapperRef}>
      <S.Label htmlFor={id}>{label}</S.Label>
      <S.Input
        type="text"
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        value={typedValue}
        id={id}
        placeholder={placeholder}
      />
      {noDataFound && <S.NoData>No data found</S.NoData>}
      {openDropdown && (
        <S.ListWrapper ref={listRef} maxNumItems={maxNumItems}>
          {filteredData.map((item, i) => {
            return (
              <S.ListItem
                key={i}
                selected={index === i}
                onClick={() => handleOnClick(i)}
                dangerouslySetInnerHTML={{ __html: item.html }}
              />
            );
          })}
        </S.ListWrapper>
      )}
    </S.InputWrapper>
  );
};

Autocomplete.propTypes = {
  data: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Autocomplete;
