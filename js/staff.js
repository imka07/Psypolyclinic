document.addEventListener('DOMContentLoaded', function() {
    initFaq();
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

document.addEventListener('DOMContentLoaded', function() {
    const sectionsData = [
        {
            title: 'Создан психологами<br> для <span class="hero-title-secondary hero-title--desktop">психологов</span>',
            placeholder: 'психологов'

        },
        {
            title: 'Обеспечиваем<br> психологов клиентами<br /><span class="hero-title-secondary hero-title--desktop">бесплатно</span>',
            placeholder: 'бесплатно'
            // Добавьте больше: , { title: 'Другой текст<br> с <br /><span class="...">словом</span>', placeholder: 'слово' }
        }
    ];
    
    const heroTitle = document.querySelector('.hero-title'); // h1
    const heroPlaceholderSpan = document.querySelector('.hero-title-placeholder span'); // Span в placeholder
    
    let currentIndex = 0;
    
    function changeSection() {
        // Fade out
        heroTitle.classList.add('fade-out');
        heroPlaceholderSpan.parentElement.classList.add('fade-out');
        
        setTimeout(function() {
            // Меняем с сохранением структуры/классов
            heroTitle.innerHTML = sectionsData[currentIndex].title; // Полный HTML с классами span
            heroPlaceholderSpan.textContent = sectionsData[currentIndex].placeholder; // Только текст в span
            
            // Fade in (стили применятся сразу к новым элементам)
            heroTitle.classList.remove('fade-out');
            heroPlaceholderSpan.parentElement.classList.remove('fade-out');
        }, 600); // 0.5s + буфер для плавности
        
        // Цикл
        currentIndex = (currentIndex + 1) % sectionsData.length;
    }
    
    // Запуск
    setTimeout(changeSection, 3000);
    setInterval(changeSection, 3000); // 3s интервал
});


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




(function(){
  const container = document.getElementById('account-carousel');
  if (!container) return;

  // Два набора по 3 (как обсуждали) — объект: src, title, text
  const sets = [
    [
      { src: 'images/accountSection/img1.svg', title: 'Вы видите все свои брони', text: 'В личном кабинете у Вас будет свой календарь, в котором будут отмечены только Ваши сессии' },
      { src: 'images/accountSection/img2.svg', title: 'Удобная запись', text: 'В разделе “Запись” Вы будете видеть всех своих клиентов и необходимую информацию' },
      { src: 'images/accountSection/img3.svg', title: 'Настройка своих услуг', text: 'Вы сможете добавлять или удалять свои услуги, указывать стоимость и любую другую важную информацию' }
    ],
    [
      { src: 'images/accountSection/img4.svg', title: 'Все Ваши брони в удобной таблице' },
      { src: 'images/accountSection/img5.svg', title: 'В любой момент Вы можете отредактировать ваши услуги' },
      { src: 'images/accountSection/img6.svg', title: 'В календаре Вы сможете отслеживать свои консультации' }
    ]
  ];

  // объединённый список всех 6 для mobile
  const allItems = sets[0].concat(sets[1]);

  const btnPrev = document.querySelector('.account-nav-btn-prev');
  const btnNext = document.querySelector('.account-nav-btn-next');

  let mode = null; // 'desktop' | 'mobile'
  let showingFirst = true; // состояние для desktop
  let animLock = false;
  const ANIM = 320;

  // Preload
  function preload(list) {
    list.forEach(it => {
      const i = new Image();
      i.src = it.src;
    });
  }
  preload(allItems);

  // Рендер карточки HTML
  function cardHTML(obj) {
    return `
      <div class="accountSection-item">
        <img src="${obj.src}" alt="${escapeHtml(obj.title || '')}" />
        <h3 class="accountSection-item-title">${escapeHtml(obj.title || '')}</h3>
        <p class="accountSection-item-text">${escapeHtml(obj.text || '')}</p>
      </div>
    `.trim();
  }

  // Хелпер экранирования простого текста в HTML (защита от апстрим-данных)
  function escapeHtml(str) {
    return (str+'').replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; });
  }

  // Установить desktop — 3 карточки + nav
  function renderDesktop() {
    // наполняем контейнер 3 карточками из текущего набора
    const current = showingFirst ? sets[0] : sets[1];
    container.innerHTML = current.map(cardHTML).join('');
    // обеспечить, что навигация видна (CSS уже это делает) и кнопки активны
    btnPrev && (btnPrev.style.display = '');
    btnNext && (btnNext.style.display = '');
    // задаём стартовые классы
    const items = container.querySelectorAll('.accountSection-item');
    items.forEach(it => {
      const img = it.querySelector('img');
      const t = it.querySelector('.accountSection-item-title');
      const p = it.querySelector('.accountSection-item-text');
      img.classList.add('anim-in');
      t.classList.add('anim-in');
      p.classList.add('anim-in');
    });
    // повесим обработчики
    attachDesktopHandlers();
  }

  // Установить mobile — вывести ВСЕ 6 карточек и скрыть nav
  function renderMobile() {
    container.innerHTML = allItems.map(cardHTML).join('');
    // скрываем кнопки
    btnPrev && (btnPrev.style.display = 'none');
    btnNext && (btnNext.style.display = 'none');
    // mobile: убедимся, что элементы имеют anim-in (необязательно)
    const items = container.querySelectorAll('.accountSection-item');
    items.forEach(it => {
      const img = it.querySelector('img');
      const t = it.querySelector('.accountSection-item-title');
      const p = it.querySelector('.accountSection-item-text');
      img.classList.add('anim-in');
      t.classList.add('anim-in');
      p.classList.add('anim-in');
    });
    detachDesktopHandlers();
  }

  // Переключение (анимация) — для desktop
  function swapDesktop(direction) {
    if (animLock) return;
    animLock = true;
    // get current items
    const items = Array.from(container.querySelectorAll('.accountSection-item'));
    const outClass = direction === 'next' ? 'anim-out-left' : 'anim-out-right';
    const enterClass = direction === 'next' ? 'anim-enter-left' : 'anim-enter-right';

    // применяем out
    items.forEach(it => {
      const img = it.querySelector('img');
      const t = it.querySelector('.accountSection-item-title');
      const p = it.querySelector('.accountSection-item-text');
      img.classList.remove('anim-in','anim-enter-left','anim-enter-right','anim-out-left','anim-out-right');
      t.classList.remove('anim-in','anim-enter-left','anim-enter-right','anim-out-left','anim-out-right');
      p.classList.remove('anim-in','anim-enter-left','anim-enter-right','anim-out-left','anim-out-right');
      img.classList.add(outClass);
      t.classList.add(outClass);
      p.classList.add(outClass);
    });

    // через ANIM задаём новый контент и play enter
    setTimeout(() => {
      showingFirst = !showingFirst;
      const nextSet = showingFirst ? sets[0] : sets[1];
      // заменяем src и тексты
      items.forEach((it, idx) => {
        const img = it.querySelector('img');
        const t = it.querySelector('.accountSection-item-title');
        const p = it.querySelector('.accountSection-item-text');

        const obj = nextSet[idx] || {src:'',title:'',text:''};
        img.src = obj.src;
        t.textContent = obj.title;
        p.textContent = obj.text;

        // очистка out и установка enter
        img.classList.remove('anim-out-left','anim-out-right');
        t.classList.remove('anim-out-left','anim-out-right');
        p.classList.remove('anim-out-left','anim-out-right');

        img.classList.add(enterClass);
        t.classList.add(enterClass);
        p.classList.add(enterClass);

        // форсируем рефлоу для корректного запуска transition
        // eslint-disable-next-line no-unused-expressions
        img.offsetWidth;

        setTimeout(() => {
          img.classList.remove(enterClass);
          t.classList.remove(enterClass);
          p.classList.remove(enterClass);
          img.classList.add('anim-in');
          t.classList.add('anim-in');
          p.classList.add('anim-in');
        }, 10);
      });

      setTimeout(() => {
        animLock = false;
      }, ANIM + 20);
    }, ANIM);
  }

  // привязка событий кнопок
  function attachDesktopHandlers(){
    if (btnNext) { btnNext.onclick = () => swapDesktop('next'); }
    if (btnPrev) { btnPrev.onclick = () => swapDesktop('prev'); }
  }
  function detachDesktopHandlers(){
    if (btnNext) { btnNext.onclick = null; }
    if (btnPrev) { btnPrev.onclick = null; }
  }

  // Выбор режима и рендер
  function decideAndRender() {
    const w = window.innerWidth;
    const nextMode = w >= 768 ? 'desktop' : 'mobile';
    if (nextMode === mode) return;
    mode = nextMode;
    // сброс lock и handlers
    animLock = false;
    if (mode === 'mobile') {
      renderMobile();
    } else {
      // в переходе на desktop лучше показать первый набор
      showingFirst = true;
      renderDesktop();
    }
  }

  // initial
  decideAndRender();

  // ресайз с дебаунсом
  let rezT;
  window.addEventListener('resize', () => {
    clearTimeout(rezT);
    rezT = setTimeout(decideAndRender, 180);
  });

  // поддержка клавиш (только в desktop)
  window.addEventListener('keydown', (e) => {
    if (mode !== 'desktop') return;
    if (e.key === 'ArrowLeft') btnPrev && btnPrev.click();
    if (e.key === 'ArrowRight') btnNext && btnNext.click();
  });

})();
