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

// Close modals when clicking outside
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const registrationModal = document.getElementById('registrationModal');
    
    if (event.target == loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target == registrationModal) {
        registrationModal.style.display = 'none';
    }
}


// бургер
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.getElementById('mobileNav');
    const closeBtn = document.getElementById('mobileClose');
    const backdrop = document.getElementById('mobileBackdrop');
  
    const openNav = () => nav.classList.add('open');
    const closeNav = () => nav.classList.remove('open');
  
    toggle.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);
    backdrop.addEventListener('click', closeNav);
  });


// Форма Регистрации

function showRegistrationModal() {
    document.getElementById('registrationModal').style.display = 'block';
}

function hideRegistrationModal() {
    document.getElementById('registrationModal').style.display = 'none';
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

    const isTablet = () => window.innerWidth <= 1024;

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            buttons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');

            const imageSrc = isTablet() 
                ? this.getAttribute('data-image-tablet') 
                : this.getAttribute('data-image-desktop');

            if (imageSrc) {
                image.src = imageSrc;
            }

            if (this.textContent.trim() === 'Самостоятельный подбор') {
                selectBtn.textContent = 'Подобрать психолога';
            } else if (this.textContent.trim() === 'Помощь менеджера') {
                selectBtn.textContent = 'Перейти в Telegram-бот';
            }
        });
    });

    const activeBtn = group.querySelector('.active');
    if (activeBtn) {
        const initialImageSrc = isTablet() 
            ? activeBtn.getAttribute('data-image-tablet') 
            : activeBtn.getAttribute('data-image-desktop');
        if (initialImageSrc) {
            image.src = initialImageSrc;
        }
    }
}

// FAQ: topics highlight and accordion behavior with smooth height animation
function initFaq() {
    const topics = document.querySelectorAll('.faq-topic');
    topics.forEach(topic => {
        topic.addEventListener('click', () => {
            topics.forEach(t => t.classList.remove('active'));
            topic.classList.add('active');

            const topicType = topic.dataset.topic;
            // Hide all faq-accordions
            document.querySelectorAll('.faq-accordion').forEach(acc => {
                acc.style.display = 'none';
                // Optionally close all items in the hidden accordion
                acc.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('open');
                    const btn = item.querySelector('.faq-question');
                    const answer = item.querySelector('.faq-answer');
                    if (btn && answer) {
                        btn.setAttribute('aria-expanded', 'false');
                        answer.style.height = '0px';
                        answer.setAttribute('hidden', '');
                    }
                });
            });
            // Show the matching one
            const targetAcc = document.querySelector(`.faq-${topicType}`);
            if (targetAcc) {
                targetAcc.style.display = 'grid';
            }
        });
    });

    // Initialize accordion for all items across both sections
    const allItems = document.querySelectorAll('.faq-item');
    allItems.forEach(item => {
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
                const h = answer.scrollHeight;
                answer.style.height = h + 'px';
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


document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.specialist-slider');
    if (!slider) return;
  
    const container = slider.querySelector('.specialist-cards');
    const prevBtn = slider.querySelector('.specialist-nav-btn-prev');
    const nextBtn = slider.querySelector('.specialist-nav-btn-next');
    const cards = Array.from(container.querySelectorAll('.specialist-card'));
    if (!container || !prevBtn || !nextBtn || cards.length === 0) return;
  
    let index = 0;
    const clamp = (v) => Math.max(0, Math.min(v, cards.length - 1));
  
    function updateButtons() {
      prevBtn.disabled = index <= 0;
      nextBtn.disabled = index >= cards.length - 1;
      // aria для доступности
      cards.forEach((c, i) => c.setAttribute('aria-hidden', i === index ? 'false' : 'true'));
    }
  
    function goTo(i, smooth = true) {
      index = clamp(i);
      const left = index * container.clientWidth;
      container.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
      updateButtons();
    }
  
    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));
  
    // Обновляем индекс при ручном скролле (если пользователь тащит)
    let isScrolling;
    container.addEventListener('scroll', () => {
      window.clearTimeout(isScrolling);
      // после окончания скролла вычислим ближайший индекс
      isScrolling = setTimeout(() => {
        const newIndex = Math.round(container.scrollLeft / container.clientWidth);
        index = clamp(newIndex);
        updateButtons();
      }, 80);
    });
  
    // При ресайзе фиксируем видимую карточку (и пересчитываем позиции)
    window.addEventListener('resize', () => {
      // после ресайза прокачиваем контейнер в позицию index
      setTimeout(() => goTo(index, false), 50);
    });
  
    // --- поддержка свайпа (touch) ---
    let startX = 0;
    let deltaX = 0;
    const threshold = 40; // px для триггера перелистывания
  
    container.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length === 1) {
        startX = e.touches[0].clientX;
        deltaX = 0;
      }
    }, {passive: true});
  
    container.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length === 1) {
        deltaX = e.touches[0].clientX - startX;
      }
    }, {passive: true});
  
    container.addEventListener('touchend', () => {
      if (Math.abs(deltaX) > threshold) {
        if (deltaX < 0) goTo(index + 1); // свайп влево — вперёд
        else goTo(index - 1);            // свайп вправо — назад
      } else {
        // короткий свайп — вернуть на своё место
        goTo(index);
      }
      startX = 0; deltaX = 0;
    });
  
    // Инициализация: показать первую карточку
    goTo(0, false);
  
    // Доступность: стрелки при фокусе на контейнере
    container.setAttribute('tabindex', '0');
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(index - 1); }
    });
  });
