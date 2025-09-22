
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех функций
    initMobileMenu();
    initBookingForm();
    initStaffLogin();
    initTabSwitching();
    initSmoothScrolling();
});

// Функция для мобильного меню
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const headerLeft = document.querySelector('.header-left');
    
    if (mobileToggle && headerLeft) {
        mobileToggle.addEventListener('click', function() {
            // Переключаем активное состояние кнопки
            this.classList.toggle('active');
            
            // Переключаем видимость меню
            headerLeft.classList.toggle('mobile-menu-open');
            
            // Предотвращаем прокрутку страницы когда меню открыто
            if (headerLeft.classList.contains('mobile-menu-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Закрываем меню при клике на ссылку
        const navLinks = document.querySelectorAll('.header-left .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                headerLeft.classList.remove('mobile-menu-open');
                document.body.style.overflow = '';
            });
        });
        
        // Закрываем меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!headerLeft.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                headerLeft.classList.remove('mobile-menu-open');
                document.body.style.overflow = '';
            }
        });
        
        // Закрываем меню при изменении размера экрана
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileToggle.classList.remove('active');
                headerLeft.classList.remove('mobile-menu-open');
                document.body.style.overflow = '';
            }
        });
    }
}

// Функция для формы записи на прием
function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(bookingForm);
            const bookingData = {};
            
            for (let [key, value] of formData.entries()) {
                bookingData[key] = value;
            }
            
            // Простая валидация
            if (!bookingData.name || !bookingData.phone || !bookingData.email) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            // Имитация отправки данных
            alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
            
            // Очистка формы
            bookingForm.reset();
        });
    }
}

// Функция для входа персонала
function initStaffLogin() {
    const staffLoginForm = document.getElementById('staffLoginForm');
    if (staffLoginForm) {
        staffLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const login = document.getElementById('staffLogin').value;
            const password = document.getElementById('staffPassword').value;
            
            // Простая проверка логина и пароля
            if (login === 'admin' && password === 'admin') {
                // Показываем панель управления
                document.getElementById('staffDashboard').style.display = 'block';
                staffLoginForm.style.display = 'none';
                
                // Показываем уведомление
                showNotification('Добро пожаловать в панель управления!', 'success');
            } else {
                alert('Неверный логин или пароль');
            }
        });
    }
}

// Функция для переключения вкладок
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (!tabButtons.length || !tabPanels.length) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Убираем активный класс со всех кнопок и панелей
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.setAttribute('hidden', 'true');
            });

            // Добавляем активный класс к выбранной кнопке и панели
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

// Функция для плавной прокрутки
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Функция для показа уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // Цвета для разных типов уведомлений
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#27ae60';
            break;
        case 'error':
            notification.style.backgroundColor = '#e74c3c';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f39c12';
            break;
        default:
            notification.style.backgroundColor = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое удаление через 3 секунды
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Функция для форматирования даты
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    return new Date(date).toLocaleDateString('ru-RU', options);
}

// Функция для валидации email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Функция для валидации телефона
function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Функция для добавления новой записи сессии (для персонала)
function addNewRecord() {
    const recordText = prompt('Введите текст записи сессии:');
    if (recordText) {
        const recordsList = document.querySelector('.records-list');
        const newRecord = document.createElement('div');
        newRecord.className = 'record-item';
        
        const today = new Date().toLocaleDateString('ru-RU');
        newRecord.innerHTML = `
            <h4>Новая запись - ${today}</h4>
            <p class="session-type">Индивидуальная терапия</p>
            <p class="record-text">${recordText}</p>
            <button class="btn btn-small">Редактировать</button>
        `;
        
        recordsList.appendChild(newRecord);
        showNotification('Запись добавлена успешно!', 'success');
    }
}

// Инициализация кнопки добавления записи
document.addEventListener('DOMContentLoaded', function() {
    const addRecordBtn = document.querySelector('.tab-panel button');
    if (addRecordBtn && addRecordBtn.textContent.includes('Добавить новую запись')) {
        addRecordBtn.addEventListener('click', addNewRecord);
    }
});

// Функция для сохранения данных в localStorage
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error);
        return false;
    }
}

// Функция для загрузки данных из localStorage
function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Ошибка загрузки из localStorage:', error);
        return null;
    }
}

// Функция для проверки поддержки localStorage
function isLocalStorageSupported() {
    try {
        const test = 'test';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (error) {
        return false;
    }
}

// Инициализация при загрузке страницы
window.addEventListener('load', function() {
    // Проверяем поддержку localStorage
    if (!isLocalStorageSupported()) {
        console.warn('localStorage не поддерживается в этом браузере');
    }
    
    // Добавляем класс для анимаций
    document.body.classList.add('loaded');
});
