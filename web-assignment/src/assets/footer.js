document.addEventListener("DOMContentLoaded", function() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        backToTop.style.display = (window.scrollY > 200) ? 'block' : 'none';
    });
});