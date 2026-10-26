 window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // 移动菜单切换
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenu.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // 响应式调整
        function handleResize() {
            if (window.innerWidth > 992) {
                navLinks.style.display = 'flex';
            } else {
                navLinks.style.display = 'none';
            }
        }
        
        window.addEventListener('resize', handleResize);
        
        // 图片悬停效果
        const featureCards = document.querySelectorAll('.feature-card, .destination-card, .culture-card');
        
        featureCards.forEach(card => {
            const img = card.querySelector('img');
            const originalSrc = img.src;
            
            // 预加载悬停效果可能需要的高清图片
            if (card.dataset.hoverImg) {
                const hoverImg = new Image();
                hoverImg.src = card.dataset.hoverImg;
            }
            
            card.addEventListener('mouseenter', function() {
                if (card.dataset.hoverImg) {
                    img.src = card.dataset.hoverImg;
                }
            });
            
            card.addEventListener('mouseleave', function() {
                img.src = originalSrc;
            });
        });
        
        // 简单的搜索功能
        const searchBtn = document.querySelector('.search-box .btn');
        searchBtn.addEventListener('click', function() {
            const searchInput = document.querySelector('.search-box input');
            const searchType = document.querySelector('.search-box select');
            
            if (searchInput.value.trim() !== '') {
                alert(`正在搜索: ${searchInput.value} (类型: ${searchType.value || '全部'})`);
                // 实际应用中这里应该是AJAX请求或页面跳转
            } else {
                alert('请输入搜索内容');
            }
        });
        
        // 新闻通讯表单提交
        const newsletterForm = document.querySelector('.newsletter-form');
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            
            if (email.includes('@')) {
                alert('感谢订阅! 我们将发送最新资讯到您的邮箱: ' + email);
                this.querySelector('input').value =