document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".slider-page");
    const dots = document.querySelectorAll(".slider-dot");
    const nextBtn = document.getElementById("btnNext");
    const prevBtn = document.getElementById("btnPrev");

    let currentPage = 0;
    const totalPages = pages.length;

    function updateSlider(index) {
        pages.forEach((page, i) => {
            page.classList.toggle("active-page", i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active-dot", i === index);
        });

        if (index === totalPages - 1) {
            nextBtn.classList.remove("active-btn");
            nextBtn.classList.add("disabled-btn");
        } else {
            nextBtn.classList.add("active-btn");
            nextBtn.classList.remove("disabled-btn");
        }

        if (index === 0) {
            prevBtn.classList.remove("active-btn");
            prevBtn.classList.add("disabled-btn");
        } else {
            prevBtn.classList.add("active-btn");
            prevBtn.classList.remove("disabled-btn");
        }

        currentPage = index;
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            if (currentPage < totalPages - 1) {
                updateSlider(currentPage + 1);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            if (currentPage > 0) {
                updateSlider(currentPage - 1);
            }
        });
    }

    dots.forEach((dot) => {
        dot.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            updateSlider(index);
        });
    });

    updateSlider(0);
});


document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".stats-page");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.getElementById("btnNextStat");
    const prevBtn = document.getElementById("btnPrevStat");

    if (pages.length === 0) return;

    let currentPage = 0;
    const totalPages = pages.length;

    function updateStatsSlider(index) {
        pages.forEach((page, i) => {
            if (i === index) {
                page.classList.add("active-page");
            } else {
                page.classList.remove("active-page");
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active-dot", i === index);
        });

        if (index === totalPages - 1) {
            nextBtn.classList.remove("active-btn");
            nextBtn.classList.add("disabled-btn");
        } else {
            nextBtn.classList.add("active-btn");
            nextBtn.classList.remove("disabled-btn");
        }

        if (index === 0) {
            prevBtn.classList.remove("active-btn");
            prevBtn.classList.add("disabled-btn");
        } else {
            prevBtn.classList.add("active-btn");
            prevBtn.classList.remove("disabled-btn");
        }

        currentPage = index;
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            if (currentPage < totalPages - 1) {
                updateStatsSlider(currentPage + 1);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            if (currentPage > 0) {
                updateStatsSlider(currentPage - 1);
            }
        });
    }

    dots.forEach((dot) => {
        dot.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            updateStatsSlider(index);
        });
    });

    updateStatsSlider(0);
});