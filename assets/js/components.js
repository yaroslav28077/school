/**
 * components.js
 * Automatically injects the Header and Footer into pages.
 * Replaces the static markup to ensure consistency across the site.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inject Favicon if not present
    if (!document.querySelector("link[rel='icon']")) {
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = "assets/img/logo.png";
        link.type = "image/png";
        document.head.appendChild(link);
    }

    injectHeader();
    injectFooter();
    initializeNavigation(); // Re-initialize burger menu logic after injection
});

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

        <nav class="nav" id="main-nav">
            <div class="close-menu-btn" id="close-btn">&times;</div>

            <ul class="nav-list">
                
                <li class="nav-item">
                    <a href="index.html" class="nav-link">🏠 Головна</a>
                </li>

                <li class="nav-item dropdown">
                    <span class="nav-link">Про гімназію <span class="arrow">▾</span></span>
                    <div class="dropdown-menu mega-menu">
                        <div class="mega-column">
                            <h4>Адміністрація</h4>
                            <a href="management.html">👔 Управління</a>
                            <a href="prozorist.html">🔍 Прозорість</a>
                            <a href="documents.html">📂 Документи</a>
                            <a href="samoanaliz.html">📊 Самоаналіз</a>
                            <a href="atestacia.html">🎖️ Атестація</a>
                        </div>
                        <div class="mega-column">
                            <h4>Спільноти</h4>
                            <a href="history.html">📜 Історія</a>
                            <a href="teachers.html">👨‍🏫 Професійні спільноти вчителів</a>
                            <a href="humanities.html">📖 Суспільно-гуманітарні науки</a>
                            <a href="math-science.html">🔬 Природничо-математичні науки</a>
                            <a href="arts-health.html">🎨 Художньо-оздоровчий цикл</a>
                            <a href="class-teachers.html">👥 Класні керівники</a>
                            <a href="primary-school.html">🎒 Початкова школа</a>
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

                <li class="nav-item dropdown">
                    <span class="nav-link">Учням <span class="arrow">▾</span></span>
                    <div class="dropdown-menu mega-menu">
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

                <li class="nav-item dropdown">
                    <span class="nav-link">Батькам <span class="arrow">▾</span></span>
                    <div class="dropdown-menu simple-menu">
                        <a href="parents-rights.html">⚖️ Права батьків</a>
                        <a href="territory.html">🗺️ Територія</a>
                        <a href="admission.html">📝 Вступ</a>
                        <a href="parents-info.html">ℹ️ Інформація</a>
                    </div>
                </li>

                <li class="nav-item dropdown">
                    <span class="nav-link">Життя <span class="arrow">▾</span></span>
                    <div class="dropdown-menu simple-menu">
                        <a href="student-government.html">🗳️ Самоврядування</a>
                        <a href="https://schoolprint.netlify.app" target="_blank" style="color: #0056b3; font-weight: 700;">🖨️ School Print</a>
                        <a href="circles.html">🎨 Гуртки</a>
                        <a href="hackathon.html">💡 Хакатон</a>
                    </div>
                </li>

                <li class="nav-item dropdown">
                    <span class="nav-link">Центри <span class="arrow">▾</span></span>
                    <div class="dropdown-menu simple-menu">
                        <a href="library.html">📚 Бібліотека</a>
                        <a href="psychologist.html">🧠 Психолог</a>
                        <a href="psychology-support.html">💙 Підтримка</a>
                        <a href="social-pedagogue.html">🤝 Соц. педагог</a>
                        <a href="antibullying.html" style="color: #d32f2f;">🛑 Антибулінг</a>
                        <a href="medical-service.html">🏥 Медик</a>
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
    const footerHTML = `<div class="container"><p>&copy; 2026 Українська класична гімназія</p></div>`;
    const existingFooter = document.querySelector('footer');

    if (existingFooter) {
        existingFooter.innerHTML = footerHTML;
    } else {
        const newFooter = document.createElement('footer');
        newFooter.className = 'footer';
        newFooter.innerHTML = footerHTML;
        document.body.append(newFooter);
    }
}

function initializeNavigation() {
    // Re-attach event listeners because we replaced the DOM
    const burger = document.getElementById('burger-btn');
    const nav = document.getElementById('main-nav');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay') || createOverlay();

    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    const closeMenu = () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Mobile Accordion
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('open');
                }
            });
        }
    });
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'overlay';
    document.body.prepend(overlay);
    return overlay;
}
