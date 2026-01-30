// Mock Data
const movies = [
    {
        id: 1,
        title: "The Tomorrow War",
        desc: "A family man is drafted to fight in a future war where the fate of humanity relies on his ability to confront the past.",
        image: "https://image.tmdb.org/t/p/w500/xmbU4JTUm8rsdtn7Y3Jfja14Uzz.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
        category: "Action",
        isStore: false,
        isLive: false,
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
        id: 2,
        title: "Dune",
        desc: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe.",
        image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyLX275sGxrXGyDXq.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg",
        category: "Sci-Fi",
        isStore: true,
        price: "$19.99",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
        id: 3,
        title: "The Boys",
        desc: "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.",
        image: "https://image.tmdb.org/t/p/w500/stTEycfG9928HYjGWqLWXs1eArX.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
        category: "TV Shows",
        isStore: false,
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
        id: 4,
        title: "Reacher",
        desc: "Jack Reacher was arrested for murder and now the police need his help.",
        image: "https://image.tmdb.org/t/p/w500/bQHNkH6C8e2u6R4X2aG4j1yT5W.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/eG0oOQVsniPAuecPzDD1B1gnYWy.jpg",
        category: "Action",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
        id: 5,
        title: "Fallout",
        desc: "In a future, post-apocalyptic Los Angeles, citizens must live in underground bunkers to protect themselves from radiation, mutants and bandits.",
        image: "https://image.tmdb.org/t/p/w500/p1O1Z3x2j4X3z1x2j4X3z1x2j4.jpg", // Placeholder
        backdrop: "https://image.tmdb.org/t/p/original/falout_backdrop.jpg", // Placeholder
        category: "Sci-Fi",
        isLive: true,
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    {
        id: 6,
        title: "Road House",
        desc: "A former UFC fighter takes a job as a bouncer at a rough-and-tumble roadhouse in the Florida Keys.",
        image: "https://image.tmdb.org/t/p/w500/roadhouse.jpg", // Placeholder
        backdrop: "https://image.tmdb.org/t/p/original/roadhouse_bg.jpg",
        category: "Action",
        isStore: true,
        price: "$4.99",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    },
    {
        id: 7,
        title: "Invincible",
        desc: "Mark Grayson inherits superpowers at seventeen and joins his father as one of earth's greatest heroes.",
        image: "https://image.tmdb.org/t/p/w500/invincible.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/invincible_bg.jpg",
        category: "Animation",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
    },
    {
        id: 8,
        title: "Coming 2 America",
        desc: "The African monarch Akeem learns he has a long-lost son in the United States and must return to America to meet this unlikely heir to the throne of Zamunda.",
        image: "https://image.tmdb.org/t/p/w500/nbMxC1YquvXX8F3W904fS2sK7e2.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/mRo4i72Y4U7428k4J2i9A1i2W55.jpg",
        category: "Comedy",
        isStore: true,
        price: "$14.99",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
    },
    {
        id: 9,
        title: "The Grand Tour",
        desc: "Jeremy Clarkson, Richard Hammond and James May are back with The Grand Tour. A show about adventure, excitement and friendship... as long as you accept that the people you call friends are also the ones you find extremely annoying.",
        image: "https://image.tmdb.org/t/p/w500/pZ3X8v5k5k5k5k5k5k5k5k5.jpg", // Placeholder
        backdrop: "https://image.tmdb.org/t/p/original/grand_tour_bg.jpg",
        category: "Entertainment",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
    }
];

// App State
const state = {
    isAuthenticated: false,
    user: null,
    searchQuery: "",
    currentPage: "home",
    currentCategory: null // New state for category filtering
};

// DOM Elements
const app = document.getElementById('app');
const navbar = document.getElementById('navbar');
const mainContent = document.getElementById('main-content');
const videoPlayer = document.getElementById('video-player');
const playerTitle = document.getElementById('playerTitle');
const closePlayerBtn = document.getElementById('closePlayer');
const searchInput = document.getElementById('searchInput');
const logoutBtn = document.getElementById('logoutBtn');
const navLinks = document.querySelectorAll('.nav-link');

// Router
function render() {
    mainContent.innerHTML = '';

    // Auth Check
    if (!state.isAuthenticated) {
        navbar.classList.add('hidden');
        renderLogin();
        return;
    }

    navbar.classList.remove('hidden');
    updateActiveNav();

    if (state.searchQuery) {
        renderSearch();
        return;
    }

    // Page Switching
    switch (state.currentPage) {
        case 'home':
            renderHome();
            break;
        case 'store':
            renderStore(movies.filter(m => m.isStore));
            break;
        case 'movies':
            renderMovies(movies.filter(m => m.category !== 'TV Shows'));
            break;
        case 'tv':
            renderTVSection(movies.filter(m => m.category === 'TV Shows' || m.id === 3));
            break;
        case 'live':
            renderLive(movies.filter(m => m.isLive));
            break;
        case 'categories':
            renderCategories();
            break;
        case 'category-view': // New route
            renderGenericSection(state.currentCategory, movies.filter(m => m.category === state.currentCategory));
            break;
        default:
            renderHome();
    }
}

function updateActiveNav() {
    navLinks.forEach(link => {
        if (link.dataset.page === state.currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Render Login
function renderLogin() {
    const template = document.getElementById('login-template');
    const content = template.content.cloneNode(true);
    mainContent.appendChild(content);

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        state.isAuthenticated = true;
        state.user = { name: "Clone User" };
        document.getElementById('usernameDisplay').textContent = state.user.name;
        render();
    });
}

// Helper for Content Sections
function renderSection(templateId, items) {
    const template = document.getElementById(templateId);
    const content = template.content.cloneNode(true);

    // Set section title if available in template
    const sectionTitleElement = content.getElementById('sectionTitle');
    if (sectionTitleElement) {
        // Extract title from templateId (e.g., 'store-template' -> 'Store')
        const title = templateId.replace('-template', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        sectionTitleElement.textContent = title;
    }

    const container = content.getElementById('section-rows');
    const grid = document.createElement('div');
    grid.className = 'section-grid';

    if (items.length === 0) {
        grid.textContent = "Coming Soon...";
        grid.style.padding = "20px";
    } else {
        items.forEach(m => createCard(m, grid));
    }

    container.appendChild(grid);
    mainContent.appendChild(content);
}

// Render Functions
function renderStore(items) {
    renderSection('store-template', items);
}

function renderMovies(items) {
    renderSection('movies-template', items);
}

function renderTVSection(items) {
    renderSection('tv-template', items);
}

function renderLive(items) {
    renderSection('live-template', items);
}

// Render Home
function renderHome() {
    const template = document.getElementById('home-template');
    const content = template.content.cloneNode(true);

    // Featured Content (Random)
    const featured = movies[0];
    const heroTitle = content.getElementById('heroTitle');
    const heroDesc = content.getElementById('heroDesc');
    const heroVideo = content.getElementById('heroVideo');
    const heroVideoSource = heroVideo.querySelector('source');
    const playHeroBtn = content.querySelector('.play-hero');

    heroTitle.textContent = featured.title;
    heroDesc.textContent = featured.desc;

    // Set Video Background
    if (featured.videoUrl) {
        heroVideoSource.src = featured.videoUrl;
        heroVideo.load(); // Reload video to play new source
    }

    playHeroBtn.addEventListener('click', () => openPlayer(featured));

    // Rows
    const rowsContainer = content.getElementById('rows-container');
    const categories = ["Action", "Sci-Fi", "TV Shows", "Animation"];

    categories.forEach(cat => {
        const rowHeader = document.createElement('h3');
        rowHeader.className = 'row-header';
        rowHeader.textContent = cat;

        const carousel = document.createElement('div');
        carousel.className = 'carousel';

        const catMovies = movies.filter(m => m.category === cat || (cat === "TV Shows" && m.id === 3));

        if (catMovies.length > 0) {
            catMovies.forEach(m => createCard(m, carousel));
            // Duplicate for scroll effect
            movies.slice(0, 2).forEach(m => createCard(m, carousel));
        }

        rowsContainer.appendChild(rowHeader);
        rowsContainer.appendChild(carousel);
    });

    mainContent.appendChild(content);
}

// Render Generic Section (Category View)
function renderGenericSection(title, items) {
    const template = document.getElementById('section-template');
    const content = template.content.cloneNode(true);

    content.getElementById('sectionTitle').textContent = title;
    const container = content.getElementById('section-rows');

    const grid = document.createElement('div');
    grid.className = 'section-grid';

    if (items.length === 0) {
        grid.textContent = "Coming Soon...";
        grid.style.padding = "20px";
    } else {
        items.forEach(m => createCard(m, grid));
    }

    container.appendChild(grid);
    mainContent.appendChild(content);
}

// Render Categories
function renderCategories() {
    const template = document.getElementById('categories-template');
    const content = template.content.cloneNode(true);
    const container = content.getElementById('section-rows');

    const cats = ["Action", "Sci-Fi", "Comedy", "Entertainment", "Animation", "TV Shows", "Store", "Live TV"];

    const grid = document.createElement('div');
    grid.className = 'category-grid';

    cats.forEach(cat => {
        const tile = document.createElement('div');
        tile.className = 'category-tile';
        tile.textContent = cat;
        tile.addEventListener('click', () => {
            // Navigate to specific category view
            state.currentPage = 'category-view';
            state.currentCategory = cat;
            render();
        });
        grid.appendChild(tile);
    });

    container.appendChild(grid);
    mainContent.appendChild(content);
}

// Render Video Player
function openPlayer(movie) {
    playerTitle.textContent = movie.title;
    videoPlayer.classList.remove('hidden');

    const videoContainer = videoPlayer.querySelector('.video-container');

    // Replace placeholder with video tag or iframe
    if (movie.videoUrl.includes('youtube.com') || movie.videoUrl.includes('youtu.be')) {
        // Extract YouTube ID
        let videoId = "";
        if (movie.videoUrl.includes('youtu.be')) {
            videoId = movie.videoUrl.split('youtu.be/')[1].split('?')[0];
        } else {
            const urlParams = new URLSearchParams(new URL(movie.videoUrl).search);
            videoId = urlParams.get('v');
        }

        videoContainer.innerHTML = `
            <iframe width="80%" height="80%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                title="${movie.title}" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
                style="max-height: 80vh; border: 2px solid var(--brand-color); border-radius: 8px;">
            </iframe>
             <div style="text-align:center; color:white; margin-top:10px;">
                <h2>${movie.title}</h2>
                <p>${movie.desc || 'No description available.'}</p>
            </div>
        `;
    } else {
        videoContainer.innerHTML = `
            <video controls autoplay style="width: 80%; max-height: 80vh; border: 2px solid var(--brand-color); border-radius: 8px;">
                <source src="${movie.videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div style="text-align:center; color:white; margin-top:10px;">
                <h2>${movie.title}</h2>
                <p>${movie.desc}</p>
            </div>
        `;
    }
}

// Global helper for hardcoded HTML elements
window.playYouTube = function (url, title = 'New Release') {
    openPlayer({
        title: title,
        desc: "Watch this new release now!",
        videoUrl: url
    });
    return false; // Prevent default link behavior
};

closePlayerBtn.addEventListener('click', () => {
    videoPlayer.classList.add('hidden');
    // Stop video playback when closed
    const videoContainer = videoPlayer.querySelector('.video-container');
    videoContainer.innerHTML = ''; // Clears the video tag to stop audio
});

// Helper: Create Card
function createCard(movie, container) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    const img = document.createElement('img');
    img.src = movie.image;
    img.alt = movie.title;

    card.appendChild(img);

    // Store Price Tag
    if (state.currentPage === 'store' && movie.price) {
        const price = document.createElement('span');
        price.className = 'price-tag';
        price.textContent = movie.price;
        card.appendChild(price);
    }

    card.addEventListener('click', () => openPlayer(movie));
    container.appendChild(card);
}

// Helper: Render Search
function renderSearch() {
    const container = document.createElement('div');
    container.style.padding = "20px 4%";

    const headerContainer = document.createElement('div');
    headerContainer.style.display = "flex";
    headerContainer.style.alignItems = "center";
    headerContainer.style.gap = "20px";
    headerContainer.style.marginBottom = "20px";

    const backBtn = document.createElement('button');
    backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Back';
    backBtn.className = 'btn-secondary';
    backBtn.style.marginLeft = "0";
    backBtn.onclick = () => {
        state.searchQuery = "";
        const input = document.getElementById('searchInput');
        if (input) input.value = "";
        render();
    };

    const header = document.createElement('h2');
    header.textContent = `Results for "${state.searchQuery}"`;

    headerContainer.appendChild(backBtn);
    headerContainer.appendChild(header);
    container.appendChild(headerContainer);

    const grid = document.createElement('div');
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(200px, 1fr))";
    grid.style.gap = "20px";
    grid.style.marginTop = "20px";

    const results = movies.filter(m => m.title.toLowerCase().includes(state.searchQuery.toLowerCase()));

    if (results.length === 0) {
        const noRes = document.createElement('p');
        noRes.textContent = "No titles found.";
        grid.appendChild(noRes);
    } else {
        results.forEach(m => createCard(m, grid));
    }

    container.appendChild(grid);
    mainContent.appendChild(container);
}

// Event Listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        state.currentPage = e.target.dataset.page;
        state.searchQuery = ""; // Clear search on nav
        render();
    });
});

searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    render();
    setTimeout(() => {
        const input = document.getElementById('searchInput');
        if (input) {
            input.focus();
            input.value = state.searchQuery;
        }
    }, 0);
});

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    state.isAuthenticated = false;
    state.user = null;
    state.currentPage = 'home';
    render();
});

// Initial Render
render();
