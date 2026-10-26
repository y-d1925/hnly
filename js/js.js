tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#165DFF',
                secondary: '#FF7D00',
                dark: '#1E293B',
                light: '#F8FAFC',
                accent: '#38BDF8',
                success: '#10B981',
                warning: '#F59E0B',
                danger: '#EF4444',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
        }
    }
}

// 导航栏滚动效果
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-dark/90', 'backdrop-blur-sm', 'shadow-md');
        navbar.classList.remove('py-4');
        navbar.classList.add('py-2');

        backToTop.classList.remove('opacity-0', 'invisible');
        backToTop.classList.add('opacity-100', 'visible');
    } else {
        navbar.classList.remove('bg-dark/90', 'backdrop-blur-sm', 'shadow-md');
        navbar.classList.remove('py-2');
        navbar.classList.add('py-4');

        backToTop.classList.add('opacity-0', 'invisible');
        backToTop.classList.remove('opacity-100', 'visible');
    }
});

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

// 监听滚动事件，改变导航栏样式
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 移动端菜单切换
menuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('active');

    // 切换菜单图标
    const icon = menuToggle.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// 关闭移动菜单（当点击菜单项时）
const mobileMenuItems = mobileMenu.querySelectorAll('a');
mobileMenuItems.forEach(item => {
    item.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('active');

        // 恢复菜单图标
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 滚动动画
function checkFadeIn() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// 初始检查
window.addEventListener('load', checkFadeIn);
// 滚动时检查
window.addEventListener('scroll', checkFadeIn);

// 表单验证
const form = document.getElementById('custom-trip-form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const travelersSelect = document.getElementById('travelers');
const tripDaysSelect = document.getElementById('trip-days');
const budgetSelect = document.getElementById('budget');
const travelDateInput = document.getElementById('travel-date');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    // 验证姓名
    if (!nameInput.value.trim()) {
        showError(nameInput, '请输入您的姓名');
        isValid = false;
    } else {
        hideError(nameInput);
    }

    // 验证手机号码
    const phonePattern = /^1[3-9]\d{9}$/;
    if (!phoneInput.value.trim()) {
        showError(phoneInput, '请输入您的手机号码');
        isValid = false;
    } else if (!phonePattern.test(phoneInput.value)) {
        showError(phoneInput, '请输入有效的手机号码');
        isValid = false;
    } else {
        hideError(phoneInput);
    }

    // 验证电子邮箱
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        showError(emailInput, '请输入您的电子邮箱');
        isValid = false;
    } else if (!emailPattern.test(emailInput.value)) {
        showError(emailInput, '请输入有效的电子邮箱');
        isValid = false;
    } else {
        hideError(emailInput);
    }

    // 验证出行人数
    if (!travelersSelect.value) {
        showError(travelersSelect, '请选择出行人数');
        isValid = false;
    } else {
        hideError(travelersSelect);
    }

    // 验证旅行天数
    if (!tripDaysSelect.value) {
        showError(tripDaysSelect, '请选择旅行天数');
        isValid = false;
    } else {
        hideError(tripDaysSelect);
    }

    // 验证预算
    if (!budgetSelect.value) {
        showError(budgetSelect, '请选择预算范围');
        isValid = false;
    } else {
        hideError(budgetSelect);
    }

    // 验证出行日期
    if (!travelDateInput.value) {
        showError(travelDateInput, '请选择出行日期');
        isValid = false;
    } else {
        const selectedDate = new Date(travelDateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            showError(travelDateInput, '出行日期不能早于今天');
            isValid = false;
        } else {
            hideError(travelDateInput);
        }
    }

    // 如果表单有效，提交表单
    if (isValid) {
        // 这里可以添加表单提交逻辑，例如发送到服务器
        alert('表单提交成功！我们将尽快与您联系。');
        form.reset();
    }
});

// 显示错误信息
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');

    if (!errorElement) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-500 text-sm mt-1';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    } else {
        errorElement.textContent = message;
    }

    input.classList.add('border-red-500');
    input.classList.remove('border-gray-300');
}

// 隐藏错误信息
function hideError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');

    if (errorElement) {
        formGroup.removeChild(errorElement);
    }

    input.classList.remove('border-red-500');
    input.classList.add('border-gray-300');
}

// 表单输入事件监听
nameInput.addEventListener('input', function() {
    if (this.value.trim()) {
        hideError(this);
    }
});

phoneInput.addEventListener('input', function() {
    const phonePattern = /^1[3-9]\d{9}$/;
    if (this.value.trim() && phonePattern.test(this.value)) {
        hideError(this);
    }
});

emailInput.addEventListener('input', function() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value.trim() && emailPattern.test(this.value)) {
        hideError(this);
    }
});

travelersSelect.addEventListener('change', function() {
    if (this.value) {
        hideError(this);
    }
});

tripDaysSelect.addEventListener('change', function() {
    if (this.value) {
        hideError(this);
    }
});

budgetSelect.addEventListener('change', function() {
    if (this.value) {
        hideError(this);
    }
});

travelDateInput.addEventListener('change', function() {
    if (this.value) {
        const selectedDate = new Date(this.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate >= today) {
            hideError(this);
        }
    }
});

// 设置日期输入的最小日期为今天
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const minDate = yyyy + '-' + mm + '-' + dd;
travelDateInput.setAttribute('min', minDate);