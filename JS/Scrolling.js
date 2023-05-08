const animItems = document.querySelectorAll('._anim-items');

function animOnScroll(){
    for(let index =0; index < animItems.length; index++){
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 2;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if(animItemHeight > window.innerHeight){
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
            animItem.classList.add('_active');
        } else{
            animItem.classList.remove('_active');
        }
    }
}

function offset(el){
    const rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop}
}

if(animItems.length > 0){
    window.addEventListener('scroll', animOnScroll);
    window.addEventListener('load', animOnScroll); 
}
