import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

// app.js에서 해당 고차 컴포넌트는 라우팅에 다른 컴포넌트를 감싼 채로 element 속성으로 전해진다
export default function (SpecificComponent, option, adminRoute = null) {
  // option은 null, true, false가 되는데 각각 아무나, 로그인한 사람만, 로그인 안 한 사람만을 받아들이는 로직이다
  // adminRoute는 관리자 권한만 갈 수 있는 것

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            navigate('/login');
          }
        } else {
          // 로그인한 상태
          if (adminRoute && !response.payload.isAdmin) {
            // 관리자 권한은 없을 때
            navigate('/');
          } else {
            if (option === false) {
              navigate('/');
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  // 특정 컴포넌트를 받아서 컴포넌트를 만드는 함수를 리턴해준다
  return AuthenticationCheck;
}
