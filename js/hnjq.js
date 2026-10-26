document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 更新URL哈希
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });
    
    // 景区筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const spotCards = document.querySelectorAll('.spot-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加active类到当前按钮
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            spotCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardGrade = card.getAttribute('data-grade');
                    const cardFeature = card.getAttribute('data-feature');
                    
                    if (filterValue === cardGrade || filterValue === cardFeature) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // 搜索功能
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        spotCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 按等级分类切换
    const gradeTabs = document.querySelectorAll('.grade-tab');
    const gradeInfos = document.querySelectorAll('.grade-info');
    
    gradeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有active类
            gradeTabs.forEach(t => t.classList.remove('active'));
            gradeInfos.forEach(info => info.classList.remove('active'));
            
            // 添加active类到当前标签和对应内容
            tab.classList.add('active');
            const grade = tab.getAttribute('data-grade');
            document.getElementById(`${grade}-grade`).classList.add('active');
        });
    });
    
    // 旅游攻略切换
    const guideTabs = document.querySelectorAll('.guide-tab');
    const guideInfos = document.querySelectorAll('.guide-info');
    
    guideTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有active类
            guideTabs.forEach(t => t.classList.remove('active'));
            guideInfos.forEach(info => info.classList.remove('active'));
            
            // 添加active类到当前标签和对应内容
            tab.classList.add('active');
            const guide = tab.getAttribute('data-guide');
            document.getElementById(`${guide}-guide`).classList.add('active');
        });
    });
    
    // 滚动时头部样式变化
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(44, 62, 80, 1)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.background = 'rgba(44, 62, 80, 0.9)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // 初始化 - 确保hash对应的内容显示
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});