const bodyTag = document.querySelector("body");

const wiper = document.createElement("div");
wiper.classList.add("wiper");

const wipperImage = document.createElement("img");
wipperImage.setAttribute("src", "logo.svg");
wipperImage.appendChild(wipperImage);

const wiperHolder = document.createElement("div");
const wiperText = document.createElement("h2");

wiperText.innerHTML = "Wanderers";

wiperHolder.appendChild(wiperText);

wiper.appendChild(wiperHolder);

bodyTag.appendChild(wiper);

barba.init({
  debug: true,
  transitions: [
    {
      name: "next",
      leave({ current, next, trigger }) {
        return new Promise((resolve) => {
          const timeline = gsap.timeline({
            onComplete() {
              current.container.remove();
              resolve();
            }
          });

          const navigation = current.container.querySelectorAll(
            "header a.next a.previous"
          );

          const photos = current.container.querySelectorAll("div.photos");

          timeline
            .set(wiper, { x: "-100%" })
            .set(wipperImage, { opacity: 0 })
            .to(navigation, { opacity: 0 }, 0)
            .to(photos, { opacity: 0.25, x: 500 }, 0)
            .to(wiper, { x: 0 }, 0);
        });
      },
      beforeEnter({ current, next, trigger }) {
        return new Promise((resolve) => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
            }
          });
          timeline
            .to(wipperImage, { opacity: 1 })
            .to(wipperImage, { opacity: 0 });
        });
      },
      enter({ current, next, trigger }) {
        return new Promise((resolve) => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
            }
          });

          const navigation = next.container.querySelectorAll(
            "header a.next a.previous"
          );

          const photos = next.container.querySelectorAll("div.photos");

          timeline
            .set(navigation, { opacity: 0 })
            .set(photos, { opacity: 0.25, x: -500 })
            .to(navigation, { opacity: 1 }, 0)
            .to(photos, { opacity: 0.25, x: 0 }, 0)
            .to(wiper, { x: "100%" }, 0);
        });
      }
    }
  ],
  views: []
});
