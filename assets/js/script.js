/* --- assets/js/script.js --- */

/* --- АВТОМАТИЧНЕ ДОДАВАННЯ КНОПКИ "НАЗАД" --- */
// Цей код сам перевіряє, чи є клас inner-page, і вставляє кнопку в шапку

const isInnerPage = document.body.classList.contains('inner-page');
const navMenu = document.querySelector('.nav'); // Знаходимо меню
const burgerBtn = document.querySelector('.burger'); // Знаходимо бургер

if (isInnerPage && navMenu) {
    // 1. Створюємо кнопку
    const backBtn = document.createElement('a');
    backBtn.href = 'index.html';
    backBtn.className = 'mobile-back-btn';
    backBtn.innerHTML = '⬅ На головну';

    // 2. Вставляємо її перед меню (щоб вона була справа, біля бургера)
    // navMenu.parentNode - це header-container
    navMenu.parentNode.insertBefore(backBtn, navMenu);
}
document.addEventListener('DOMContentLoaded', () => {
    // Елементи
    const burger = document.getElementById('burger-btn');
    const nav = document.getElementById('main-nav');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');
    
    // Знаходимо всі пункти меню, які мають випадаючий список
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

    // 1. ВІДКРИТТЯ МЕНЮ (БУРГЕР)
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокуємо скрол
        });
    }

    // 2. ЗАКРИТТЯ МЕНЮ (ФУНКЦІЯ)
    const closeMenu = () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Повертаємо скрол
    };

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // 3. АКОРДЕОН ДЛЯ ТЕЛЕФОНІВ
    dropdownItems.forEach(item => {
        // Шукаємо посилання всередині (наприклад "Про гімназію")
        const link = item.querySelector('.nav-link');
        
        if (link) {
            link.addEventListener('click', (e) => {
                // Працюємо тільки якщо ширина екрану мобільна (менше 768px)
                if (window.innerWidth <= 768) {
                    // Скасовуємо перехід за посиланням (якщо там є href)
                    e.preventDefault(); 
                    
                    // Перемикаємо клас .open на батьківському елементі li
                    // CSS побачить цей клас і покаже .dropdown-menu (display: block)
                    item.classList.toggle('open');
                }
            });
        }
    });

    // --- ЗАВАНТАЖЕННЯ НОВИН ---
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        fetch('assets/data/news.json')
            .then(res => {
                if(!res.ok) throw new Error();
                return res.json();
            })
            .then(data => {
                if(!data.news_items) return;
                const html = data.news_items.reverse().map(item => {
                    const img = item.image || 'assets/img/logo.png';
                    const date = new Date(item.date).toLocaleDateString('uk-UA');
                    return `
                    <article class="news-card">
                        <img src="${img}" class="news-image" loading="lazy">
                        <div class="news-content">
                            <div style="font-size:0.8rem; color:#888; margin-bottom:5px">📅 ${date}</div>
                            <h3 class="news-title">${item.title}</h3>
                            <p class="news-excerpt">${item.body}</p>
                        </div>
                    </article>`;
                }).join('');
                newsContainer.innerHTML = html;
            })
            .catch(e => {
                newsContainer.innerHTML = '<p style="text-align:center">Новин немає.</p>';
            });
    }
});