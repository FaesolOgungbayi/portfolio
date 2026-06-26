const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const filterButtons = document.querySelectorAll("[data-filter]");
const storyGrid = document.querySelector("[data-story-grid]");

const fallbackStories = [
  {
    title: "How investors priced a volatile quarter",
    category: "markets",
    publication: "Publication Name",
    excerpt: "A concise explainer on rates, liquidity, and investor sentiment during a fast-moving trading week.",
    url: "#"
  },
  {
    title: "Inside the earnings call that reset expectations",
    category: "companies",
    publication: "Publication Name",
    excerpt: "A reported analysis of margin pressure, guidance changes, and what management told shareholders.",
    url: "#"
  },
  {
    title: "What a new fiscal plan means for households",
    category: "policy",
    publication: "Publication Name",
    excerpt: "A plain-English breakdown of policy choices, winners, risks, and the numbers behind the debate.",
    url: "#"
  },
  {
    title: "Why a regional lender changed its playbook",
    category: "companies",
    publication: "Publication Name",
    excerpt: "A business profile connecting strategy, regulation, customer behavior, and competitive pressure.",
    url: "#"
  }
];

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }
});

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function storyTemplate(story) {
  const category = story.category || "markets";
  const publication = story.publication || "Publication";
  const title = story.title || "Untitled story";
  const excerpt = story.excerpt || "";
  const url = story.url || "#";

  return `
    <article class="story-card" data-category="${escapeHtml(category)}">
      <p class="story-meta">${escapeHtml(category)} | ${escapeHtml(publication)}</p>
      <h3><a href="${escapeHtml(url)}" aria-label="Read ${escapeHtml(title)}">${escapeHtml(title)}</a></h3>
      <p>${escapeHtml(excerpt)}</p>
    </article>
  `;
}

function applyStoryFilter(filter) {
  const storyCards = document.querySelectorAll("[data-category]");
  let visibleCount = 0;

  storyCards.forEach((card) => {
    const isVisible = filter === "all" || card.dataset.category === filter;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (!visibleCount && storyGrid) {
    storyGrid.insertAdjacentHTML("beforeend", '<p class="story-empty">No stories match this filter yet.</p>');
  } else {
    document.querySelector(".story-empty")?.remove();
  }
}

function renderStories(stories) {
  const visibleStories = Array.isArray(stories) && stories.length ? stories : fallbackStories;
  storyGrid.innerHTML = visibleStories.map(storyTemplate).join("");
  const activeFilter = document.querySelector(".filter-button.active")?.dataset.filter || "all";
  applyStoryFilter(activeFilter);
}

async function loadStories() {
  try {
    const response = await fetch("content/posts.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Story content was not found.");
    const data = await response.json();
    renderStories(data.stories);
  } catch (error) {
    renderStories(fallbackStories);
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    applyStoryFilter(filter);
  });
});

loadStories();
