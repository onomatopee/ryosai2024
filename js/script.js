const path_anime1 = anime({
  targets: '#year path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  direction: 'alternate',
  loop: true
});

const img = document.getElementById("slide");
let imgN = 1;
function imgStr(imgN) {
  return "img/" + String(imgN%10) + ".jpg";
}
// document.addEventListener('DOMContentLoaded', () => {
//   img.src = imgStr(imgN);
// });
setInterval(() => {
  imgN++;
  img.src = imgStr(imgN);
}, 2000);