document.addEventListener("DOMContentLoaded", function (e) {

    // бургер меню
    let burger = document.querySelector(".burger-menu");
    let documentBody = document.documentElement;

    function menuOpen() {
        documentBody.classList.toggle("lock");
        documentBody.classList.toggle("menu-open");
    };

    function menuClose() {
        documentBody.classList.remove("menu-open");
        documentBody.classList.remove("lock");
    };


    if (burger) {
        burger.addEventListener("click", function () {
            menuOpen();
        });
    }

});



