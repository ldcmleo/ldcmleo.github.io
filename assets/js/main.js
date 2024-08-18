/// basic interactive here
const minimum_scroll = 20

document.addEventListener("scroll", (event) => {
    if (window.scrollY > minimum_scroll) {
        header_profile.classList.remove("header-object")
        header_name.classList.remove("header-object")
        header_up.classList.remove("header-object-2")
        header_github.classList.remove("header-object-2")
        header_linkedin.classList.remove("header-object-2")
        header.classList.add("bg-zinc-50")
    } else {
        header_profile.classList.add("header-object")
        header_name.classList.add("header-object")
        header_up.classList.add("header-object-2")
        header_github.classList.add("header-object-2")
        header_linkedin.classList.add("header-object-2")
        header.classList.remove("bg-zinc-50")
    }
})