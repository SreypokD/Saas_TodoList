import styled from 'styled-components';
//icon
import {MdDelete} from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {ImCheckmark2} from "react-icons/im"

export const StyledIconDelete = styled(MdDelete)`
  width: 2.5rem;
  height: 2.5rem;
  color: red;
  padding-left: 0.5rem;
`;

export const StyledIconEdit = styled(FaEdit)`
  width: 2.2rem;
  height: 2.5rem;
  color: blue;
  padding-left: 0.5rem;
`;

export const StyledIconUndone = styled(ImCheckmark2)`
  width: 2.2rem;
  height: 2.5rem;
  color: orange;
  padding-left: 0.5rem;
`;
