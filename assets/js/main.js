var is_menu_open = false;

function toggleMenu() {
    if (is_menu_open) {
        navbar.style.display = "none";
    } else {
        navbar.style.display = "flex";
    }
    is_menu_open = !is_menu_open;
}