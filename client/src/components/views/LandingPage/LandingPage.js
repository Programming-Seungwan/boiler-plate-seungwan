import React, { useEffect } from 'react';
import axios from 'axios';
function LandingPage() {
  useEffect(() => {
    // 서버 단으로 get 요청을 보낼 수 있다
    axios.get('/api/hello').then((response) => console.log(response));
  }, []);
  return <div>LandingPage</div>;
}

export default LandingPage;
