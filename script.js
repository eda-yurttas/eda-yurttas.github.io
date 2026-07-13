// ======================================================
// PORTFOLIO v1.0
// script.js
// PART 1 / 2
// ======================================================



// -----------------------------
// ELEMENTS
// -----------------------------

const portfolioGrid = document.getElementById("portfolioGrid");

const modal = document.getElementById("projectModal");

const modalImage = document.getElementById("modalImage");

const modalTitle = document.getElementById("modalTitle");

const modalCompany = document.getElementById("modalCompany");

const modalDescription = document.getElementById("modalDescription");

const modalSoftware = document.getElementById("modalSoftware");

const modalRole = document.getElementById("modalRole");

const modalYear = document.getElementById("modalYear");

const renderDots = document.getElementById("renderDots");

const closeModalBtn = document.getElementById("closeModal");

const nextProjectBtn = document.getElementById("nextProject");

const prevProjectBtn = document.getElementById("prevProject");

const overlay = document.querySelector(".modal-overlay");



// -----------------------------
// STATE
// -----------------------------

let currentProjectIndex = 0;

let currentRenderIndex = 0;





// -----------------------------
// CREATE PROJECT CARDS
// -----------------------------

function createProjectCards() {

    portfolioGrid.innerHTML = "";

    projects.forEach((project, index) => {

        const card = document.createElement("article");

        card.className = "project-card";

        card.dataset.index = index;

        card.innerHTML = `

            <div class="card-image">

                <img
                    src="${project.thumbnail}"
                    alt="${project.title}"
                    loading="lazy">

            </div>

            <div class="card-content">

                <h3>${project.title}</h3>

                <p>${project.year}</p>

                <span>${project.software}</span>

            </div>

        `;

        card.addEventListener("click", () => {

            openProject(index);

        });

        portfolioGrid.appendChild(card);

    });

}





// -----------------------------
// OPEN PROJECT
// -----------------------------

function openProject(index) {

    currentProjectIndex = index;

    currentRenderIndex = 0;

    updateModal();

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}





// -----------------------------
// UPDATE MODAL
// -----------------------------

function updateModal() {

    const project = projects[currentProjectIndex];

    modalTitle.textContent = project.title;

    modalDescription.textContent = project.description;

    modalSoftware.textContent = project.software;

    modalRole.textContent = project.role;

    modalYear.textContent = project.year;

    modalImage.style.opacity = 0;

    setTimeout(() => {

        modalImage.src = project.images[currentRenderIndex];

        modalImage.onload = () => {

            modalImage.style.opacity = 1;

        };

    }, 120);

    createRenderDots();

}





// -----------------------------
// CLOSE MODAL
// -----------------------------

function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "auto";

}





// -----------------------------
// NEXT PROJECT
// -----------------------------

function nextProject() {

    currentProjectIndex++;

    if (currentProjectIndex >= projects.length) {

        currentProjectIndex = 0;

    }

    currentRenderIndex = 0;

    updateModal();

}





// -----------------------------
// PREVIOUS PROJECT
// -----------------------------

function previousProject() {

    currentProjectIndex--;

    if (currentProjectIndex < 0) {

        currentProjectIndex = projects.length - 1;

    }

    currentRenderIndex = 0;

    updateModal();

}

// ======================================================
// CREATE RENDER DOTS
// ======================================================

function createRenderDots() {

    const project = projects[currentProjectIndex];

    renderDots.innerHTML = "";

    project.images.forEach((image, index) => {

        const dot = document.createElement("button");

        dot.className = "render-dot";

        if (index === currentRenderIndex) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {

            currentRenderIndex = index;

            updateModal();

        });

        renderDots.appendChild(dot);

    });

}





// ======================================================
// NEXT RENDER
// ======================================================

function nextRender() {

    const project = projects[currentProjectIndex];

    currentRenderIndex++;

    if (currentRenderIndex >= project.images.length) {

        currentRenderIndex = 0;

    }

    updateModal();

}





// ======================================================
// PREVIOUS RENDER
// ======================================================

function previousRender() {

    const project = projects[currentProjectIndex];

    currentRenderIndex--;

    if (currentRenderIndex < 0) {

        currentRenderIndex = project.images.length - 1;

    }

    updateModal();

}





// ======================================================
// BUTTON EVENTS
// ======================================================

closeModalBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

nextProjectBtn.addEventListener("click", nextProject);

prevProjectBtn.addEventListener("click", previousProject);





// ======================================================
// KEYBOARD EVENTS
// ======================================================

document.addEventListener("keydown", (e) => {

    if (!modal.classList.contains("active")) return;

    switch (e.key) {

        case "Escape":
            closeModal();
            break;

        case "ArrowLeft":
            previousRender();
            break;

        case "ArrowRight":
            nextRender();
            break;

        case "a":
        case "A":
            previousProject();
            break;

        case "d":
        case "D":
            nextProject();
            break;

    }

});





// ======================================================
// MOBILE SWIPE
// ======================================================

let touchStartX = 0;

let touchEndX = 0;

modalImage.addEventListener("touchstart", (e) => {

    touchStartX = e.changedTouches[0].clientX;

});

modalImage.addEventListener("touchend", (e) => {

    touchEndX = e.changedTouches[0].clientX;

    const distance = touchStartX - touchEndX;

    if (Math.abs(distance) < 60) return;

    if (distance > 0) {

        nextRender();

    } else {

        previousRender();

    }

});





// ======================================================
// PRELOAD IMAGES
// ======================================================

projects.forEach(project => {

    project.images.forEach(path => {

        const img = new Image();

        img.src = path;

    });

});





// ======================================================
// INITIALIZE
// ======================================================

createProjectCards();