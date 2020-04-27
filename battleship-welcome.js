const shipImg = document.querySelector(".img-container");
const card = document.querySelector(".card-container");
const playButton = document.querySelector(".cta-btn");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");

// Avatar for player 1
const avatarButtons1 = player1.querySelectorAll(".avatar-btn");
const mouthImg1 = player1.querySelector("#mouth-img");
const shirtImg1 = player1.querySelector("#shirt-img");
const eyesImg1 = player1.querySelector("#eyes-img");
const hatImg1 = player1.querySelector("#hat-img");

const image1 = {
  Mouth: mouthImg1,
  Shirt: shirtImg1,
  Eyes: eyesImg1,
  Hat: hatImg1,
};

// Avatar for player 2
const avatarButtons2 = player2.querySelectorAll(".avatar-btn");
const mouthImg2 = player2.querySelector("#mouth-img");
const shirtImg2 = player2.querySelector("#shirt-img");
const eyesImg2 = player2.querySelector("#eyes-img");
const hatImg2 = player2.querySelector("#hat-img");

const image2 = {
  Mouth: mouthImg2,
  Shirt: shirtImg2,
  Eyes: eyesImg2,
  Hat: hatImg2,
};

const NUM_BODY_PARTS = 2;

let currBodyParts1 = { Mouth: 1, Eyes: 1, Shirt: 1, Hat: 1 };
let currBodyParts2 = { Mouth: 2, Eyes: 2, Shirt: 2, Hat: 2 };

function cycleThrough(curr, flag) {
  let x;
  if (flag === "up") {
    x = 1;
  } else {
    x = -1;
  }
  let newNum = curr + x;
  let returnVal;
  if (newNum > NUM_BODY_PARTS) {
    returnVal = 1;
  } else if (newNum <= 0) {
    returnVal = NUM_BODY_PARTS;
  } else returnVal = newNum;
  return returnVal;
}

function cycleBodyPart(currBodyParts, partEl, bodyPart, upDown) {
  currBodyParts[bodyPart] = cycleThrough(currBodyParts[bodyPart], upDown);
  partEl.src = `./assets/avatar/${bodyPart}s/${bodyPart}${currBodyParts[bodyPart]}.png`;
}

avatarButtons1.forEach((btn) => {
  //console.log(btn.classList[0].split("-")[0]);
  btn.addEventListener("click", () => {
    let part = btn.classList[0].split("-")[0];
    let upDown = btn.classList[0].split("-")[1];
    cycleBodyPart(currBodyParts1, image1[part], part, upDown);
  });
});

avatarButtons2.forEach((btn) => {
  btn.addEventListener("click", () => {
    let part = btn.classList[0].split("-")[0];
    let upDown = btn.classList[0].split("-")[1];
    cycleBodyPart(currBodyParts2, image2[part], part, upDown);
  });
});

let tl = gsap.timeline();

// tl.fromTo(
//   shipImg,
//   { x: "-100%" },
//   { x: "0%", duration: 2, ease: Power1.easeInOut }
// );

// tl.fromTo(
//   shipImg,
//   { height: "0%" },
//   { height: "100%", ease: Power2.easiInOut, duration: 1.5 }
// );

// tl.fromTo(card, { opacity: 0 }, { opacity: 1, duration: 1.5 });

playButton.addEventListener("click", () => {
  window.location = "./battleship-setup.html";
});
