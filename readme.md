To build:
grunt build

To test deploy:
change env.js to be 'stage' in faeriadecks-server and restart server

To deploy:
git subtree push --prefix dist origin live
ssh to prod & git pull

If server needs restart
Look for the process on port 9005 using: netstat -tulpn
kill #PID
nohup node app &
sudo service apache2 restart


todo:

proper card ids
map images->cards
card image generator
notes
cost curve graphs
ensure unique hashes

deck index
star-rating
comments
login/register
deck owner
deck list
deleting
