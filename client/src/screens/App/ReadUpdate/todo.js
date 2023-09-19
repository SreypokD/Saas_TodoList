import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import Button from '../../../components/Common/buttons/SecondaryButton';
import CancelButton from '../../../components/Common/buttons/CancelButton';
import Card from '../../../components/Common/Card';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextArea from '../../../components/Common/forms/TextArea';
import TextInput from '../../../components/Common/forms/TextInput';
import { StyledBiCheckCircle, StyledBiCircle, StyledIconDelete, StyledIconEdit, StyledIconUndone } from '../../../components/Common/reacticon/icon';
import DropDown from '../../../components/Common/forms/DropDownd';



const Wrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;

`;


const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormButtonsWrapper = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
`;


const ContainList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TableStyle = styled.table`
    border-bottom: 1px solid black;
    width: 100%
`

const TdStyle = styled.td`
    width: 40%;
  
`

const TrStyle = styled.tr`
  display:flex;
  align-items: center;
`

const ButtonInprogresStyle = styled.button`
    background-color: #ffd1b3;
    border: none;
    margin:2px;
    border-radius: 50px;
    color: #ff4f00;
    font-size:12px
    padding: 5px;
`
const ButtonUncompleteStyle = styled.button`
    background-color: #ffcbd1;
    border: none;
    margin:2px;
    border-radius: 30px;
    color: red;
    font-size:12px
    padding: 5px;
`

const ButtonCompleteStyle = styled.button`
    background-color: #cbf5dd;
    border: none;
    margin:2px;
    border-radius: 30px;
    color: green;
    font-size:12px
    padding: 5px;
`
const ButtonNullStyle = styled.button`
  background-color:red;
  border: none;
  margin:2px;
  border-radius: 30px;
  color: white;
  font-size:12px
  padding: 5px;
  `



const Todo = ({
  todo,
  isEditting,
  editTodoID,
  handleEditTitleChange,
  editTitle,
  handleEditDescChange,
  editDescription,
  editTodo,
  deleteTodo,
  putTodo,
  setEdit,
  handleStatusChange,
  editStatus
}) => {

  // Function to render the appropriate status button component
  const renderStatusButton = () => {
    if (todo.status === 'uncomplete') {
      return <ButtonUncompleteStyle>uncomplete</ButtonUncompleteStyle>;
    } else if (todo.status === 'complete') {
      return <ButtonCompleteStyle>complete</ButtonCompleteStyle>;
    } else if (todo.status === 'inprogres') {
      return <ButtonInprogresStyle>inprogress</ButtonInprogresStyle>;
    }
    return <ButtonNullStyle>no status</ButtonNullStyle>; // Default case if status value is not recognized
  };
  //  if task complete 
  const [isCompleted, setIsCompleted] = useState(false); // Add state for tracking completion status

  // Function to handle the click event and toggle the completion state
  const handleIconClick = () => {
    setIsCompleted(!isCompleted);
  };


  return (
    <Wrapper>
      <ContainList>
        <TableStyle>
          <TrStyle>
            <TdStyle>{todo.title}</TdStyle>
            <TdStyle>{todo.description}</TdStyle>
            <TdStyle>
              {renderStatusButton()} {/* Render the appropriate status button */}
            </TdStyle>
            <TdStyle>

              {/* if done  */}
              {isCompleted ? (
                <StyledBiCheckCircle onClick={handleIconClick} />
              ) : (
                <StyledBiCircle onClick={handleIconClick} />
              )}

              <StyledIconEdit
                onClick={() => editTodo(todo)}
                backgroundColor={colors.indigo600}
                textColor={colors.white}
                hoverBackgroundColor={colors.indigo500}
                activeBackgroundColor={colors.indigo600}
              >
                Edit
              </StyledIconEdit>
              <StyledIconDelete
                onClick={() => deleteTodo(todo)}
                backgroundColor={colors.red500}
                textColor={colors.white}
                hoverBackgroundColor={colors.indigo500}
                activeBackgroundColor={colors.indigo600}
              >
                Delete
              </StyledIconDelete>
            </TdStyle>
          </TrStyle>
        </TableStyle>
      </ContainList>
      {/* if edit todo */}
      {isEditting && todo.id === editTodoID && (
        <form onSubmit={(event) => putTodo(event, todo)}>
          <Card>
            <TitleWrapper>
              <FieldLabel>
                Title
                <TextInput onChange={handleEditTitleChange} value={editTitle} name="title" />
              </FieldLabel>
            </TitleWrapper>
            <DescriptionWrapper>
              <FieldLabel>
                Description
                <TextArea
                  onChange={handleEditDescChange}
                  value={editDescription}
                  name="description"
                />
              </FieldLabel>
            </DescriptionWrapper>
            <FieldLabel htmlFor="status">
              Select status:
              <DropDown id="status" name="status" value={editStatus} onChange={handleStatusChange}>
                <option selected value="none">Task status</option>
                <option value="uncomplete">Uncomplete</option>
                <option value="inprogres">InProgress</option>
                <option value="complete">Complete</option>
              </DropDown>
            </FieldLabel>
            <FormButtonsWrapper>
              <CancelButton
                onClick={() => setEdit(false)}
                backgroundColor={colors.red500}
                textColor={colors.white}
                hoverBackgroundColor={colors.indigo500}
                activeBackgroundColor={colors.indigo600}
              >
                Cancel
              </CancelButton>
              <Button
                type="submit"
                backgroundColor={colors.indigo600}
                textColor={colors.white}
                hoverBackgroundColor={colors.indigo500}
                activeBackgroundColor={colors.indigo600}
              >
                Save change
              </Button>
            </FormButtonsWrapper>
          </Card>
        </form>
      )}
    </Wrapper>
  );
};

export default Todo;
