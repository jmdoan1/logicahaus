function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight;
  const winHeight = window.innerHeight;
  const trueScrollPercent = scrollTop / (docHeight - winHeight);
  const scrollPercent =
    docHeight <= winHeight
      ? 100
      : Math.floor(Math.max(Math.min(trueScrollPercent * 100, 100), 0));

  const progressElement = document.querySelector(".circular-progress");
  const progressText = document.querySelector(".progress-text");

  if (progressElement) {
    progressElement.style.setProperty("--progress", scrollPercent);
  }
  if (progressText) {
    progressText.innerHTML = `${scrollPercent}%`;
  }

  // const progressImg = document.querySelector(".pip");
  // if (progressImg) {
  //   const imgScrollPercent = docHeight <= winHeight ? 0 : scrollPercent;
  //   progressImg.style.setProperty(
  //     "object-position",
  //     `50% ${imgScrollPercent}%`
  //   );
  // }
}

updateProgress();

document.addEventListener("scroll", updateProgress);
window.addEventListener("resize", updateProgress);

let previousUrl = "";
const observer = new MutationObserver(function (mutations) {
  if (location.href !== previousUrl) {
    previousUrl = location.href;
    console.log(`URL changed to ${location.href}`);
    updateProgress();
  }
});
const config = { subtree: true, childList: true };
observer.observe(document, config);
