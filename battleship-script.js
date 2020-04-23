const fields = document.querySelectorAll(".column");
const rows = document.querySelectorAll(".row");
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
  field.style.background = "#000";

  field.isShip = true;
}

// Remove field as ship
function unselectAsShip(field) {
  field.ship.forEach((coord) => {
    fieldAt(fields, coord.row, coord.col).style.background = "#fff";
    fieldAt(fields, coord.row, coord.col).isShip = false;
  });
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

// Check if field is valid (no nearby ships)
function fieldIsValid(field) {
  let flag = true;
  // console.log(field.row);
  // selectedShips.forEach((shipType) => {
  //   if (!flag) return flag;
  //   shipType.ships.forEach((ship) => {
  //     if (
  //       ship.row === field.row + 1 ||
  //       ship.row === field.row - 1 ||
  //       ship.col === field.col + 1 ||
  //       ship.col === field.col - 1
  //     ) {
  //       flag = false;
  //       return flag;
  //     } else flag = true;
  //   });
  // });
  // return flag;
  for (let i = 0; i < selectedShips.length; i++) {
    for (let j = 0; j < selectedShips[i].ships.length; j++) {
      let ship = selectedShips[i].ships[j];
      // console.log("ship je: ");
      // console.log(ship);
      for (let k = 0; k < ship.length; k++) {
        // if (
        //   ship[k].row === field.row + 1 ||
        //   ship[k].row === field.row - 1 ||
        //   ship[k].col === field.col + 1 ||
        //   ship[k].col === field.col - 1
        // ) {
        //   console.log(ship[k]);
        //   flag = false;
        //   return false;
        // } else {
        //   //console.log(ship);
        //   flag = true;
        // }
        if (areAdjecent(ship[k], field)) {
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
rows.forEach((row) => {
  row.addEventListener("mouseup", () => {
    wasMouseDown = false;
  });
});

fields.forEach((field, index) => {
  [field.row, field.col] = indexToRowCol(index);
  field.addEventListener("mousedown", () => {
    wasMouseDown = true;
    if (field.isShip && wasMouseDown) {
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
      console.log(currSelectedFields);
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
  });
  field.addEventListener("mouseenter", () => {
    if (!fieldIsValid(field)) {
      field.classList.add("invalid");
    }
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
