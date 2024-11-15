
window.addEventListener("load", function () {
  const elm = document.querySelectorAll(".scroll_animation");
  console.log(screen.width);
  const scroll = window.scrollY;
  if (scroll > 500 && screen.width > 960) {
    for (let i = 0; i < elm.length; i++) {
      elm[i].style.opacity = "1";
      elm[i].style.zIndex = "1";
    }
  } else if (screen.width > 960) {
    for (let i = 0; i < elm.length; i++) {
      elm[i].style.opacity = "0";
      elm[i].style.zIndex = "-1";
    }
  }
});

window.addEventListener("scroll", function () {
  const elm = document.querySelectorAll(".scroll_animation");
  console.log(screen.width);
  const scroll = window.scrollY;
  if (scroll > 500 && screen.width > 960) {
    for (let i = 0; i < elm.length; i++) {
      elm[i].style.opacity = "1";
      elm[i].style.zIndex = "1";
    }
  } else if (screen.width > 960) {
    for (let i = 0; i < elm.length; i++) {
      elm[i].style.opacity = "0";
      elm[i].style.zIndex = "-1";
    }
  }
});

const imgs = document.querySelectorAll(".slide");
let imgN = 1;
function changeImg() {
  imgs[imgN].classList.remove("active");
  imgN = (imgN+1) % imgs.length;
  imgs[imgN].classList.add("active");
}
setInterval(() => {
  changeImg();
}, 2000);