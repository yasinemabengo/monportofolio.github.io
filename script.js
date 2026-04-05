// ============================================
// MENU MOBILE
// ============================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ============================================
// ANIMATIONS AU SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de projets
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Observer les catégories de compétences
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';
    category.style.transition = 'all 0.6s ease';
    observer.observe(category);
});

// ============================================
// GESTION DU FORMULAIRE DE CONTACT
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Récupérer les données du formulaire
        const nameInput = document.getElementById('name');
        const messageInput = document.getElementById('message');
        
        const data = {
            name: nameInput.value.trim(),
            message: messageInput.value.trim(),
            email: 'yasinemabengo@gmail.com'
        };

        // Validation simple
        if (!data.name || !data.message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }

        // Créer le corps du message
        const emailBody = `Nom: ${data.name}\n\nMessage:\n${data.message}`;
        
        // Envoyer via mailto (solution simple)
        const mailtoLink = `mailto:${data.email}?subject=Message de ${data.name}&body=${encodeURIComponent(emailBody)}`;
        
        // Ouvrir le client email par défaut
        window.location.href = mailtoLink;

        // Afficher un message de succès
        showNotification('Merci! Votre message va être envoyé vers mon email.', 'success');

        // Réinitialiser le formulaire
        this.reset();

        console.log('Données du formulaire:', data);
    });
}

// ============================================
// NOTIFICATION SYSTÈME
// ============================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Animation d'entrée
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);

    // Disparition après 3 secondes
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// VALIDATION EMAIL
// ============================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// SCROLL NAVBAR - CHANGER LE STYLE
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// SMOOTH SCROLL POUR LES LIENS D'ANCRAGE
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Hauteur de la navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// COMPTEURS ANIMÉS
// ============================================
function animateCounter(element) {
    const target = parseInt(element.textContent);
    let count = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(count);
        }
    }, 30);
}

// Observer pour les compteurs
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.info-item h3').forEach(counter => {
    counterObserver.observe(counter);
});

// ============================================
// STYLES DYNAMIQUES POUR LES NOTIFICATIONS
// ============================================
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        background: white;
        padding: 20px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        min-width: 300px;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        animation: slideIn 0.3s ease forwards;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .notification-success {
        border-left: 4px solid #00B894;
    }

    .notification-success i {
        color: #00B894;
        font-size: 20px;
    }

    .notification-error {
        border-left: 4px solid #e74c3c;
    }

    .notification-error i {
        color: #e74c3c;
        font-size: 20px;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 480px) {
        .notification {
            min-width: auto;
            width: calc(100% - 20px);
            right: 10px;
            left: 10px;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// PARALLAX EFFECT (optionnel)
// ============================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollY = window.scrollY;
        hero.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
    }
});

// ============================================
// FILTRAGE DES PROJETS (à adapter selon vos besoins)
// ============================================
function setupProjectFilters() {
    // Vous pouvez ajouter des filtres de projets ici
    // Par exemple: filtrer par technologie utilisée
}

// ============================================
// DARK MODE TOGGLE (optionnel)
// ============================================
function setupDarkModeToggle() {
    // Vous pouvez ajouter un toggle pour le mode sombre ici
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        // Appliquer le mode sombre automatiquement si l'OS le préfère
    }
}

console.log('Portfolio chargé avec succès! ✨');
