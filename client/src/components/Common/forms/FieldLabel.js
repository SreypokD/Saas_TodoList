import styled from 'styled-components';
import { colors } from '../../../styles/theme';

const Label = styled.label`
  input {
    margin-top: 0.5rem;
    width: 75%;
    margin-left:10%;
  }
  display: block;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.gray700};
`;

export default Label;
