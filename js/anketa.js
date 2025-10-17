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
document.addEventListener('DOMContentLoaded', function() {
    // Для всех сердечек
    const heartButtons = document.querySelectorAll('.heart');
    heartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
});


class Calendar {
    constructor() {
        this.currentDate = new Date(2025, 7, 1); // August 2025
        this.selectedDate = null;
        this.daysContainer = document.getElementById('daysContainer');
        this.monthYearElement = document.querySelector('.month-year');
        
        this.init();
    }
    
    init() {
        this.renderCalendar();
        this.addEventListeners();
    }
    
    renderCalendar() {
        this.daysContainer.innerHTML = '';
        
        // Update month/year header
        const monthNames = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        this.monthYearElement.textContent = 
            `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        
        // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
        let firstDayOfWeek = firstDay.getDay();
        // Convert to Monday-first week (0 = Monday, 6 = Sunday)
        firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
        
        // Add days from previous month
        const prevMonthLastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const day = prevMonthLastDay - i;
            this.createDayElement(day, 'other-month');
        }
        
        // Add days from current month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            this.createDayElement(day, 'current-month');
        }
        
        // Add days from next month to complete the grid (42 cells total)
        const totalCells = 42;
        const currentCells = this.daysContainer.children.length;
        for (let day = 1; day <= totalCells - currentCells; day++) {
            this.createDayElement(day, 'other-month');
        }
    }
    
    createDayElement(day, className) {
        const dayElement = document.createElement('div');
        dayElement.className = `day ${className}`;
        dayElement.textContent = day;
        
        if (className === 'current-month') {
            dayElement.addEventListener('click', () => this.selectDate(day));
        }
        
        this.daysContainer.appendChild(dayElement);
    }
    
    selectDate(day) {
        // Remove selection from previously selected date
        const previouslySelected = document.querySelector('.day.selected');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }
        
        // Add selection to new date
        const days = document.querySelectorAll('.day.current-month');
        days[day - 1].classList.add('selected');
        
        this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
        console.log('Selected date:', this.selectedDate);
    }
    
    addEventListeners() {
        document.querySelector('.prev-button').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });
        
        document.querySelector('.next-button').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });
    }
}

// Initialize calendar when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
});