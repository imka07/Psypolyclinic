document.addEventListener('DOMContentLoaded', function() {
    initTabSwitching();
    initChooseStepButtons();
    initChooseToggle();
    initFaq();
    initScrollReveal();
});


// Логин форма
function showModal() {
    document.getElementById('loginModal').style.display = 'block';
}


function hideModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


// Форма Регистрации

function showRegistrationModal() {
    document.getElementById('registrationModal').style.display = 'block';
}

function hideRegistrationModal() {
    document.getElementById('registrationModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('registrationModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function initChooseStepButtons() {
    const buttons = document.querySelectorAll('.choose-step-btn');

    if (!buttons.length) return;

    function getGroupContainer(button) {
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

    buttons.forEach(button => {
        if (button.classList.contains('active')) {
            button.setAttribute('aria-current', 'true');
        } else if (!button.hasAttribute('aria-current')) {
            button.setAttribute('aria-current', 'false');
        }

        button.addEventListener('click', function() {
            activateButton(this);
        });

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

function initChooseToggle() {
    const group = document.querySelector('[data-toggle-group]');
    if (!group) return;

    const buttons = group.querySelectorAll('.choose-toggle-btn');
    const image = document.querySelector('.choose-card-img');
    const selectBtn = document.querySelector('.choose-select-btn');
    if (!buttons.length || !image || !selectBtn) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            buttons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');

            // Change image based on active button
            if (this.textContent.trim() === 'Самостоятельный подбор') {
                image.src = '/images/choosePsycoImg.png';
                selectBtn.textContent = 'Подобрать психолога';
            } else if (this.textContent.trim() === 'Помощь менеджера') {
                image.src = '/images/chooseManager.png'; // Replace with the actual path to the manager help image
                selectBtn.textContent = 'Перейти в Telegram-бот';
            }
            
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


