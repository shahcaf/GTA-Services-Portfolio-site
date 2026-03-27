/* 
    XenoModz Smooth Scroll and Reveal
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navbar Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('isVisible');
                // Optional: Stop observing after it becomes visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
    });

    // 3. Update Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 4. Mobile Menu Toggle Placeholder
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksList = document.querySelector('.nav-links');

    mobileMenuBtn.onclick = () => {
        // Simple alert as desktop version is preferred/responsive grid is handled
        // However, standard toggle logic:
        navLinksList.classList.toggle('nav-active');
        if (navLinksList.classList.contains('nav-active')) {
            navLinksList.style.display = 'flex';
            navLinksList.style.flexDirection = 'column';
            navLinksList.style.position = 'absolute';
            navLinksList.style.top = 'var(--nav-height)';
            navLinksList.style.left = '0';
            navLinksList.style.width = '100%';
            navLinksList.style.background = 'rgba(10, 10, 10, 0.95)';
            navLinksList.style.padding = '2rem';
            navLinksList.style.alignItems = 'center';
            navLinksList.style.gap = '2rem';
        } else {
            // Check if mobile or desktop on close to reset
            if (window.innerWidth <= 768) {
                navLinksList.style.display = 'none';
            }
        }
    };

    // Reset layout on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinksList.style.display = 'flex';
            navLinksList.style.flexDirection = 'row';
            navLinksList.style.position = 'static';
            navLinksList.style.padding = '0';
        } else if (!navLinksList.classList.contains('nav-active')) {
            navLinksList.style.display = 'none';
        }
    });

});
