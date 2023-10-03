import axios from 'axios';
import { LOGIN_USER, REGISTER_USER } from './types';
export function loginUser(dataToSubmit) {
  // 보낼 데이터를 전송하고, 받은 결과를 request라는 변수에 저장을 함
  const request = axios
    .post('/api/users/login', dataToSubmit)
    .then((response) => response.data);

  // 이건 action 함수이므로 state에 영향을 준다
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  // 보낼 데이터를 전송하고, 받은 결과를 request라는 변수에 저장을 함
  const request = axios
    .post('/api/users/register', dataToSubmit)
    .then((response) => response.data);

  // 이건 action 함수이므로 state에 영향을 준다
  return {
    type: REGISTER_USER,
    payload: request,
  };
}
