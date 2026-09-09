/* Cinemora — premium movie UI interactions */
const MOVIES = [
  {
    id: "jawan", title: "Jawan", image: "jawan.jpg",
    genres: ["action", "thriller"], genreLabel: "Action · Thriller", year: "2023", duration: "2h 49m",
    rating: "4.9", description: "A slick, high-energy action showcase built around a larger-than-life mission and cinematic spectacle.",
    longDescription: "Cinemora's featured cut is designed as a visual-first introduction: bold composition, rich contrast and a fast-moving action mood that feels made for a modern streaming platform.",
    cast: [{name:"Shah Rukh Khan", image:"jawan.jpg"}]
  },
  {
    id: "fighter", title: "Fighter", image: "fighter.jpg",
    genres: ["action"], genreLabel: "Action · Adventure", year: "2024", duration: "2h 46m",
    rating: "4.8", description: "Aerial action, brotherhood and adrenaline — presented as a polished big-screen event.",
    longDescription: "The Fighter page is styled as a premium cinematic profile, with an immersive hero, metadata, cast details and trailer modal. Use the supplied demo video as a placeholder and swap in licensed media for production.",
    cast: [
      {name:"Hrithik Roshan", image:"hrithik-roshan.jpg"},
      {name:"Deepika Padukone", image:"deepika-padukone.jpg"},
      {name:"Anil Kapoor", image:"anil-kapoor.jpg"}
    ]
  },
  {
    id: "amazon", title: "Amazon Ovijan", image: "amazon-ovijan.jpg",
    genres: ["adventure"], genreLabel: "Adventure", year: "2026", duration: "2h 10m",
    rating: "4.7", description: "A lush expedition into wild landscapes, mystery and the unknown.",
    longDescription: "A cinematic adventure profile inspired by the supplied artwork, with emphasis on atmosphere, exploration and large-scale scenery.",
    cast: []
  },
  {
    id: "bagha", title: "Bagha Jatin", image: "bagha-jatin.jpg",
    genres: ["action"], genreLabel: "Action · Drama", year: "2023", duration: "2h 20m",
    rating: "4.6", description: "A period-action mood piece with heroic scale and a strong historical visual identity.",
    longDescription: "This profile uses the supplied poster as the primary visual and keeps the interface focused on title, mood, genre and discovery.",
    cast: []
  },
  {
    id: "byomkesh", title: "Byomkesh O Durgo Rahasya", image: "byomkesh.jpg",
    genres: ["thriller"], genreLabel: "Mystery · Thriller", year: "2023", duration: "2h 15m",
    rating: "4.6", description: "A moody mystery title framed for viewers who enjoy investigation, atmosphere and suspense.",
    longDescription: "A rich sepia visual language meets a restrained movie-profile layout, giving this title a classic detective-cinema feel.",
    cast: []
  },
  {
    id: "dunki", title: "Dunki", image: "dunki.jpg",
    genres: ["comedy"], genreLabel: "Comedy · Drama", year: "2023", duration: "2h 40m",
    rating: "4.5", description: "An emotional journey with humour, friendship and a wide cinematic canvas.",
    longDescription: "The Dunki card is presented as a warm, story-driven destination inside the wider Cinemora collection.",
    cast: []
  },
  {
    id: "money", title: "Money Heist", image: "money-heist.jpg",
    genres: ["action", "thriller"], genreLabel: "Action · Thriller", year: "2021", duration: "5 parts",
    rating: "4.8", description: "A tense ensemble thriller with unmistakable red-suit visual energy.",
    longDescription: "A high-contrast thriller profile built around ensemble energy, tension and a strong visual signature.",
    cast: []
  },
  {
    id: "pathaan", title: "Pathaan", image: "pathaan.jpg",
    genres: ["action"], genreLabel: "Action · Spy", year: "2023", duration: "2h 26m",
    rating: "4.7", description: "Spy spectacle, momentum and glossy action framed as a cinematic event.",
    longDescription: "This horizontal artwork adapts naturally into the Cinemora detail presentation with a cinematic crop and strong contrast.",
    cast: []
  },
  {
    id: "hitman", title: "Hitman's Wife's Bodyguard", image: "hitmans-wife.jpg",
    genres: ["action", "comedy"], genreLabel: "Action · Comedy", year: "2021", duration: "1h 40m",
    rating: "4.4", description: "A colorful action-comedy profile with an ensemble-driven blockbuster tone.",
    longDescription: "A punchy card layout, playful metadata and bright artwork make this title a natural choice for the fast-scrolling trending lane.",
    cast: []
  },
  {
    id: "spiderman", title: "Spider-Man: No Way Home", image: "spiderman.jpg",
    genres: ["action", "adventure"], genreLabel: "Action · Adventure", year: "2021", duration: "2h 28m",
    rating: "4.9", description: "Multiverse spectacle and superhero energy wrapped in a polished premium poster aesthetic.",
    longDescription: "The supplied poster is used as-is as the main artwork, while the interface adds depth, motion and a more immersive movie-discovery experience.",
    cast: []
  }
];

const FEATURED = ["jawan", "fighter", "amazon", "pathaan"];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function movieById(id) {
  return MOVIES.find(movie => movie.id === id) || MOVIES[0];
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[char]));
}

function movieCard(movie, compact = false) {
  return `
    <article class="movie-card ${compact ? "compact" : ""}" data-id="${movie.id}" data-title="${escapeHtml(movie.title).toLowerCase()}">
      <a class="movie-cover" href="play-page.html?movie=${encodeURIComponent(movie.id)}" aria-label="Open ${escapeHtml(movie.title)}">
        <img src="${movie.image}" alt="${escapeHtml(movie.title)} poster" loading="lazy">
        <span class="movie-number">${String(MOVIES.findIndex(m => m.id === movie.id) + 1).padStart(2, "0")}</span>
        <span class="movie-quality">4K</span>
        <div class="movie-hover">
          <span class="mini-play"><i class="bx bx-play"></i></span>
          <div><strong>${escapeHtml(movie.title)}</strong><small>${escapeHtml(movie.genreLabel)}</small></div>
        </div>
      </a>
      <div class="movie-info">
        <div>
          <h3>${escapeHtml(movie.title)}</h3>
          <p>${escapeHtml(movie.genreLabel)} <span>·</span> ${movie.year}</p>
        </div>
        <button class="save-btn" data-fav="${movie.id}" aria-label="Save ${escapeHtml(movie.title)}"><i class="bx bx-heart"></i></button>
      </div>
    </article>`;
}

function updateFavoritesUI() {
  const saved = JSON.parse(localStorage.getItem("cinemora:favorites") || "[]");
  const count = $("#favCount");
  if (count) count.textContent = saved.length;

  $$("[data-fav]").forEach(button => {
    const id = button.dataset.fav;
    const active = saved.includes(id);
    button.classList.toggle("saved", active);
    button.innerHTML = `<i class="bx ${active ? "bxs-heart" : "bx-heart"}"></i>`;
  });
}

function toggleFavorite(id) {
  const saved = JSON.parse(localStorage.getItem("cinemora:favorites") || "[]");
  const next = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
  localStorage.setItem("cinemora:favorites", JSON.stringify(next));
  updateFavoritesUI();
  const movie = movieById(id);
  showToast(next.includes(id) ? `${movie.title} saved` : `${movie.title} removed`);
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  const label = $("span", toast);
  if (label) label.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function setupGlobalChrome() {
  const header = $("#siteHeader");
  const progress = $("#progressBar");
  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 22);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  }, {passive:true});

  const glow = $("#cursorGlow");
  if (glow && matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", e => {
      glow.style.transform = `translate3d(${e.clientX - 160}px, ${e.clientY - 160}px, 0)`;
    }, {passive:true});
  }

  $$("[data-close-modal]").forEach(btn => btn.addEventListener("click", () => $("#quickModal")?.classList.remove("open")));

  $("#searchToggle")?.addEventListener("click", () => {
    $("#mobileSearch")?.classList.toggle("open");
    $("#mobileSearchInput")?.focus();
  });

  $("#favoritesBtn")?.addEventListener("click", () => {
    const saved = JSON.parse(localStorage.getItem("cinemora:favorites") || "[]");
    if (!saved.length) return showToast("No favourites yet");
    document.querySelector("#movies")?.scrollIntoView({behavior:"smooth", block:"start"});
    setTimeout(() => {
      filterMovies("all");
      $$("#moviesGrid .movie-card").forEach(card => card.classList.toggle("fav-highlight", saved.includes(card.dataset.id)));
    }, 300);
  });

  $("#mobileFav")?.addEventListener("click", () => $("#favoritesBtn")?.click());

  $$("[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      if (id && id !== "#") {
        const target = $(id);
        if (target) { e.preventDefault(); target.scrollIntoView({behavior:"smooth"}); }
      }
    });
  });

  const searchInputs = ["#searchInput", "#mobileSearchInput"];
  searchInputs.forEach(sel => {
    $(sel)?.addEventListener("input", e => {
      const value = e.target.value.trim().toLowerCase();
      if (document.body.classList.contains("home-page")) filterMovies("all", value);
      if (value) $("#movies")?.scrollIntoView({behavior:"smooth", block:"start"});
    });
  });

  window.addEventListener("keydown", e => {
    if (e.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement?.tagName)) {
      e.preventDefault(); $("#searchInput")?.focus();
    }
    if (e.key === "Escape") {
      $("#quickModal")?.classList.remove("open");
      $("#mobileSearch")?.classList.remove("open");
    }
  });
}

function setupReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) return items.forEach(item => item.classList.add("visible"));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.14});
  items.forEach(item => observer.observe(item));
}

function renderTrending() {
  const row = $("#trendingRow");
  if (!row) return;
  MOVIES.slice(0, 8).forEach(movie => row.insertAdjacentHTML("beforeend", movieCard(movie, true)));
}

function renderGrid() {
  const grid = $("#moviesGrid");
  if (!grid) return;
  grid.innerHTML = MOVIES.map(movie => movieCard(movie)).join("");
  updateFavoritesUI();
  $$("#moviesGrid [data-fav]").forEach(button => button.addEventListener("click", e => {
    e.preventDefault(); e.stopPropagation(); toggleFavorite(button.dataset.fav);
  }));
}

function filterMovies(filter = "all", query = "") {
  const grid = $("#moviesGrid");
  if (!grid) return;
  const cards = $$(".movie-card", grid);
  let shown = 0;
  cards.forEach(card => {
    const movie = movieById(card.dataset.id);
    const matchesFilter = filter === "all" || movie.genres.includes(filter);
    const haystack = `${movie.title} ${movie.genreLabel} ${movie.year}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const visible = matchesFilter && matchesQuery;
    card.classList.toggle("hidden", !visible);
    if (visible) shown++;
  });
  $("#emptyState")?.classList.toggle("show", shown === 0);
}

function setupFilters() {
  $$("#filters .filter-btn").forEach(btn => btn.addEventListener("click", () => {
    $$("#filters .filter-btn").forEach(item => item.classList.remove("active"));
    btn.classList.add("active");
    filterMovies(btn.dataset.filter, $("#searchInput")?.value.toLowerCase() || "");
  }));
}

function setupRowControls() {
  const row = $("#trendingRow");
  const step = () => Math.max(290, row?.clientWidth ? row.clientWidth * 0.74 : 320);
  $("#trendPrev")?.addEventListener("click", () => row?.scrollBy({left:-step(), behavior:"smooth"}));
  $("#trendNext")?.addEventListener("click", () => row?.scrollBy({left:step(), behavior:"smooth"}));

  $$(".movie-row .movie-card").forEach(card => {
    card.addEventListener("pointermove", e => {
      if (!matchMedia("(pointer:fine)").matches) return;
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener("pointerleave", () => card.style.transform = "");
  });

  $$("[data-fav]").forEach(button => button.addEventListener("click", e => {
    e.preventDefault(); e.stopPropagation(); toggleFavorite(button.dataset.fav);
  }));
}

function openQuick(movie) {
  const modal = $("#quickModal");
  if (!modal) return;
  $("#quickImage").src = movie.image;
  $("#quickImage").alt = `${movie.title} poster`;
  $("#quickTitle").textContent = movie.title;
  $("#quickMeta").textContent = `${movie.genreLabel} · ${movie.year} · ${movie.duration}`;
  $("#quickDescription").textContent = movie.description;
  $("#quickWatch").href = `play-page.html?movie=${encodeURIComponent(movie.id)}`;
  modal.classList.add("open");
}

function setupHero() {
  const dots = $("#heroDots");
  if (!dots) return;
  const slides = FEATURED.map(movieById);
  let index = 0;
  let timer;
  dots.innerHTML = slides.map((_, i) => `<button class="${i === 0 ? "active" : ""}" data-hero="${i}" aria-label="Slide ${i+1}"></button>`).join("");

  function show(i) {
    index = (i + slides.length) % slides.length;
    const movie = slides[index];
    const image = $("#heroImage");
    image.classList.remove("hero-swap");
    void image.offsetWidth;
    image.src = movie.image;
    image.classList.add("hero-swap");
    $("#heroTitle").textContent = movie.title;
    $("#heroMeta").innerHTML = `${movie.genreLabel} <span>•</span> ${movie.year} <span>•</span> ${movie.duration}`;
    $("#heroDescription").textContent = movie.description;
    $("#heroWatch").href = `play-page.html?movie=${movie.id}`;
    $("#heroInfo").onclick = () => openQuick(movie);
    $("#heroNext strong").textContent = slides[(index + 1) % slides.length].title;
    $$("#heroDots button").forEach((dot, n) => dot.classList.toggle("active", n === index));
    const bar = $("#heroProgress");
    bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = "heroTime 6s linear";
  }

  $$("#heroDots button").forEach(dot => dot.addEventListener("click", () => {
    clearInterval(timer); show(Number(dot.dataset.hero)); timer = setInterval(() => show(index + 1), 6000);
  }));
  $("#heroNext")?.addEventListener("click", () => { clearInterval(timer); show(index + 1); timer = setInterval(() => show(index + 1), 6000); });
  show(0);
  timer = setInterval(() => show(index + 1), 6000);
}

function setup3DTilt() {
  $$(".editorial-card").forEach(card => {
    card.addEventListener("pointermove", e => {
      if (!matchMedia("(pointer:fine)").matches) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1200px) rotateX(${y * -2.5}deg) rotateY(${x * 3}deg)`;
    });
    card.addEventListener("pointerleave", () => card.style.transform = "");
  });
}

function initHome() {
  renderTrending(); renderGrid(); setupFilters(); setupRowControls(); setupHero(); setup3DTilt();
  $$("#trendingRow .movie-card, #moviesGrid .movie-card").forEach(card => {
    card.querySelector(".movie-cover")?.addEventListener("dblclick", e => {
      e.preventDefault(); openQuick(movieById(card.dataset.id));
    });
  });
}

function initDetail() {
  const params = new URLSearchParams(location.search);
  const movie = movieById(params.get("movie"));
  document.title = `${movie.title} — Cinemora`;

  $("#detailImage").src = movie.image;
  $("#detailImage").alt = `${movie.title} poster`;
  $("#detailTitle").textContent = movie.title;
  $("#detailMeta").innerHTML = `<span>${movie.genreLabel}</span><i>•</i><span>${movie.year}</span><i>•</i><span>${movie.duration}</span>`;
  $("#detailTags").innerHTML = [...new Set([...movie.genres.map(g => g[0].toUpperCase()+g.slice(1)), "4K", "HDR"])].map(tag => `<span>${escapeHtml(tag)}</span>`).join("");
  $("#detailDescription").textContent = movie.description;
  $("#detailLong").textContent = movie.longDescription;
  $("#detailRating").textContent = movie.rating;
  $("#videoTitle").textContent = `${movie.title} — Trailer`;

  const cast = $("#castList");
  cast.innerHTML = movie.cast.length ? movie.cast.map(person => `
    <div class="cast-person">
      <img src="${person.image}" alt="${escapeHtml(person.name)}">
      <div><strong>${escapeHtml(person.name)}</strong><span>Featured cast</span></div>
    </div>`).join("") : `<div class="cast-empty"><i class="bx bx-user"></i><p>Cast images can be added here.</p></div>`;

  const related = $("#relatedRow");
  MOVIES.filter(item => item.id !== movie.id).slice(0, 5).forEach(item => related.insertAdjacentHTML("beforeend", movieCard(item, true)));
  $$("[data-fav]").forEach(btn => btn.addEventListener("click", e => {
    e.preventDefault(); e.stopPropagation(); toggleFavorite(btn.dataset.fav);
  }));
  updateFavoritesUI();

  $("#saveMovie")?.addEventListener("click", () => {
    toggleFavorite(movie.id);
    const saved = JSON.parse(localStorage.getItem("cinemora:favorites") || "[]").includes(movie.id);
    $("#saveMovie").innerHTML = `<i class="bx ${saved ? "bxs-heart" : "bx-heart"}"></i> <span>${saved ? "Saved" : "Save"}</span>`;
  });

  const openVideo = () => {
    const modal = $("#videoModal");
    const video = $("#trailerVideo");
    modal.classList.add("open");
    video.currentTime = 0;
    video.play().catch(() => {});
    document.body.classList.add("modal-open");
  };
  const closeVideo = () => {
    const modal = $("#videoModal");
    const video = $("#trailerVideo");
    modal.classList.remove("open");
    video.pause();
    document.body.classList.remove("modal-open");
  };
  $("#playTrailer")?.addEventListener("click", openVideo);
  $("#closeVideo")?.addEventListener("click", closeVideo);
  $("#videoBackdrop")?.addEventListener("click", closeVideo);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeVideo(); });
}

function boot() {
  setupGlobalChrome();
  setupReveal();

  const loader = $("#pageLoader");
  window.addEventListener("load", () => {
    setTimeout(() => loader?.classList.add("done"), 450);
  });
  if (document.readyState === "complete") setTimeout(() => loader?.classList.add("done"), 450);

  if (document.body.classList.contains("home-page")) initHome();
  if (document.body.classList.contains("detail-page")) initDetail();

  // Keep favourite UI in sync when returning to a tab.
  window.addEventListener("storage", updateFavoritesUI);
}
document.addEventListener("DOMContentLoaded", boot);
