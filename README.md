# jwt-mongodb
Jwt-mongodb

prerequisite
Docker images : node,mongo db 

docker compose up 

if not using docker 

npm install 

node server.js 

url : http://localhost:8080

Please follow postman collection which i uploaded to repo 
Here is the list of api's for for get all training

{{host}}/api/training/getall?limit=10&order=1

{{host}}/api/training/getall?limit=10&order=1&subjects=Finance #Based on subjects 
 
{{host}}/api/training/getall?limit=10&order=1&types=Detailed #Based on Types 

{{host}}/api/training/getall?limit=10&order=1&stream=Commerce #Based on stream



