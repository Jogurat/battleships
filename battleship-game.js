const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const player1_avatar = player1.querySelector(".player-avatar");
const player2_avatar = player2.querySelector(".player-avatar");
const player1_name = player1.querySelector("span");
const player2_name = player2.querySelector("span");

const user1 = JSON.parse(localStorage.getItem("user1"));
const user2 = JSON.parse(localStorage.getItem("user2"));
let avatar1 = JSON.parse(user1.avatar);
let avatar2 = JSON.parse(user2.avatar);
player1_name.innerText = user1.username;
player2_name.innerText = user2.username;

player1_avatar.innerHTML = avatar1;
player2_avatar.innerHTML = avatar2;
