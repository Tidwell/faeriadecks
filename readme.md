To build:
grunt build

To test deploy:
change env.js to be 'stage' in faeriadecks-server and restart server

To deploy:
git subtree push --prefix dist origin live
ssh to prod & git pull

If server needs restart
Look for the process on port 9000 using: netstat -tulpn
kill #PID
nohup node app &
sudo service apache2 restart