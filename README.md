# Duo 
💠 1학년 겨울방학으로 백엔드의 이해도를 높이기 위해서 개발하게 된 정말 간단한 REST API만으로 제작한 SNS의 프로필을 제작하고 볼 수 있는 프로젝트입니다.
- 🙋‍♂️안드로이드 : 대구소프트웨어고등학교 1학년 박진 - Kotlin (https://github.com/flaw5886)
- 🙋‍♂️서버 : 대구소프트웨어고등학교 1학년 제정민 - NodeJS (https://github.com/jjmin321)

- 운영체제 

- 개발 스택
  - NodeJS 12.18.3
  - Express framework
  - MySQL

- 개발 도구
  - Visual studio Code

## UI/UX
<div>
<img width="160" src="https://user-images.githubusercontent.com/52072077/76144473-3a86f100-60c4-11ea-89b6-01aa1839b138.jpg"></img>
<img width="160" src="https://user-images.githubusercontent.com/52072077/76144474-3c50b480-60c4-11ea-8591-37573a623b46.jpg"></img>
<img width="160" src="https://user-images.githubusercontent.com/52072077/76144476-3fe43b80-60c4-11ea-97c2-fc344959b457.jpg"></img>
<img width="160" src="https://user-images.githubusercontent.com/52072077/76144477-407cd200-60c4-11ea-801f-601757386f0b.jpg"></img>
<img width="160" src="https://user-images.githubusercontent.com/52072077/76144478-41adff00-60c4-11ea-91c2-545b44986dc1.jpg"></img>
</div>

<div>
<img width="160" src="https://user-images.githubusercontent.com/52072077/76144479-41adff00-60c4-11ea-9c67-77f9fa2cf96e.jpg"></img>
<img width="160" src="https://user-images.githubusercontent.com/52072077/76144480-42469580-60c4-11ea-8ed8-4747245d37b3.jpg"></img>
<img width="160" src="https://user-images.githubusercontent.com/52072077/76144481-42df2c00-60c4-11ea-8924-c251f0cc057a.jpg"></img>
<img width="160" src="https://user-images.githubusercontent.com/52072077/76144482-4377c280-60c4-11ea-879e-7f60b7309798.jpg"></img>
<img width="160" src="https://user-images.githubusercontent.com/52072077/76144484-44105900-60c4-11ea-86d5-4bf2a501d46b.jpg"></img>
</div>

## API - FUNCTION

### @GET /api/admin/user-list
- Request : headers[key : authorization, value : Bearer (JSONWEBTOKEN)]
- Response : 유저 목록

### @GET /api/users/check-id
- Request : id (query string)
- Response : 해당 아이디의 사용 가능 여부

### @GET /api/users/profile
- Request : headers[key : authorization, value : Bearer (JSONWEBTOKEN)], id[검색할 유저의 아이디](query string)
- Response : 해당 아이디의 유저 프로필, 프로필 사진이 있는 URL

### @POST /api/users/sign-in
- Request : id, pw (query string)
- Response : 해당 유저 정보에 맞는 JSON WEB TOKEN, 유저 데이터

### @POST /api/users/sign-up
- Request : id, pw, name, description (query string)
- Response : 회원가입 성공 여부

### @POST /api/users/upload-profile
- Request : headers[key : authorization, value : Bearer (JSONWEBTOKEN)], form-data[key : users_image, value : file]
- Response : 프로필 사진 업로드 성공 여부

### @POST /api/posts/addpost
- Request : headers[key: authrization, value : Bearer (JSONWEBTOKEN)], title(query string), description(query string)
- Response : 게시물 등록 성공 여부

### @PUT/api/users/alter/pw
- Request : want (query string) + headers[key : authorization, value : Bearer (JSONWEBTOKEN)]
- Response : 비밀번호 변경 성공 여부

### @PUT/api/users/alter/name
- Request : want (query string) + headers[key : authorization, value : Bearer (JSONWEBTOKEN)]
- Response : 이름 변경 성공 여부

### @PUT/api/users/alter/description
- Request : want (query string) + headers[key : authorization, value : Bearer (JSONWEBTOKEN)]
- Response : 자기소개 변경 성공 여부

### @DELETE /api/users/delete
- Request : headers[key : authorization, value : Bearer (JSONWEBTOKEN)]
- Response : 회원탈퇴 성공 여부
