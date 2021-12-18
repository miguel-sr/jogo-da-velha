var player = window.location.search;
player = player.replace('?', '');

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

function changePlayer() {
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
  }
}

// Verifica se alguém venceu o jogo
function check() {
  // Primeira linha
  if (pos[0][0] == pos[1][0] && pos[1][0] == pos[2][0]) {
    if (pos[0][0] == 'url(images/x-icon.svg)') {
      storage.setItem('xPoint', parseInt(storage.getItem('xPoint')) + 1);
      indicator('1l', 'x');
      disableAll();
    } else {
      storage.setItem('oPoint', parseInt(storage.getItem('oPoint')) + 1);
      indicator('1l', 'o');
      disableAll();
    }
  }

  // Segunda linha
  else if (pos[3][0] == pos[4][0] && pos[4][0] == pos[5][0]) {
    if (pos[3][0] == 'url(images/x-icon.svg)') {
      storage.setItem('xPoint', parseInt(storage.getItem('xPoint')) + 1);
      indicator('2l', 'x');
      disableAll();
    } else {
      storage.setItem('oPoint', parseInt(storage.getItem('oPoint')) + 1);
      indicator('2l', 'o');
      disableAll();
    }
  } 

  // Terceira linha
  else if (pos[6][0] == pos[7][0] && pos[7][0] == pos[8][0]) {
    if (pos[6][0] == 'url(images/x-icon.svg)') {
      storage.setItem('xPoint', parseInt(storage.getItem('xPoint')) + 1);
      indicator('3l', 'x');
      disableAll();
    } else {
      storage.setItem('oPoint', parseInt(storage.getItem('oPoint')) + 1);
      indicator('3l', 'o');
      disableAll();
    }
  }

  // Primeira coluna
  else if (pos[0][0] == pos[3][0] && pos[3][0] == pos[6][0]) {
    if (pos[0][0] == 'url(images/x-icon.svg)') {
      storage.setItem('xPoint', parseInt(storage.getItem('xPoint')) + 1);
      indicator('1c', 'x');
      disableAll();
    } else {
      storage.setItem('oPoint', parseInt(storage.getItem('oPoint')) + 1);
      indicator('1c', 'o');
      disableAll();
    }
  } 

  // Segunda coluna
  else if (pos[1][0] == pos[4][0] && pos[4][0] == pos[7][0]) {
    if (pos[1][0] == 'url(images/x-icon.svg)') {
      storage.setItem('xPoint', parseInt(storage.getItem('xPoint')) + 1);
      indicator('2c', 'x');
      disableAll();      
    } else {
      storage.setItem('oPoint', parseInt(storage.getItem('oPoint')) + 1);
      indicator('2c', 'o');
      disableAll();
    }
  } 

  // Terceira coluna
  else if (pos[2][0] == pos[5][0] && pos[5][0] == pos[8][0]) {
    if (pos[2][0] == 'url(images/x-icon.svg)') {
      storage.setItem('xPoint', parseInt(storage.getItem('xPoint')) + 1);
      indicator('3c', 'x');
      disableAll();
    } else {
      storage.setItem('oPoint', parseInt(storage.getItem('oPoint')) + 1);
      indicator('3c', 'o');
      disableAll();
    }
  } 

  // Diagonais 
  else if (pos[0][0] == pos[4][0] && pos[4][0] == pos[8][0]) {
    if (pos[0][0] == 'url(images/x-icon.svg)') {
      storage.setItem('xPoint', parseInt(storage.getItem('xPoint')) + 1);
      indicator('1d', 'x');
      disableAll();
    } else {
      storage.setItem('oPoint', parseInt(storage.getItem('oPoint')) + 1);
      indicator('1d', 'o');
      disableAll();
    }
  } 

  else if (pos[2][0] == pos[4][0] && pos[4][0] == pos[6][0]) {
    if (pos[2][0] == 'url(images/x-icon.svg)') {
      storage.setItem('xPoint', parseInt(storage.getItem('xPoint')) + 1);
      indicator('2d', 'x');
      disableAll();
    } else {
      storage.setItem('oPoint', parseInt(storage.getItem('oPoint')) + 1);
      indicator('2d', 'o');
      disableAll();
    }
  }

  // Velha
  else if (pos[0][1] == pos[1][1] && pos[1][1] == pos[2][1] && pos[2][1] == pos[3][1] && pos[3][1] == pos[4][1] && pos[4][1] == pos[5][1] && pos[5][1] == pos[6][1] && pos[6][1] == pos[7][1] && pos[7][1] == pos[8][1]) {
    pos[0][1] == 1 ? window.location.href = 'game.html' : undefined;
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

let indicator = function(line, lastPlayer) {
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
    window.location.href = lastPlayer === 'x' ? 'game.html?o' : 'game.html?x';
  }, 1000);
}

function disableAll() {
  indicator = null;
  insert = null;
}

// Chama as funções para cada uma das posições
for (let index = 0; index < pos.length; index++) {
  pos[index][0].onclick = function() {
    insert(index);
    check();
    changePlayer();
  }
}

// Atualiza a pontuação no placar
document.getElementById('xPoint').innerHTML = storage.getItem('xPoint');
document.getElementById('oPoint').innerHTML = storage.getItem('oPoint');