document.addEventListener("DOMContentLoaded", function (e) {

    // показать пароль
    const viewpassButtons = document.querySelectorAll('[class*="__viewpass"]');

    if (viewpassButtons.length) {
        viewpassButtons.forEach(viewpassButton => {
            viewpassButton.addEventListener("click", function (e) {
                let inputType = viewpassButton.classList.contains('viewpass-active') ? "password" : "text";
                viewpassButton.parentElement.querySelector('input').setAttribute("type", inputType);
                viewpassButton.classList.toggle('viewpass-active');
            });
        });
    }



});



