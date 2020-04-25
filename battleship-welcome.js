const shipImg = document.querySelector(".img-container");
const card = document.querySelector(".card-container");
const playButton = document.querySelector(".cta-btn");
// console.log(shipImg);
//gsap.fromTo(shipImg, { height: "0%" }, { height: "100%", duration: 1 });

let tl = gsap.timeline();

// tl.fromTo(
//   shipImg,
//   { x: "-100%" },
//   { x: "0%", duration: 2, ease: Power1.easeInOut }
// );

tl.fromTo(
  shipImg,
  { height: "0%" },
  { height: "100%", ease: Power2.easiInOut, duration: 1.5 }
);

tl.fromTo(card, { opacity: 0 }, { opacity: 1, duration: 1.5 });

playButton.addEventListener("click", () => {
  window.location = "./battleship-game.html";
});
