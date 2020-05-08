const shipImg = document.querySelector(".img-container");
const card = document.querySelector(".card-container");
const playButton = document.querySelector(".cta-btn");
const toast = document.querySelector(".toast");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const username1 = document.querySelector("#username1");
const username2 = document.querySelector("#username2");

// Avatar for player 1
const avatarButtons1 = player1.querySelectorAll(".avatar-btn");
const mouthImg1 = player1.querySelector("#mouth-img");
const shirtImg1 = player1.querySelector("#shirt-img");
const eyesImg1 = player1.querySelector("#eyes-img");
const hatImg1 = player1.querySelector("#hat-img");
const avatar1 = player1.querySelector(".avatar-container");
const randomBtn1 = player1.querySelector("#player1-random-btn");
const player1Images = player1.querySelectorAll("img");

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
const avatar2 = player2.querySelector(".avatar-container");
const randomBtn2 = player2.querySelector("#player2-random-btn");
const player2Images = player2.querySelectorAll("img");

const image2 = {
  Mouth: mouthImg2,
  Shirt: shirtImg2,
  Eyes: eyesImg2,
  Hat: hatImg2,
};

const NUM_BODY_PARTS = 4;

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

function serializeAvatar(avatar) {
  let domEl = avatar.cloneNode(true);
  domEl.classList.add("page2");
  JSON.stringify(domEl);
}

serializeAvatar(avatar1);

function getRandomNumInRange(min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

avatarButtons1.forEach((btn) => {
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

// REGEX

const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;

let user1 = {},
  user2 = {};
playButton.addEventListener("click", () => {
  if (
    usernameRegex.test(username1.value) &&
    usernameRegex.test(username2.value)
  ) {
    console.log(JSON.stringify(avatar1.outerHTML));
    avatar1.classList.add("page2");
    avatar2.classList.add("page2");
    user1.avatar = JSON.stringify(avatar1.outerHTML);
    user2.avatar = JSON.stringify(avatar2.outerHTML);
    user1.username = username1.value;
    user2.username = username2.value;
    console.log(JSON.stringify(user1));
    // console.log(JSON.parse(user1));
    localStorage.setItem("user1", JSON.stringify(user1));
    localStorage.setItem("user2", JSON.stringify(user2));
    window.location = "./battleship-setup.html";
  } else {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
});

randomBtn1.addEventListener("click", () => {
  player1Images.forEach((img) => {
    let src = img.src;
    if (src.includes("Body")) return;
    let random = getRandomNumInRange(1, NUM_BODY_PARTS);
    let str = random + ".png";
    img.src = img.src.replace(/.\.png/, str);
  });
});

randomBtn2.addEventListener("click", () => {
  player2Images.forEach((img) => {
    let src = img.src;
    if (src.includes("Body")) return;
    let random = getRandomNumInRange(1, NUM_BODY_PARTS);
    let str = random + ".png";
    img.src = img.src.replace(/.\.png/, str);
  });
});
