//import { fieldAt } from "./battleship-setup.js";

const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");

const player1_avatar = player1.querySelector(".player-avatar");
const player2_avatar = player2.querySelector(".player-avatar");

const player1_name = player1.querySelector("span");
const player2_name = player2.querySelector("span");

const player1_fields = player1.querySelectorAll(".column");
const player2_fields = player2.querySelectorAll(".column");

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

function fieldAt(fields, i, j) {
  return fields[i * 10 + j];
}

// For the given index in array, returns the matrix row and column
function indexToRowCol(index) {
  return [Math.floor(index / 10), index % 10];
}

function initFields() {
  // Initiliaze fields for player1
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
  if (player1_turn) {
    player1_fields.forEach((field) => {
      field.classList.remove("hidden");
    });

    player2_fields.forEach((field) => {
      field.classList.toggle("hidden");
    });
  } else {
    player2_fields.forEach((field) => {
      field.classList.remove("hidden");
    });
    player1_fields.forEach((field) => {
      field.classList.toggle("hidden");
    });
  }
  player1_turn = !player1_turn;
}

function markShipHit(fields, ships, row, col) {
  ships.forEach((sizes) => {
    sizes.ships.forEach((ship) => {
      let wasHit = false;
      ship.forEach((coord) => {
        if (coord.row === row && coord.col === col) {
          //   console.log("hi from markasship");
          coord.isHit = true;
          wasHit = true;
        }
      });
      if (wasHit) {
        let wholeShipHit = true;
        for (let coord of ship) {
          //   console.log("coord", coord);
          if (!coord.isHit) {
            // console.log("hi");
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
  //   console.log(e.target);
  //   console.log(e.target.index);
  let [row, col] = indexToRowCol(e.target.index);
  if (checkIsShip(e.target)) {
    // Ship is hit
    e.target.classList.remove("hidden");

    let ships;
    let fields;
    if (player1_turn) {
      ships = player1_ships;
      fields = player1_fields;
    } else {
      ships = player2_ships;
      fields = player2_fields;
    }
    // console.log(ships);
    // console.log(row, col);
    markShipHit(fields, ships, row, col);
  }
}

function updateHitShips() {}

player1_fields.forEach((field, index) => {
  field.index = index;
  field.addEventListener("click", onMouseClick);
});

player2_fields.forEach((field) => {
  field.addEventListener("click", onMouseClick);
});
toggleTurn();
toggleTurn();
