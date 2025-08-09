    // Sticky Header
    const header = document.getElementById('header');
    const scrollTop = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        // Scroll to Top Button
        if (window.scrollY > 300) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Scroll to Top Button Functionality
    const scrollTopBtn = document.getElementById('scrollTop');
    
    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Carousel Functionality
    document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.getElementById('carousel');
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const carouselNav = document.getElementById('carouselNav');
        
        let currentIndex = 0;
        const itemCount = items.length;
        
        // Create navigation dots
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            carouselNav.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.carousel-dot');
        
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            updateCarousel();
        }
        
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Auto-advance carousel (optional)
        let autoSlide = setInterval(nextSlide, 5000);
        
        // Pause auto-advance on hover
        const galleryContainer = document.querySelector('.gallery-container');
        galleryContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });
        
        galleryContainer.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 5000);
        });
        
        // Touch support for mobile devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                nextSlide(); // Swipe left
            }
            if (touchEndX > touchStartX + 50) {
                prevSlide(); // Swipe right
            }
        }
    });
