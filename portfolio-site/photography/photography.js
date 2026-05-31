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

// ADD 4 - LIGHTBOX POPUP GALLERY

const galleryImages = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

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
  lightboxImg.src = currentGallery[currentIndex].src;
}

function closeLightbox() {
  lightbox.classList.remove("show");
}

function showNextImage() {
  currentIndex++;

  if (currentIndex >= currentGallery.length) {
    currentIndex = 0;
  }

  lightboxImg.src = currentGallery[currentIndex].src;
}

function showPrevImage() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = currentGallery.length - 1;
  }

  lightboxImg.src = currentGallery[currentIndex].src;
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