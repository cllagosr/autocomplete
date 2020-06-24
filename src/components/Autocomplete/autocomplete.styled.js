import styled from 'styled-components';

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  display: block;
  box-sizing: border-box;
  height: 40px;
  cursor: auto;
  outline: none;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  border-color: ${({theme}) => theme.colors.gray};
  border-image: initial;
  padding: 0 12px;
  font-size: 14px;
  color: ${({theme}) => theme.colors.font};
  font-family: inherit;

  :focus {
    border-color: ${({theme}) => theme.colors.darkGray}
  }
`;

export const ListWrapper = styled.ul`
  list-style-type: none;
  position: absolute;
  margin-top: 0;
  padding-left: 0;
  width: 100%;
  max-height: 230px;
  overflow-y: auto;
  box-shadow: 0 6px 6px rgba(0,0,0,0.2);

  li {
    cursor: pointer;
    display: block;
    white-space: normal;
    padding: 20px;
  }
`;