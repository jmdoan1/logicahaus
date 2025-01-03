const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
  ""
);
document.querySelectorAll(".hacker").forEach((element) => {
  element.onmouseover = (event) => {
    hack(event);
  };

  if (window.getComputedStyle(element).opacity === "0") {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.style.opacity = "1";
          hack({ target: entry.target });
          observer.unobserve(entry.target);
        }
      });
    });

    if (element.classList.contains("wait")) {
      setTimeout(() => {
        observer.observe(element);
        element.classList.remove("wait");
      }, 3000);
    } else {
      observer.observe(element);
    }
  }
});

function hack(event) {
  let iterations = 0;

  const interval = setInterval(() => {
    event.target.innerText = event.target.dataset.value
      .split("")
      .map((_, index) => {
        if (index < iterations) {
          return event.target.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 52)];
      })
      .join("");

    // Use event.target.innerText.length instead of element.innerText.length
    if (iterations >= event.target.innerText.length) clearInterval(interval);

    iterations += 1 / 2;
  }, 30);
}
