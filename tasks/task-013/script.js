document.querySelector(".dropdown__toggle").addEventListener("click",open_drop)
document.querySelector(".collapse__toggle").addEventListener("click",open_collapse)

function open_drop() {
    document.querySelector(".dropdown__content").classList.toggle("dropdown__content--open");
    document.querySelector(".dropdown__toggle").classList.toggle("dropdown__toggle--open");
}

function open_collapse() {
    document.querySelector(".collapse__content").classList.toggle("collapse__content--open");
    document.querySelector(".collapse__toggle").classList.toggle("collapse__toggle--open");
}