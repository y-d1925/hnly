// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('py-2');
        navbar.classList.remove('py-3');
    } else {
        navbar.classList.add('py-3');
        navbar.classList.remove('py-2');
    }
});

// 移动端菜单切换
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
});

// 地图标记点交互
const mapMarkers = document.querySelectorAll('.map-marker');
const cityInfo = document.querySelector('.city-preview');
const cityName = document.getElementById('city-name');
const cityDesc = document.getElementById('city-desc');
const cityImage = document.getElementById('city-image');
const cityFoods = document.getElementById('city-foods');

// 城市数据
const cities = {
    '长沙': {
        name: '长沙',
        desc: '长沙是湖南的省会，以其辣味美食和丰富的小吃文化而闻名。',
        image: 'https://picsum.photos/id/292/600/400',
        foods: ['臭豆腐', '糖油粑粑', '口味虾']
    },
    '湘潭': {
        name: '湘潭',
        desc: '湘潭是一座历史悠久的城市，其美食融合了当地特色和传统风味。',
        image: 'https://picsum.photos/id/291/600/400',
        foods: ['灯芯糕', '龙牌酱油', '湘潭槟榔']
    },
    '衡阳': {
        name: '衡阳',
        desc: '衡阳位于湖南南部，以其鲜美的河鲜和独特的烹饪方法而闻名。',
        image: 'https://picsum.photos/id/290/600/400',
        foods: ['衡阳鱼粉', '张飞酒', '石鼓酥薄月饼']
    },
    '岳阳': {
        name: '岳阳',
        desc: '岳阳位于洞庭湖之滨，以湖鲜和特色小吃而闻名。',
        image: 'https://picsum.photos/id/289/600/400',
        foods: ['洞庭银鱼', '君山银针鸡片', '兰花萝卜']
    },
    '张家界': {
        name: '张家界',
        desc: '张家界以其壮丽的自然风光和独特的少数民族美食而闻名。',
        image: 'https://picsum.photos/id/288/600/400',
        foods: ['土家三下锅', '酸酢鱼', '葛根粉']
    },
    '常德': {
        name: '常德',
        desc: '常德美食以辣、香、鲜为特色，融合了本地和周边地区的风味。',
        image: 'https://picsum.photos/id/287/600/400',
        foods: ['常德米粉', '津市牛肉粉', '桃源擂茶']
    }
};

mapMarkers.forEach(marker => {
    marker.addEventListener('click', function() {
        const city = this.getAttribute('data-city');
        const cityData = cities[city];
        
        if (cityData) {
            cityName.textContent = cityData.name;
            cityDesc.textContent = cityData.desc;
            cityImage.src = cityData.image;
            cityImage.alt = `${cityData.name}美食图片`;
            
            // 清空并添加美食列表
            cityFoods.innerHTML = '';
            cityData.foods.forEach(food => {
                const li = document.createElement('li');
                li.className = 'flex items-center';
                li.innerHTML = `
                    <i class="fa fa-cutlery text-red-500 mr-2"></i>
                    <span>${food}</span>
                `;
                cityFoods.appendChild(li);
            });
            
            // 显示城市信息
            cityInfo.classList.remove('hidden');
            
            // 平滑滚动到城市信息区域
            document.getElementById('city-info').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 美食滑块控制
const slider = document.getElementById('food-slider');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -370, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: 370, behavior: 'smooth' });
});

// 返回顶部按钮
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        backToTopBtn.classList.add('opacity-0', 'invisible');
        backToTopBtn.classList.remove('opacity-100', 'visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 美食统计图表
document.addEventListener('DOMContentLoaded', function() {
    // 美食种类分布图表
    const foodTypeCtx = document.getElementById('foodTypeChart').getContext('2d');
    new Chart(foodTypeCtx, {
        type: 'pie',
        data: {
            labels: ['湘菜', '小吃', '火锅', '烧烤', '甜点'],
            datasets: [{
                data: [45, 30, 10, 10, 5],
                backgroundColor: [
                    '#ef4444',
                    '#f97316',
                    '#f59e0b',
                    '#10b981',
                    '#8b5cf6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // 城市美食人气指数图表
    const cityPopularityCtx = document.getElementById('cityPopularityChart').getContext('2d');
    new Chart(cityPopularityCtx, {
        type: 'bar',
        data: {
            labels: ['长沙', '湘潭', '衡阳', '岳阳', '张家界', '常德'],
            datasets: [{
                label: '人气指数',
                data: [92, 78, 75, 80, 85, 82],
                backgroundColor: '#ef4444',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
});
    