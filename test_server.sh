chmod +x install.sh

sudo ./install.sh


# 1. Run the user’s server execution steps which will bring up the server

# 2. We’ll be running your server_run.sh as a background process (using &) so that we can run the next set of commands

chmod +x server_run.sh

./server_run.sh &


# 3. Add a sleep timer to sleep.sh depending upon how long you want to sleep so that the server is ready.

chmod +x sleep.sh

./sleep.sh



curl -X GET "http://localhost:8080/memes" -H  "accept: application/json"


curl -X POST "http://localhost:8080/memes" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"name\": \"me\",  \"caption\": \"oh yeh\",  \"url\": \"ascds.com\"}"