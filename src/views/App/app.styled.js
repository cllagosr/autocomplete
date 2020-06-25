import styled from 'styled-components';

export const Layout = styled.main`
  max-width: 800px;
  margin: ${({ theme }) => theme.spaces.xl} auto;
  padding: ${({ theme }) => theme.spaces.lg};
`;
