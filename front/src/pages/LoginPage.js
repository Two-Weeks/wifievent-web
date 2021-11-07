import React from 'react';
import { useState } from 'react';
import axios from '../axios';
import StyledCard from '../components/StyledCard';
import Button from '../components/Button';
import { Cookie } from 'react-cookie';

const LoginPage = () => {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const onClickLogin = () => {
    axios({
      method: 'post',
      url: '/user/login',
      data: {
        uid: inputId,
        pw: inputPw,
      },
    })
      .then((res) => {
        console.log(res);
        //document.location.href = '/';
      })
      .catch();
  };

  const onClickSignUp = () => {
    window.location.href = '/register';
  };

  return (
    <StyledCard>
      <h2>Login</h2>
      <div>
        <label htmlFor="input_id">ID : </label>
        <input
          type="text"
          name="input_id"
          value={inputId}
          onChange={handleInputId}
        />
      </div>
      <div>
        <label htmlFor="input_pw">PW : </label>
        <input
          type="password"
          name="input_pw"
          value={inputPw}
          onChange={handleInputPw}
        />
      </div>
      <div>
        <Button onClick={onClickSignUp}>Sign up</Button>
        <Button onClick={onClickLogin}>Login</Button>
      </div>
    </StyledCard>
  );
};

export default LoginPage;
