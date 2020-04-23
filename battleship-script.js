const fields = document.querySelectorAll(".column");
const rows = document.querySelectorAll(".row");
let firstClickedField;
let wasMouseDown = false;

const selectedShips = {};

// Select field as ship
function selectAsShip(field) {
  field.style.background = "#000";

  field.isShip = true;
}

// Remove field as ship
function unselectAsShip(field) {
  field.style.background = "#fff";

  field.isShip = false;
}

function fieldAt(fields, i, j) {
  return fields[i * 10 + j];
}

function indexToRowCol(index) {
  return [Math.floor(index / 10), index % 10];
}

console.log(fieldAt(fields, 0, 1));

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
    selectAsShip(field);
    firstClickedField = field;
  });
  field.addEventListener("mouseup", () => {
    if (wasMouseDown) {
      wasMouseDown = false;
      firstClickedField = null;
    }
  });
  field.addEventListener("mouseenter", () => {
    if (field.isShip && wasMouseDown) {
      unselectAsShip(field);
      return;
    }
    // if (firstClickedField.classList.contains("row")) return;
    if (
      wasMouseDown &&
      (firstClickedField.parentElement === field.parentElement ||
        firstClickedField.col === field.col)
    ) {
      selectAsShip(field);
    }
  });
});
