//import { fieldAt } from "./battleship-setup.js";

const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");

const player1_avatar = player1.querySelector(".player-avatar");
const player2_avatar = player2.querySelector(".player-avatar");

const player1_name = player1.querySelector("span");
const player2_name = player2.querySelector("span");

const player1_fields = player1.querySelectorAll(".column");
const player2_fields = player2.querySelectorAll(".column");
const player1_arrow = player1.querySelector(".arrow");
const player2_arrow = player2.querySelector(".arrow");

const modal = document.querySelector(".modal-container");
const modal_avatar = modal.querySelector(".player-avatar");
const modal_name = modal.querySelector("span");
const restartBtn = modal.querySelector("button");

const user1 = JSON.parse(localStorage.getItem("user1"));
const user2 = JSON.parse(localStorage.getItem("user2"));

const player1_ships = user1.selectedShips;
const player2_ships = user2.selectedShips;

let avatar1 = JSON.parse(user1.avatar);
let avatar2 = JSON.parse(user2.avatar);
player1_name.innerText = user1.username;
player2_name.innerText = user2.username;

player1_avatar.innerHTML = avatar1;
player2_avatar.innerHTML = avatar2;

let player1_hits = 0;
let player2_hits = 0;

function fieldAt(fields, i, j) {
  return fields[i * 10 + j];
}

// For the given index in array, returns the matrix row and column
function indexToRowCol(index) {
  return [Math.floor(index / 10), index % 10];
}

function initFields() {
  // Initiliaze fields for player1
  player1_arrow.classList.add("hidden");
  //player2_arrow.classList.add("hidden");

  player1_ships.forEach((shipSize) => {
    shipSize.ships.forEach((ship) => {
      ship.forEach((coord) => {
        fieldAt(player1_fields, coord.row, coord.col).classList.add("ship");
      });
    });
  });
  player2_ships.forEach((shipSize) => {
    shipSize.ships.forEach((ship) => {
      ship.forEach((coord) => {
        fieldAt(player2_fields, coord.row, coord.col).classList.add("ship");
      });
    });
  });
}

initFields();

let player1_turn = true;

function toggleTurn() {
  if (!player1_turn) {
    player1_arrow.classList.add("hidden");
    player2_arrow.classList.remove("hidden");

    player1_fields.forEach((field) => {
      field.classList.remove("hidden");
    });

    player2_fields.forEach((field) => {
      field.classList.add("hidden");
    });
  } else {
    //player1Curtain.classList.add("hidden");
    player2_arrow.classList.add("hidden");
    player1_arrow.classList.remove("hidden");

    player2_fields.forEach((field) => {
      field.classList.remove("hidden");
    });
    player1_fields.forEach((field) => {
      field.classList.add("hidden");
    });
  }
  player1_turn = !player1_turn;
}

// toggleTurn();

function markShipHit(fields, ships, row, col) {
  ships.forEach((sizes) => {
    sizes.ships.forEach((ship) => {
      let wasHit = false;
      ship.forEach((coord) => {
        console.log(row, col);
        if (coord.row === row && coord.col === col) {
          coord.isHit = true;
          wasHit = true;
        }
      });
      if (wasHit) {
        let wholeShipHit = true;
        for (let coord of ship) {
          if (!coord.isHit) {
            console.log("lmao");
            wholeShipHit = false;
            break;
          }
        }
        if (wholeShipHit) {
          //ship.push({ isHit: true });
          for (let coord of ship) {
            console.log(coord.row, coord.col);
            fieldAt(fields, coord.row, coord.col).classList.add("whole");
          }
        }
      }
    });
  });
}

function checkIsShip(field) {
  if (field.classList.contains("ship")) {
    return true;
  } else {
    return false;
  }
}

function onMouseClick(e) {
  let [row, col] = indexToRowCol(e.target.index);
  if (checkIsShip(e.target)) {
    // Ship is hit
    e.target.classList.remove("hidden");
    e.target.classList.add("hit");
    let ships;
    let fields;
    let test;

    if (player1_turn) {
      ships = player2_ships;
      fields = player2_fields;
      player1_hits++;
    } else {
      ships = player1_ships;
      fields = player1_fields;
      player2_hits++;
    }
    // TODO change back condition to 20 instead of 1
    if (player1_hits === 20) {
      // show modal for player 1 as winner
      modal_avatar.innerHTML = avatar1;
      modal_name.innerText = user1.username;
      modal.classList.remove("hidden");
    } else if (player2_hits === 20) {
      // show modal for player 2 as winner
      modal_avatar.innerHTML = avatar2;
      modal_name.innerText = user2.username;
      modal.classList.remove("hidden");
    }

    markShipHit(fields, ships, row, col);
  } else {
    e.target.classList.add("missed");
    toggleTurn();
  }
}

function updateHitShips() {}

player1_fields.forEach((field, index) => {
  field.index = index;
  field.addEventListener("click", onMouseClick);
});

player2_fields.forEach((field, index) => {
  field.index = index;
  field.addEventListener("click", onMouseClick);
});

restartBtn.addEventListener("click", () => {
  window.location = "/battleship-welcome.html";
  localStorage.clear();
});

//init state
player1_fields.forEach((field) => {
  field.classList.remove("hidden");
});

player2_fields.forEach((field) => {
  field.classList.add("hidden");
});
