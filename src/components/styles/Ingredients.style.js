import styled from 'styled-components';

export const Checkbox = styled.input`

  appearance: none;
  background-color: transparent;
  border: 1px solid #fcc436;
  border-radius: 0.2em;
  cursor: pointer;
  height: 1em;
  margin-right: 3px;
  margin-top: 1px;
  position: relative;
  top: 2px;
  width: 1em;

:checked {
    background-color: #fcc436;
  clip-path:
  polygon(
    41% 52%,
    26% 35%, 10% 51%, 37% 88%, 37% 88%, 37% 88%, 37% 88%, 37% 88%, 91% 33%, 78% 18%);
  cursor: pointer;
}
`;

export const label = styled.label`
`;
