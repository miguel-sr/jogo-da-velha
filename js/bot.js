var player = window.location.search;
player = player.replace('?', '');

let disableBot = false;

var pos = [
  [document.getElementById('pos-0'), 0],
  [document.getElementById('pos-1'), 0],
  [document.getElementById('pos-2'), 0],
  [document.getElementById('pos-3'), 0],
  [document.getElementById('pos-4'), 0],
  [document.getElementById('pos-5'), 0],
  [document.getElementById('pos-6'), 0],
  [document.getElementById('pos-7'), 0],
  [document.getElementById('pos-8'), 0]
]

var storage = window.localStorage;
if (storage.length < 2) {
  storage.setItem('xPoint', 0);
  storage.setItem('oPoint', 0);
}

var xSpan = document.getElementById('xSpan');
var oSpan = document.getElementById('oSpan');
var icon;

if (player === 'O' || player === 'o') {
  icon = 'url(images/o-icon.svg)';
  xSpan.src = 'images/x-icon-unselected.svg';
  oSpan.src = 'images/o-icon.svg';
} else {
  icon = 'url(images/x-icon.svg)';
  oSpan.src = 'images/o-icon-unselected.svg';
  xSpan.src = 'images/x-icon.svg';
}

function changePlayer(index) {
  if (player === 'O' || player === 'o') {
    player = 'x';
    oSpan.src = 'images/o-icon-unselected.svg';
    xSpan.src = 'images/x-icon.svg';
    icon = 'url(images/x-icon.svg)';
  } else {
    player = 'o';
    xSpan.src = 'images/x-icon-unselected.svg';
    oSpan.src = 'images/o-icon.svg';
    icon = 'url(images/o-icon.svg)';
    if (disableBot != true) {
      bot(index);
    }
  }
}

// Verifica se alguém venceu o jogo
function check() {
  // Primeira linha
  if (pos[0][0] == pos[1][0] && pos[1][0] == pos[2][0]) {
    if (pos[0][0] == 'url(images/x-icon.svg)') {
      points('xPoint');
      indicator('1l');
      disableAll();
    } else {
      points('oPoint');
      indicator('1l');
      disableAll();
    }
  }

  // Segunda linha
  else if (pos[3][0] == pos[4][0] && pos[4][0] == pos[5][0]) {
    if (pos[3][0] == 'url(images/x-icon.svg)') {
      points('xPoint');
      indicator('2l');
      disableAll();
    } else {
      points('oPoint');
      indicator('2l');
      disableAll();
    }
  } 

  // Terceira linha
  else if (pos[6][0] == pos[7][0] && pos[7][0] == pos[8][0]) {
    if (pos[6][0] == 'url(images/x-icon.svg)') {
      points('xPoint');
      indicator('3l');
      disableAll();
    } else {
      points('oPoint');
      indicator('3l');
      disableAll();
    }
  }

  // Primeira coluna
  else if (pos[0][0] == pos[3][0] && pos[3][0] == pos[6][0]) {
    if (pos[0][0] == 'url(images/x-icon.svg)') {
      points('xPoint');
      indicator('1c');
      disableAll();
    } else {
      points('oPoint');
      indicator('1c');
      disableAll();
    }
  } 

  // Segunda coluna
  else if (pos[1][0] == pos[4][0] && pos[4][0] == pos[7][0]) {
    if (pos[1][0] == 'url(images/x-icon.svg)') {
      points('xPoint');
      indicator('2c');
      disableAll();      
    } else {
      points('oPoint');
      indicator('2c');
      disableAll();
    }
  } 

  // Terceira coluna
  else if (pos[2][0] == pos[5][0] && pos[5][0] == pos[8][0]) {
    if (pos[2][0] == 'url(images/x-icon.svg)') {
      points('xPoint');
      indicator('3c');
      disableAll();
    } else {
      points('oPoint');
      indicator('3c');
      disableAll();
    }
  } 

  // Diagonais 
  else if (pos[0][0] == pos[4][0] && pos[4][0] == pos[8][0]) {
    if (pos[0][0] == 'url(images/x-icon.svg)') {
      points('xPoint');
      indicator('1d');
      disableAll();
    } else {
      points('oPoint');
      indicator('1d');
      disableAll();
    }
  } 

  else if (pos[2][0] == pos[4][0] && pos[4][0] == pos[6][0]) {
    if (pos[2][0] == 'url(images/x-icon.svg)') {
      points('xPoint');
      indicator('2d');
      disableAll();
    } else {
      points('oPoint');
      indicator('2d');
      disableAll();
    }
  }

  // Velha
  else if (pos[0][1] == pos[1][1] && pos[1][1] == pos[2][1] && pos[2][1] == pos[3][1] && pos[3][1] == pos[4][1] && pos[4][1] == pos[5][1] && pos[5][1] == pos[6][1] && pos[6][1] == pos[7][1] && pos[7][1] == pos[8][1]) {
    pos[0][1] == 1 ? window.location.href = 'gameWithBot.html' : undefined;
  }
}

// Insere a forma (X || O) na posição clicada
let insert = index => {
  pos[index][0].style.background = icon + ', var(--square-background-color)';
  pos[index][0].style.backgroundRepeat = 'no-repeat';
  pos[index][0].style.backgroundPosition = 'center';
  pos[index][0].style.backgroundSize = '70%';
  pos[index][0] = icon;
  pos[index][1] = 1;
}

var filledPositions = [];

function bot(index) {
  filledPositions.push(index);
  let random = Math.round(Math.random() * 8);
  if (filledPositions.indexOf(random) < 0) {
    setTimeout(function() {
      pos[random][0].click();
      filledPositions.push(random);
    }, 500)
  } else {
    bot();
  }
}

function disableAll() {
  indicator = null;
  insert = null;
  disableBot = true;
}

let indicator = function(line) {
  let indicator = document.getElementById('indicator-line');
  switch (line) {
    case '1l':
      indicator.style.top = '110px';
      indicator.style.width = '350px';
      indicator.style.transform = 'scale(1) rotate(0deg)';
      indicator.style.transition = 'width .5s';
      break;
    
    case '2l':
      indicator.style.width = '350px';
      indicator.style.transform = 'scale(1) rotate(0deg)';
      indicator.style.transition = 'width .5s';
      break;

    case '3l':
      indicator.style.top = '330px';
      indicator.style.width = '350px';
      indicator.style.transform = 'scale(1) rotate(0deg)';
      indicator.style.transition = 'width .5s';
      break;
      
    case '1c':
      indicator.style.left = '-60px';
      indicator.style.width = '350px';
      indicator.style.transform = 'scaleY(1) rotate(90deg)';
      indicator.style.transition = 'transform .5s';
      break;

    case '2c':
      indicator.style.width = '350px';
      indicator.style.transform = 'scaleY(1) rotate(90deg)';
      indicator.style.transition = 'transform .5s';
      break;

    case '3c':
      indicator.style.left = '160px';
      indicator.style.width = '350px';
      indicator.style.transform = 'scaleY(1) rotate(90deg)';
      indicator.style.transition = 'transform .5s';
      break;

    case '1d':
      indicator.style.width = '350px';
      indicator.style.transform = 'scale(1.35) rotate(45deg)';
      indicator.style.transition = 'width .5s';
      break;

    case '2d':
      indicator.style.width = '350px';
      indicator.style.transform = 'scale(1.35) rotate(135deg)';
      indicator.style.transition = 'width .5s';
      break;
  }

  // Aguarda 1 segundo até recarregar a página e zerar as posições
  setTimeout(function() {
    window.location.href = 'gameWithBot.html';
  }, 1000);
}

// Chama as funções a cada click
for (let index = 0; index < pos.length; index++) {
  pos[index][0].onclick = function() {
    insert(index);
    check();
    changePlayer(index);
  }
}

// Atualiza a pontuação no placar 
function points(points) {
  storage.setItem(points, parseInt(storage.getItem(points)) + 1);
}


document.getElementById('xPoint').innerHTML = storage.getItem('xPoint');
document.getElementById('oPoint').innerHTML = storage.getItem('oPoint');