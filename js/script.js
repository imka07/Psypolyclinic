document.addEventListener('DOMContentLoaded', function() {
    initTabSwitching();
    initChooseStepButtons();
    initChooseToggle();
    initFaq();
    initScrollReveal();
});

document.addEventListener('DOMContentLoaded', function() {
    // Для всех сердечек
    const heartButtons = document.querySelectorAll('.heart');
    heartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
});


// Анимация текста

document.addEventListener('DOMContentLoaded', function() {
    const texts = [
        'обрети счастье',
        'победи страх',
        'справься со стрессом',
        'обрети спокойствие'
    ];
    
    const animatedElements = document.querySelectorAll('.animated-text'); // Находит все span (desktop + tablet)
    
    let currentIndex = 0; // Индекс текущего текста
    
    function changeText() {
        animatedElements.forEach(function(el) {
            // Fade out
            el.classList.add('fade-out');
            
            // Ждём окончания fade out (0.5s + 0.1s буфер)
            setTimeout(function() {
                // Меняем текст
                el.textContent = texts[currentIndex];
                
                // Убираем класс, чтобы fade in
                el.classList.remove('fade-out');
            }, 600); // 0.5s transition + 0.1s пауза
        });
        
        // Переходим к следующему тексту (цикл)
        currentIndex = (currentIndex + 1) % texts.length;
    }
    
    // Запуск первой смены через 3 секунды (интервал), потом каждые 3s
    setTimeout(changeText, 2000);
    setInterval(changeText, 2000); // Интервал: 3s между сменами (настройте под себя)
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

// Updated initChooseToggle with mobile image support
function initChooseToggle() {
    const group = document.querySelector('[data-toggle-group]');
    if (!group) return;

    const buttons = group.querySelectorAll('.choose-toggle-btn');
    const picture = document.querySelector('.choose-psychologist-card picture');
    const img = picture ? picture.querySelector('img') : document.querySelector('.choose-card-img'); // Fallback to img if no picture
    const selectBtn = document.querySelector('.choose-select-btn');
    if (!buttons.length || !img || !selectBtn) return;

    // Function to update image based on active button and viewport
    function updateImage() {
        const activeBtn = group.querySelector('.choose-toggle-btn.active');
        if (!activeBtn) return;

        const width = window.innerWidth;
        let imageSrc;

        if (width <= 767) {
            imageSrc = activeBtn.dataset.imageMobile;
        } else if (width <= 1023) {
            imageSrc = activeBtn.dataset.imageTablet;
        } else {
            imageSrc = activeBtn.dataset.imageDesktop;
        }

        if (imageSrc) {
            // Handle picture element for responsive sources
            const mobileSource = picture ? picture.querySelector('source[media="(max-width: 767px)"]') : null;
            const tabletSource = picture ? picture.querySelector('source[media="(min-width: 768px) and (max-width: 1023px)"]') : null;

            if (width <= 767 && mobileSource) {
                mobileSource.srcset = imageSrc;
            } else if (width <= 1023 && tabletSource) {
                tabletSource.srcset = imageSrc;
            } else {
                img.src = imageSrc;
            }

            // Trigger reload for picture
            img.src = img.src;
        }

        // Update select button text based on active tab
        if (activeBtn.textContent.trim() === 'Самостоятельный подбор') {
            selectBtn.textContent = 'Подобрать психолога';
        } else if (activeBtn.textContent.trim() === 'Помощь менеджера') {
            selectBtn.textContent = 'Перейти в Telegram';
        }
    }

    // Click handler for buttons
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            buttons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            updateImage();
        });
    });

    // Initial setup
    const activeBtn = group.querySelector('.active');
    if (activeBtn) {
        updateImage();
    }

    // Handle resize for viewport changes
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateImage, 250);
    });
}

// Step buttons functionality (unchanged)
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


// FAQ: topics highlight and accordion behavior with smooth height animation
function initFaq() {
    const topics = document.querySelectorAll('.faq-topic');
    
    // Initialize default state - show clients FAQ by default
    function initializeDefaultState() {
        // Hide all accordions first
        document.querySelectorAll('.faq-accordion').forEach(acc => {
            acc.style.display = 'none';
            acc.setAttribute('hidden', '');
        });
        
        // Show clients accordion by default
        const clientsAccordion = document.querySelector('.faq-clients');
        if (clientsAccordion) {
            clientsAccordion.style.display = 'grid';
            clientsAccordion.removeAttribute('hidden');
        }
        
        // Set active state for clients topic
        topics.forEach(topic => {
            topic.classList.remove('active');
            if (topic.dataset.topic === 'clients') {
                topic.classList.add('active');
            }
        });
    }
    
    // Initialize default state
    initializeDefaultState();
    
    topics.forEach(topic => {
        topic.addEventListener('click', () => {
            topics.forEach(t => t.classList.remove('active'));
            topic.classList.add('active');

            const topicType = topic.dataset.topic;
            // Hide all faq-accordions
            document.querySelectorAll('.faq-accordion').forEach(acc => {
                acc.style.display = 'none';
                acc.setAttribute('hidden', '');
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
                targetAcc.removeAttribute('hidden');
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

            // Убираем активное состояние со всех кнопок и панелей
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.setAttribute('hidden', 'true');
            });

            // Активируем выбранную кнопку
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Показываем соответствующую панель
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



  
(function () {
  const modal = document.getElementById('review-modal');
  if (!modal) return;

  const modalPanel = modal.querySelector('.review-modal-panel');
  const backdrop = modal.querySelector('.review-modal-backdrop');
  const closeBtns = modal.querySelectorAll('[data-modal-close]');
  const avatarEl = modal.querySelector('.review-modal-avatar');
  const ratingEl = modal.querySelector('.review-modal-rating');
  const nameEl = modal.querySelector('.review-modal-name');
  const positionEl = modal.querySelector('.review-modal-position');
  const textEl = modal.querySelector('.review-modal-text');

  // Функция открытия модалки с данными
  function openModalFromCard(cardEl) {
    if (!cardEl) return;
    // извлечение данных из карточки
    const avatar = cardEl.querySelector('.review-avatar-img')?.getAttribute('src') || '';
    const name = cardEl.querySelector('.review-author-name')?.textContent || '';
    // сохраняем innerHTML для позиции, чтобы сохранять <br>
    const positionHTML = cardEl.querySelector('.review-author-position')?.innerHTML || '';
    // рейтинг: клонируем все элементы рейтинга (если есть)
    const ratingNodes = cardEl.querySelectorAll('.review-avatar-rating');

    // полный текст (берём текстContent или innerHTML - как нужно)
    const fullText = cardEl.querySelector('.review-text')?.textContent || '';

    // заполняем модалку
    avatarEl.setAttribute('src', avatar);
    avatarEl.setAttribute('alt', name ? 'Аватар ' + name : 'Аватар');

    // заполняем рейтинг (клонируем)
    ratingEl.innerHTML = '';
    if (ratingNodes && ratingNodes.length) {
      ratingNodes.forEach(node => {
        const clone = node.cloneNode(true);
        clone.removeAttribute('class'); // опционально
        ratingEl.appendChild(clone);
      });
    }

    nameEl.textContent = name;
    positionEl.innerHTML = positionHTML;
    textEl.textContent = fullText;

    // показать modal
    showModal();
  }

  // открыть визуально
  function showModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    // блокируем скролл фонового контента
    document.body.classList.add('modal-open');

    // запомнить последний фокус и перевести фокус в модалку
    lastFocused = document.activeElement;
    // ставим фокус на кнопку закрытия (или первый фокусируемый эл)
    const focusElem = modal.querySelector('.review-modal-close') || modalPanel;
    focusElem && focusElem.focus();

    // включаем ловец клавиш
    document.addEventListener('keydown', onKeyDown);
  }

  function hideModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onKeyDown);

    // вернуть фокус на элемент, который открыл модалку
    try {
      lastFocused && lastFocused.focus();
    } catch (e) {}
  }

  // закрытие когда клик по backdrop или по кресту (data-modal-close)
  modal.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-modal-close')) {
      hideModal();
    }
  });

  // локальный keydown: Esc и Tab trapping
  let lastFocused = null;
  function onKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      hideModal();
      return;
    }
    // Focus trap: Tab / Shift+Tab
    if (e.key === 'Tab') {
      const focusable = modal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
      const focusableArr = Array.prototype.slice.call(focusable).filter(el => el.offsetParent !== null);
      if (focusableArr.length === 0) return;
      const first = focusableArr[0];
      const last = focusableArr[focusableArr.length - 1];
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    }
  }

  // Делегируем клики по кнопкам "Читать полностью"
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.review-read-more-btn');
    if (!btn) return;
    // предотвратить двойное поведение, если у вас ранее стоял другой обработчик
    e.preventDefault();
    // найти ближайшую карточку
    const card = btn.closest('.review-card');
    if (!card) return;
    openModalFromCard(card);
  });

  // также кнопки закрытия (если нужны дополнительные действия)
  closeBtns.forEach(b => b.addEventListener('click', hideModal));

  // Prevent scroll on touchmove behind modal (extra safety)
  modal.addEventListener('touchmove', function (e) {
    // allow scroll inside panel only
    if (!modalPanel.contains(e.target)) {
      e.preventDefault();
    }
  }, { passive: false });
})();
