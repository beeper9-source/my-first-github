// 모바일 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 메뉴 링크 클릭 시 모바일 메뉴 닫기
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 스크롤 시 헤더 배경 변경
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 애니메이션할 요소들 관찰
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about, .products, .contact, .feature, .product-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 계란 애니메이션 효과
const eggAnimation = document.querySelector('.egg-animation');
if (eggAnimation) {
    eggAnimation.addEventListener('mouseenter', () => {
        eggAnimation.style.transform = 'scale(1.2) rotate(10deg)';
        eggAnimation.style.transition = 'transform 0.3s ease';
    });
    
    eggAnimation.addEventListener('mouseleave', () => {
        eggAnimation.style.transform = 'scale(1) rotate(0deg)';
    });
}

// 제품 카드 호버 효과
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// 연락처 버튼 클릭 이벤트
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // 버튼 클릭 시 리플 효과
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 페이지 로드 시 환영 메시지
window.addEventListener('load', () => {
    console.log('금슬농장 홈페이지에 오신 것을 환영합니다! 🥚');
});

// 전화번호 팝업 기능
function showPhonePopup() {
    const popup = document.getElementById('phonePopup');
    popup.classList.add('show');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
}

function closePhonePopup() {
    const popup = document.getElementById('phonePopup');
    popup.classList.remove('show');
    document.body.style.overflow = 'auto'; // 스크롤 복원
}

// 팝업 외부 클릭 시 닫기
document.getElementById('phonePopup').addEventListener('click', (e) => {
    if (e.target.id === 'phonePopup') {
        closePhonePopup();
    }
});

// ESC 키로 팝업 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // ESC 키로 모바일 메뉴 닫기
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        // ESC 키로 팝업 닫기
        closePhonePopup();
    }
});


// 터치 디바이스에서 스와이프로 메뉴 닫기
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0 && navMenu.classList.contains('active')) {
            // 오른쪽으로 스와이프 시 메뉴 닫기
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
}

// 성능 최적화: 스크롤 이벤트 쓰로틀링
let ticking = false;

function updateOnScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});
