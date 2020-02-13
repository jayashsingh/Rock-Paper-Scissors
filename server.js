var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', 8090);
app.use('/static', express.static(__dirname + '/static'));// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});// Starts the server.
server.listen(8090, function() {
  console.log('Starting server on port 8090');
});

//declares player socket variables as null
var p1 = null;
var p2 = null;

io.on('connection', function(socket)
{
  if (p1) //verifies that p1 has been connected
  {
    p2 = socket;  //assigns 2nd socket id to p2 variable once connected

    io.emit('display', "Connection between both players established.");
    start (p1, p2); //passes socket parameters
  }
  else
  {
    p1 = socket; //assigns 1st socket id to p1 variable
    io.emit('display', "Waiting for your opponent.");
  }

  function start (one, two)
  {
    var players = [one, two]; //declares player array
    var choice = [null, null];  //declares player choice array

    players.forEach((player, i) =>  //iterates through each index for player array
    {
      player.on('hand', function(hand)  //listens for socket hand choice input
      {
        choice[i] = hand; //assigns hand choice to specific choice index

        player.emit('choice', choice[i]); //informs user of their choice
        player.emit('display', 'Waiting for the opponent decision.');

        play (choice);  //calls play function to excute game functions
      });
    });
  }

  function play (choice)
  {
    //ensures both players have selected a hand
    if (choice[0] && choice[1])
    {
      //if else statements to determine winner
      if (choice[0] == 'rock' && choice[1] == 'scissors')
      {
        io.emit('display', 'The winner is player 1!');
        io.emit('player1p', choice[0]);
        io.emit('player2p', choice[1]);
      }
      else if (choice[0] == 'paper' && choice[1] == 'rock')
      {
        io.emit('display', 'The winner is player 1!');
        io.emit('player1p', choice[0]);
        io.emit('player2p', choice[1]);
      }
      else if (choice[0] == 'scissors' && choice[1] == 'paper')
      {
        io.emit('display', 'The winner is player 1!');
        io.emit('player1p', choice[0]);
        io.emit('player2p', choice[1]);
      }
      else if (choice[0] == 'rock' && choice[1] == 'rock')
      {
        io.emit('display', 'The round was a tie!');
        io.emit('player1p', choice[0]);
        io.emit('player2p', choice[1]);
      }
      else if (choice[0] == 'paper' && choice[1] == 'paper')
      {
        io.emit('display', 'The round was a tie!');
        io.emit('player1p', choice[0]);
        io.emit('player2p', choice[1]);
      }
      else if (choice[0] == 'scissors' && choice[1] == 'scissors')
      {
        io.emit('display', 'The round was a tie!');
        io.emit('player1p', choice[0]);
        io.emit('player2p', choice[1]);
      }
      else
      {
        io.emit('display', 'The winner is player 2!');
        io.emit('player1p', choice[0]);
        io.emit('player2p', choice[1]);
      }
      io.emit('display', 'You can play again!');
      io.emit('display', '*******************');
      //resets the choices to null to allow for new game
      choice[0] = null;
      choice[1] = null;
    }
  }
});
