document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");

    let currentSlide = 0;
    let autoSlide;


    /* =========================
       SHOW SLIDE
    ========================= */

    function showSlide(index) {

        slides.forEach((slide) => {
            slide.classList.remove("active-slide");
        });

        dots.forEach((dot) => {
            dot.classList.remove("active-dot");
        });

        slides[index].classList.add("active-slide");
        dots[index].classList.add("active-dot");

        currentSlide = index;
    }


    /* =========================
       NEXT SLIDE
    ========================= */

    function nextSlide() {

        let nextIndex = currentSlide + 1;

        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }

        showSlide(nextIndex);
    }


    /* =========================
       PREVIOUS SLIDE
    ========================= */

    function previousSlide() {

        let previousIndex = currentSlide - 1;

        if (previousIndex < 0) {
            previousIndex = slides.length - 1;
        }

        showSlide(previousIndex);
    }


    /* =========================
       BUTTON EVENTS
    ========================= */

    nextBtn.addEventListener("click", () => {

        nextSlide();

        restartAutoSlide();

    });


    prevBtn.addEventListener("click", () => {

        previousSlide();

        restartAutoSlide();

    });


    /* =========================
       DOT EVENTS
    ========================= */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showSlide(index);

            restartAutoSlide();

        });

    });


    /* =========================
       AUTO SLIDER
    ========================= */

    function startAutoSlide() {

        autoSlide = setInterval(() => {

            nextSlide();

        }, 5000);

    }


    /* =========================
       RESTART AUTO SLIDER
    ========================= */

    function restartAutoSlide() {

        clearInterval(autoSlide);

        startAutoSlide();

    }


    /* =========================
       START
    ========================= */

    showSlide(0);

    startAutoSlide();


    /* =========================
       PAUSE ON HOVER
    ========================= */

    const heroSlider = document.querySelector(".hero-slider");

    heroSlider.addEventListener("mouseenter", () => {

        clearInterval(autoSlide);

    });


    heroSlider.addEventListener("mouseleave", () => {

        startAutoSlide();

    });


    /* =========================
       SIDEBAR ACTIVE MENU
    ========================= */

    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach((item) => {

        item.addEventListener("click", (event) => {

            event.preventDefault();

            menuItems.forEach((menu) => {
                menu.classList.remove("active");
            });

            item.classList.add("active");

        });

    });


    /* =========================
       NOTIFICATION BUTTON
    ========================= */

    const notificationBtn = document.querySelector(
        ".icon-btn .fa-bell"
    );

    if (notificationBtn) {

        notificationBtn.parentElement.addEventListener(
            "click",
            () => {

                alert("You have 3 new notifications.");

            }
        );

    }

});