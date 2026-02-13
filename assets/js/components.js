/**
 * components.js
 * Automatically injects the Header, Footer, SEO tags, and UX enhancements.
 * Replaces the static markup to ensure consistency across the site.
 */

const SITE_URL = 'https://lubny-ukg.co.ua';
const SITE_NAME = 'Українська класична гімназія — м. Лубни';

document.addEventListener('DOMContentLoaded', () => {
    injectSEO();
    injectHeader();
    injectFooter();
    initializeNavigation();
    highlightActiveNav();
    injectScrollToTop();
    lazyLoadImages();
});

/**
 * SEO: Injects favicon, meta description, OG tags, preconnect, canonical
 */
function injectSEO() {
    const head = document.head;
    const pageTitle = document.title || SITE_NAME;
    const pagePath = location.pathname.replace(/\/$/, '') || '/index.html';
    const canonicalURL = SITE_URL + pagePath;

    // Page-specific descriptions
    const descriptions = {
        'index': 'Українська класична гімназія Лубенської міської ради — офіційний сайт. Новини, розклад, документи.',
        'management': 'Адміністрація Української класичної гімназії — директор, заступники, графік прийому громадян.',
        'contacts': 'Контакти Української класичної гімназії — адреса, телефон, email, карта проїзду.',
        'documents': 'Офіційні документи гімназії — статут, ліцензія, стратегія розвитку, матеріально-технічне забезпечення.',
        'teachers': 'Професійні спільноти вчителів Української класичної гімназії м. Лубни.',
        'schedule-primary': 'Розклад уроків початкової школи Української класичної гімназії.',
        'schedule-middle': 'Розклад уроків середньої школи Української класичної гімназії.',
        'admission': 'Вступ до Української класичної гімназії — правила прийому, документи, територія обслуговування.',
        'antibullying': 'Антибулінгова кампанія гімназії — профілактика, план заходів, допомога.',
        'hackathon': 'Освітній Хакатон 2025 — фестиваль партнерства з тематичними днями для учнів, батьків та вчителів.',
        'director': 'Сторінка директора Української класичної гімназії — звернення до батьків та учнів.',
        'history': 'Історія Української класичної гімназії м. Лубни.',
        'library': 'Бібліотечно-інформаційний центр Української класичної гімназії.',
        'psychologist': 'Психологічна служба Української класичної гімназії — консультації, підтримка.',
        'social-pedagogue': 'Соціальний педагог Української класичної гімназії.',
        'medical-service': 'Медична служба Української класичної гімназії.',
        'electronic-diary': 'Електронний щоденник — інструкція з реєстрації та використання.',
        'student-government': 'Учнівське самоврядування Української класичної гімназії.',
        'parents-info': 'Інформація для батьків — Українська класична гімназія.',
        'parents-rights': 'Права та обов\'язки батьків — Українська класична гімназія.',
        'rights-students': 'Права та обов\'язки учнів — Українська класична гімназія.',
        'academic-integrity': 'Академічна доброчесність — Українська класична гімназія.',
        'prozorist': 'Прозорість та інформаційна відкритість — Українська класична гімназія.',
        'samoanaliz': 'Самоаналіз діяльності — Українська класична гімназія.',
        'atestacia': 'Атестація педагогічних працівників — Українська класична гімназія.',
        'staff': 'Кадровий склад Української класичної гімназії.',
        'vacancies': 'Вакансії Української класичної гімназії.',
        'working-mode': 'Режим роботи Української класичної гімназії.',
        'circles': 'Гуртки та секції Української класичної гімназії.',
        'educational-work': 'Виховна робота Української класичної гімназії.',
        'distance-learning': 'Дистанційне навчання — Українська класична гімназія.',
        'territory': 'Територія обслуговування Української класичної гімназії.',
        'memory': 'Сторінка пам\'яті — Українська класична гімназія.',
        'humanities': 'Спільнота вчителів суспільно-гуманітарних наук.',
        'math-science': 'Спільнота вчителів природничо-математичних наук.',
        'arts-health': 'Спільнота вчителів художньо-оздоровчого циклу.',
        'class-teachers': 'Класні керівники Української класичної гімназії.',
        'primary-school': 'Спільнота вчителів початкової школи.',
        'programs-primary': 'Навчальні програми початкової школи.',
        'programs-middle': 'Навчальні програми середньої школи.',
        'books-primary': 'Електронні підручники початкової школи.',
        'books-middle': 'Електронні підручники середньої школи.',
        'psychology-support': 'Психологічна підтримка — Українська класична гімназія.',
    };

    // Get page key from filename
    const pageKey = pagePath.split('/').pop().replace('.html', '') || 'index';
    const description = descriptions[pageKey] || `${pageTitle} — Українська класична гімназія м. Лубни.`;

    // Helper to add meta if not present
    const addMeta = (attr, attrValue, content) => {
        if (!head.querySelector(`meta[${attr}="${attrValue}"]`)) {
            const meta = document.createElement('meta');
            meta.setAttribute(attr, attrValue);
            meta.content = content;
            head.appendChild(meta);
        }
    };

    // Helper to add link if not present
    const addLink = (rel, href, extra) => {
        if (!head.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
            const link = document.createElement('link');
            link.rel = rel;
            link.href = href;
            if (extra) Object.assign(link, extra);
            head.appendChild(link);
        }
    };

    // Favicon
    if (!head.querySelector("link[rel='icon']")) {
        addLink('icon', 'assets/img/logo.png', { type: 'image/png' });
    }

    // Meta description
    addMeta('name', 'description', description);

    // Open Graph
    addMeta('property', 'og:title', pageTitle);
    addMeta('property', 'og:description', description);
    addMeta('property', 'og:image', SITE_URL + '/assets/img/logo.png');
    addMeta('property', 'og:url', canonicalURL);
    addMeta('property', 'og:type', 'website');
    addMeta('property', 'og:site_name', SITE_NAME);
    addMeta('property', 'og:locale', 'uk_UA');

    // Canonical
    addLink('canonical', canonicalURL);

    // Preconnect for Google Fonts
    addLink('preconnect', 'https://fonts.googleapis.com');
    addLink('preconnect', 'https://fonts.gstatic.com', { crossOrigin: '' });
}

/**
 * Highlights the current page in navigation
 */
function highlightActiveNav() {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.dropdown-menu a, .nav-link[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('nav-active');
            // Also highlight parent nav-item if inside dropdown
            const parentItem = link.closest('.nav-item');
            if (parentItem) parentItem.classList.add('nav-item-active');
        }
    });
}

/**
 * Scroll-to-top button
 */
function injectScrollToTop() {
    const btn = document.createElement('button');
    btn.className = 'scroll-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Прокрутити вгору');
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
}

/**
 * Add loading="lazy" to all images that don't have it
 */
function lazyLoadImages() {
    document.querySelectorAll('img:not([loading])').forEach(img => {
        // Don't lazy-load above-the-fold images (logo, hero)
        if (!img.closest('.logo') && !img.closest('.hero')) {
            img.setAttribute('loading', 'lazy');
        }
    });
}


function injectHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    // If there is no placeholder, we might want to replace the existing header if it exists
    // OR we just append to body if we are doing a full replacement strategy.
    // For safety, let's look for existing header or placeholder.

    const existingHeader = document.querySelector('header');

    const headerHTML = `
    <div class="container header-container">
        <a href="index.html" class="logo">
            <img src="assets/img/logo.png" alt="Лого" class="logo-img">
            <div class="logo-text"><span>Українська класична гімназія</span><small>Лубенської міської ради</small></div>
        </a>
        
        <div class="burger" id="burger-btn">
            <span></span><span></span><span></span>
        </div>

        <nav class="nav" id="main-nav" role="navigation" aria-label="Main navigation">
            <div class="close-menu-btn" id="close-btn" aria-label="Close menu">&times;</div>

            <ul class="nav-list" role="menubar">
                
                <li class="nav-item">
                    <a href="index.html" class="nav-link">🏠 Головна</a>
                </li>

                <li class="nav-item dropdown" role="none">
                    <span class="nav-link" role="menuitem" aria-haspopup="true" aria-expanded="false" tabindex="0">Про гімназію <span class="arrow">▾</span></span>
                    <div class="dropdown-menu mega-menu menu-4-col" role="menu" aria-label="About Gymnasium menu">
                        <div class="mega-column">
                            <h4>Адміністрація</h4>
                            <a href="management.html">👔 Управління</a>
                            <a href="prozorist.html">🔍 Прозорість</a>
                            <a href="documents.html">📂 Документи</a>
                            <a href="samoanaliz.html">📊 Самоаналіз</a>
                            <a href="atestacia.html">🎖️ Атестація</a>
                        </div>
                        <div class="mega-column">
                            <h4>Історія</h4>
                            <a href="history.html">📜 Історія</a>
                            <a href="memory.html">🕯️ Сторінка пам'яті</a>
                            <h4>Спільноти</h4>
                            <a href="teachers.html">👨‍🏫 Професійні спільноти вчителів</a>
                            <a href="humanities.html">📖 Суспільно-гуманітарні науки</a>
                            <a href="math-science.html">🔬 Природничо-математичні науки</a>
                            <a href="arts-health.html">🎨 Художньо-оздоровчий цикл</a>
                            <a href="class-teachers.html">👥 Класні керівники</a>
                            <a href="primary-school.html">🎒 Початкова школа</a>
                        </div>
                        <div class="mega-column">
                            <h4>Соціально-психологічна служба</h4>
                            <a href="social-pedagogue.html">🤝 Соц. педагог</a>
                            <a href="psychologist.html">🧠 Психолог</a>
                            <a href="psychology-support.html">💙 Підтримка</a>
                            <a href="antibullying.html" class="link-danger">🛑 Антибулінг</a>
                            <h4>Центри</h4>
                            <a href="library.html">📚 Бібліотека</a>
                            <a href="medical-service.html">🏥 Медична служба</a>
                        </div>
                        <div class="mega-column">
                            <h4>Інформація</h4>
                            <a href="staff.html">👥 Кадри</a>
                            <a href="vacancies.html">💼 Вакансії</a>
                            <a href="working-mode.html">⏰ Режим роботи</a>
                            <a href="contacts.html">📍 Контакти</a>
                            <a href="https://www.facebook.com/p/%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-%D0%BA%D0%BB%D0%B0%D1%81%D0%B8%D1%87%D0%BD%D0%B0-%D0%B3%D1%96%D0%BC%D0%BD%D0%B0%D0%B7%D1%96%D1%8F-100076001883917/" target="_blank">📰 Facebook</a>
                        </div>
                    </div>
                </li>

                <li class="nav-item dropdown" role="none">
                    <span class="nav-link" role="menuitem" aria-haspopup="true" aria-expanded="false" tabindex="0">Виховна робота <span class="arrow">▾</span></span>
                    <div class="dropdown-menu simple-dropdown" role="menu" aria-label="Educational work menu">
                        <a href="student-government.html">🗳️ Самоврядування</a>
                        <a href="educational-work.html">🌻 Виховна робота</a>
                        <a href="circles.html">🎨 Гуртки та секції</a>
                        <a href="hackathon.html">💡 Хакатон</a>
                    </div>
                </li>

                <li class="nav-item dropdown" role="none">
                    <span class="nav-link" role="menuitem" aria-haspopup="true" aria-expanded="false" tabindex="0">Учням <span class="arrow">▾</span></span>
                    <div class="dropdown-menu mega-menu menu-3-col" role="menu" aria-label="Students menu">
                        <div class="mega-column">
                            <h4>Початкова школа</h4>
                            <a href="schedule-primary.html">🗓️ Розклад</a>
                            <a href="programs-primary.html">📚 Програми</a>
                            <a href="books-primary.html">📖 Підручники</a>
                        </div>
                        <div class="mega-column">
                            <h4>Середня школа</h4>
                            <a href="schedule-middle.html">🗓️ Розклад</a>
                            <a href="programs-middle.html">📚 Програми</a>
                            <a href="books-middle.html">📖 Підручники</a>
                        </div>
                        <div class="mega-column">
                            <h4>Важливе</h4>
                            <a href="rights-students.html">⚖️ Права</a>
                            <a href="academic-integrity.html">🎓 Доброчесність</a>
                            <a href="electronic-diary.html">💻 Щоденник</a>
                            <a href="distance-learning.html">🌐 Дистанційне</a>
                            <a href="educational-work.html">🌻 Виховна</a>
                        </div>
                    </div>
                </li>

                <li class="nav-item dropdown" role="none">
                    <span class="nav-link" role="menuitem" aria-haspopup="true" aria-expanded="false" tabindex="0">Батькам <span class="arrow">▾</span></span>
                    <div class="dropdown-menu simple-dropdown" role="menu" aria-label="Parents menu">
                        <a href="parents-rights.html">⚖️ Права батьків</a>
                        <a href="territory.html">🗺️ Територія</a>
                        <a href="admission.html">📝 Вступ</a>
                        <a href="parents-info.html">ℹ️ Інформація</a>
                    </div>
                </li>




            </ul>
        </nav>
    </div>
    `;

    if (existingHeader) {
        existingHeader.innerHTML = headerHTML;
        // Ensure class is correct
        existingHeader.className = 'header';
    } else if (headerPlaceholder) {
        headerPlaceholder.className = 'header';
        headerPlaceholder.innerHTML = headerHTML;
    } else {
        // Fallback: prepend to body
        const newHeader = document.createElement('header');
        newHeader.className = 'header';
        newHeader.innerHTML = headerHTML;
        document.body.prepend(newHeader);
    }
}

function injectFooter() {
    const footerHTML = `
    <div class="footer-bottom">
        <div class="container">
            <div class="footer-grid">
                <!-- Column 1: Info -->
                <div class="footer-col info-col">
                    <div class="footer-brand">
                        <img src="assets/img/logo.png" alt="Логотип" class="footer-logo">
                        <div class="brand-text">
                            <h3>УКРАЇНСЬКА КЛАСИЧНА ГІМНАЗІЯ</h3>
                            <p>Лубенської міської ради Лубенського району Полтавської області</p>
                        </div>
                    </div>
                    <p class="footer-desc">Сучасний освітній простір, де кожна дитина розкриває свій потенціал.</p>
                    <div class="footer-socials">
                        <a href="https://www.facebook.com/p/%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-%D0%BA%D0%BB%D0%B0%D1%81%D0%B8%D1%87%D0%BD%D0%B0-%D0%B3%D1%96%D0%BC%D0%BD%D0%B0%D0%B7%D1%96%D1%8F-100076001883917/" target="_blank" class="social-btn facebook">
                            <span class="fb-icon">f</span> Facebook
                        </a>
                        <a href="mailto:school8lub_@ukr.net" class="social-btn email">
                            <span class="email-icon">✉️</span> Написати нам
                        </a>
                    </div>
                </div>

                <!-- Column 2: Contacts -->
                <div class="footer-col contacts-col">
                    <h4 class="footer-heading">КОНТАКТИ</h4>
                    <ul class="footer-contacts-list">
                        <li>
                            <span class="icon">📍</span>
                            <span>Україна, Полтавська область,<br> м.Лубни, просп. Володимирський, 104/1</span>
                        </li>
                        <li>
                            <span class="icon">📞</span>
                            <a href="tel:0536177507">(05361) 77-507</a>
                        </li>
                        <li>
                            <span class="icon">📧</span>
                            <a href="mailto:school8lub_@ukr.net">school8lub_@ukr.net</a>
                        </li>
                    </ul>
                </div>

                <!-- Column 3: Map -->
                <div class="footer-col map-col">
                    <h4 class="footer-heading">МИ НА КАРТІ</h4>
                    <div class="footer-map-wrapper">
                        <iframe 
                            src="https://maps.google.com/maps?q=Лубенська+загальноосвітня+школа+№8&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                            width="100%" 
                            height="200" 
                            style="border:0;" 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
            
            <div class="copyright-bar">
                <p>&copy; 2026 Українська класична гімназія. Всі права захищені.</p>
            </div>
        </div>
    </div>`;

    const existingFooter = document.querySelector('footer');

    if (existingFooter) {
        existingFooter.innerHTML = footerHTML;
        existingFooter.className = 'site-footer'; // Add class for styling
    } else {
        const newFooter = document.createElement('footer');
        newFooter.className = 'site-footer';
        newFooter.innerHTML = footerHTML;
        document.body.append(newFooter);
    }
}

function initializeNavigation() {
    const burger = document.getElementById('burger-btn');
    const nav = document.getElementById('main-nav');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay') || createOverlay();
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

    // ---- Mobile menu open/close ----
    const openMenu = () => {
        nav.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        // Close all dropdowns when menu closes
        dropdownItems.forEach(item => {
            item.classList.remove('open');
            const link = item.querySelector('.nav-link');
            if (link) link.setAttribute('aria-expanded', 'false');
        });
    };

    if (burger) burger.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Escape key closes menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // ---- Dropdown interactions ----
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        if (!link) return;

        // -- Mobile: accordion click --
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                const isOpen = item.classList.contains('open');

                // Accordion: close all other dropdowns first
                dropdownItems.forEach(other => {
                    if (other !== item) {
                        other.classList.remove('open');
                        const otherLink = other.querySelector('.nav-link');
                        if (otherLink) otherLink.setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current
                item.classList.toggle('open', !isOpen);
                link.setAttribute('aria-expanded', String(!isOpen));
            }
        });

        // -- Keyboard: Enter/Space --
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click(); // Delegates to the click handler above
            }
        });

        // -- Desktop: hover with delay to prevent flicker --
        // (CSS handles the visual, JS handles aria)
        if (window.matchMedia('(min-width: 769px)').matches) {
            item.addEventListener('mouseenter', () => {
                link.setAttribute('aria-expanded', 'true');
            });
            item.addEventListener('mouseleave', () => {
                link.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // Close mobile menu on link click (navigate away)
    nav.querySelectorAll('.dropdown-menu a').forEach(a => {
        a.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'overlay';
    document.body.prepend(overlay);
    return overlay;
}
