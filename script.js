/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.getElementById("menuButton");
const menuIcon = document.getElementById("menuIcon");
const mobileMenu = document.getElementById("mobileMenu");

let menuOpen = false;

menuButton.addEventListener("click", () => {

    menuOpen = !menuOpen;

    mobileMenu.classList.toggle("hidden");

    if (menuOpen) {

        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");

        menuButton.setAttribute(
            "aria-label",
            "Close menu"
        );

    } else {

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

        menuButton.setAttribute(
            "aria-label",
            "Open menu"
        );
    }
});


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
========================================================= */

const mobileLinks = document.querySelectorAll(
    ".mobile-nav-link, #mobileMenu a[href='#contact']"
);

mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

        menuOpen = false;

        mobileMenu.classList.add("hidden");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

        menuButton.setAttribute(
            "aria-label",
            "Open menu"
        );
    });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll(
    "section[id]"
);

const navLinks = document.querySelectorAll(
    ".nav-link"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const currentId = entry.target.id;

                navLinks.forEach((link) => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        `#${currentId}`
                    ) {
                        link.classList.add("active");
                    }

                });
            }

        });

    },
    {
        threshold: 0.35
    }
);

sections.forEach((section) => {
    observer.observe(section);
});


/* =========================================================
   SERVICE CARDS
========================================================= */

const serviceCards = document.getElementById("serviceCards");
const serviceCardTemplate = document.getElementById("serviceCardTemplate");

window.services.forEach((service, index) => {
    const card = serviceCardTemplate.content.firstElementChild.cloneNode(true);

    const serviceImage = card.querySelector("[data-service-image]");
    serviceImage.src = service.image;
    serviceImage.alt = service.title;
    card.querySelector("[data-service-category]").textContent = `${String(index + 1).padStart(2, "0")} / ${service.category}`;
    card.querySelector("[data-service-title]").textContent = service.title;
    card.querySelector("[data-service-price]").textContent = service.price;
    card.querySelector("[data-service-description]").textContent = service.description;
    card.querySelector(".detail-button").addEventListener("click", () => { openServiceModal(service);
    });

    serviceCards.append(card);
});


/* =========================================================
   SERVICE DETAIL MODAL
========================================================= */

const detailModal = document.getElementById(
    "detailModal"
);

const closeModal = document.getElementById(
    "closeModal"
);

const modalTitle = document.getElementById(
    "modalTitle"
);

const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");

const modalContact = document.getElementById(
    "modalContact"
);

const modalImage = document.querySelector("#detailModal [data-service-image]");


function openServiceModal(service) {
    modalImage.src = service.image;
    modalImage.alt = service.title;
    modalTitle.textContent = service.title;
    modalPrice.textContent = service.price;
    modalDescription.textContent = service.detail;
    detailModal.classList.remove("hidden");
    detailModal.classList.add("flex");
    document.body.style.overflow = "hidden";
}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeServiceModal() {

    detailModal.classList.add("hidden");
    detailModal.classList.remove("flex");

    document.body.style.overflow = "";

}


closeModal.addEventListener(
    "click",
    closeServiceModal
);


/* Click outside modal */

detailModal.addEventListener(
    "click",
    (event) => {

        if (event.target === detailModal) {
            closeServiceModal();
        }

    }
);


/* ESC key */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            !detailModal.classList.contains("hidden")
        ) {
            closeServiceModal();
        }

    }
);


/* =========================================================
   MODAL -> CONTACT
========================================================= */

modalContact.addEventListener(
    "click",
    () => {
        closeServiceModal();
    }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

document.getElementById(
    "currentYear"
).textContent = new Date().getFullYear();


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.querySelector(
    ".navbar-glass"
);

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 30) {

            navbar.style.background =
                "rgba(5, 5, 5, 0.88)";

            navbar.style.borderColor =
                "rgba(204, 255, 0, 0.08)";

        } else {

            navbar.style.background =
                "rgba(8, 8, 8, 0.72)";

            navbar.style.borderColor =
                "rgba(255, 255, 255, 0.1)";
        }

    },
    { passive: true }
);