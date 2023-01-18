// Layout Logic
const navbar = document.querySelector("#nav");
const navBtn = document.querySelector("#nav-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("#sidebar");
const date = document.querySelector("#date");
// add fixed class to navbar
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 80) {
    navbar.classList.add("navbar-fixed");
  } else {
    navbar.classList.remove("navbar-fixed");
  }
});
// show sidebar
navBtn.addEventListener("click", function () {
  sidebar.classList.add("show-sidebar");
});
closeBtn.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
});
// set year
date.innerHTML = new Date().getFullYear();

// Textarea counter
var el_t = document.getElementById("message");
var length = el_t.getAttribute("maxlength");
var el_c = document.getElementById("count");
el_c.innerHTML = length;
el_t.onkeyup = function () {
  document.getElementById("count").innerHTML = length - this.value.length;
};
// Captcha Script
var captcha;
function generate() {
  // Clear old input
  document.getElementById("submit").value = "";

  // Access the element to store
  // the generated captcha
  captcha = document.getElementById("image");
  var uniquechar = "";

  const randomchar =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Generate captcha for length of
  // 5 with random character
  for (let i = 1; i < 5; i++) {
    uniquechar += randomchar.charAt(Math.random() * randomchar.length);
  }

  // Store generated input
  captcha.innerHTML = uniquechar;
}

function printmsg() {
  const usr_input = document.getElementById("submit").value;

  // Check whether the input is equal
  // to generated captcha or not
  if (usr_input == captcha.innerHTML) {
    var s = (document.getElementById("key").innerHTML = "Matched");
    generate();
  } else {
    var s = (document.getElementById("key").innerHTML = "not Matched");
    generate();
  }
}
