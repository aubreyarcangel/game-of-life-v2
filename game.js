var gameOfLife = {
  width: 12,
  height: 12, // width and height dimensions of the board
  stepInterval: null, // should be used to hold reference to an interval that is "playing" the game

  //UI


  // Utility
  getCoordsOfCell: function(cell) {
    var cellId = cell.id; //td id property e.g. <td id='0-0'...>
    var idSplit = cellId.split('-'); // returns an array of strings['0', '0']

    return idSplit.map(function(str) {
      return parseInt(str, 10);
    });
  },

  forEachCell: function(iteratorFunc) {
    /*
      Write forEachCell here. You will have to visit
      each cell on the board, call the "iteratorFunc" function,
      and pass into func, the cell and the cell's x & y
      coordinates. For example: iteratorFunc(cell, x, y)
    */
    Array.from(document.getElementsByTagName('td')).forEach(
      function(cell) {
        var coords = this.getCoordsOfCell(cell);
        iteratorFunc(cell, coords[0], coords[1]);
      }.bind(this)
    );
    // var cell;
    // for (var i = 0; i < this.height; i++) {
    //   for (var j = 0; j < this.width; j++) {
    //     cell = document.getElementById(`${j}-${i}`);
    //     iteratorFunc(cell, i, j);
    //   }
    // }
  },

  clearCell : function(){
    if (this.getCellStatus())
  },

  getCellStatus: function(cell) {
    return cell.getAttribute('data-status');
  },

  setCellStatus: function(cell, status) {
    cell.className = status;
    cell.setAttribute('data-status', status);
  },

  //Game
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

  setupBoardEvents: function() {
    // each board cell has an CSS id in the format of: "x-y"
    // where x is the x-coordinate and y the y-coordinate
    // use this fact to loop through all the ids and assign
    // them "click" events that allow a user to click on
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"

    // clicking on a cell should toggle the cell between "alive" & "dead"
    // for ex: an "alive" cell be colored "blue", a dead cell could stay white

    // EXAMPLE FOR ONE CELL
    // Here is how we would catch a click event on just the 0-0 cell
    // You need to add the click event on EVERY cell on the board

    var onCellClick = function(e) {
      // QUESTION TO ASK YOURSELF: What is "this" equal to here?

      // how to set the style of the cell when it's clicked
      if (this.dataset.status == 'dead') {
        this.className = 'alive';
        this.dataset.status = 'alive';
      } else {
        this.className = 'dead';
        this.dataset.status = 'dead';
      }
    };

    // var cell;
    // for (var i = 0; i < this.height; i++) {
    //   for (var j = 0; j < this.width; j++) {
    //     cell = document.getElementById(`${j}-${i}`);
    //     cell.onclick = onCellClick;
    //   }
    // }

    this.forEachCell(function(cell, i, j) {
      cell.onclick = onCellClick;
    });
    // var cell00 = document.getElementById('0-0');
    // cell00.addEventListener('click', onCellClick);
  },

  step: function() {
    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game.
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells based on their alive neighbors
  },

  enableAutoPlay: function() {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval
  },
};

gameOfLife.createAndShowBoard();
