
/* =====================================================
   EDIT THE SECTIONS BELOW
   ===================================================== */

// ---------- 1. WISH SCREEN ----------
const WISH = {
  title: "Happy Birthday NIJHUM🤍",
  message: "Many many happy returns of the day✨"
};

// ---------- 2. PHOTOS ----------
// Add or remove photo blocks as needed.
const PHOTOS = [
  {
    image: "images/1.jpg",
    text: "The very first time I saw your post and thought it's a fake ID or You're from India"
  },
  {
    image: "images/2.jpg",
    text: "The prettiest one, like the ocean🌊💙"
  },
  {
    image: "images/3.jpg",
    text: "The cutest one fr😭🫶🏻"
  },
     {
     image: "images/4.jpg",
     text: "Another pretty one..💫"
   },
     {
     image: "images/5.jpg",
     text: "Shining like a moon🌕💖"
   },
     {
     image: "images/6.jpg",
     text: "Prettiest, cutest, sweetest, finest.... All in one💯💗 THE BEST"
   },
     {
     image: "images/7.jpg",
     text: "Is it even describable? 💭"
   },
     {
     image: "images/8.jpg",
     text: "If someone's eyes can be this beautiful, imagine how beautiful that person would be. "
   },
     {
     image: "images/9.jpg",
     text: "Cute and pretty at the same time💓💝"
   },
     {
     image: "images/10.jpg",
     text: "🤍🤍"
   },
     {
     image: "images/11.jpg",
     text: "This is for you🥇"
   },
  
];

// ---------- 3. VIDEOS ----------
// enabled: true  = include the video
// enabled: false = skip the video
// Videos appear after photos and before the final screen.
const VIDEOS = [
  {
    video: "videos/1.mp4",
    text: "🫀💌",
    enabled: true
  },

  // Optional video 2:
  // {
  //   video: "videos/2.mp4",
  //   text: "WRITE YOUR MESSAGE FOR VIDEO 2 HERE",
  //   enabled: false
  // },
];

// ---------- 4. BACKGROUND MUSIC ----------
// Upload music.mp3 beside index.html.
const MUSIC = "music.mp3";

// ---------- 5. FINAL SCREEN ----------
const FINAL = {
  title: "Thanks for spending your valuable time and energy to see a FAIRY",
  message: "Always keep that smile on your face. Again, Happy Birthday Ms. Fake ID🤍💙"
};

/* =====================================================
   WEBSITE ENGINE — NO NEED TO EDIT BELOW
   ===================================================== */

const stage = document.getElementById("stage");
const bar = document.getElementById("progressBar");
const bgMusic = document.getElementById("bgMusic");

// ---------- Background music ----------
bgMusic.src = MUSIC;
bgMusic.loop = true;
bgMusic.volume = 0.35;

let musicStarted = false;

function startMusic() {
  if (musicStarted) return;

  bgMusic.play()
    .then(() => {
      musicStarted = true;
    })
    .catch(() => {
      // If playback is blocked, a later arrow click retries.
      musicStarted = false;
    });
}

// ---------- Slide order ----------
const slides = [
  { type: "wish" },
  ...PHOTOS.map(photo => ({ type: "photo", ...photo })),
  ...VIDEOS
    .filter(video => video.enabled)
    .map(video => ({ type: "video", ...video })),
  { type: "final" }
];

let current = 0;
let busy = false;

// ---------- Element helper ----------
function el(tag, className, text) {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;

  return element;
}

// ---------- Next arrow ----------
function nextButton(isLast) {
  const wrap = el("div", "next-wrap fade d3");
  const button = el("button", "next-btn");

  button.setAttribute("aria-label", isLast ? "Replay" : "Next");

  button.innerHTML = isLast
    ? "↺"
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  button.addEventListener("click", () => {
    // Start the music on the first arrow click.
    // It continues playing across subsequent slides.
    startMusic();

    if (isLast) {
      goTo(0);
    } else {
      goTo(current + 1);
    }
  });

  wrap.appendChild(button);
  return wrap;
}

// ---------- Wish and final screens ----------
function buildTextSlide(data, extraClass, isLast) {
  const slide = el("section", "slide " + extraClass);

  slide.append(
    el("h1", "title fade d1", data.title),
    el("div", "line fade d2"),
    el("p", "message fade d2", data.message),
    nextButton(isLast)
  );

  return slide;
}

// ---------- Photo slide ----------
function buildPhotoSlide(data) {
  const slide = el("section", "slide");
  const wrap = el("div", "photo-wrap");
  const image = el("img");

  image.src = data.image;
  image.alt = "";

  image.addEventListener("error", () => {
    image.remove();

    wrap.appendChild(
      el("div", "no-photo-hint", "Add your photo: " + data.image)
    );
  }, { once: true });

  wrap.appendChild(image);

  const caption = el("div", "photo-text fade d2", data.text);

  slide.append(wrap, caption, nextButton(false));

  return slide;
}

// ---------- Video slide ----------
function buildVideoSlide(data) {
  const slide = el("section", "slide");
  const wrap = el("div", "photo-wrap");
  const video = el("video");

  video.src = data.video;
  video.muted = true;
  video.defaultMuted = true;
  video.autoplay = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "auto";

  // Attributes improve compatibility with mobile browsers.
  video.setAttribute("muted", "");
  video.setAttribute("autoplay", "");
  video.setAttribute("loop", "");
  video.setAttribute("playsinline", "");

  video.addEventListener("error", () => {
    if (!video.isConnected) return;

    video.remove();

    wrap.appendChild(
      el("div", "no-photo-hint", "Add your video: " + data.video)
    );
  }, { once: true });

  wrap.appendChild(video);

  // Attempt autoplay while muted.
  video.play().catch(() => {
    // Browser restrictions may delay playback.
  });

  const caption = el("div", "photo-text fade d2", data.text);

  slide.append(wrap, caption, nextButton(false));

  return slide;
}

// ---------- Final screen sparkles ----------
function buildSparkles(slide) {
  for (let i = 0; i < 14; i++) {
    const sparkle = el("span", "spark");

    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.animationDuration = 6 + Math.random() * 6 + "s";
    sparkle.style.animationDelay = Math.random() * 6 + "s";

    slide.appendChild(sparkle);
  }
}

// ---------- Build slide ----------
function buildSlide(index) {
  const data = slides[index];

  if (data.type === "wish") {
    return buildTextSlide(WISH, "wish", false);
  }

  if (data.type === "photo") {
    return buildPhotoSlide(data);
  }

  if (data.type === "video") {
    return buildVideoSlide(data);
  }

  const slide = buildTextSlide(FINAL, "final", true);
  buildSparkles(slide);

  return slide;
}

// ---------- Progress bar ----------
function updateProgress() {
  const percentage = slides.length > 1
    ? (current / (slides.length - 1)) * 100
    : 0;

  bar.style.width = percentage + "%";
}

// ---------- Change slide ----------
function goTo(index) {
  if (busy) return;
  if (index < 0 || index >= slides.length) return;

  busy = true;
  stage.classList.add("leaving");

  setTimeout(() => {
    // Stop the previous video's playback.
    // Do not stop or restart the background music.
    stage.querySelectorAll("video").forEach(video => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    });

    current = index;

    stage.replaceChildren(buildSlide(index));
    updateProgress();

    requestAnimationFrame(() => {
      stage.classList.remove("leaving");
      busy = false;
    });
  }, 450);
}

// ---------- Start website ----------
stage.appendChild(buildSlide(0));
updateProgress();
