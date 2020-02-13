var socket = io();

function buttonInput () //passes hand value from client to server
{
  var rock = document.getElementById('rock');
  var paper = document.getElementById('paper');
  var scissors = document.getElementById('scissors');

  rock.addEventListener('click', function()
  {
    socket.emit('hand', 'rock');
  });
  paper.addEventListener('click', function()
  {
    socket.emit('hand', 'paper');
  });
  scissors.addEventListener('click', function()
  {
    socket.emit('hand', 'scissors');
  });
}
buttonInput();

//function to append html file to display info to user
function messageDisplay(message)
{
  var msgElement = document.createElement('div');
  msgElement.innerText = message;
  container.append(msgElement);
}
function pickedChoice(message)
{
  var msgElement = document.createElement('div');
  msgElement.innerText = "You picked: " + message;
  container.append(msgElement);
}
function p1Choice(message)
{
  var msgElement = document.createElement('div');
  msgElement.innerText = "Player 1 chose: " + message;
  container.append(msgElement);
}
function p2Choice(message)
{
  var msgElement = document.createElement('div');
  msgElement.innerText = "Player 2 chose: " + message;
  container.append(msgElement);
}

//recieve input from server
socket.on('display', messageDisplay)
socket.on('choice', pickedChoice)
socket.on('player1p', p1Choice)
socket.on('player2p', p2Choice)
