const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener("click", function(event) {
    event.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    target.scrollIntoView({
      behavior: "smooth"
    });
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
    threshold: 0.35
  }
);

animatedItems.forEach(item => {
  observer.observe(item);
});
