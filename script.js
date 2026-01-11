document.addEventListener('DOMContentLoaded', () => {
    // Register Service Worker for Media Caching
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('SW registered: ', registration);
            }).catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
        });
    }

    // Apply Settings (Theme)
    const savedTheme = localStorage.getItem('softbridge-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Disable right-click on images and media
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO' || e.target.closest('.hero-bg-wrapper')) {
            e.preventDefault();
            return false;
        }
    });

    const waffleBtn = document.getElementById('waffle-btn');
    const appsPanel = document.getElementById('apps-panel');
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebar = document.getElementById('mobile-sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    const overlay = document.getElementById('sidebar-overlay');
    const productContainer = document.getElementById('product-container');

    // Global Theme Function
    const updateTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('softbridge-theme', theme);

        // Update any theme buttons on the page (e.g., settings page)
        const lightBtn = document.getElementById('light-theme-btn');
        const darkBtn = document.getElementById('dark-theme-btn');
        if (lightBtn && darkBtn) {
            lightBtn.classList.toggle('active', theme === 'light');
            darkBtn.classList.toggle('active', theme === 'dark');
        }
    };

    // Counter animation function
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString() + '+';
                clearInterval(interval);
            } else {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            }
        }, 10);
    };

    // Trigger counters when stats are visible
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle stat numbers
                if (entry.target.classList.contains('stat-number')) {
                    const targetVal = parseInt(entry.target.getAttribute('data-val'));
                    if (!isNaN(targetVal)) {
                        animateCounter(entry.target, targetVal);
                    }
                }
                // Handle fade-in animations
                if (entry.target.style.opacity === '0') {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe stats items and numbers
    document.querySelectorAll('.stat-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    document.querySelectorAll('.stat-number').forEach((el) => {
        observer.observe(el);
    });

    // Observe bento cards
    document.querySelectorAll('.bento-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    const toggleSidebar = () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    };

    if (mobileToggle) mobileToggle.addEventListener('click', toggleSidebar);
    if (sidebarClose) sidebarClose.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', toggleSidebar);

    if (waffleBtn) {
        waffleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            appsPanel.classList.toggle('active');
            // Add rotation animation
            waffleBtn.style.transform = appsPanel.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0deg)';
        });
    }

    document.addEventListener('click', (e) => {
        if (appsPanel && !appsPanel.contains(e.target) && e.target !== waffleBtn) {
            appsPanel.classList.remove('active');
            waffleBtn.style.transform = 'rotate(0deg)';
        }
    });

    fetch('/data/products.json')
        .then(res => res.json())
        .then(data => {
            if (productContainer) {
                const limitedData = data.slice(0, 6);
                productContainer.innerHTML = limitedData.map((p, index) => `
                    <a href="/apps/${p.id}/" class="product-card" style="animation-delay: ${index * 0.1}s">
                        <img src="${p.icon}" alt="${p.name}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/25/25231.png'">
                        <h3>${p.name}</h3>
                    </a>
                `).join('');

                if (data.length > 6) {
                    const viewAllBtn = document.createElement('a');
                    viewAllBtn.href = '/apps/';
                    viewAllBtn.className = 'view-all-tray';
                    viewAllBtn.textContent = 'Laboratory Catalog';
                    productContainer.after(viewAllBtn);
                }
            }
        })
        .catch(() => {
            if (productContainer) productContainer.innerHTML = '<p>Ecosystem offline</p>';
        });

    // Add parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.navbar');

        if (scrolled > 50) {
            navbar.style.boxShadow = '0 8px 32px rgba(0, 102, 255, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.02)';
        }
    });

    // Add cursor tracking effect on hero
    const hero = document.querySelector('.hero-content');
    if (hero) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            hero.style.transform = `perspective(1000px) rotateX(${y * 0.1}deg) rotateY(${x * 0.1}deg)`;
        });

        document.addEventListener('mouseleave', () => {
            hero.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // Button ripple effect
    document.querySelectorAll('.btn-black, .btn-white').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Handle Hero Video Loading for mobile and desktop
    const heroVideos = document.querySelectorAll('.hero-video');
    heroVideos.forEach(video => {
        // If video is already loaded
        if (video.readyState >= 3) {
            video.classList.add('loaded');
            video.play().catch(() => { });
        }

        video.addEventListener('canplaythrough', () => {
            video.classList.add('loaded');
            video.play().catch(() => { });
        });

        // Fallback: forcefully check after 2 seconds
        setTimeout(() => {
            if (!video.classList.contains('loaded') && video.readyState >= 1) {
                video.classList.add('loaded');
                video.play().catch(() => { });
            }
        }, 2000);
    });
});