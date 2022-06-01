const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overLay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [nav1,nav2,nav3,nav4,nav5];

// control navigation animation
function navAnimation(direction1,direction2) {
    navItems.forEach((nav,i) => {
        nav.classList.replace(`slide-${direction1}-${i +1}`,`slide-${direction2}-${i + 1}`);
    });
}

// toggleNav function
function toggleNav() {
    menuBars.classList.toggle('change');
    // toggle: menu active
    overlay.classList.toggle('overlay-active');
    if(overlay.classList.contains('overlay-active')) {
        // Animate in -Overlay
        overLay.classList.replace('overlay-slide-left', 'overlay-slide-right');
        // Animate in - Nav-Items
        navAnimation('out','in');
    }else {
        // Animate Out-Overlay
        overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
        // Animate Out - Nav Items
        navAnimation('in','out');
}
}

// Event Listeners
menuBars.addEventListener('click',toggleNav);
navItems.forEach((nav) => {
    nav.addEventListener('click',toggleNav);
});