const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    target.scrollIntoView({
      behavior: "smooth"
    });
  });
});

let lastScrollY = window.scrollY;

const animatedItems = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const scrollingDown = window.scrollY > lastScrollY;

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        entry.target.classList.remove("up");
      } else {
        entry.target.classList.remove("show");

        if (!scrollingDown) {
          entry.target.classList.add("up");
        } else {
          entry.target.classList.remove("up");
        }
      }

      lastScrollY = window.scrollY;
    });
  },
  {
    threshold: 0.35
  }
);

animatedItems.forEach(item => {
  observer.observe(item);
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