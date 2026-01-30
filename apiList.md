# DevTinder APIs

  authRouter
- POST /signup
- POST /login
- POST /logout
 
  profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password
 
  connectionRequestRouter
- POST /request/send/intereted/:userId
- POST /request/send/ignored/:userId
 
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId
 
- GET /connections
- GET /requests/received
- GET /feed - Gets you the profiles fo other users on platform
 
- Status: ignore, interested, accepted, rejected