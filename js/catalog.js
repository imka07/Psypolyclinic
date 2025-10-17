document.addEventListener('DOMContentLoaded', function() {
    // Для всех сердечек
    const heartButtons = document.querySelectorAll('.heart');
    heartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
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


// Updated JS: Add event listeners to ALL .filter-button elements (both desktop and mobile)
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-button'); // Select ALL buttons with class .filter-button
    const filterModal = document.getElementById('filterModal');
    const closeBtn = document.getElementById('closeFilter');
    const applyBtn = document.querySelector('.apply-btn');

    // Add click listener to each filter button (works on both desktop and mobile)
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterModal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            filterModal.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Close on overlay click
    filterModal.addEventListener('click', function(e) {
        if (e.target === filterModal) {
            filterModal.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            // Here: apply filters logic (e.g., collect checked values, close modal)
            console.log('Filters applied'); // Placeholder
            filterModal.classList.remove('open');
            document.body.style.overflow = '';
        });
    }
});

function toggleDropdown() {
    const options = document.querySelector('.options-container');
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
}

function updateSelectedText() {
    const checkboxes = document.querySelectorAll('.option input[type="checkbox"]');
    const selectedValues = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedValues.push(checkbox.value);
        }
    });
    
    const selectedText = document.querySelector('.selected-text');
    
    if (selectedValues.length === 0) {
        selectedText.textContent = 'Выберите города';
    } else if (selectedValues.length === 1) {
        selectedText.textContent = selectedValues[0];
    } else if (selectedValues.length === 2) {
        selectedText.textContent = selectedValues.join(', ');
    } else {
        selectedText.textContent = `Выбрано ${selectedValues.length} города`;
    }
}

// Закрывать дропдаун только при клике вне его
document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-multiselect')) {
        document.querySelector('.options-container').style.display = 'none';
    }
});