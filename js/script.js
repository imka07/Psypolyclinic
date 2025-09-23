document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initTabSwitching();
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
