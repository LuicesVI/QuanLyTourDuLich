// Tour Management Application
class TourManager {
    constructor() {
        this.tours = [];
        this.favorites = JSON.parse(localStorage.getItem('favoriteTours')) || [];
        this.userPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {
            locations: [],
            priceRange: '',
            favoriteCategories: []
        };
        this.init();
    }

    init() {
        this.loadSampleTours();
        this.renderTours();
        this.renderFavorites();
        this.generateRecommendations();
        this.setupEventListeners();
    }

    // Load sample tour data
    loadSampleTours() {
        this.tours = [
            {
                id: 1,
                title: "Du lịch Hạ Long - Sapa 4N3Đ",
                location: "Hà Nội",
                description: "Khám phá vẻ đẹp thiên nhiên kỳ vĩ của Vịnh Hạ Long và núi rừng Sapa hùng vĩ.",
                price: 3500000,
                duration: "4 ngày 3 đêm",
                rating: 4.8,
                image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=250&fit=crop",
                category: "nature",
                highlights: ["Vịnh Hạ Long", "Sapa", "Fansipan", "Thung lũng Mường Hoa"]
            },
            {
                id: 2,
                title: "Phú Quốc - Thiên đường biển đảo",
                location: "Phú Quốc",
                description: "Tận hưởng kỳ nghỉ tuyệt vời tại đảo ngọc Phú Quốc với bãi biển đẹp nhất Việt Nam.",
                price: 4200000,
                duration: "3 ngày 2 đêm",
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
                category: "beach",
                highlights: ["Bãi Sao", "Cáp treo Hòn Thơm", "Chợ đêm", "Làng chài Hàm Ninh"]
            },
            {
                id: 3,
                title: "Hội An - Đà Nẵng cổ kính",
                location: "Đà Nẵng",
                description: "Khám phá phố cổ Hội An và thành phố Đà Nẵng hiện đại.",
                price: 2800000,
                duration: "3 ngày 2 đêm",
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop",
                category: "culture",
                highlights: ["Phố cổ Hội An", "Cầu Nhật Bản", "Bà Nà Hills", "Bãi biển Mỹ Khê"]
            },
            {
                id: 4,
                title: "Nha Trang - Thành phố biển",
                location: "Nha Trang",
                description: "Thư giãn tại thành phố biển Nha Trang với nhiều hoạt động thú vị.",
                price: 3200000,
                duration: "4 ngày 3 đêm",
                rating: 4.6,
                image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=400&h=250&fit=crop",
                category: "beach",
                highlights: ["Vinpearl Land", "Tháp Bà Ponagar", "Bãi biển Nha Trang", "Đảo Hòn Mun"]
            },
            {
                id: 5,
                title: "Sài Gòn - Mũi Né 3N2Đ",
                location: "Hồ Chí Minh",
                description: "Từ thành phố sôi động đến đồi cát thơ mộng Mũi Né.",
                price: 2500000,
                duration: "3 ngày 2 đêm",
                rating: 4.5,
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
                category: "adventure",
                highlights: ["Đồi cát bay", "Suối tiên", "Chợ Bến Thành", "Dinh Độc Lập"]
            },
            {
                id: 6,
                title: "Đà Lạt - Thành phố ngàn hoa",
                location: "Đà Lạt",
                description: "Khám phá thành phố ngàn hoa với khí hậu mát mẻ quanh năm.",
                price: 2200000,
                duration: "3 ngày 2 đêm",
                rating: 4.8,
                image: "https://images.unsplash.com/photo-1571116970326-a0e3cb2e84c4?w=400&h=250&fit=crop",
                category: "nature",
                highlights: ["Hồ Xuân Hương", "Ga Đà Lạt", "Thung lũng Tình yêu", "Thiền viện Trúc Lâm"]
            }
        ];
    }

    // Render tours with filters
    renderTours(filteredTours = null) {
        const toursToRender = filteredTours || this.tours;
        const tourList = document.getElementById('tourList');
        
        if (toursToRender.length === 0) {
            tourList.innerHTML = '<p class="empty-message">Không tìm thấy tour nào phù hợp.</p>';
            return;
        }

        tourList.innerHTML = toursToRender.map(tour => this.createTourCard(tour)).join('');
        this.attachTourEventListeners();
    }

    // Create tour card HTML
    createTourCard(tour) {
        const isFavorite = this.favorites.includes(tour.id);
        const stars = this.generateStars(tour.rating);
        
        return `
            <div class="tour-card" data-tour-id="${tour.id}">
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-tour-id="${tour.id}">
                    <i class="fas fa-heart"></i>
                </button>
                <img src="${tour.image}" alt="${tour.title}" class="tour-image">
                <div class="tour-content">
                    <h3 class="tour-title">${tour.title}</h3>
                    <div class="tour-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${tour.location}
                    </div>
                    <div class="tour-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-text">(${tour.rating}/5)</span>
                    </div>
                    <p class="tour-description">${tour.description}</p>
                    <div class="tour-duration">
                        <i class="fas fa-clock"></i>
                        ${tour.duration}
                    </div>
                    <div class="tour-price">${this.formatPrice(tour.price)}</div>
                    <div class="tour-actions">
                        <button class="btn btn-primary view-details" data-tour-id="${tour.id}">
                            <i class="fas fa-eye"></i>
                            Xem chi tiết
                        </button>
                        <button class="btn btn-secondary book-tour" data-tour-id="${tour.id}">
                            <i class="fas fa-calendar-check"></i>
                            Đặt tour
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Generate star rating
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt star"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="fas fa-star star empty"></i>';
        }
        
        return stars;
    }

    // Format price
    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }

    // Attach event listeners to tour cards
    attachTourEventListeners() {
        // Favorite buttons
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const tourId = parseInt(btn.dataset.tourId);
                this.toggleFavorite(tourId);
            });
        });

        // View details buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', () => {
                const tourId = parseInt(btn.dataset.tourId);
                this.showTourDetails(tourId);
            });
        });

        // Book tour buttons
        document.querySelectorAll('.book-tour').forEach(btn => {
            btn.addEventListener('click', () => {
                const tourId = parseInt(btn.dataset.tourId);
                this.bookTour(tourId);
            });
        });
    }

    // Toggle favorite status
    toggleFavorite(tourId) {
        const index = this.favorites.indexOf(tourId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(tourId);
            this.updateUserPreferences(tourId);
        }
        
        localStorage.setItem('favoriteTours', JSON.stringify(this.favorites));
        this.updateFavoriteButtons();
        this.renderFavorites();
        this.generateRecommendations();
    }

    // Update favorite buttons
    updateFavoriteButtons() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const tourId = parseInt(btn.dataset.tourId);
            const isFavorite = this.favorites.includes(tourId);
            btn.classList.toggle('active', isFavorite);
        });
    }

    // Update user preferences based on favorite tours
    updateUserPreferences(tourId) {
        const tour = this.tours.find(t => t.id === tourId);
        if (tour) {
            // Add location preference
            if (!this.userPreferences.locations.includes(tour.location)) {
                this.userPreferences.locations.push(tour.location);
            }
            
            // Add category preference
            if (!this.userPreferences.favoriteCategories.includes(tour.category)) {
                this.userPreferences.favoriteCategories.push(tour.category);
            }
            
            localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
        }
    }

    // Render favorite tours
    renderFavorites() {
        const favoritesList = document.getElementById('favoritesList');
        const favoriteTours = this.tours.filter(tour => this.favorites.includes(tour.id));
        
        if (favoriteTours.length === 0) {
            favoritesList.innerHTML = '<p class="empty-message">Bạn chưa có tour yêu thích nào. Hãy thêm tour vào danh sách yêu thích!</p>';
        } else {
            favoritesList.innerHTML = favoriteTours.map(tour => this.createTourCard(tour)).join('');
            this.attachTourEventListeners();
        }
    }

    // Generate recommendations based on user preferences
    generateRecommendations() {
        const recommendationsList = document.getElementById('recommendationsList');
        
        if (this.favorites.length === 0) {
            // Show popular tours if no preferences
            const popularTours = this.tours
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3);
            recommendationsList.innerHTML = popularTours.map(tour => this.createTourCard(tour)).join('');
        } else {
            // Generate recommendations based on preferences
            const recommendations = this.getPersonalizedRecommendations();
            recommendationsList.innerHTML = recommendations.map(tour => this.createTourCard(tour)).join('');
        }
        
        this.attachTourEventListeners();
    }

    // Get personalized recommendations
    getPersonalizedRecommendations() {
        const nonFavoriteTours = this.tours.filter(tour => !this.favorites.includes(tour.id));
        
        // Score tours based on user preferences
        const scoredTours = nonFavoriteTours.map(tour => {
            let score = 0;
            
            // Location preference
            if (this.userPreferences.locations.includes(tour.location)) {
                score += 3;
            }
            
            // Category preference
            if (this.userPreferences.favoriteCategories.includes(tour.category)) {
                score += 2;
            }
            
            // Rating bonus
            score += tour.rating;
            
            return { ...tour, score };
        });
        
        // Sort by score and return top 4
        return scoredTours
            .sort((a, b) => b.score - a.score)
            .slice(0, 4);
    }

    // Show tour details in modal
    showTourDetails(tourId) {
        const tour = this.tours.find(t => t.id === tourId);
        if (!tour) return;
        
        const modal = document.getElementById('tourModal');
        const modalContent = document.getElementById('modalContent');
        
        modalContent.innerHTML = `
            <h2>${tour.title}</h2>
            <img src="${tour.image}" alt="${tour.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin: 1rem 0;">
            <div class="tour-location">
                <i class="fas fa-map-marker-alt"></i>
                ${tour.location}
            </div>
            <div class="tour-rating">
                <div class="stars">${this.generateStars(tour.rating)}</div>
                <span class="rating-text">(${tour.rating}/5)</span>
            </div>
            <p><strong>Thời gian:</strong> ${tour.duration}</p>
            <p><strong>Giá:</strong> ${this.formatPrice(tour.price)}</p>
            <p><strong>Mô tả:</strong> ${tour.description}</p>
            <div>
                <strong>Điểm nổi bật:</strong>
                <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
                    ${tour.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
            <div style="margin-top: 2rem; text-align: center;">
                <button class="btn btn-primary book-tour" data-tour-id="${tour.id}">
                    <i class="fas fa-calendar-check"></i>
                    Đặt tour ngay
                </button>
            </div>
        `;
        
        modal.style.display = 'block';
        this.attachTourEventListeners();
    }

    // Book tour
    bookTour(tourId) {
        const tour = this.tours.find(t => t.id === tourId);
        if (tour) {
            alert(`Cảm ơn bạn đã quan tâm đến tour "${tour.title}"!\n\nVui lòng liên hệ:\n📞 Hotline: 0123-456-789\n📧 Email: booking@tourmanager.vn\n\nĐể đặt tour và nhận thông tin chi tiết.`);
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', () => this.filterTours());

        // Filter functionality
        const locationFilter = document.getElementById('locationFilter');
        const priceFilter = document.getElementById('priceFilter');
        
        locationFilter.addEventListener('change', () => this.filterTours());
        priceFilter.addEventListener('change', () => this.filterTours());

        // Refresh recommendations
        const refreshBtn = document.getElementById('refreshRecommendations');
        refreshBtn.addEventListener('click', () => {
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Đang tải...';
            setTimeout(() => {
                this.generateRecommendations();
                refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Làm mới gợi ý';
            }, 1000);
        });

        // Modal close
        const modal = document.getElementById('tourModal');
        const closeBtn = document.querySelector('.close');
        
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Filter tours
    filterTours() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const locationFilter = document.getElementById('locationFilter').value;
        const priceFilter = document.getElementById('priceFilter').value;

        let filteredTours = this.tours.filter(tour => {
            const matchesSearch = tour.title.toLowerCase().includes(searchTerm) ||
                                tour.description.toLowerCase().includes(searchTerm) ||
                                tour.location.toLowerCase().includes(searchTerm);
            
            const matchesLocation = !locationFilter || tour.location === locationFilter;
            
            let matchesPrice = true;
            if (priceFilter) {
                const [min, max] = priceFilter.split('-').map(Number);
                matchesPrice = tour.price >= min && tour.price <= max;
            }
            
            return matchesSearch && matchesLocation && matchesPrice;
        });

        this.renderTours(filteredTours);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TourManager();
});