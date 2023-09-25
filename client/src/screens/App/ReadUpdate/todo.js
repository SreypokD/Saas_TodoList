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
import DateStyle from '../../../components/Common/forms/DateInput';
import axios from 'axios';

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
    width: 20%;
    white-space: rap;

    
`

const TrStyle = styled.tr`
  display:flex;
  align-items: center;
  
  &:hover {
    opacity: 90%;
    background-color: ${colors.gray100};
  } 
  
    ${({ isCompleted }) =>
    isCompleted &&
    `
      color: red;
      text-decoration: line-through;
    `}
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
  editStatus,
  editDate,
  handleDateChange
}) => {
  //  if task complete 
  const [isCompleted, setIsCompleted] = useState(false); // Add state for tracking completion status
   
  const handleCompleteButtonClick = async (todo) => {
    // Update the task's completion status locally
    setIsCompleted(!isCompleted);
    let todo_id = todo.id;
    let params = { todo_id };
    
    // Define the headers object
    const headers = {
      // Define your desired headers here
      // For example:
      'Content-Type': 'application/json',
      Authorization: 'Bearer your-token',
    };
    
    // Send the update request to the server
    await axios.put(`/api/put/complete/todo`,{ params, headers })
    .catch((err) => {
      console.log(err);
    });

  };

  // Render the appropriate status button with the updated event handler
  const renderStatusButton = () => {
    if (isCompleted) {
      return <ButtonCompleteStyle onClick={handleCompleteButtonClick}>Complete</ButtonCompleteStyle>;
    } else if (todo.status === 'inprogres') {
      return <ButtonInprogresStyle onClick={handleCompleteButtonClick}>In Progress</ButtonInprogresStyle>;
    } else if (todo.status === 'uncomplete') {
      return <ButtonUncompleteStyle onClick={handleCompleteButtonClick}>Uncomplete</ButtonUncompleteStyle>;
    }
    return <ButtonNullStyle onClick={handleCompleteButtonClick}>No status</ButtonNullStyle>;
  };

  return (
    <Wrapper>
      <ContainList>
        <TableStyle>
          <TrStyle isCompleted={isCompleted}>
            {isCompleted ? (
              <StyledBiCheckCircle onClick={handleCompleteButtonClick} />
            ) : (
              <StyledBiCircle onClick={handleCompleteButtonClick} />
            )}
            <TdStyle >
              <p>{todo.title} </p>
            </TdStyle>
            <TdStyle>{todo.description}</TdStyle>
            <TdStyle>{todo.date}</TdStyle>
            <TdStyle>
              {renderStatusButton()} {/* Render the appropriate status button */}
            </TdStyle>

            <TdStyle>

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
            <FieldLabel htmlFor="date">
              Date of task:
              <DateStyle type='date' id='date' name='date' value={editDate} onChange={handleDateChange} />
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
