window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {
    if (!gameApp.interval) {
      gameApp.init()
    } else {
      return false
    }

  }
};

//window.onload = () => gameApp.init()
//window.onload = () => gameApp.init("#canvas")