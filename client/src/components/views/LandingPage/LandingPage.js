import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 서버 단으로 get 요청을 보낼 수 있다
    axios.get('/api/hello').then((response) => console.log(response));
  }, []);

  function handleLogout() {
    axios.get('/api/users/logout').then((response) => {
      console.log(response);
      if (response.data.success) {
        navigate('/login');
      } else {
        alert('로그아웃 하는 데에 실패했습니다!');
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
      <h2>시작 페이지</h2>
      <button onClick={handleLogout}>로그 아웃</button>
    </div>
  );
}

export default LandingPage;
