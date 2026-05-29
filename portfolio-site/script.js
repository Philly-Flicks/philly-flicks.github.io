const scrollLink = document.querySelector(".scroll-link");

scrollLink.addEventListener("click", function (event) {
  event.preventDefault();

  const portfolioSection = document.querySelector("#portfolio");

  portfolioSection.scrollIntoView({
    behavior: "smooth"
  });
});
