var gameOfLife = {
  width: 30,
  height: 30, // width and height dimensions of the board
  stepInterval: null, // should be used to hold reference to an interval that is "playing" the game

  //UI
    createAndShowBoard: function() {
      // create <table> element
      var goltable = document.createElement('tbody');

      // build Table HTML
      var tablehtml = '';
      for (var h = 0; h < this.height; h++) {
        tablehtml += `<tr id='row+${h}'>`; //es6 template strings
        for (var w = 0; w < this.width; w++) {
          tablehtml += `<td data-status='dead' id='${w}-${h}'></td>`; //es6 template strings
        }
        tablehtml += `</tr>`; //es6 template strings
      }
      goltable.innerHTML = tablehtml;

      // add table to the #board element
      var board = document.getElementById('board');
      board.appendChild(goltable);

      // once html elements are added to the page, attach events to them
      this.setupBoardEvents();
    },

    forEachCell: function(iteratorFunc) {
      var cell;
      for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
          cell = document.getElementById(`${j}-${i}`);
          iteratorFunc(cell, i, j);
        }
      }
    },

    //Game
    setupBoardEvents: function() {
      var onCellClick = function() {
        if (this.dataset.status == 'dead') {
          this.className = 'alive';
          this.dataset.status = 'alive';
        } else {
          this.className = 'dead';
          this.dataset.status = 'dead';
        }
      };

      var clearCell = function(cell) {
        if (gameOfLife.stepInterval) {
          console.log(gameOfLife.stepInterval);
          clearInterval(gameOfLife.stepInterval);
          this.stepInterval = null;
        }
        gameOfLife.forEachCell(function(cell) {
          cell.className = 'dead';
          cell.dataset.status = 'dead';
        });
      };

      // putting cells on board
      window.board.addEventListener('click', (event) => onCellClick.call(event.target));
      //step button
      window.step_btn.addEventListener('click', e => this.step())
      // autoplay button
      window.play_btn.addEventListener('click', (e) => this.enableAutoPlay());
      // pause button
      window.pause_btn.addEventListener('click', (e) => this.pause());
      // clear button
      window.clear_btn.addEventListener('click', (e) => clearCell());
      // randomize
      window.reset_btn.addEventListener('click', (e) => this.randomize());

    },

    randomize: function() {
      gameOfLife.forEachCell(function(cell) {
        var rand = Math.round(Math.random());
        if (rand === 0) {
          cell.className = 'dead';
          cell.dataset.status = 'dead';
        } else {
          cell.className = 'alive';
          cell.dataset.status = 'alive';
        }
      });
    },

    step: function() {
      var queue = [];
      gameOfLife.forEachCell(function(cell, i, j) {
        var counter = 0;
        for (var e = -1; e < 2; e++) {
          for (var l = -1; l < 2; l++) {
            var neighbor = document.getElementById((i + e) + '-' + (j + l));
            if (neighbor && neighbor !== cell) {
              if (neighbor.className === 'alive') {
                counter++;
              }
            }
          }
        }

        if (counter === 3) {
          queue.push('alive');
        }
        else if (cell.className === 'alive' && counter === 2) {
          queue.push('alive');
        }
        else {
          queue.push('dead');
        }
      });

      gameOfLife.forEachCell(function(cell) {
        var status = queue.shift();
        if (status === 'alive') {
          cell.className = 'alive';
        } else {
          cell.className = 'dead';
          cell.dataset.status = 'dead';
        }
      });
    },

    enableAutoPlay: function() {
      // Start Auto-Play by running the 'step' function
      // automatically repeatedly every fixed time interval
      gameOfLife.stepInterval = setInterval(() => this.step(), 200)
    },

    pause: function() {
      clearInterval(gameOfLife.stepInterval)
      gameOfLife.stepInterval = null;
    }
  };


  gameOfLife.createAndShowBoard();
