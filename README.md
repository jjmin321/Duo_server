# Duo 

## API


> @GET
/api/admin/user-list
- Request : X
- Response : 유저 목록

/api/admin/check-jwt
- Request : jwt 토큰
- Response : 해당 토큰 정보

/api/users/check-id
- Request : id (query string)
- Response : 사용 가능 여부

> @POST
/api/users/sign-in
- Request : id, pw (query string)
- Response : jwt 토큰 , 로그인 성공 여부

/api/users/sign-up
- Request : id, pw, name, description (query string)
- Response : 회원가입 성공 여부

> @PUT
/api/users/alter/pw
- Request : now, want (query string)
- Response : 비밀번호 변경 성공 여부

/api/users/alter/name
- Request : now, want (query string)
- Response : 이름 변경 성공 여부

/api/users/alter/description
- Request : now, want (query string)
- Response : 자기소개 변경 성공 여부

> @DELETE
/api/users/delete