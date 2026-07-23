/* ==========================
   MOBILE NAVIGATION
========================== */

const hamburger = document.querySelector(".hamburger");

const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const icon = hamburger.querySelector("i");

    if (!icon) return;

    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");

      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");

      icon.classList.add("fa-bars");
    }
  });
}

/* ==========================
   CLOSE MENU ON LINK CLICK
========================== */

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768 && navLinks) {
      navLinks.classList.remove("active");

      if (hamburger) {
        const icon = hamburger.querySelector("i");

        if (icon) {
          icon.classList.remove("fa-times");

          icon.classList.add("fa-bars");
        }
      }
    }
  });
});

/* ==========================
   STICKY HEADER EFFECT
========================== */

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (!header) return;

  if (window.scrollY > 50) {
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.12)";
  } else {
    header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
  }
});

/* ==========================
   SMOOTH SCROLL
========================== */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

/* ==========================
   COUNTER ANIMATION
========================== */

function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));

  if (isNaN(target)) return;

  let count = 0;

  const speed = Math.max(target / 100, 1);

  const updateCounter = () => {
    count += speed;

    if (count < target) {
      element.innerText = Math.floor(count);

      requestAnimationFrame(updateCounter);
    } else {
      element.innerText = target.toLocaleString();
    }
  };

  updateCounter();
}

/* ==========================
   COUNTER OBSERVER
========================== */

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);

        counterObserver.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.5,
  },
);

document.querySelectorAll(".counter").forEach((counter) => {
  counterObserver.observe(counter);
});

/* ==========================
   FAQ TOGGLE
========================== */

document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;

    if (!answer) return;

    if (answer.classList.contains("active")) {
      answer.classList.remove("active");
    } else {
      document.querySelectorAll(".faq-answer").forEach((item) => {
        item.classList.remove("active");
      });

      answer.classList.add("active");
    }
  });
});

/* ==========================
   SCROLL REVEAL ANIMATION
========================== */

const revealElements = document.querySelectorAll(
  `
.card,
.feature-box,
.service-card,
.hotel-card,
.testimonial,
.emergency-card,
.place-card
`,
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";

        entry.target.style.transform = "translateY(0)";
      }
    });
  },

  {
    threshold: 0.2,
  },
);

revealElements.forEach((element) => {
  element.style.opacity = "0";

  element.style.transform = "translateY(40px)";

  element.style.transition = "all 0.8s ease";

  revealObserver.observe(element);
});

/* ==========================
   TOURIST PLACE SEARCH
========================== */

const placeSearch = document.getElementById("placeSearch");

if (placeSearch) {
  placeSearch.addEventListener("keyup", () => {
    const value = placeSearch.value.toLowerCase().trim();

    const cards = document.querySelectorAll(".place-card");

    cards.forEach((card) => {
      const title = card.querySelector("h3");

      if (!title) return;

      const text = title.innerText.toLowerCase();

      if (text.includes(value)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

/* ==========================
   HOTEL SEARCH
========================== */

const hotelSearch = document.getElementById("hotelSearch");

if (hotelSearch) {
  hotelSearch.addEventListener("keyup", () => {
    const value = hotelSearch.value.toLowerCase().trim();

    const hotels = document.querySelectorAll(".hotel-card");

    hotels.forEach((hotel) => {
      const heading = hotel.querySelector("h3");

      if (!heading) return;

      const hotelName = heading.innerText.toLowerCase();

      if (hotelName.includes(value)) {
        hotel.style.display = "block";
      } else {
        hotel.style.display = "none";
      }
    });
  });
}

/* ==========================
   HOTEL FILTER
========================== */

function filterHotels(category) {
  const hotels = document.querySelectorAll(".hotel-card");

  hotels.forEach((hotel) => {
    const hotelCategory = hotel.getAttribute("data-category");

    if (category === "all") {
      hotel.style.display = "block";
    } else if (hotelCategory === category) {
      hotel.style.display = "block";
    } else {
      hotel.style.display = "none";
    }
  });
}

window.filterHotels = filterHotels;

/* ==========================
   FARE CALCULATOR
========================== */

function calculateFare() {
  const distanceInput = document.getElementById("distance");

  if (!distanceInput) return;

  const distance = parseFloat(distanceInput.value);

  if (isNaN(distance) || distance <= 0) {
    alert("Please enter a valid distance.");
    return;
  }

  /* --------------------------
     REALISTIC FARE CALCULATION
  ---------------------------*/

  // Auto: ₹25 base + ₹10/km
  const autoFare = Math.round(25 + distance * 10);

  // E-Rickshaw: ₹15 up to 2 km, then ₹6/km
  let erickshawFare;
  if (distance <= 2) {
    erickshawFare = 15;
  } else {
    erickshawFare = Math.round(15 + (distance - 2) * 6);
  }

  // Taxi: ₹60 base + ₹14/km
  const taxiFare = Math.round(60 + distance * 14);

  // Bus: ₹5 base + ₹2/km
  const busFare = Math.round(5 + distance * 2);

  /* --------------------------
     SHOW RESULTS
  ---------------------------*/

  const auto = document.getElementById("autoFare");
  const erickshaw = document.getElementById("erickshawFare");
  const taxi = document.getElementById("taxiFare");
  const bus = document.getElementById("busFare");

  if (auto) {
    auto.innerText = "₹ " + autoFare;
    animateFareResult(auto);
  }

  if (erickshaw) {
    erickshaw.innerText = "₹ " + erickshawFare;
    animateFareResult(erickshaw);
  }

  if (taxi) {
    taxi.innerText = "₹ " + taxiFare;
    animateFareResult(taxi);
  }

  if (bus) {
    bus.innerText = "₹ " + busFare;
    animateFareResult(bus);
  }
}

/* ==========================
   GLOBAL FUNCTION
========================== */

window.calculateFare = calculateFare;

/* ==========================
   QUICK DISTANCE BUTTONS
========================== */

document.querySelectorAll(".distance-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const km = parseFloat(button.getAttribute("data-km"));

    const distanceInput = document.getElementById("distance");

    if (distanceInput) {
      distanceInput.value = km;
      calculateFare();
    }
  });
});

/* ==========================
   AUTO CALCULATE ON INPUT
========================== */

const distanceField = document.getElementById("distance");

if (distanceField) {
  distanceField.addEventListener("input", () => {
    if (parseFloat(distanceField.value) > 0) {
      calculateFare();
    }
  });
}

/* ==========================
   FARE RESULT ANIMATION
========================== */

function animateFareResult(element) {
  if (!element) return;

  element.style.transform = "scale(1.08)";

  setTimeout(() => {
    element.style.transform = "scale(1)";
  }, 250);
}

/* ==========================
   ENABLE TRANSITION
========================== */

["autoFare", "erickshawFare", "taxiFare", "busFare"].forEach((id) => {
  const el = document.getElementById(id);

  if (el) {
    el.style.transition = "transform 0.25s ease";
  }
});

/* ==========================
   COMPLAINT FORM VALIDATION
========================== */

const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {
  complaintForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const touristName =
      document.getElementById("touristName")?.value.trim() || "";

    const mobile = document.getElementById("mobileNumber")?.value.trim() || "";

    const description =
      document.getElementById("description")?.value.trim() || "";

    if (touristName.length < 3) {
      alert("Please enter a valid tourist name.");

      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Please enter a valid 10 digit mobile number.");

      return;
    }

    if (description.length < 20) {
      alert("Complaint description should be at least 20 characters.");

      return;
    }

    alert("Complaint submitted successfully.");

    complaintForm.reset();

    const preview = document.getElementById("previewImage");

    if (preview) {
      preview.style.display = "none";

      preview.src = "";
    }
  });
}

/* ==========================
   CONTACT FORM VALIDATION
========================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameField = document.getElementById("name");

    const emailField = document.getElementById("email");

    const messageField = document.getElementById("message");

    const name = nameField ? nameField.value.trim() : "";

    const email = emailField ? emailField.value.trim() : "";

    const message = messageField ? messageField.value.trim() : "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 3) {
      alert("Please enter a valid name.");

      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");

      return;
    }

    if (message.length < 10) {
      alert("Please enter a detailed message.");

      return;
    }

    alert("Thank you for contacting Ayodhya Sarthi.");

    contactForm.reset();
  });
}

/* ==========================
   IMAGE PREVIEW
========================== */

const imageUpload = document.getElementById("uploadImage");

if (imageUpload) {
  imageUpload.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
      const preview = document.getElementById("previewImage");

      if (preview) {
        preview.src = e.target.result;

        preview.style.display = "block";
      }
    };

    reader.readAsDataURL(file);
  });
}

/* ==========================
   LIVE DATE & TIME
========================== */

function updateDateTime() {
  const liveTime = document.getElementById("liveTime");

  if (!liveTime) return;

  const now = new Date();

  const date = now.toLocaleDateString("en-IN");

  const time = now.toLocaleTimeString("en-IN");

  liveTime.innerHTML = `${date} | ${time}`;
}

updateDateTime();

setInterval(updateDateTime, 1000);

/* ==========================
   FORM FIELD FOCUS EFFECT
========================== */

document.querySelectorAll("input, textarea, select").forEach((field) => {
  field.addEventListener("focus", () => {
    field.style.transition = "0.3s ease";

    field.style.transform = "scale(1.02)";
  });

  field.addEventListener("blur", () => {
    field.style.transform = "scale(1)";
  });
});

/* ==========================
   SUCCESS MESSAGE FUNCTION
========================== */

function showSuccessMessage(message) {
  const box = document.createElement("div");

  box.innerText = message;

  box.style.position = "fixed";

  box.style.top = "20px";

  box.style.right = "20px";

  box.style.padding = "15px 20px";

  box.style.background = "#28a745";

  box.style.color = "#fff";

  box.style.borderRadius = "8px";

  box.style.zIndex = "9999";

  document.body.appendChild(box);

  setTimeout(() => {
    box.remove();
  }, 3000);
}



/* ==========================
   BACK TO TOP BUTTON
========================== */

const backToTop = document.getElementById("backToTop");

if (backToTop) {
  backToTop.style.display = "none";

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });
}

/* ==========================
   WEATHER BOX
========================== */

const weatherBox = document.getElementById("weatherBox");

if (weatherBox) {
  weatherBox.innerHTML = `

        <div class="weather-widget">

            <h3>
            🌤 Ayodhya Weather
            </h3>

            <p>
            Temperature: 32°C
            </p>

            <p>
            Humidity: 55%
            </p>

            <p>
            Wind Speed: 10 km/h
            </p>

            <p>
            Condition: Clear Sky
            </p>

        </div>

    `;
}

/* ==========================
   NEWS TICKER
========================== */

const newsTicker = document.getElementById("newsTicker");

if (newsTicker) {
  const messages = [
    "🙏 Welcome to Ayodhya Sarthi Tourism Portal",

    "🚩 Explore Ram Janmabhoomi and Ayodhya's sacred heritage",

    "🛺 Use Fare Calculator before hiring transport",

    "🏨 Book hotels and dharamshalas with ease",

    "🚨 Emergency services available 24×7",

    "🗺 Live Map helps you navigate Ayodhya easily",
  ];

  let currentIndex = 0;

  newsTicker.innerText = messages[currentIndex];

  setInterval(() => {
    currentIndex++;

    if (currentIndex >= messages.length) {
      currentIndex = 0;
    }

    newsTicker.innerText = messages[currentIndex];
  }, 4000);
}

/* ==========================
   CURRENT YEAR
========================== */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* ==========================
   PAGE LOADER
========================== */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.style.transition = "0.5s ease";

    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
});

/* ==========================
   CARD HOVER EFFECT
========================== */

document.querySelectorAll(".card, .hotel-card, .place-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transition = "0.3s ease";

    card.style.transform = "translateY(-6px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

/* ==========================
   BUTTON RIPPLE EFFECT
========================== */

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");

    const rect = this.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);

    ripple.style.width = size + "px";

    ripple.style.height = size + "px";

    ripple.style.left = e.clientX - rect.left - size / 2 + "px";

    ripple.style.top = e.clientY - rect.top - size / 2 + "px";

    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

/* ==========================
   PAGE READY MESSAGE
========================== */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Ayodhya Sarthi Loaded Successfully 🚀");
});

/* ==========================
   FINAL INITIALIZATION
========================== */

function initializeSite() {
  console.log("Tourism Portal Ready");
}

initializeSite();

/* =====================================================
   END OF APP.JS
===================================================== */
