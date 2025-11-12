// ===========================
// ADMIN PANEL APPLICATION
// ===========================

// Mock data storage (in production, this would be a real database)
class DataStore {
    constructor() {
        this.init();
    }

    init() {
        // Initialize with sample data if not exists
        if (!localStorage.getItem('animeverse_admin')) {
            const sampleData = {
                admin: {
                    username: 'admin',
                    password: 'animeverse2025'
                },
                news: [
                    {
                        id: 1,
                        title: 'Dandadan Season 2 Breaks Records',
                        content: 'The supernatural action series continues to captivate audiences with stunning animation and compelling storylines',
                        category: 'action',
                        date: '2025-11-09',
                        image: 'imgs/anime_2_2.jpg',
                        status: 'published'
                    },
                    {
                        id: 2,
                        title: 'Frieren Wins Anime of the Year',
                        content: 'Beyond Journey\'s End takes the top spot at the Anime Trending Awards for its emotional storytelling',
                        category: 'adventure',
                        date: '2025-11-08',
                        image: 'imgs/anime_1_3.png',
                        status: 'published'
                    }
                ],
                slider: [
                    {
                        id: 1,
                        title: 'Dandadan Season 2 Breaks Records',
                        description: 'The supernatural action series continues to captivate audiences with stunning animation and compelling storylines',
                        image: 'imgs/hero_banner_5.jpg',
                        ctaText: 'Read More',
                        ctaLink: '#',
                        order: 1,
                        active: true
                    }
                ],
                trending: [
                    {
                        id: 1,
                        title: 'Umamusume: Cinderella Gray P2',
                        description: 'Takes the top spot in Fall 2025 rankings with captivating storytelling',
                        image: 'imgs/anime_2_7.png',
                        rank: 1,
                        views: 15420
                    }
                ],
                upcoming: [
                    {
                        id: 1,
                        title: 'Record of Ragnarok Season 3',
                        description: 'Epic battles between gods and humanity continue in this action-packed series.',
                        image: 'imgs/anime_bg_8.jpg',
                        releaseDate: '2025-12-10',
                        status: 'confirmed'
                    }
                ],
                subscribers: [
                    { id: 1, email: 'user1@example.com', date: '2025-11-01', status: 'active' },
                    { id: 2, email: 'user2@example.com', date: '2025-11-02', status: 'active' },
                    { id: 3, email: 'user3@example.com', date: '2025-11-03', status: 'unsubscribed' }
                ],
                settings: {
                    siteTitle: 'AnimeVerse',
                    siteDescription: 'Your ultimate source for anime news, reviews, and updates.',
                    theme: 'dark',
                    primaryColor: '#C026D3',
                    socialMedia: {
                        twitter: 'https://twitter.com/animeverse',
                        discord: 'https://discord.gg/animeverse',
                        youtube: 'https://youtube.com/animeverse'
                    }
                },
                activity: [
                    { id: 1, action: 'Published news article', item: 'Dandadan Season 2 Breaks Records', timestamp: '2025-11-09 14:30', type: 'news' },
                    { id: 2, action: 'Updated trending list', item: 'Frieren wins #1 spot', timestamp: '2025-11-09 10:15', type: 'trending' },
                    { id: 3, action: 'New subscriber', item: 'user1@example.com', timestamp: '2025-11-09 09:45', type: 'subscriber' }
                ]
            };
            localStorage.setItem('animeverse_admin', JSON.stringify(sampleData));
        }
    }

    getData() {
        return JSON.parse(localStorage.getItem('animeverse_admin'));
    }

    saveData(data) {
        localStorage.setItem('animeverse_admin', JSON.stringify(data));
    }

    // Authentication
    authenticate(username, password) {
        const data = this.getData();
        return data.admin.username === username && data.admin.password === password;
    }

    // News operations
    getNews() {
        return this.getData().news;
    }

    addNews(news) {
        const data = this.getData();
        news.id = Date.now();
        news.date = new Date().toISOString().split('T')[0];
        news.status = 'draft';
        data.news.push(news);
        this.saveData(data);
        this.addActivity('Created news article', news.title, 'news');
        return news;
    }

    updateNews(id, updates) {
        const data = this.getData();
        const index = data.news.findIndex(n => n.id === id);
        if (index !== -1) {
            data.news[index] = { ...data.news[index], ...updates };
            this.saveData(data);
            this.addActivity('Updated news article', data.news[index].title, 'news');
            return data.news[index];
        }
        return null;
    }

    deleteNews(id) {
        const data = this.getData();
        const news = data.news.find(n => n.id === id);
        if (news) {
            data.news = data.news.filter(n => n.id !== id);
            this.saveData(data);
            this.addActivity('Deleted news article', news.title, 'news');
        }
    }

    // Slider operations
    getSlider() {
        return this.getData().slider;
    }

    addSliderItem(item) {
        const data = this.getData();
        item.id = Date.now();
        item.order = data.slider.length + 1;
        item.active = true;
        data.slider.push(item);
        this.saveData(data);
        this.addActivity('Added slider item', item.title, 'slider');
        return item;
    }

    updateSliderItem(id, updates) {
        const data = this.getData();
        const index = data.slider.findIndex(s => s.id === id);
        if (index !== -1) {
            data.slider[index] = { ...data.slider[index], ...updates };
            this.saveData(data);
            this.addActivity('Updated slider item', data.slider[index].title, 'slider');
            return data.slider[index];
        }
        return null;
    }

    deleteSliderItem(id) {
        const data = this.getData();
        const item = data.slider.find(s => s.id === id);
        if (item) {
            data.slider = data.slider.filter(s => s.id !== id);
            this.saveData(data);
            this.addActivity('Deleted slider item', item.title, 'slider');
        }
    }

    // Trending operations
    getTrending() {
        return this.getData().trending;
    }

    addTrending(item) {
        const data = this.getData();
        item.id = Date.now();
        item.rank = data.trending.length + 1;
        item.views = Math.floor(Math.random() * 50000) + 1000;
        data.trending.push(item);
        this.saveData(data);
        this.addActivity('Added trending item', item.title, 'trending');
        return item;
    }

    updateTrending(id, updates) {
        const data = this.getData();
        const index = data.trending.findIndex(t => t.id === id);
        if (index !== -1) {
            data.trending[index] = { ...data.trending[index], ...updates };
            this.saveData(data);
            this.addActivity('Updated trending item', data.trending[index].title, 'trending');
            return data.trending[index];
        }
        return null;
    }

    deleteTrending(id) {
        const data = this.getData();
        const item = data.trending.find(t => t.id === id);
        if (item) {
            data.trending = data.trending.filter(t => t.id !== id);
            this.saveData(data);
            this.addActivity('Deleted trending item', item.title, 'trending');
        }
    }

    // Upcoming operations
    getUpcoming() {
        return this.getData().upcoming;
    }

    addUpcoming(item) {
        const data = this.getData();
        item.id = Date.now();
        item.status = 'confirmed';
        data.upcoming.push(item);
        this.saveData(data);
        this.addActivity('Added upcoming item', item.title, 'upcoming');
        return item;
    }

    updateUpcoming(id, updates) {
        const data = this.getData();
        const index = data.upcoming.findIndex(u => u.id === id);
        if (index !== -1) {
            data.upcoming[index] = { ...data.upcoming[index], ...updates };
            this.saveData(data);
            this.addActivity('Updated upcoming item', data.upcoming[index].title, 'upcoming');
            return data.upcoming[index];
        }
        return null;
    }

    deleteUpcoming(id) {
        const data = this.getData();
        const item = data.upcoming.find(u => u.id === id);
        if (item) {
            data.upcoming = data.upcoming.filter(u => u.id !== id);
            this.saveData(data);
            this.addActivity('Deleted upcoming item', item.title, 'upcoming');
        }
    }

    // Subscribers
    getSubscribers() {
        return this.getData().subscribers;
    }

    addSubscriber(email) {
        const data = this.getData();
        const subscriber = {
            id: Date.now(),
            email: email,
            date: new Date().toISOString().split('T')[0],
            status: 'active'
        };
        data.subscribers.push(subscriber);
        this.saveData(data);
        this.addActivity('New subscriber', email, 'subscriber');
        return subscriber;
    }

    // Settings
    getSettings() {
        return this.getData().settings;
    }

    updateSettings(updates) {
        const data = this.getData();
        data.settings = { ...data.settings, ...updates };
        this.saveData(data);
        this.addActivity('Updated settings', 'Website settings', 'settings');
    }

    // Activity tracking
    getActivity() {
        return this.getData().activity;
    }

    addActivity(action, item, type) {
        const data = this.getData();
        const activity = {
            id: Date.now(),
            action: action,
            item: item,
            timestamp: new Date().toLocaleString(),
            type: type
        };
        data.activity.unshift(activity);
        // Keep only last 50 activities
        data.activity = data.activity.slice(0, 50);
        this.saveData(data);
    }

    // Statistics
    getStats() {
        const data = this.getData();
        return {
            newsCount: data.news.length,
            subscriberCount: data.subscribers.filter(s => s.status === 'active').length,
            sliderCount: data.slider.filter(s => s.active).length,
            trendingCount: data.trending.length
        };
    }
}

// Admin Panel Application
class AdminPanel {
    constructor() {
        this.dataStore = new DataStore();
        this.currentSection = 'dashboard';
        this.editingId = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.showLogin();
    }

    bindEvents() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        
        // Navigation
        document.querySelectorAll('.nav-item a').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });
        
        // Action buttons
        document.getElementById('addNewBtn').addEventListener('click', () => this.showAddModal());
        document.getElementById('refreshBtn').addEventListener('click', () => this.refreshCurrentSection());
        document.querySelector('.logout-btn').addEventListener('click', () => this.logout());
        
        // Modal
        document.getElementById('modalClose').addEventListener('click', () => this.hideModal());
        document.getElementById('modal').addEventListener('click', (e) => {
            if (e.target.id === 'modal') this.hideModal();
        });
        
        // Form submissions
        document.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    showLogin() {
        document.getElementById('loginModal').style.display = 'flex';
        document.getElementById('adminDashboard').style.display = 'none';
    }

    hideLogin() {
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'flex';
    }

    handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const error = document.getElementById('loginError');
        
        if (this.dataStore.authenticate(username, password)) {
            this.hideLogin();
            this.loadDashboard();
            this.startSession();
        } else {
            error.textContent = 'Invalid username or password';
            error.style.display = 'block';
        }
    }

    startSession() {
        sessionStorage.setItem('animeverse_admin_session', 'active');
    }

    logout() {
        sessionStorage.removeItem('animeverse_admin_session');
        this.showLogin();
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('loginError').style.display = 'none';
    }

    checkSession() {
        return sessionStorage.getItem('animeverse_admin_session') === 'active';
    }

    handleNavigation(e) {
        e.preventDefault();
        const section = e.target.closest('a').dataset.section;
        this.switchSection(section);
    }

    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).closest('.nav-item').classList.add('active');
        
        // Update content
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(section).classList.add('active');
        
        // Update header
        const titles = {
            dashboard: 'Dashboard',
            news: 'News Management',
            slider: 'Hero Slider',
            trending: 'Trending',
            upcoming: 'Upcoming Releases',
            newsletter: 'Newsletter',
            settings: 'Settings'
        };
        document.getElementById('pageTitle').textContent = titles[section];
        
        this.currentSection = section;
        this.loadSection(section);
    }

    loadSection(section) {
        switch(section) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'news':
                this.loadNews();
                break;
            case 'slider':
                this.loadSlider();
                break;
            case 'trending':
                this.loadTrending();
                break;
            case 'upcoming':
                this.loadUpcoming();
                break;
            case 'newsletter':
                this.loadNewsletter();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
    }

    loadDashboard() {
        const stats = this.dataStore.getStats();
        document.getElementById('newsCount').textContent = stats.newsCount;
        document.getElementById('subscriberCount').textContent = stats.subscriberCount.toLocaleString();
        document.getElementById('sliderCount').textContent = stats.sliderCount;
        document.getElementById('trendingCount').textContent = stats.trendingCount;
        
        this.loadActivity();
    }

    loadActivity() {
        const activity = this.dataStore.getActivity();
        const container = document.getElementById('activityList');
        container.innerHTML = activity.map(item => `
            <div class="activity-item">
                <div class="activity-content">
                    <p><strong>${item.action}</strong> - ${item.item}</p>
                    <p class="activity-time">${item.timestamp}</p>
                </div>
            </div>
        `).join('');
    }

    loadNews() {
        const news = this.dataStore.getNews();
        const container = document.getElementById('newsList');
        
        const filteredNews = this.filterNews(news);
        
        container.innerHTML = filteredNews.map(item => `
            <div class="news-item">
                <img src="${item.image}" alt="${item.title}" class="news-thumbnail" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA4MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjQwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+'">
                <div class="news-content">
                    <h4>${item.title}</h4>
                    <p>${item.content}</p>
                    <div class="news-meta">
                        <span>Category: ${item.category}</span>
                        <span>Date: ${item.date}</span>
                        <span>Status: ${item.status}</span>
                    </div>
                </div>
                <div class="news-actions">
                    <button class="btn btn-sm btn-primary" onclick="adminPanel.editItem('news', ${item.id})">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="adminPanel.deleteItem('news', ${item.id})">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    filterNews(news) {
        const category = document.getElementById('categoryFilter')?.value || 'all';
        const search = document.getElementById('newsSearch')?.value || '';
        
        return news.filter(item => {
            const matchesCategory = category === 'all' || item.category === category;
            const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                                item.content.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }

    loadSlider() {
        const slider = this.dataStore.getSlider();
        const container = document.getElementById('sliderItems');
        
        container.innerHTML = slider.map(item => `
            <div class="slider-item">
                <div class="slider-preview" style="background-image: url('${item.image}')">
                    <div class="slider-overlay">
                        <div class="slider-info">
                            <h4>${item.title}</h4>
                            <p>${item.description}</p>
                        </div>
                    </div>
                </div>
                <div class="slider-item-actions">
                    <button class="btn btn-sm btn-primary" onclick="adminPanel.editItem('slider', ${item.id})">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="adminPanel.deleteItem('slider', ${item.id})">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadTrending() {
        const trending = this.dataStore.getTrending();
        const container = document.getElementById('trendingItems');
        
        container.innerHTML = trending.map(item => `
            <div class="trending-item">
                <div class="trending-rank">${item.rank}</div>
                <div class="trending-image" style="background-image: url('${item.image}')"></div>
                <div class="trending-info">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <p><small>Views: ${item.views.toLocaleString()}</small></p>
                    <div class="trending-actions">
                        <button class="btn btn-sm btn-primary" onclick="adminPanel.editItem('trending', ${item.id})">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Edit
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="adminPanel.deleteItem('trending', ${item.id})">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadUpcoming() {
        const upcoming = this.dataStore.getUpcoming();
        const container = document.getElementById('upcomingItems');
        
        container.innerHTML = upcoming.map(item => `
            <div class="upcoming-item">
                <div class="upcoming-image" style="background-image: url('${item.image}')"></div>
                <div class="upcoming-content">
                    <div class="upcoming-date">${item.releaseDate}</div>
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <div class="upcoming-actions">
                        <button class="btn btn-sm btn-primary" onclick="adminPanel.editItem('upcoming', ${item.id})">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Edit
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="adminPanel.deleteItem('upcoming', ${item.id})">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadNewsletter() {
        const subscribers = this.dataStore.getSubscribers();
        const stats = this.dataStore.getStats();
        
        document.getElementById('totalSubscribers').textContent = stats.subscriberCount;
        document.getElementById('newSubscribers').textContent = subscribers.filter(s => 
            new Date(s.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        ).length;
        document.getElementById('unsubscribers').textContent = subscribers.filter(s => 
            s.status === 'unsubscribed'
        ).length;
        
        const container = document.getElementById('subscriberList');
        container.innerHTML = `
            <div class="subscriber-header">
                <div>Email</div>
                <div>Date Subscribed</div>
                <div>Status</div>
                <div>Actions</div>
            </div>
            ${subscribers.map(sub => `
                <div class="subscriber-row">
                    <div>${sub.email}</div>
                    <div>${sub.date}</div>
                    <div>
                        <span class="badge ${sub.status === 'active' ? 'badge-success' : 'badge-danger'}">${sub.status}</span>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-danger" onclick="adminPanel.removeSubscriber(${sub.id})">
                            Remove
                        </button>
                    </div>
                </div>
            `).join('')}
        `;
    }

    loadSettings() {
        const settings = this.dataStore.getSettings();
        document.getElementById('siteTitle').value = settings.siteTitle;
        document.getElementById('siteDescription').value = settings.siteDescription;
        document.getElementById('themeSelect').value = settings.theme;
        document.getElementById('primaryColor').value = settings.primaryColor;
        document.querySelector('input[placeholder*="Twitter"]').value = settings.socialMedia.twitter || '';
        document.querySelector('input[placeholder*="Discord"]').value = settings.socialMedia.discord || '';
        document.querySelector('input[placeholder*="YouTube"]').value = settings.socialMedia.youtube || '';
    }

    showAddModal() {
        const modals = {
            news: () => this.getNewsForm(),
            slider: () => this.getSliderForm(),
            trending: () => this.getTrendingForm(),
            upcoming: () => this.getUpcomingForm()
        };
        
        const modal = modals[this.currentSection];
        if (modal) {
            this.editingId = null;
            this.showModal('Add New Item', modal());
        }
    }

    editItem(type, id) {
        this.editingId = id;
        const modals = {
            news: () => this.getNewsForm(this.dataStore.getNews().find(n => n.id === id)),
            slider: () => this.getSliderForm(this.dataStore.getSlider().find(s => s.id === id)),
            trending: () => this.getTrendingForm(this.dataStore.getTrending().find(t => t.id === id)),
            upcoming: () => this.getUpcomingForm(this.dataStore.getUpcoming().find(u => u.id === id))
        };
        
        const modal = modals[type];
        if (modal) {
            this.showModal('Edit Item', modal());
        }
    }

    deleteItem(type, id) {
        if (confirm('Are you sure you want to delete this item?')) {
            switch(type) {
                case 'news':
                    this.dataStore.deleteNews(id);
                    break;
                case 'slider':
                    this.dataStore.deleteSliderItem(id);
                    break;
                case 'trending':
                    this.dataStore.deleteTrending(id);
                    break;
                case 'upcoming':
                    this.dataStore.deleteUpcoming(id);
                    break;
            }
            this.loadSection(this.currentSection);
        }
    }

    removeSubscriber(id) {
        if (confirm('Are you sure you want to remove this subscriber?')) {
            // Implementation for removing subscriber
            this.loadSection(this.currentSection);
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        if (this.editingId) {
            // Update existing
            switch(this.currentSection) {
                case 'news':
                    this.dataStore.updateNews(this.editingId, data);
                    break;
                case 'slider':
                    this.dataStore.updateSliderItem(this.editingId, data);
                    break;
                case 'trending':
                    this.dataStore.updateTrending(this.editingId, data);
                    break;
                case 'upcoming':
                    this.dataStore.updateUpcoming(this.editingId, data);
                    break;
            }
        } else {
            // Add new
            switch(this.currentSection) {
                case 'news':
                    this.dataStore.addNews(data);
                    break;
                case 'slider':
                    this.dataStore.addSliderItem(data);
                    break;
                case 'trending':
                    this.dataStore.addTrending(data);
                    break;
                case 'upcoming':
                    this.dataStore.addUpcoming(data);
                    break;
            }
        }
        
        this.hideModal();
        this.loadSection(this.currentSection);
    }

    showModal(title, content) {
        document.getElementById('modalTitle').textContent = title;
        document.querySelector('.modal-body').innerHTML = content;
        document.getElementById('modal').classList.add('active');
    }

    hideModal() {
        document.getElementById('modal').classList.remove('active');
        this.editingId = null;
    }

    refreshCurrentSection() {
        this.loadSection(this.currentSection);
    }

    // Form templates
    getNewsForm(data = {}) {
        return `
            <form id="itemForm">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" value="${data.title || ''}" required>
                </div>
                <div class="form-group">
                    <label for="content">Content</label>
                    <textarea id="content" name="content" rows="4" required>${data.content || ''}</textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select id="category" name="category" required>
                            <option value="action" ${data.category === 'action' ? 'selected' : ''}>Action</option>
                            <option value="adventure" ${data.category === 'adventure' ? 'selected' : ''}>Adventure</option>
                            <option value="supernatural" ${data.category === 'supernatural' ? 'selected' : ''}>Supernatural</option>
                            <option value="comedy" ${data.category === 'comedy' ? 'selected' : ''}>Comedy</option>
                            <option value="drama" ${data.category === 'drama' ? 'selected' : ''}>Drama</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="status">Status</label>
                        <select id="status" name="status">
                            <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Draft</option>
                            <option value="published" ${data.status === 'published' ? 'selected' : ''}>Published</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="image">Image URL</label>
                    <input type="url" id="image" name="image" value="${data.image || ''}" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="adminPanel.hideModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        `;
    }

    getSliderForm(data = {}) {
        return `
            <form id="itemForm">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" value="${data.title || ''}" required>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" rows="3" required>${data.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="image">Background Image URL</label>
                    <input type="url" id="image" name="image" value="${data.image || ''}" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="ctaText">Button Text</label>
                        <input type="text" id="ctaText" name="ctaText" value="${data.ctaText || ''}">
                    </div>
                    <div class="form-group">
                        <label for="ctaLink">Button Link</label>
                        <input type="url" id="ctaLink" name="ctaLink" value="${data.ctaLink || '#'}">
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="adminPanel.hideModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        `;
    }

    getTrendingForm(data = {}) {
        return `
            <form id="itemForm">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" value="${data.title || ''}" required>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" rows="3" required>${data.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="image">Image URL</label>
                    <input type="url" id="image" name="image" value="${data.image || ''}" required>
                </div>
                <div class="form-group">
                    <label for="rank">Ranking Position</label>
                    <input type="number" id="rank" name="rank" value="${data.rank || ''}" min="1" max="50" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="adminPanel.hideModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        `;
    }

    getUpcomingForm(data = {}) {
        return `
            <form id="itemForm">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" value="${data.title || ''}" required>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" rows="3" required>${data.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="image">Image URL</label>
                    <input type="url" id="image" name="image" value="${data.image || ''}" required>
                </div>
                <div class="form-group">
                    <label for="releaseDate">Release Date</label>
                    <input type="date" id="releaseDate" name="releaseDate" value="${data.releaseDate || ''}" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="adminPanel.hideModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        `;
    }
}

// Initialize admin panel
let adminPanel;

document.addEventListener('DOMContentLoaded', () => {
    adminPanel = new AdminPanel();
    
    // Check if already logged in
    if (adminPanel.checkSession()) {
        adminPanel.hideLogin();
        adminPanel.loadDashboard();
    }
    
    // Auto-hide login modal on successful login
    document.addEventListener('login-success', () => {
        adminPanel.hideLogin();
        adminPanel.loadDashboard();
    });
});

// Export for global access
window.adminPanel = adminPanel;
