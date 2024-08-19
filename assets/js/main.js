/// basic interactive here
const minimum_scroll = 20

document.addEventListener("scroll", (event) => {
    if (window.scrollY > minimum_scroll) {
        header_name.classList.remove("header-name")
        header_up.classList.remove("header-up")
        header_socials.classList.remove("header-socials")
        header.classList.add("bg-zinc-100")
        header.classList.add("dark:bg-zinc-900")
        // header.classList.add("shadow-md")
    } else {
        header_name.classList.add("header-name")
        header_up.classList.add("header-up")
        header_socials.classList.add("header-socials")
        header.classList.remove("bg-zinc-100")
        header.classList.remove("dark:bg-zinc-900")
        // header.classList.remove("shadow-md")
    }
})