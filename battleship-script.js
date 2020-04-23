const fields = document.querySelectorAll(".column");
const rows = document.querySelectorAll(".row");
const container = document.querySelector(".container");
let firstClickedField, lastSelectedField;
let wasMouseDown = false;

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

console.log(selectedShips[1]);

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

function fieldAt(fields, i, j) {
  return fields[i * 10 + j];
}

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

// Updates invalid fields
function updateInvalidFields() {
  // console.log("pozvan");
  // console.log(fields[0]);
  // console.log(selectedShips);
  fields.forEach((field) => {
    if (!fieldIsValid(field)) {
      console.log(field);

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

// Listeners

window.addEventListener("mouseup", () => {
  if (wasMouseDown) {
    wasMouseDown = false;
    firstClickedField = null;
    //console.log(currShip);
    // Push current ship to selectedShips
    selectedShips[shipLength - 1].ships.push(currShip);
    // console.log(selectedShips);
    // console.log(currSelectedFields);
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
});

rows.forEach((row) => {
  row.addEventListener("mouseup", () => {
    // wasMouseDown = false;
    // updateInvalidFields();
    if (wasMouseDown) {
      wasMouseDown = false;
      firstClickedField = null;
      //console.log(currShip);
      // Push current ship to selectedShips
      selectedShips[shipLength - 1].ships.push(currShip);
      // console.log(selectedShips);
      // console.log(currSelectedFields);
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
  });
});

fields.forEach((field, index) => {
  [field.row, field.col] = indexToRowCol(index);
  field.addEventListener("mousedown", () => {
    //wasMouseDown = true;
    if (field.isShip) {
      unselectAsShip(field);
      return;
    }
    if (fieldIsValid(field)) {
      wasMouseDown = true;
      shipLength = 1;
      selectAsShip(field);
      currSelectedFields.push({ row: field.row, col: field.col });
    }

    firstClickedField = field;
    lastSelectedField = field;
    currShip.push({ row: field.row, col: field.col });
  });
  field.addEventListener("mouseup", () => {
    if (wasMouseDown) {
      wasMouseDown = false;
      firstClickedField = null;
      //console.log(currShip);
      // Push current ship to selectedShips
      selectedShips[shipLength - 1].ships.push(currShip);
      // console.log(selectedShips);
      // console.log(currSelectedFields);
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
  });
  field.addEventListener("mouseenter", () => {
    // if (!fieldIsValid(field)) {
    //   field.classList.add("invalid");
    // }
    // if (fieldIsValid(field)) {
    //   field.classList.remove("invalid");
    // }
    // if (field.isShip && wasMouseDown) {
    //   unselectAsShip(field);
    //   return;
    // }
    if (
      wasMouseDown &&
      areAdjecent(lastSelectedField, field) &&
      fieldIsValid(field) &&
      shipLength <= 3
    ) {
      selectAsShip(field);
      shipLength++;
      currShip.push({ row: field.row, col: field.col });
      currSelectedFields.push({ row: field.row, col: field.col });

      lastSelectedField = field;
    }
  });
});
