import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Autocomplete from './Autocomplete';
import { theme } from '../../assets/styles/theme';

import FuzzySearch from 'fuzzy-search';

const mockSearch = jest.fn();
jest.mock('fuzzy-search', () => {
  return jest.fn().mockImplementation(() => {
    return { search: () => ['apple', 'apple pie'] };
  });
});

const props = {
  data: [],
  placeholder: 'placeholder',
  label: 'label',
  id: 'autocomplete',
};

it('renders the autocomplete', () => {
  const { getByTestId, queryByLabelText } = render(
    <ThemeProvider theme={theme}>
      <Autocomplete {...props} />
    </ThemeProvider>
  );

  const input = getByTestId('input');
  const label = queryByLabelText('label');

  expect(input).toHaveAttribute('placeholder', 'placeholder');
  expect(input).toHaveAttribute('id', 'autocomplete');
  expect(label).not.toBe(null);
});

it('shows list of options', async () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <Autocomplete {...props} />
    </ThemeProvider>
  );

  const input = getByTestId('input');
  fireEvent.change(input, { target: { value: 'app' } });

  const list = await screen.findByRole('listbox');
  const options = await screen.findAllByRole('option');

  expect(list).toBeVisible();
  expect(options.length).toBe(2);
  expect(options[0]).toHaveTextContent('apple');
  expect(options[1]).toHaveTextContent('apple pie');
});

it('selects an option from the list with click', async () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <Autocomplete {...props} />
    </ThemeProvider>
  );

  const input = getByTestId('input');
  fireEvent.change(input, { target: { value: 'app' } });
  const options = await screen.findAllByRole('option');

  fireEvent.click(options[0]);

  expect(input).toHaveValue('apple');
});

it('selects an option from the list with keyboard', async () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <Autocomplete {...props} />
    </ThemeProvider>
  );

  const input = getByTestId('input');
  fireEvent.change(input, { target: { value: 'app' } });
  await screen.findAllByRole('option');

  fireEvent.keyDown(input, { keyCode: 40 });
  fireEvent.keyDown(input, { keyCode: 13 });

  expect(input).toHaveValue('apple');
});

it('navigates though the list with keyboard', async () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <Autocomplete {...props} />
    </ThemeProvider>
  );

  const input = getByTestId('input');
  fireEvent.change(input, { target: { value: 'app' } });
  await screen.findAllByRole('option');

  fireEvent.keyDown(input, { keyCode: 38 });
  fireEvent.keyDown(input, { keyCode: 13 });

  expect(input).toHaveValue('apple pie');
});
