// ============================================
// KENYA PUBLIC HOLIDAYS - CALENDAR-BASED (2026+)
// ============================================

// Fixed-date holidays for Kenya
const KENYA_FIXED_HOLIDAYS = [
    { month: 0, day: 1, name: "New Year's Day" },
    { month: 4, day: 1, name: "Labour Day" },
    { month: 5, day: 1, name: "Madaraka Day" },
    { month: 9, day: 10, name: "Mazingira Day" },
    { month: 9, day: 20, name: "Mashujaa Day" },
    { month: 11, day: 12, name: "Jamhuri Day" },
    { month: 11, day: 25, name: "Christmas Day" },
    { month: 11, day: 26, name: "Boxing Day" },
];

function getEasterDate(year) {
    // Anonymous Gregorian algorithm
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-based month
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return { month, day };
}

function generateKenyaHolidays(year) {
    const holidays = [];

    // Fixed-date holidays
    KENYA_FIXED_HOLIDAYS.forEach(h => {
        holidays.push({
            month: h.month,
            day: h.day,
            name: h.name
        });
    });

    // Easter-based holidays
    const easter = getEasterDate(year);
    holidays.push({
        month: easter.month,
        day: easter.day - 2,
        name: "Good Friday"
    });
    holidays.push({
        month: easter.month,
        day: easter.day + 1,
        name: "Easter Monday"
    });

    // Sort by date
    holidays.sort((a, b) => {
        if (a.month !== b.month) return a.month - b.month;
        return a.day - b.day;
    });

    return holidays;
}

function getHolidayMapForYear(year) {
    const holidays = generateKenyaHolidays(year);
    const map = new Map();
    holidays.forEach(h => {
        const dateStr = `${year}-${String(h.month + 1).padStart(2, '0')}-${String(h.day).padStart(2, '0')}`;
        map.set(dateStr, h.name);
    });
    return map;
}

// Pre-generate holiday maps for 2026, 2027, 2028
const HOLIDAY_MAPS = {
    2026: getHolidayMapForYear(2026),
    2027: getHolidayMapForYear(2027),
    2028: getHolidayMapForYear(2028),
};

function isPublicHoliday(dateStr) {
    const [year] = dateStr.split('-');
    const holidayMap = HOLIDAY_MAPS[year];
    if (!holidayMap) return false;
    return holidayMap.has(dateStr);
}

function getHolidayName(dateStr) {
    const [year] = dateStr.split('-');
    const holidayMap = HOLIDAY_MAPS[year];
    if (!holidayMap) return 'Public Holiday';
    return holidayMap.get(dateStr) || 'Public Holiday';
}

// ============================================
// MOBILE MENU
// ============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');

function updateActiveNav() {
    let current = 'home';
    const scrollPos = window.scrollY + 200;

    if (window.scrollY < 100) {
        current = 'home';
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ============================================
// BOOKING VALIDATION
// ============================================
const OPENING_HOUR = 9;   // 9:00 AM
const CLOSING_HOUR = 20;  // 8:00 PM

function getNairobiTime() {
    const now = new Date();
    const nairobiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' }));
    return nairobiTime;
}

function validateBooking(dateStr, timeStr) {
    const selectedDate = new Date(dateStr + 'T00:00:00');
    const [hours, minutes] = timeStr.split(':').map(Number);

    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday

    // Check if Sunday
    if (dayOfWeek === 0) {
        return {
            valid: false,
            message: 'We are closed on Sundays. Please select Monday - Saturday.'
        };
    }

    // Check if public holiday
    if (isPublicHoliday(dateStr)) {
        return {
            valid: false,
            message: `We are closed on ${getHolidayName(dateStr)}. Please select another date.`
        };
    }

    // Check if within working hours (9 AM - 8 PM)
    if (hours < OPENING_HOUR) {
        return {
            valid: false,
            message: `Our salon opens at 9:00 AM. Please select a time from 9:00 AM onwards.`
        };
    }

    if (hours >= CLOSING_HOUR) {
        return {
            valid: false,
            message: `Our salon closes at 8:00 PM. Please select a time before 8:00 PM.`
        };
    }

    // Check if selected time is in the past for today
    const now = getNairobiTime();
    const todayStr = now.toISOString().split('T')[0];

    if (dateStr === todayStr) {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        if (hours < currentHour || (hours === currentHour && minutes <= currentMinute)) {
            return {
                valid: false,
                message: 'This time has already passed. Please select a future time.'
            };
        }
    }

    // Check if date is in the past
    const selectedDateOnly = new Date(dateStr + 'T00:00:00');
    const todayDateOnly = new Date(todayStr + 'T00:00:00');

    if (selectedDateOnly < todayDateOnly) {
        return {
            valid: false,
            message: 'This date has already passed. Please select a future date.'
        };
    }

    return { valid: true };
}

// ============================================
// SET MIN DATE FOR BOOKING
// ============================================
const bookingDateInput = document.getElementById('bookingDate');
if (bookingDateInput) {
    const today = getNairobiTime();
    const todayStr = today.toISOString().split('T')[0];
    bookingDateInput.setAttribute('min', todayStr);
}

// ============================================
// CONTACT FORM - SEND TO WHATSAPP
// ============================================
const contactForm = document.getElementById('contactForm');
const bookingError = document.getElementById('bookingError');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    bookingError.style.display = 'none';
    bookingError.textContent = '';

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const bookingDate = document.getElementById('bookingDate').value;
    const bookingTime = document.getElementById('bookingTime').value;
    const message = document.getElementById('message').value.trim();

    // Validate all fields present
    if (!name || !phone || !service || !bookingDate || !bookingTime) {
        bookingError.textContent = 'Please fill in all required fields.';
        bookingError.style.display = 'flex';
        return;
    }

    // Validate booking date and time
    const validation = validateBooking(bookingDate, bookingTime);
    if (!validation.valid) {
        bookingError.textContent = validation.message;
        bookingError.style.display = 'flex';
        return;
    }

    // Format date and time for WhatsApp
    const dateObj = new Date(bookingDate + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const timeObj = new Date(`2000-01-01T${bookingTime}`);
    const formattedTime = timeObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    let whatsappText = `Hi Ivoria, I'd like to book an appointment.\n\n`;
    whatsappText += `*Name:* ${name}\n`;
    whatsappText += `*Phone:* ${phone}\n`;
    whatsappText += `*Service:* ${service}\n`;
    whatsappText += `*Date:* ${formattedDate}\n`;
    whatsappText += `*Time:* ${formattedTime}\n`;
    if (message) {
        whatsappText += `*Notes:* ${message}\n`;
    }

    const encodedText = encodeURIComponent(whatsappText);
    window.open(`https://wa.me/254712345678?text=${encodedText}`, '_blank');
});
