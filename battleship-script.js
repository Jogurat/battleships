const fields = document.querySelectorAll(".column");
const rows = document.querySelectorAll(".row");
const container = document.querySelector(".container");
const availableShipsEl = document.getElementById("available-ships");
const shipAmountsEls = document.querySelectorAll(".ships");
const saveButton = document.querySelector(".save-btn");
//console.log(shipAmountsEls);
let firstClickedField, lastSelectedField;
let wasMouseDown = false;
let firstEntry = true;

let shipLength;
let currShip = [];
let currSelectedFields = [];
let totalShips = 0;
const selectedShips = [
  { maxSize: 1, maxAmount: 4, ships: [] },
  { maxSize: 2, maxAmount: 3, ships: [] },
  { maxSize: 3, maxAmount: 2, ships: [] },
  { maxSize: 4, maxAmount: 1, ships: [] },
];

//console.log(selectedShips[1]);

// Select field as ship
function selectAsShip(field) {
  //field.style.background = "#000";
  field.classList.add("ship");
  field.isShip = true;
}

// Remove field as ship
function unselectAsShip(field) {
  let deletedShip = [];
  field.ship.forEach((coord) => {
    deletedShip.push({ row: coord.row, col: coord.col });
    fieldAt(fields, coord.row, coord.col).classList.remove("ship");
    fieldAt(fields, coord.row, coord.col).isShip = false;
  });
  let newSelectedShips = selectedShips[deletedShip.length - 1].ships.filter(
    (ship) => JSON.stringify(ship) !== JSON.stringify(deletedShip)
  );
  selectedShips[deletedShip.length - 1].ships = newSelectedShips;
  //console.log("delted: ");
  //console.log(deletedShip);
  //console.log(newSelectedShips);
}

// For given matrix coords returns the field element
function fieldAt(fields, i, j) {
  return fields[i * 10 + j];
}

// For the given index in array, returns the matrix row and column
function indexToRowCol(index) {
  return [Math.floor(index / 10), index % 10];
}

function areAdjecent(field1, field2) {
  if (field1.row === field2.row) {
    if (field1.col === field2.col + 1 || field1.col === field2.col - 1) {
      return true;
    }
  } else if (field1.col === field2.col) {
    if (field1.row === field2.row + 1 || field1.row === field2.row - 1) {
      return true;
    }
  } else return false;
}

// areAdjecent but with corner support
function cornerAdjecent(field1, field2) {
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (field1.row + i === field2.row && field1.col + j === field2.col) {
        return true;
      }
    }
  }
  return false;
}

// Check if ship is straight
function checkStraight() {}

// Updates invalid fields
function updateInvalidFields() {
  // console.log("pozvan");
  // console.log(fields[0]);
  // console.log(selectedShips);
  fields.forEach((field) => {
    if (!fieldIsValid(field)) {
      //console.log(field);

      field.classList.add("invalid");
    } else {
      field.classList.remove("invalid");
    }
  });
}

// Check if field is valid (no nearby ships)
function fieldIsValid(field) {
  let flag = true;
  for (let i = 0; i < selectedShips.length; i++) {
    for (let j = 0; j < selectedShips[i].ships.length; j++) {
      let ship = selectedShips[i].ships[j];
      for (let k = 0; k < ship.length; k++) {
        if (cornerAdjecent(ship[k], field)) {
          //ovde je areAdjecent(ship[k], field)
          flag = false;
          return flag;
        } else {
          flag = true;
        }
      }
    }
  }
  return flag;
}

// Update the current amount of ships on the board
function updateAmounts() {
  selectedShips.forEach((ship, index) => {
    const div = shipAmountsEls[index];
    div.innerHTML = `<p> Size ${ship.maxSize} ships: ${ship.ships.length}/${ship.maxAmount} </p>`;
    //availableShipsEl.appendChild(div);
  });
}

// Reset board state
function resetBoard() {
  selectedShips.forEach((item) => {
    item.ships = [];
  });
  fields.forEach((field) => {
    if (field.isShip) {
      unselectAsShip(field);
    }
  });
  totalShips = 0;
  updateAmounts();
}

// Save user's selected ships in localstorage
function onSaveSelection() {
  const toSave = JSON.stringify(selectedShips);
  if (localStorage.getItem("user1-ships") === null) {
    localStorage.setItem("user1-ships", toSave);
  } else {
    localStorage.setItem("user2-ships", toSave);
  }
  resetBoard();
}

//Reset localstorage onload
function resetLocalStorage() {
  localStorage.removeItem("user1-ships");
  localStorage.removeItem("user2-ships");
}
// MouseUp event listner
function onMouseUp() {
  if (wasMouseDown) {
    wasMouseDown = false;
    firstClickedField = null;
    // Push current ship to selectedShips
    selectedShips[shipLength - 1].ships.push(currShip);
    fields.forEach((field) => {
      currSelectedFields.forEach((shipField) => {
        if (field.row === shipField.row && field.col === shipField.col) {
          field.ship = currSelectedFields;
        }
      });
    });
    currSelectedFields = [];
    currShip = [];

    totalShips++;
  }
  updateInvalidFields();
  updateAmounts();
  firstEntry = false;
}

// MouseDown event listner
function onMouseDown(e) {
  let field = e.target;
  firstEntry = true;

  //console.log("TOTAL" + totalShips);
  if (field.isShip) {
    unselectAsShip(field);
    return;
  }
  if (fieldIsValid(field)) {
    wasMouseDown = true;
    shipLength = 1;
    selectAsShip(field);
    currSelectedFields.push({ row: field.row, col: field.col });
    firstClickedField = field;
    lastSelectedField = field;
    //console.log(lastSelectedField.row);
    firstClickedField.row = field.row;
    lastSelectedField.row = field.row;

    firstClickedField.col = field.col;
    lastSelectedField.col = field.col;
    currShip.push({ row: field.row, col: field.col });
  }
}

// MouseEnter event listner
function onMouseEnter(e) {
  let field = e.target;
  let straight;
  //console.log(lastSelectedField);
  if (firstEntry && wasMouseDown) {
    //lastSelectedField = field;
    if (field.row === firstClickedField.row) {
      straight = "row";
    } else {
      straight = "col";
    }
    // console.log(straight);
  }
  if (
    wasMouseDown &&
    areAdjecent(lastSelectedField, field) &&
    fieldIsValid(field) &&
    shipLength <= 3 &&
    firstClickedField[straight] === field[straight] &&
    !field.isShip
  ) {
    selectAsShip(field);
    shipLength++;
    currShip.push({ row: field.row, col: field.col });
    currSelectedFields.push({ row: field.row, col: field.col });

    lastSelectedField = field;
  }
}

// Listeners
window.addEventListener("mouseup", onMouseUp);

rows.forEach((row) => {
  row.addEventListener("mouseup", onMouseUp);
});

fields.forEach((field, index) => {
  [field.row, field.col] = indexToRowCol(index);
  field.addEventListener("mousedown", onMouseDown);
  field.addEventListener("mouseup", onMouseUp);
  field.addEventListener("mouseenter", onMouseEnter);
});

saveButton.addEventListener("click", onSaveSelection);

updateAmounts();
resetLocalStorage();
