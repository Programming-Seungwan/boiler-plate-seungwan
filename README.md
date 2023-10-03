# React & nodeJS clone Project By Seungwan

본 프로젝트는 백엔드는 nodeJS의 express 프레임워크와 mongoDB를 사용하여 다양한 요청에 대한 API를 만들어주었고, 프론트엔드는 create-react-app 모듈을 사용해 구현한다. <br/>

백엔드는 루트 디렉터리에 config가 나와있으며, 주요 소스는 server 디렉터리에 위치한다. 프론트엔드는 전반적인 프로젝트 파일이 전부 client 디렉터리에 위치한다.

## Server by nodeJS using Express and mongoDB

서버는 기본적으로 계정을 생성(등록), 로그인, 인증, 그리고 로그아웃하는 데에 초점이 맞춰져있다. 이를 구축하기 위한 프레임워크로는 express를 사용하며 데이터베이스로는 ODM을 따르는 noSQL mongoDB를 골랐다.이는 Javascript & nodeJS를 이용해서 설계하기에 매우 용이하기 때문이다.

- 사용자가 클라이언트(브라우저, Postman 등)을 활용해 요청을 보낼 때 이를 받아 파싱(해석)하기 위해 `json()` 이나 `urlencoded()` 미들웨어를 등록해준다.
- 추후에 로그인 시에 cookie 를 이용할 것이므로 `cookieParser()` 미들웨어를 모듈로부터 받아 등록해준다.
- mongoose 모듈을 통해 mongoDB에 접근하고자 할 떄에는 스키마와 모델을 이용한다. 스키마로 자료의 타입, 유효성 검사를 설정해줄 수 있으며 모델을 생성한다. 후에 model은 mongoDB database의 컬렉션을 대표하는데, 이를 통해 조회, 수정, 삭제를 할 수 있다. 다만 `save()` 를 통해 삽입을 할때에는 모델 인스턴스를 통해 하면 된다.
- 로그인을 할 때에는 컬렉션에서 `findOne()`을 통해 찾고 비밀번호를 비교하고, 맞으면 jwt 토큰을 `sign()`을 통해 생성해주면 된다.
- 인증을 하기위해서는 middleware 디렉터리에 auth 미들웨어를 생성하고 이를 라우팅에서 활용하면 된다. 이 과정에서 callback 함수를 성공과 실패의 케이스로 나누어 적용해준다.
- 인증을 위해 만든 미들웨어를 로그아웃 get 요청에서 토큰을 지워주는 로직의 미들웨어 이전에 배치한다.

## Frontend by ReactJS
