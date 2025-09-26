document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initTabSwitching();
    initChooseStepButtons();
    initChooseToggle();
    initFaq();
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
