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
		// 图片悬停效果
		const featureCards = document.querySelectorAll('.feature-card, .destination-card, .culture-card');
		
		featureCards.forEach(card => {
		    const img = card.querySelector('img');
		    const originalSrc = img.src;
        
        // 移动端菜单切换
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            if (menuToggle.querySelector('i').classList.contains('fa-bars')) {
                menuToggle.querySelector('i').classList.remove('fa-bars');
                menuToggle.querySelector('i').classList.add('fa-times');
            } else {
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
        
        // 自由路线生成器滑块
        const tripDays = document.getElementById('trip-days');
        const daysValue = document.getElementById('days-value');
        const tripBudget = document.getElementById('trip-budget');
        const budgetValue = document.getElementById('budget-value');
        
        tripDays.addEventListener('input', function() {
            daysValue.textContent = `${this.value}天`;
        });
        
        tripBudget.addEventListener('input', function() {
            budgetValue.textContent = `${this.value}元`;
        });
        
        // 返回顶部按钮
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // 定制旅行表单提交
        const customTripForm = document.getElementById('custom-trip-form');
        const successModal = document.getElementById('success-modal');
        const closeModal = document.getElementById('close-modal');
        
        customTripForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的表单验证
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const privacyPolicy = document.getElementById('privacy-policy').checked;
            
            if (!name || !phone || !email || !privacyPolicy) {
                alert('请填写所有必填字段并同意隐私政策');
                return;
            }
            
            // 显示成功模态框
            successModal.classList.remove('opacity-0', 'invisible');
            successModal.querySelector('div').classList.remove('scale-95');
            successModal.querySelector('div').classList.add('scale-100');
            
            // 重置表单
            customTripForm.reset();
        });
        
        closeModal.addEventListener('click', function() {
            successModal.classList.add('opacity-0', 'invisible');
            successModal.querySelector('div').classList.remove('scale-100');
            successModal.querySelector('div').classList.add('scale-95');
        });
        
        // 平滑滚动到锚点
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                // 如果是移动端菜单，点击后关闭菜单
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // 路线生成按钮
        const generateRoute = document.getElementById('generate-route');
        
        generateRoute.addEventListener('click', function() {
            // 模拟生成路线
            this.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> 生成中...';
            
            setTimeout(() => {
                this.innerHTML = '生成我的路线';
                // 这里可以添加生成路线的逻辑
                alert('路线生成成功！');
            }, 1500);
        });