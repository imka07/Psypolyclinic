

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


const serviceCards = document.querySelectorAll('.services-card');
    
serviceCards.forEach(card => {
    const textContainer = card.querySelector('.services-card-text-container');
    const fullTextContainer = card.querySelector('.services-card-fulltext-container');
    const closeButton = card.querySelector('.services-card-fulltext-button');
    
    // Открываем подробное описание при клике на кнопку
    textContainer.addEventListener('click', function() {
        fullTextContainer.style.display = 'flex';
        textContainer.style.display = 'none'; // Скрываем основную кнопку
    });
    
    // Закрываем подробное описание при клике на кнопку "Выбрать психолога"
    closeButton.addEventListener('click', function() {
        fullTextContainer.style.display = 'none';
        textContainer.style.display = 'flex'; // Показываем основную кнопку
    });
});
