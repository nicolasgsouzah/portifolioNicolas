// ==================== NAVEGAÇÃO MOBILE ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// ==================== SCROLL SUAVE ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== EFEITO FADE-IN AO CARREGAR ====================
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('.section, header');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// ==================== ANIMAÇÃO DE CARDS AO PASSAR O MOUSE ====================
const setupCardAnimations = () => {
    const cards = document.querySelectorAll('.skill-card, .project-card, .education-item, .stat, .language-item, .strength-badge');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.2)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
};

setupCardAnimations();

// ==================== SCROLL SPY - MARCAR NAV ATIVA ====================
const updateActiveNav = () => {
    const sections = document.querySelectorAll('.section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
};

updateActiveNav();

// ==================== OBSERVADOR DE INTERSECÇÃO ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== CONTADOR DE ESTATÍSTICAS ====================
const animateCounters = () => {
    const stats = document.querySelectorAll('.stat h3');
    let hasAnimated = false;
    
    const startAnimation = () => {
        if (hasAnimated) return;
        hasAnimated = true;
        
        stats.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            const increment = finalValue / 50;
            let currentValue = 0;
            
            const updateCounter = () => {
                currentValue += increment;
                if (currentValue < finalValue) {
                    stat.textContent = currentValue.toFixed(0) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = finalValue + '+';
                }
            };
            
            updateCounter();
        });
    };
    
    // Inicia a animação quando a seção é visível
    const statSection = document.querySelector('.about-stats');
    if (statSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startAnimation();
                observer.unobserve(statSection);
            }
        }, { threshold: 0.5 });
        
        observer.observe(statSection);
    }
};

animateCounters();

// ==================== DARK MODE TOGGLE ====================
const initDarkMode = () => {
    const darkModeToggle = localStorage.getItem('darkMode');
    if (darkModeToggle === 'enabled') {
        enableDarkMode();
    }
};

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
}

// Atalho: Pressione Ctrl+D para alternar dark mode
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }
});

initDarkMode();

// ==================== COPIAR EMAIL ====================
function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        alert('Email copiado para a área de transferência!');
    }).catch(() => {
        alert('Erro ao copiar email');
    });
}

// ==================== VALIDAÇÃO DE EMAIL ====================
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.href.includes('mailto:')) {
        const email = e.target.href.replace('mailto:', '');
        if (!email.includes('@')) {
            e.preventDefault();
            alert('Email inválido');
        }
    }
});

// ==================== PARALLAX EFFECT (Hero) ====================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// ==================== ANIMAÇÃO DE BADGES ====================
const animateBadges = () => {
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.animation = `slideIn 0.5s ease forwards`;
        badge.style.animationDelay = `${index * 50}ms`;
    });
};

// Adicionar keyframe para a animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Executar animação de badges quando a seção de skills é visível
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateBadges();
            observer.unobserve(skillsSection);
        }
    }, { threshold: 0.3 });
    
    observer.observe(skillsSection);
}

// ==================== NAVBAR STICKY ====================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (navbar) {
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== SMOOTH SCROLL FOR INTERNAL LINKS ====================
document.documentElement.style.scrollBehavior = 'smooth';

// ==================== EVENT LISTENER PARA MELHORAR PERFORMANCE ====================
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

window.addEventListener('resize', debounce(() => {
    setupCardAnimations();
}, 250));

// ==================== INICIALIZAR TUDO QUANDO DOM ESTIVER PRONTO ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfólio carregado com sucesso!');
    setupCardAnimations();
    updateActiveNav();
});
