  (function() {
        const profileImgElement = document.getElementById('profileActualImg');
        const fallbackDiv = document.getElementById('profileFallbackText');
        const possibleImages = ['images/profile.jpg', 'images/profile.png', 'images/jumyr.jpg', 'images/avatar.png', 'images/jm.png'];
        
        function tryLoadImage(url) {
            const img = new Image();
            img.onload = function() {
                profileImgElement.src = url;
                profileImgElement.style.display = 'block';
                if (fallbackDiv) fallbackDiv.style.display = 'none';
            };
            img.onerror = function() {
            };
            img.src = url;
        }
        
        let loaded = false;
        for (let src of possibleImages) {
            const testImg = new Image();
            testImg.onload = () => {
                if (!loaded) {
                    profileImgElement.src = src;
                    profileImgElement.style.display = 'block';
                    if (fallbackDiv) fallbackDiv.style.display = 'none';
                    loaded = true;
                }
            };
            testImg.src = src;
        }
        
        setTimeout(() => {
            if (!loaded && profileImgElement.style.display !== 'block') {
                if (fallbackDiv) fallbackDiv.style.display = 'flex';
                profileImgElement.style.display = 'none';
            }
        }, 800);

        const profileCard = document.getElementById('profileCard');
        const profileHoverImg = document.getElementById('profileHoverImg');
        if (profileCard && profileHoverImg) {
            const defaultSrc = 'images/profile-photo.png';
            const hoverSrc = 'images/pikit.png';
            
            profileCard.addEventListener('mouseenter', () => {
                profileHoverImg.src = hoverSrc;
            });
            
            profileCard.addEventListener('mouseleave', () => {
                profileHoverImg.src = defaultSrc;
            });
        }
        
        const projectsData = [
            { title: "OSAS - Organization Student Affairs System", tech: "Capstone Project | 2026", desc: "Comprehensive system for managing student organization affairs, activities, and records.", tags: ["System","Database","Web App"], category: "system", imgSrc: "images/osas-system.png", fallback: "OSAS" },
            { title: "CSC Finance Management System", tech: "Group Project | 2nd Year", desc: "Financial tracking system for student organization with transparent reporting.", tags: ["System","Finance","Database"], category: "system", imgSrc: "images/csc-finance.png", fallback: "CSC Finance" },
            { title: "Point of Sale System for EUT", tech: "Freelance Project | Sold", desc: "Complete POS system with inventory and sales monitoring. Actually sold and used in real business.", tags: ["System","POS","Sold"], category: "system", imgSrc: "images/pos-system.png", fallback: "POS System" },
            { title: "Commission Game Project", tech: "Freelance Commission", desc: "Custom game developed for client. Details and screenshots available.", tags: ["Game","Commission"], category: "game", imgSrc: "images/game1.png", fallback: "Game Project" },
            { title: "Computer Log-Book System", tech: "tatapusin pa haha", desc: "Computer logbook system using qr code as their credentials for checking in and out.", tags: ["Website","Commission"], category: "website", imgSrc: "images/website-project.png", fallback: "Website Project" },
            { title: "Personal Mini Games", tech: "Personal Projects", desc: "Small games I developed for fun and to practice logic and creativity.", tags: ["Game","Personal"], category: "game", imgSrc: "images/mini-games.png", fallback: "Mini Games" }
        ];
        
        const projectGrid = document.getElementById('projectGrid');
        function renderProjects(filter = 'all') {
            if (!projectGrid) return;
            projectGrid.innerHTML = '';
            const filtered = projectsData.filter(p => filter === 'all' || p.category === filter);
            filtered.forEach(proj => {
                const card = document.createElement('div');
                card.className = 'project-card fade-in';
                card.setAttribute('data-category', proj.category);
                const imageHtml = `<div class="project-image"><img class="project-img" src="${proj.imgSrc}" alt="${proj.title}" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\'project-img-placeholder\'>📁 ${proj.fallback}</div>'"></div>`;
                card.innerHTML = `
                    ${imageHtml}
                    <div class="project-content">
                        <h3>${proj.title}</h3>
                        <p class="project-tech">${proj.tech}</p>
                        <p>${proj.desc}</p>
                        <div class="project-tags">
                            ${proj.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                        </div>
                    </div>
                `;
                projectGrid.appendChild(card);
                const observerFade = new IntersectionObserver((entries) => {
                    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
                }, { threshold: 0.1 });
                observerFade.observe(card);
            });
        }
        
        renderProjects('all');
        
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const val = btn.getAttribute('data-filter');
                renderProjects(val);
            });
        });
        
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if(hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                const target = document.querySelector(targetId);
                if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
        
        const contactFormElem = document.getElementById('contactForm');
        function showNotification(message, type) {
            const notif = document.createElement('div');
            notif.className = 'notification';
            notif.textContent = message;
            notif.style.background = type === 'success' ? '#238636' : '#da3633';
            notif.style.borderLeftColor = '#f0f6fc';
            document.body.appendChild(notif);
            setTimeout(() => notif.remove(), 2800);
        }
        if(contactFormElem) {
            contactFormElem.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('name')?.value.trim();
                const email = document.getElementById('email')?.value.trim();
                const msg = document.getElementById('message')?.value.trim();
                if(!name || !email || !msg) { showNotification('Please fill all fields', 'error'); return; }
                if(!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email)) { showNotification('Valid email required', 'error'); return; }
                showNotification('Message sent! (demo) I will reply soon.', 'success');
                contactFormElem.reset();
            });
        }
        
        const fadeElements = document.querySelectorAll('.fade-in');
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        fadeElements.forEach(el => obs.observe(el));
        
        const footerP = document.querySelector('.footer p');
        if(footerP) footerP.innerHTML = footerP.innerHTML.replace('2026', new Date().getFullYear());
        
        window.addEventListener('scroll', () => { });
        console.log('%c Portfolio ready | Jumyr M. Moreno', 'color: #2d81e0; font-size: 14px;');
    })();