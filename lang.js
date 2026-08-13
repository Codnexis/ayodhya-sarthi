     const langBtn = document.getElementById("langBtn");
      const translateBox = document.getElementById("google_translate_element");

      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;

      langBtn.addEventListener("click", function () {
        if (isDragging) return;

        translateBox.style.display =
          translateBox.style.display === "block" ? "none" : "block";
      });

      langBtn.addEventListener("mousedown", startDrag);
      langBtn.addEventListener("touchstart", startDrag, { passive: false });

      function startDrag(e) {
        isDragging = false;

        const point = e.touches ? e.touches[0] : e;
        const rect = langBtn.getBoundingClientRect();

        offsetX = point.clientX - rect.left;
        offsetY = point.clientY - rect.top;

        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", stopDrag);

        document.addEventListener("touchmove", drag, { passive: false });
        document.addEventListener("touchend", stopDrag);
      }

      function drag(e) {
        e.preventDefault();
        isDragging = true;

        const point = e.touches ? e.touches[0] : e;

        let x = point.clientX - offsetX;
        let y = point.clientY - offsetY;

        const maxX = window.innerWidth - langBtn.offsetWidth;
        const maxY = window.innerHeight - langBtn.offsetHeight;

        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));

        langBtn.style.left = x + "px";
        langBtn.style.top = y + "px";
        langBtn.style.right = "auto";
        langBtn.style.bottom = "auto";

        translateBox.style.left = x + "px";
        translateBox.style.top = y - 90 + "px";
        translateBox.style.right = "auto";
        translateBox.style.bottom = "auto";
      }

      function stopDrag() {
        setTimeout(() => {
          isDragging = false;
        }, 100);

        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", stopDrag);

        document.removeEventListener("touchmove", drag);
        document.removeEventListener("touchend", stopDrag);
      }

      document.addEventListener("click", function (e) {
        if (!translateBox.contains(e.target) && !langBtn.contains(e.target)) {
          translateBox.style.display = "none";
        }
      });
