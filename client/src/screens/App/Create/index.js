import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Spin, message } from 'antd';

import AuthContext from '../../../utils/authContext';
import getOrgId from '../../../utils/orgId';
import ApiContext from '../../../utils/apiContext';
import { colors } from '../../../styles/theme';
import axios from '../../../services/axios';
import { sendEventToAnalytics } from '../../../services/analytics';

import Button from '../../../components/Common/buttons/SecondaryButton';
import Card from '../../../components/Common/Card';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextArea from '../../../components/Common/forms/TextArea';
import TextInput from '../../../components/Common/forms/TextInput';
import DropDown from '../../../components/Common/forms/DropDownd';

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

const InputWrapper = styled.div`
  padding: 1.5rem;
`;

const TextAreaWrapper = styled.div`
  padding: 0 1.5rem;
`;

const ButtonWrapper = styled.div`
  padding: 1.5rem;
  background-color: ${colors.white};
  text-align: left;
`;

const CreateTask = () => {
  const org_id = getOrgId();

  const [formTitle, setTitle] = useState('');
  const [formDescription, setDescription] = useState('');
  const [selectStatus , setSelectStatus] = useState('');
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const { authState } = useContext(AuthContext);
  let token = authState?.user.jwt_token;
  const headers = { Authorization: `Bearer ${token}` };

  const postTodo = async (event) => {
    event.preventDefault();
    fetchInit();

    let author = authState?.user.username;
    let title = event.target.title.value;
    let description = event.target.description.value;
    let status = event.target.status.value;
    let data = { title, description, author, status, org_id };
      console.log(data);
    await axios.post(`/api/post/todo`, data, { headers }).catch((err) => {
      fetchFailure(err);
    });

    sendEventToAnalytics('create_todo', { description: 'user created todo' });

    setTitle('');
    setDescription('');
    message.success('Todo Created');
    fetchSuccess();
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <Title>Create todo list here</Title>
      <form onSubmit={postTodo}>
        <Card>
          <Spin tip="Loading..." spinning={isLoading}>
            <InputWrapper>
              <FieldLabel htmlFor="title">
                Todo list title:
                <TextInput onChange={handleTitleChange} value={formTitle} name="title" />
              </FieldLabel>
            </InputWrapper>
            <TextAreaWrapper>
              <FieldLabel htmlFor="description">
                Description:
                <TextArea onChange={handleDescChange} value={formDescription} name="description" />
              </FieldLabel>
            </TextAreaWrapper>
            <InputWrapper>
              <FieldLabel htmlFor="status">
                Select status:
                <DropDown value={selectStatus} id="cars" name="cars" onChange={(e) => {setSelectStatus(e.target.value)}}>
                  <option value="uncomplete">Uncomplete</option>
                  <option value="inprogres">Inprogres</option>
                  <option value="complete">Complete</option>
                </DropDown>
              </FieldLabel>

            </InputWrapper>
            <ButtonWrapper>
              <Button
                textColor={colors.white}
                backgroundColor={colors.indigo600}
                hoverBackgroundColor={colors.indigo500}
                activeBackgroundColor={colors.indigo700}
              >
                Save list
              </Button>
            </ButtonWrapper>
          </Spin>
        </Card>
      </form>
    </div>
  );
};

export default CreateTask;
