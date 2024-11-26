const slideAmount = 5
const slideDuration = 1000

function animate({timing, draw, duration}) {

    let start = performance.now()
  
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration
      if (timeFraction > 1) timeFraction = 1
  
      let progress = timing(timeFraction)
      timeFraction = draw(progress, timeFraction)
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate)
      }
      
    });
    
}

stages_left.addEventListener('click', function(e) {
    if(stages_left.getAttribute('disabled') === 'true'){
        return
    }
    stages_right.setAttribute('disabled', 'false')
    let slidWidth = stages__wrapper.scrollWidth / slideAmount
    slidWidth = Math.round(slidWidth)

    let currentScroll = stages__wrapper.scrollLeft
    
    let goal = Math.floor(currentScroll / slidWidth) * slidWidth

    for (let span of slider_dots.children){
        span.removeAttribute('active')
    }
    if (Math.abs(currentScroll - goal) < 5) goal -= slidWidth

    if (goal === 0){
        stages_left.setAttribute('disabled', 'true')
    }
    slider_dots.children[goal / slidWidth].setAttribute('active','true')
    
    animate({
        duration: slideDuration,
        timing(timeFraction) {
            return Math.pow(timeFraction, 2)
        },
        draw(progress,timeFraction) {
            currentScroll - progress * slidWidth < goal ? stages__wrapper.scrollLeft = goal :stages__wrapper.scrollLeft = currentScroll - progress * stages__wrapper.scrollWidth / slideAmount
            if (stages__wrapper.scrollLeft <= goal){
                    return 1
                } else return timeFraction
        }
      });
});
stages_right.addEventListener('click', function(e) {
    if(stages_right.getAttribute('disabled') === 'true'){
        return
    }
    stages_left.setAttribute('disabled', 'false')
    let slidWidth = stages__wrapper.scrollWidth / slideAmount
    slidWidth = Math.round(slidWidth)
    let currentScroll = stages__wrapper.scrollLeft
    
    let goal = Math.ceil(currentScroll / slidWidth) * slidWidth

    for (let span of slider_dots.children){
        span.removeAttribute('active')
    }
    if (Math.abs(currentScroll - goal) < 5 ) goal += slidWidth

    if (goal >= stages__wrapper.scrollWidth - slidWidth){
        stages_right.setAttribute('disabled', 'true')
    }
    
    slider_dots.children[goal / slidWidth].setAttribute('active','true')

    animate({
        duration: slideDuration,
        timing(timeFraction) {
            return Math.pow(timeFraction, 2)
        },
        draw(progress,timeFraction) {
            currentScroll + progress * slidWidth > goal ? stages__wrapper.scrollLeft = goal :stages__wrapper.scrollLeft =  currentScroll + progress * slidWidth
            if (stages__wrapper.scrollLeft >= goal){
                    return 1
                } else return timeFraction
        }
      });
});

