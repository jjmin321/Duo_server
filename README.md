# Duo 

## API

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
- Response : 해당 유저 정보에 맞는 JSON WEB TOKEN

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