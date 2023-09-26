import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import Button from '../../../components/Common/buttons/SecondaryButton';
import CancelButton from '../../../components/Common/buttons/CancelButton';
import Dialog from '../../../components/Common/Dialog';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextArea from '../../../components/Common/forms/TextArea';
import TextInput from '../../../components/Common/forms/TextInput';
import { StyledBiCheckCircle, StyledBiCircle, StyledIconDelete, StyledIconEdit, StyledIconUndone } from '../../../components/Common/reacticon/icon';
import DropDown from '../../../components/Common/forms/DropDownd';
import DateStyle from '../../../components/Common/forms/DateInput';
import axios from 'axios';
import { DateString } from '../../../components/Common/DateString';
import { ContainStatus } from '../Create/index'
import { ContainDate } from '../Create/index'
import { message, Modal } from 'antd';
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
  justify-content: space-between;

`;

const FormButtonsWrapper = styled.div`
  display: flex;
  align-item: center;
  justify-content : space-evenly;

`;


const ContainList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  
`

const TableStyle = styled.table`
    border-bottom: 1px solid black;
    width: 100%; 
`

const TdStyle = styled.td`
  width: 20%;
  white-space: wrap;

  /* Add styles for the first child */
  &:first-child {
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-right: 2rem;

    p {
      margin-top: 0.8rem;
      margin-left: 0.5rem;
    }
  }
  &:nth-child(2){
    margin-right : 5rem;

  }

`;

const TrStyle = styled.tr`
  display:flex;
  align-items: center;
  
  &:hover {
    opacity: 90%;
    background-color: ${colors.gray100};
  } 
  
  ${({ isCompleted }) =>
  (isCompleted) &&
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
  const ContainDateStatus = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  width : 60rem;
  margin-top: 0.5rem;

  `
  const TitleEdit = styled.h1`
  text-align: center;

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
const [isCompleted, setIsCompleted] = useState(false);
const handleCompleteButtonClick = async (todo) => {
  const headers = { Authorization: `Bearer` };
  setIsCompleted(!isCompleted);
  const todo_id = todo.id;
  const url = `/api/put/complete/todo/?todo_id=${todo_id}`;
  console.log(url);
  await axios.put(url, { headers }).catch((err) => {
    console.log(err);
  });
};
  // try {
  //   const response = await axios.put('/api/put/complete/todo', { todo_id: todo.id });
  //   console.log(response)
  //   if (response.status === 200) {
  //     message.success('Todo marked as completed');
  //   }
  // } catch (error) {
  //   message.error('Failed to mark todo as completed');
  // }

  // Render the appropriate status button with the updated event handler
  const renderStatusButton = () => {
    if (isCompleted) {
      return <ButtonCompleteStyle onClick={() => handleCompleteButtonClick(todo)}>Complete</ButtonCompleteStyle>;
    } else if (todo.status === 'inprogres') {
      return <ButtonInprogresStyle onClick={() => handleCompleteButtonClick(todo)}>In Progress</ButtonInprogresStyle>;
    } else if (todo.status === 'uncomplete') {
      return <ButtonUncompleteStyle onClick={() => handleCompleteButtonClick(todo)}>Uncomplete</ButtonUncompleteStyle>;
    } else if (todo.status === 'complete') {
      return <ButtonCompleteStyle onClick={() => handleCompleteButtonClick(todo)}>Complete</ButtonCompleteStyle>;
    }
    return <ButtonNullStyle onClick={() => handleCompleteButtonClick(todo)}>No status</ButtonNullStyle>;
  };

  return (
    <Wrapper>
      <ContainList>
        <TableStyle>
          <TrStyle isCompleted={isCompleted || todo.status === 'complete'}>
            <TdStyle >
              {isCompleted || todo.status === 'complete'? (
                <StyledBiCheckCircle onClick={handleCompleteButtonClick} />
              ) : (
                <StyledBiCircle onClick={handleCompleteButtonClick} />
              )}
              <p>{todo.title} </p>
            </TdStyle>
            <TdStyle>{todo.description}</TdStyle>
            <TdStyle>
              <DateString dateString={todo.date} />
            </TdStyle>
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
          <Dialog>
            <TitleEdit>Edit Todo</TitleEdit>
            <TitleWrapper>
              <FieldLabel>
                Title:
                <TextInput onChange={handleEditTitleChange} value={editTitle} name="title" />
              </FieldLabel>
            </TitleWrapper>
            <DescriptionWrapper>
              <FieldLabel>
                Description:
                <TextArea
                  onChange={handleEditDescChange}
                  value={editDescription}
                  name="description"
                />
              </FieldLabel>
            </DescriptionWrapper>
            <ContainDateStatus>
              <ContainStatus>
                <FieldLabel htmlFor="status">
                  Select status:
                  <DropDown id="status" name="status" value={editStatus} onChange={handleStatusChange}>
                    <option selected value="none">Task status</option>
                    <option value="uncomplete">Uncomplete</option>
                    <option value="inprogres">InProgress</option>
                    <option value="complete">Complete</option>
                  </DropDown>
                </FieldLabel>
              </ContainStatus>
              <ContainDate>
                Date of task:
                <DateStyle type='date' id='date' name='date' value={editDate} onChange={handleDateChange} />
              </ContainDate>
            </ContainDateStatus>
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
          </Dialog>
        </form>
      )}
    </Wrapper>
  );
};

export default Todo;
