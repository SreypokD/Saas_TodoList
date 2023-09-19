import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import getOrgId from '../../../utils/orgId';
import Todo from './todo';
import { Empty, Spin } from 'antd';
import axios from '../../../services/axios';
import Card from '../../../components/Common/Card';

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
`;

 const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

const TrStyle = styled.tr`
  display:flex;
  justity-content: space-between;
  background-color: #D4D4D4D4;
  padding:5px
`

const ThStyle = styled.th`
  margin-right: 20%;

`

const ReadUpdate = () => {
  const org_id = getOrgId();
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  let token = authState?.user.jwt_token;
  const headers = { Authorization: `Bearer ${token}` };

  const [todos, setTodos] = useState([]);

  //Edit Todo state and form state
  const [isEditting, setEdit] = useState(false);
  const [editTodoID, setTodoID] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('');

  /* eslint-disable */
  useEffect(() => {
    if (org_id) fetchTodos();
  }, [org_id]);
  /* eslint-enable */

  const fetchTodos = async () => {
    fetchInit();

    let params = { org_id };

    let result = await axios.get(`/api/get/todos`, { params, headers }).catch((err) => {
      fetchFailure(err);
    });

    setTodos(result.data);
    fetchSuccess();
  };

  const deleteTodo = async (todo) => {
    fetchInit();
    let todo_id = todo.id;

    let params = { todo_id };
    await axios.delete(`/api/delete/todo`, { params, headers }).catch((err) => {
      fetchFailure(err);
    });

    setEdit(false);

    setTimeout(() => fetchTodos(), 300);
    fetchSuccess();
  };

  const putTodo = async (event, todo) => {
    event.preventDefault();
    fetchInit();
    let title = event.target.title.value;
    let description = event.target.description.value;
    let author = authState?.user.username;
    let status = event.target.status.value;
    let todo_id = todo.id;

    let data = { title, description, author, status,  todo_id };
    await axios.put(`/api/put/todo`, data, { headers }).catch((err) => {
      fetchFailure(err);
    });

    setEdit(false);
    //Save data to context to limit api calls
    setTimeout(() => fetchTodos(), 300);
    fetchSuccess();
  };

  const editTodo = (todo) => {
    setEdit(true);
    setTodoID(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditStatus(todo.status);

  };

  const handleEditTitleChange = (event) => {
    setEditTitle(event.target.value);
  };

  const handleEditDescChange = (event) => {
    setEditDescription(event.target.value);
  };

  const handleStatusChange = (event) => {
    setEditStatus(event.target.value);
  };

  return (
    <StyledMain>
      <Title>Todos List: </Title>
      <Card>
      <TrStyle>
          <ThStyle>Title</ThStyle>
          <ThStyle>Description</ThStyle>
          
          <ThStyle>Status</ThStyle>
          <ThStyle>Action</ThStyle>
          
        </TrStyle>
        <Spin tip="Loading..." spinning={isLoading}>
          {todos.length !== 0 ? (
            todos.map((todo) => (
              <Todo
                todo={todo}
                isEditting={isEditting}
                editTodoID={editTodoID}
                handleEditTitleChange={handleEditTitleChange}
                editTitle={editTitle}
                handleEditDescChange={handleEditDescChange}
                editDescription={editDescription}
                editTodo={editTodo}
                handleStatusChange={handleStatusChange}
                editStatus = {editStatus}
                deleteTodo={deleteTodo}
                putTodo={putTodo}
                setEdit={setEdit}
              />
            ))
          ) : (
            <Empty />
          )}
        </Spin>
      </Card>
    </StyledMain>
  );
};

export default ReadUpdate;
