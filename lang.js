const langBtn = document.getElementById("langBtn");
const translateBox = document.getElementById("google_translate_element");

let dragging = false;
let startX = 0;
let startY = 0;

let x = window.innerWidth - 80;
let y = window.innerHeight - 140;

updatePosition();

function updatePosition() {
  langBtn.style.left = x + "px";
  langBtn.style.top = y + "px";

  translateBox.style.left = x + "px";
  translateBox.style.top = (y - 90) + "px";
}

function startDrag(e) {

  dragging = false;

  const point = e.touches ? e.touches[0] : e;

  startX = point.clientX - x;
  startY = point.clientY - y;

  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);

  document.addEventListener("touchmove", drag, { passive: false });
  document.addEventListener("touchend", stopDrag);
}

function drag(e) {

  e.preventDefault();

  dragging = true;

  const point = e.touches ? e.touches[0] : e;

  x = point.clientX - startX;
  y = point.clientY - startY;

  x = Math.max(0, Math.min(x, window.innerWidth - langBtn.offsetWidth));
  y = Math.max(0, Math.min(y, window.innerHeight - langBtn.offsetHeight));

  updatePosition();
}

function stopDrag() {

  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDrag);

  document.removeEventListener("touchmove", drag);
  document.removeEventListener("touchend", stopDrag);

  setTimeout(() => {
    dragging = false;
  }, 100);
}

langBtn.addEventListener("mousedown", startDrag);
langBtn.addEventListener("touchstart", startDrag, { passive: false });

langBtn.addEventListener("click", () => {

  if (dragging) return;

  translateBox.style.display =
    translateBox.style.display === "block" ? "none" : "block";

});

document.addEventListener("click", (e) => {

  if (!langBtn.contains(e.target) && !translateBox.contains(e.target)) {
    translateBox.style.display = "none";
  }

});

window.addEventListener("resize", () => {

  x = Math.min(x, window.innerWidth - langBtn.offsetWidth);
  y = Math.min(y, window.innerHeight - langBtn.offsetHeight);

  updatePosition();

});
