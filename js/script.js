document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initTabSwitching();
    initChooseStepButtons();
    initChooseToggle();
    initFaq();
    initScrollReveal();
    initPencilOutline();
});

// Функция для мобильного меню
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const headerLeft = document.querySelector('.header-left');
    
    if (mobileToggle && headerLeft) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            headerLeft.classList.toggle('mobile-menu-open');
            if (headerLeft.classList.contains('mobile-menu-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        const navLinks = document.querySelectorAll('.header-left .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                headerLeft.classList.remove('mobile-menu-open');
                document.body.style.overflow = '';
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!headerLeft.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                headerLeft.classList.remove('mobile-menu-open');
                document.body.style.overflow = '';
            }
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileToggle.classList.remove('active');
                headerLeft.classList.remove('mobile-menu-open');
                document.body.style.overflow = '';
            }
        });
    }
}

// Логика для кнопок выбора шага
function initChooseStepButtons() {
    const buttons = document.querySelectorAll('.choose-step-btn');

    if (!buttons.length) return;

    function getGroupContainer(button) {
        // Пытаемся найти общий контейнер группы кнопок
        return (
            button.closest('[data-choose-steps]') ||
            button.closest('.choose-steps') ||
            button.closest('.choose-step-buttons') ||
            document
        );
    }

    function deactivateGroup(container) {
        const groupButtons = container.querySelectorAll('.choose-step-btn');
        groupButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-current', 'false');
        });
    }

    function activateButton(button) {
        const container = getGroupContainer(button);
        deactivateGroup(container);
        button.classList.add('active');
        button.setAttribute('aria-current', 'true');
    }

    // Устанавливаем обработчики событий
    buttons.forEach(button => {
        // Инициализация aria-current, если задан класс active в разметке
        if (button.classList.contains('active')) {
            button.setAttribute('aria-current', 'true');
        } else if (!button.hasAttribute('aria-current')) {
            button.setAttribute('aria-current', 'false');
        }

        button.addEventListener('click', function() {
            activateButton(this);
        });

        // Доступность с клавиатуры (Enter/Space)
        button.addEventListener('keydown', function(e) {
            const isEnter = e.key === 'Enter' || e.keyCode === 13;
            const isSpace = e.key === ' ' || e.key === 'Spacebar' || e.keyCode === 32;
            if (isEnter || isSpace) {
                e.preventDefault();
                activateButton(this);
            }
        });
    });
}

// Функция для переключения вкладок в hero
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tabs-panel');

    if (!tabButtons.length || !tabPanels.length) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.setAttribute('hidden', 'true');
            });

            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
                targetPanel.removeAttribute('hidden');
            }
        });
    });
}

// Переключатель «Я определился / Помощь менеджера»
function initChooseToggle() {
    const group = document.querySelector('[data-toggle-group]');
    if (!group) return;

    const buttons = group.querySelectorAll('.choose-toggle-btn');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            buttons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
        });
    });
}

// FAQ: topics highlight and accordion behavior with smooth height animation
function initFaq() {
    const topics = document.querySelectorAll('.faq-topic');
    topics.forEach(topic => {
        topic.addEventListener('click', () => {
            topics.forEach(t => t.classList.remove('active'));
            topic.classList.add('active');
        });
    });

    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
        const btn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!btn || !answer) return;

        // Set initial height for open item
        if (item.classList.contains('open')) {
            answer.style.height = answer.scrollHeight + 'px';
            btn.setAttribute('aria-expanded', 'true');
        } else {
            btn.setAttribute('aria-expanded', 'false');
            answer.setAttribute('hidden', '');
            answer.style.height = '0px';
        }

        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            if (isOpen) {
                // close
                item.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
                answer.style.height = answer.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    answer.style.height = '0px';
                });
                setTimeout(() => answer.setAttribute('hidden', ''), 300);
            } else {
                // open
                answer.removeAttribute('hidden');
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
                answer.style.height = 'auto';
                const h = answer.scrollHeight;
                answer.style.height = '0px';
                requestAnimationFrame(() => {
                    answer.style.height = h + 'px';
                });
            }
        });
    });
}

// Плавное появление кнопок при скролле (IntersectionObserver)
function initScrollReveal() {
    const targets = document.querySelectorAll('.choose-toggle-btn');
    if (!targets.length) return;

    // Устанавливаем базовый скрытый класс и небольшую задержку для ступенчатого эффекта
    targets.forEach((el, index) => {
        el.classList.add('reveal-on-scroll');
        el.style.setProperty('--reveal-delay', `${index * 120}ms`);
    });

    // Если пользователь предпочитает уменьшенную анимацию — показываем сразу
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        targets.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Даем браузеру применить исходные стили перед включением анимации
                requestAnimationFrame(() => {
                    entry.target.classList.add('is-visible');
                });
                obs.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.2 });

    targets.forEach(el => observer.observe(el));

    // Если элемент уже в зоне видимости при загрузке — запускаем анимацию с небольшой задержкой
    requestAnimationFrame(() => {
        targets.forEach(el => {
            const rect = el.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            if (inView) {
                setTimeout(() => {
                    el.classList.add('is-visible');
                }, 50);
            }
        });
    });
}

// Эффект «карандашной обводки» (небрежный овал вокруг текста) для блока «Почему стоит выбрать нас?»
function initPencilOutline() {
    const paragraphs = document.querySelectorAll('.why-choose-us-text');
    if (!paragraphs.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let uid = 0;

    function buildOvalForParagraph(p) {
        // Оборачиваем текст в контейнер, чтобы поместить SVG под текст
        if (!p.classList.contains('pencil-outline-wrap')) {
            const wrapper = document.createElement('span');
            wrapper.className = 'pencil-outline-wrap';
            p.parentNode && p.parentNode.insertBefore(wrapper, p);
            wrapper.appendChild(p);
        }

        const wrapperEl = p.parentElement;
        if (!wrapperEl) return { svg: null, paths: [] };

        // Удаляем старое SVG, если есть (для ресайза)
        const existing = wrapperEl.querySelector('svg.pencil-oval-svg');
        if (existing) existing.remove();

        const rect = p.getBoundingClientRect();
        const cs = window.getComputedStyle(p);
        const fontSize = parseFloat(cs.fontSize) || 24;
        // Динамические отступы: зависят от ширины/высоты текста и кегля
        const padX = Math.max(Math.round(rect.width * 0.616), Math.round(fontSize * 7.84));
        const padY = Math.max(Math.round(rect.height * 1.456), Math.round(fontSize * 6.048));
        // Дополнительно уменьшено на ~20%
        const w = Math.max(Math.ceil(rect.width) + padX * 2, 672);
        const h = Math.max(Math.ceil(rect.height) + padY * 2, 392);

        const cx = w / 2;
        const cy = h / 2;
        const innerMargin = 20; // большой отступ от краёв SVG до штриха
        const rx = Math.max((rect.width / 2) + padX, 336);
        const ry = Math.max((rect.height / 2) + padY, 202);

        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('class', 'pencil-oval-svg');
        svg.setAttribute('width', String(w));
        svg.setAttribute('height', String(h));
        svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
        svg.setAttribute('aria-hidden', 'true');

        // Фильтр для «дрожащего» карандашного штриха
        const defs = document.createElementNS(svgNS, 'defs');
        const filterId = `pencil-oval-noise-${uid++}`;
        const filter = document.createElementNS(svgNS, 'filter');
        filter.setAttribute('id', filterId);
        filter.setAttribute('x', '-5%');
        filter.setAttribute('y', '-5%');
        filter.setAttribute('width', '110%');
        filter.setAttribute('height', '110%');

        const turbulence = document.createElementNS(svgNS, 'feTurbulence');
        turbulence.setAttribute('type', 'fractalNoise');
        turbulence.setAttribute('baseFrequency', '0.45');
        turbulence.setAttribute('numOctaves', '1');
        turbulence.setAttribute('seed', String(1000 + Math.floor(Math.random() * 9000)));
        turbulence.setAttribute('result', 'noise');

        const displacement = document.createElementNS(svgNS, 'feDisplacementMap');
        displacement.setAttribute('in', 'SourceGraphic');
        displacement.setAttribute('in2', 'noise');
        displacement.setAttribute('scale', '0.35');
        displacement.setAttribute('xChannelSelector', 'R');
        displacement.setAttribute('yChannelSelector', 'G');

        filter.appendChild(turbulence);
        filter.appendChild(displacement);
        defs.appendChild(filter);
        svg.appendChild(defs);

        // Генерация «неровного» замкнутого пути вокруг центра (нерегулярный эллипс)
        function roughBlobPath(cx, cy, rx, ry, points, wobble, seedOffset) {
            const pts = [];
            for (let i = 0; i < points; i++) {
                const t = (i / points) * Math.PI * 2;
                const jitterR = 1 + (Math.sin(i * 1.3 + seedOffset) * wobble);
                const jitterX = rx * jitterR;
                const jitterY = ry * (1 + (Math.cos(i * 1.7 + seedOffset * 0.7) * wobble));
                pts.push({
                    x: cx + Math.cos(t) * jitterX,
                    y: cy + Math.sin(t) * jitterY
                });
            }
            // Квадратичные Безье по формуле: старт в середину сегмента, Q к вершине, до середины следующего
            const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
            let d = '';
            const firstMid = mid(pts[0], pts[1]);
            d += `M ${firstMid.x} ${firstMid.y}`;
            for (let i = 1; i < pts.length; i++) {
                const p = pts[i];
                const m = mid(p, pts[(i + 1) % pts.length]);
                d += ` Q ${p.x} ${p.y} ${m.x} ${m.y}`;
            }
            // замыкаем к первому мидпоинту
            d += ' Z';
            return d;
        }

        // Два слоя «неряшливой» обводки
        const paths = [];
        for (let layer = 0; layer < 2; layer++) {
            const path = document.createElementNS(svgNS, 'path');
            const wobble = layer === 0 ? 0.07 : 0.12;
            const pts = layer === 0 ? 22 : 28;
            const seedOff = layer === 0 ? 0.0 : 1.37;
            path.setAttribute('d', roughBlobPath(cx, cy, rx - innerMargin, ry - innerMargin, pts, wobble, seedOff));
            path.setAttribute('class', 'pencil-oval-path');
            path.setAttribute('stroke-width', layer === 0 ? '2.4' : '1.4');
            path.setAttribute('stroke-opacity', layer === 0 ? '0.9' : '0.6');
            path.setAttribute('filter', `url(#${filterId})`);
            if (layer === 1) path.setAttribute('transform', `translate(1 0.6) rotate(0.15 ${cx} ${cy})`);
            svg.appendChild(path);
            paths.push(path);
        }

        wrapperEl.insertBefore(svg, p);
        return { svg, paths };
    }

    const entries = [];

    paragraphs.forEach((p) => {
        const built = buildOvalForParagraph(p);
        if (!built.svg) return;

        // Инициализируем штриховую анимацию
        requestAnimationFrame(() => {
            built.paths.forEach((path, idx) => {
                const length = Math.ceil(path.getTotalLength());
                path.style.strokeDasharray = String(length);
                path.style.strokeDashoffset = String(length);
                if (!reduceMotion) {
                    path.style.transition = 'stroke-dashoffset 900ms ease';
                    path.style.transitionDelay = `${idx * 120}ms`;
                }
            });
        });

        const reveal = () => {
            built.paths.forEach((path) => {
                requestAnimationFrame(() => {
                    if (reduceMotion) {
                        path.style.transition = 'none';
                        path.style.strokeDasharray = '0';
                    }
                    path.style.strokeDashoffset = '0';
                });
            });
        };

        if (reduceMotion) {
            requestAnimationFrame(reveal);
        } else {
            entries.push({ el: p, reveal });
        }
    });

    if (!reduceMotion && entries.length) {
        const io = new IntersectionObserver((obsEntries, obs) => {
            obsEntries.forEach(({ target, isIntersecting }) => {
                if (isIntersecting) {
                    const found = entries.find(e => e.el === target);
                    if (found) found.reveal();
                    obs.unobserve(target);
                }
            });
        }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.2 });

        entries.forEach(({ el }) => io.observe(el));

        // Старт, если уже в зоне видимости
        requestAnimationFrame(() => {
            entries.forEach(({ el, reveal }) => {
                const r = el.getBoundingClientRect();
                const inView = r.top < window.innerHeight && r.bottom > 0;
                if (inView) setTimeout(reveal, 60);
            });
        });
    }

    // Перестраиваем овалы при ресайзе
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            paragraphs.forEach(p => buildOvalForParagraph(p));
        }, 120);
    });
}
