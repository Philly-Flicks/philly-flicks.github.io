const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener("click", function(event) {
    event.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

const animatedItems = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.2
  }
);

animatedItems.forEach(item => {
  observer.observe(item);
});

// ADD 12 - LIGHTBOX POPUP GALLERY WITH COUNTER + LOADING

const galleryImages = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");
const counter = document.getElementById("lightbox-counter");
const loader = document.getElementById("loader");

let currentGallery = [];
let currentIndex = 0;

galleryImages.forEach(image => {
  image.addEventListener("click", () => {
    const gallery = image.closest(".gallery-grid");

    currentGallery = Array.from(gallery.querySelectorAll("img"));
    currentIndex = currentGallery.indexOf(image);

    openLightbox();
  });
});

function openLightbox() {
  lightbox.classList.add("show");
  document.body.style.overflow = "hidden";
  showImage();
}

function closeLightbox() {
  lightbox.classList.remove("show");
  document.body.style.overflow = "auto";
}

function showImage() {
  loader.classList.add("show");
  lightboxImg.classList.remove("loaded");

  const selectedImage = currentGallery[currentIndex];

  lightboxImg.onload = () => {
    loader.classList.remove("show");
    lightboxImg.classList.add("loaded");
  };

  lightboxImg.src = selectedImage.src;

  counter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
}

function showNextImage() {
  currentIndex++;

  if (currentIndex >= currentGallery.length) {
    currentIndex = 0;
  }

  showImage();
}

function showPrevImage() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = currentGallery.length - 1;
  }

  showImage();
}

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNextImage);
prevBtn.addEventListener("click", showPrevImage);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("show")) return;

  if (event.key === "ArrowRight") {
    showNextImage();
  }

  if (event.key === "ArrowLeft") {
    showPrevImage();
  }

  if (event.key === "Escape") {
    closeLightbox();
  }
});

// ADD 33 - DISABLE RIGHT CLICK + IMAGE DRAG

document.addEventListener("contextmenu", event => {
  if (event.target.tagName === "IMG") {
    event.preventDefault();
  }
});

document.querySelectorAll("img").forEach(img => {
  img.setAttribute("draggable", "false");
});

// ADD 33 - RANDOMIZE PHOTOGRAPHY GALLERIES

const photoGalleries = document.querySelectorAll(".gallery-grid");

photoGalleries.forEach(gallery => {
  const images = Array.from(gallery.querySelectorAll("img"));

  const shuffledImages = images.sort(() => Math.random() - 0.5);

  shuffledImages.forEach(image => {
    gallery.appendChild(image);
  });
});