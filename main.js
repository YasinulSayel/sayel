/* =========================================================
   PROJECT 420 — MAIN JAVASCRIPT
   File: js/main.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       01. MOBILE NAVIGATION
       ----------------------------------------------------- */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");

            const expanded =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!expanded)
            );
        });

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });
    }


    /* -----------------------------------------------------
       02. SCROLL REVEAL
       ----------------------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .fade-in, .scale-in, .stagger, .section-heading, .contact-wrapper"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    /* -----------------------------------------------------
       03. TIMELINE ANIMATION
       ----------------------------------------------------- */

    const timelines = document.querySelectorAll(".timeline");

    if ("IntersectionObserver" in window) {

        const timelineObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                });

            },
            {
                threshold: 0.15
            }
        );

        timelines.forEach(timeline => {
            timelineObserver.observe(timeline);
        });

    } else {

        timelines.forEach(timeline => {
            timeline.classList.add("visible");
        });
    }


    /* -----------------------------------------------------
       04. SKILL BAR ANIMATION
       ----------------------------------------------------- */

    const skillsList = document.querySelector(".skills-list");

    if (skillsList) {

        if ("IntersectionObserver" in window) {

            const skillObserver = new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    });

                },
                {
                    threshold: 0.25
                }
            );

            skillObserver.observe(skillsList);

        } else {

            skillsList.classList.add("visible");
        }
    }


    /* -----------------------------------------------------
       05. PROJECT FILTER
       ----------------------------------------------------- */

    const filterButtons =
        document.querySelectorAll(".project-filter");

    const projectCards =
        document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.dataset.filter ||
                button.getAttribute("data-filter");

            projectCards.forEach(card => {

                const category =
                    card.dataset.category ||
                    card.getAttribute("data-category");

                const shouldShow =
                    filter === "all" ||
                    category === filter;

                if (shouldShow) {

                    card.style.display = "";

                    requestAnimationFrame(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    });

                } else {

                    card.style.opacity = "0";
                    card.style.transform = "translateY(25px)";

                    setTimeout(() => {

                        if (
                            card.style.opacity === "0"
                        ) {
                            card.style.display = "none";
                        }

                    }, 300);
                }
            });
        });
    });


    /* -----------------------------------------------------
       06. PROJECT MODAL
       ----------------------------------------------------- */

    const projectModal =
        document.querySelector(".project-modal");

    const modalContent =
        document.querySelector(".modal-content");

    const modalClose =
        document.querySelector(".modal-close");

    const projectOpenButtons =
        document.querySelectorAll(
            "[data-project], .project-view, .view-project"
        );


    function openProjectModal(card) {

        if (!projectModal) return;

        const title =
            card.dataset.title ||
            card.querySelector(".project-title")?.textContent ||
            card.querySelector("h3")?.textContent ||
            "Project";

        const description =
            card.dataset.description ||
            card.querySelector(".project-description")?.textContent ||
            "";

        const category =
            card.dataset.category || "";

        const image =
            card.dataset.image ||
            card.querySelector("img")?.getAttribute("src") ||
            "";

        const modalTitle =
            projectModal.querySelector(".modal-title");

        const modalDescription =
            projectModal.querySelector(".modal-description");

        const modalCategory =
            projectModal.querySelector(".modal-category");

        const modalImage =
            projectModal.querySelector(".modal-image");

        if (modalTitle) {
            modalTitle.textContent = title;
        }

        if (modalDescription) {
            modalDescription.textContent = description;
        }

        if (modalCategory) {
            modalCategory.textContent = category;
        }

        if (modalImage && image) {

            modalImage.src = image;
            modalImage.alt = title;
        }

        projectModal.classList.add("active");

        document.body.classList.add("modal-open");

        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );

        if (modalClose) {
            modalClose.focus();
        }
    }


    function closeProjectModal() {

        if (!projectModal) return;

        projectModal.classList.remove("active");

        document.body.classList.remove("modal-open");

        projectModal.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    projectOpenButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const card =
                button.closest(".project-card");

            if (card) {
                openProjectModal(card);
            }
        });
    });


    projectCards.forEach(card => {

        card.addEventListener("click", event => {

            const clickable =
                event.target.closest(
                    "a, button, .project-view, .view-project"
                );

            if (clickable) return;

            const hasModalData =
                card.dataset.title ||
                card.querySelector(".project-title") ||
                card.querySelector("h3");

            if (hasModalData) {
                openProjectModal(card);
            }
        });
    });


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeProjectModal
        );
    }


    if (projectModal) {

        projectModal.addEventListener(
            "click",
            event => {

                if (
                    event.target === projectModal ||
                    event.target.classList.contains("modal-overlay")
                ) {
                    closeProjectModal();
                }
            }
        );
    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeProjectModal();
        }
    });


    /* -----------------------------------------------------
       07. BODY MODAL STATE
       ----------------------------------------------------- */

    const modalStyle =
        document.createElement("style");

    modalStyle.textContent = `
        body.modal-open {
            overflow: hidden;
        }
    `;

    document.head.appendChild(modalStyle);


    /* -----------------------------------------------------
       08. NAVBAR SCROLL EFFECT
       ----------------------------------------------------- */

    const navbar =
        document.querySelector(".navbar");

    let lastScroll = 0;

    window.addEventListener(
        "scroll",
        () => {

            const currentScroll =
                window.scrollY;

            if (navbar) {

                if (currentScroll > 40) {
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }

                if (
                    currentScroll > lastScroll &&
                    currentScroll > 180
                ) {
                    navbar.classList.add("nav-hidden");
                } else {
                    navbar.classList.remove("nav-hidden");
                }
            }

            lastScroll = currentScroll;

        },
        {
            passive: true
        }
    );


    /* -----------------------------------------------------
       09. ACTIVE NAVIGATION
       ----------------------------------------------------- */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            '.nav-menu a[href^="#"]'
        );

    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        const id =
                            entry.target.getAttribute("id");

                        navLinks.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${id}`
                            ) {
                                link.classList.add("active");
                            }
                        });

                    });

                },
                {
                    threshold: 0.2,
                    rootMargin: "-20% 0px -60% 0px"
                }
            );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    /* -----------------------------------------------------
       10. SMOOTH ANCHOR SCROLL
       ----------------------------------------------------- */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                const navbarHeight =
                    navbar?.offsetHeight || 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight -
                    15;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            });
        });


    /* -----------------------------------------------------
       11. BACK TO TOP
       ----------------------------------------------------- */

    const backToTop =
        document.querySelector(".floating-top");

    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 600) {
                    backToTop.classList.add("visible");
                } else {
                    backToTop.classList.remove("visible");
                }

            },
            {
                passive: true
            }
        );

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
    }


    /* -----------------------------------------------------
       12. COUNTER ANIMATION
       ----------------------------------------------------- */

    const counters =
        document.querySelectorAll("[data-count]");


    function animateCounter(counter) {

        const target =
            Number(counter.dataset.count);

        const duration = 1600;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            const eased =
                1 - Math.pow(
                    1 - progress,
                    4
                );

            const currentValue =
                Math.floor(
                    target * eased
                );

            counter.textContent =
                currentValue.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target.toLocaleString();
            }
        }


        requestAnimationFrame(
            updateCounter
        );
    }


    if (
        counters.length &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );
                    });

                },
                {
                    threshold: 0.6
                }
            );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach(counter => {

            counter.textContent =
                Number(
                    counter.dataset.count
                ).toLocaleString();
        });
    }


    /* -----------------------------------------------------
       13. PARALLAX EFFECT
       ----------------------------------------------------- */

    const parallaxElements =
        document.querySelectorAll("[data-parallax]");

    if (parallaxElements.length) {

        let ticking = false;

        window.addEventListener(
            "scroll",
            () => {

                if (ticking) return;

                window.requestAnimationFrame(() => {

                    const scrollY =
                        window.scrollY;

                    parallaxElements.forEach(
                        element => {

                            const speed =
                                Number(
                                    element.dataset.parallax
                                ) || 0.1;

                            element.style.transform =
                                `translate3d(
                                    0,
                                    ${scrollY * speed}px,
                                    0
                                )`;
                        }
                    );

                    ticking = false;
                });

                ticking = true;

            },
            {
                passive: true
            }
        );
    }


    /* -----------------------------------------------------
       14. TILT EFFECT FOR DESKTOP
       ----------------------------------------------------- */

    const tiltCards =
        document.querySelectorAll("[data-tilt]");

    if (
        window.matchMedia(
            "(min-width: 992px)"
        ).matches
    ) {

        tiltCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                            centerY) *
                        -3;

                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        3;

                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-8px)`;
                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";
                }
            );
        });
    }


    /* -----------------------------------------------------
       15. MAGNETIC BUTTON EFFECT
       ----------------------------------------------------- */

    const magneticButtons =
        document.querySelectorAll(
            "[data-magnetic]"
        );

    if (
        window.matchMedia(
            "(min-width: 992px)"
        ).matches
    ) {

        magneticButtons.forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        `translate(
                            ${x * 0.12}px,
                            ${y * 0.12}px
                        )`;
                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform = "";
                }
            );
        });
    }


    /* -----------------------------------------------------
       16. CONTACT FORM → WHATSAPP
       ----------------------------------------------------- */

    const contactForm =
        document.querySelector("#contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                /* -----------------------------------------
                   GET FORM ELEMENTS
                   ----------------------------------------- */

                const nameInput =
                    document.querySelector("#name");

                const emailInput =
                    document.querySelector("#email");

                const serviceInput =
                    document.querySelector("#service");

                const messageInput =
                    document.querySelector("#message");

                const submitButton =
                    document.querySelector("#contactSubmit");


                /* -----------------------------------------
                   GET USER DATA
                   ----------------------------------------- */

                const name =
                    nameInput?.value.trim() || "";

                const email =
                    emailInput?.value.trim() || "";

                const service =
                    serviceInput?.value || "";

                const message =
                    messageInput?.value.trim() || "";


                /* -----------------------------------------
                   VALIDATION
                   ----------------------------------------- */

                if (
                    !name ||
                    !email ||
                    !service ||
                    !message
                ) {

                    contactForm.reportValidity();

                    return;
                }


                /* -----------------------------------------
                   YOUR WHATSAPP NUMBER
                   ----------------------------------------- */

                const whatsappNumber =
                    "8801602206378";


                /* -----------------------------------------
                   WHATSAPP MESSAGE
                   ----------------------------------------- */

                const whatsappMessage =
`Hello Sayel,

I would like to discuss a project with you.

━━━━━━━━━━━━━━━━━━

CLIENT DETAILS

Name: ${name}
Email: ${email}

SERVICE

${service}

PROJECT DETAILS

${message}

━━━━━━━━━━━━━━━━━━

I found your portfolio website and would like to know more about working with you.

Thank you.`;


                /* -----------------------------------------
                   CREATE WHATSAPP URL
                   ----------------------------------------- */

                const whatsappURL =
                    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        whatsappMessage
                    )}`;


                /* -----------------------------------------
                   BUTTON LOADING STATE
                   ----------------------------------------- */

                if (submitButton) {

                    submitButton.classList.add(
                        "loading"
                    );

                    submitButton.disabled = true;
                }


                /* -----------------------------------------
                   OPEN WHATSAPP
                   ----------------------------------------- */

                setTimeout(() => {

                    window.open(
                        whatsappURL,
                        "_blank",
                        "noopener,noreferrer"
                    );


                    /* -------------------------------------
                       RESTORE BUTTON
                       ------------------------------------- */

                    setTimeout(() => {

                        if (submitButton) {

                            submitButton.classList.remove(
                                "loading"
                            );

                            submitButton.disabled =
                                false;
                        }

                    }, 1000);

                }, 500);
            }
        );
    }


    /* -----------------------------------------------------
       17. CURRENT YEAR
       ----------------------------------------------------- */

    const yearElements =
        document.querySelectorAll("[data-year]");

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();
    });


    /* -----------------------------------------------------
       18. IMAGE ERROR HANDLING
       ----------------------------------------------------- */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                    image.setAttribute(
                        "aria-label",
                        "Image unavailable"
                    );
                }
            );
        });


    /* -----------------------------------------------------
       19. INITIALIZE
       ----------------------------------------------------- */

    document.body.classList.add(
        "js-loaded"
    );


    console.log(
        "%c PROJECT 420 ",
        "background:#2563eb;color:#fff;padding:8px 14px;border-radius:6px;font-weight:700;"
    );


    console.log(
        "Portfolio system initialized successfully."
    );

});