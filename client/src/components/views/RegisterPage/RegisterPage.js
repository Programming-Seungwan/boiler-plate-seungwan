import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleEmail(ev) {
    setEmail(ev.target.value);
  }

  function handlePassword(ev) {
    setPassword(ev.target.value);
  }

  function handleName(ev) {
    setName(ev.target.value);
  }

  function handleConfirmPassword(ev) {
    setConfirmPassword(ev.target.value);
  }

  function handleFormSubmit(ev) {
    // form의 제출 시 기본 동작인 page refresh를 막아준다
    ev.preventDefault();

    if (password !== confirmPassword) {
      return alert('비밀 번호와 비밀 번호 확인은 같아야 합니다!');
    }
    // 현재 상태에 있는 것들을 body에 담아준다
    let body = {
      email: email,
      name: name,
      password: password,
    };

    // dispatch 훅을 통해서 body를 담은 action을 생성해준다
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate('/login');
      } else {
        alert('Failed to sign up');
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

        <label>Name</label>
        <input type='text' value={name} onChange={handleName}></input>

        <label>Password</label>
        <input
          type='Password'
          value={password}
          onChange={handlePassword}
        ></input>

        <label>Confirm Password</label>
        <input
          type='Password'
          value={confirmPassword}
          onChange={handleConfirmPassword}
        ></input>

        <br />

        <button type='submit'>회원 가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
