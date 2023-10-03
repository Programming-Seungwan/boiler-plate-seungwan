import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmail(ev) {
    setEmail(ev.target.value);
  }

  function handlePassword(ev) {
    setPassword(ev.target.value);
  }

  function handleFormSubmit(ev) {
    // form의 제출 시 기본 동작인 page refresh를 막아준다
    ev.preventDefault();

    // 현재 상태에 있는 것들을 body에 담아준다
    let body = {
      email: email,
      password: password,
    };

    // dispatch 훅을 통해서 body를 담은 action을 생성해준다
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        // 로그인이 성공적으로 이루어졌으면, 루트 path로 다시 보내줘야 함
        // props.history.push('/');
        navigate('/');
      } else {
        alert('error');
      }
    });
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleFormSubmit}
      >
        <label>Email</label>
        <input type='email' value={email} onChange={handleEmail}></input>
        <label>Password</label>
        <input
          type='Password'
          value={password}
          onChange={handlePassword}
        ></input>
        <br />

        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
