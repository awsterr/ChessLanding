carousel.addEventListener("mousedown",dragStart)
document.addEventListener("mouseup",dragEnd)
carousel.addEventListener("mousemove",dragging)
carousel.addEventListener("scroll",InfinityScroll)
carousel.addEventListener("mouseenter",()=>clearInterval(timeoutId))
carousel.addEventListener("mouseleave",autoPlay)
let isDragging = false
let startX
let startScrollLeft
let timeoutId
let count = 3
const firstMemberWidth = carousel.children[0].offsetWidth
const carouselChildrens = [...carousel.children]
let memberPerView = Math.round(carousel.offsetWidth / firstMemberWidth)
console.log(memberPerView,'memberPerView')
carouselChildrens.slice(-memberPerView).reverse().forEach(member=>{
    carousel.insertAdjacentHTML('afterbegin', member.outerHTML)
})
carouselChildrens.slice(0,memberPerView).reverse().forEach(member=>{
    carousel.insertAdjacentHTML('beforeend', member.outerHTML)
})
function dragStart(e){
    isDragging = true
    carousel.classList.add("dragging")
    startX = e.pageX
    startScrollLeft = carousel.scrollLeft
}
function dragEnd(){
    isDragging = false
    carousel.classList.remove("dragging")
}

function dragging(e){
    if(!isDragging) return
    carousel.scrollLeft = startScrollLeft - e.pageX + startX
}
tourney_right.addEventListener("click",()=>{
    current_member.innerHTML = ++current_member.innerHTML
    if (current_member.innerHTML == '7') current_member.innerHTML = '1' 
    carousel.scrollLeft += firstMemberWidth + 20
})
tourney_left.addEventListener("click",()=>{
    current_member.innerHTML = +current_member.innerHTML - 1
    if (current_member.innerHTML == '0') current_member.innerHTML = '6' 
    carousel.scrollLeft += -firstMemberWidth
})
function InfinityScroll(){
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no-smooth")
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth)
        carousel.classList.remove("no-smooth")
    } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-smooth")
        carousel.scrollLeft = carousel.offsetWidth
        carousel.classList.remove("no-smooth")
    }
    clearTimeout(timeoutId)
    if(!carousel_wrapper.matches(":hover")) autoPlay()
}
function autoPlay(){
    timeoutId = setTimeout(()=> carousel.scrollLeft += firstMemberWidth,4000)
}
autoPlay()