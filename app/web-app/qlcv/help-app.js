// Help Center Application Logic

// Current view state
let currentView = 'home'; // 'home', 'article', 'search', 'videos', 'faqs', 'contact'
let currentArticle = null;
let searchQuery = '';
let selectedCategory = 'all';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    renderView();
    
    // Load user info
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"name": "Đinh Bộ Lĩnh", "role": "staff"}');
    const userNameEl = document.querySelector('.user-name');
    if (userNameEl) {
        userNameEl.textContent = currentUser.name;
    }
});

// ===== Navigation Functions =====

function showHome() {
    currentView = 'home';
    currentArticle = null;
    renderView();
}

function showArticle(articleId) {
    currentArticle = mockArticles.find(a => a.id === articleId);
    if (currentArticle) {
        currentView = 'article';
        // Increment view count
        currentArticle.viewCount++;
        renderView();
        window.scrollTo(0, 0);
    }
}

function showVideos() {
    currentView = 'videos';
    renderView();
}

function showFAQs() {
    currentView = 'faqs';
    renderView();
}

function showContact() {
    currentView = 'contact';
    renderView();
}

function performSearch(query) {
    searchQuery = query.toLowerCase();
    currentView = 'search';
    renderView();
}

function filterByCategory(category) {
    selectedCategory = category;
    renderView();
}

// ===== Main Render Function =====

function renderView() {
    const mainView = document.getElementById('mainView');
    
    switch(currentView) {
        case 'home':
            mainView.innerHTML = renderHomeView();
            break;
        case 'article':
            mainView.innerHTML = renderArticleView();
            break;
        case 'search':
            mainView.innerHTML = renderSearchView();
            break;
        case 'videos':
            mainView.innerHTML = renderVideosView();
            break;
        case 'faqs':
            mainView.innerHTML = renderFAQsView();
            break;
        case 'contact':
            mainView.innerHTML = renderContactView();
            break;
    }
}

// ===== View Renderers =====

function renderHomeView() {
    const popularArticles = mockArticles.slice(0, 4);
    const recentArticles = mockArticles.filter(a => {
        const date = new Date(a.updatedAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return date >= weekAgo;
    });
    
    return `
        <!-- Search Box -->
        <div class="card" style="margin-bottom: 2rem;">
            <div class="search-box-container">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" 
                           id="searchInput"
                           placeholder="Tìm kiếm hướng dẫn, câu hỏi thường gặp..." 
                           style="font-size: 1rem; padding: 0.875rem 1rem 0.875rem 3rem;"
                           onkeyup="handleSearch(event)">
                </div>
                <div class="search-suggestions" id="searchSuggestions"></div>
            </div>
        </div>

        <!-- Popular Topics -->
        <div style="margin-bottom: 2rem;">
            <h2 style="margin-bottom: 1rem;">
                <i class="fas fa-fire" style="color: var(--danger);"></i>
                Chủ đề phổ biến
            </h2>
            <div style="display: grid; gap: 0.75rem;">
                ${popularArticles.map(article => `
                    <div class="article-card" onclick="showArticle('${article.id}')">
                        <h3 style="margin-bottom: 0.5rem;">${article.title}</h3>
                        <p style="color: var(--gray-600); font-size: 0.875rem; margin-bottom: 0.5rem;">${article.summary}</p>
                        <div class="article-meta">
                            <span><i class="fas fa-folder"></i> ${article.category}</span>
                            <span><i class="fas fa-clock"></i> ${article.readTimeMinutes} phút đọc</span>
                            <span><i class="fas fa-eye"></i> ${article.viewCount} lượt xem</span>
                            <span><i class="fas fa-thumbs-up"></i> ${article.helpfulCount}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Categories -->
        <div style="margin-bottom: 2rem;">
            <h2 style="margin-bottom: 1rem;">
                <i class="fas fa-th-large"></i>
                Danh mục
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                ${renderCategories()}
            </div>
        </div>

        <!-- Video Tutorials -->
        <div style="margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2>
                    <i class="fas fa-video"></i>
                    Video hướng dẫn
                </h2>
                <a href="#" onclick="showVideos(); return false;" style="color: var(--primary-color); text-decoration: none;">
                    Xem tất cả <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                ${mockVideos.slice(0, 3).map(video => renderVideoCard(video)).join('')}
            </div>
        </div>

        <!-- Recently Updated -->
        ${recentArticles.length > 0 ? `
            <div style="margin-bottom: 2rem;">
                <h2 style="margin-bottom: 1rem;">
                    <i class="fas fa-clock"></i>
                    Cập nhật gần đây
                </h2>
                <div style="display: grid; gap: 0.75rem;">
                    ${recentArticles.map(article => `
                        <div class="article-card" onclick="showArticle('${article.id}')">
                            <div style="display: flex; justify-content: space-between; align-items: start;">
                                <div style="flex: 1;">
                                    <h3 style="margin-bottom: 0.5rem;">${article.title}</h3>
                                    <p style="color: var(--gray-600); font-size: 0.875rem;">${article.summary}</p>
                                </div>
                                <span style="color: var(--gray-500); font-size: 0.875rem; white-space: nowrap; margin-left: 1rem;">
                                    ${formatDate(article.updatedAt)}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}

        <!-- Quick Actions -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
            <div class="card" style="text-align: center; cursor: pointer;" onclick="showFAQs()">
                <div style="width: 60px; height: 60px; margin: 0 auto 1rem; background: var(--warning-light); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-question-circle" style="font-size: 1.5rem; color: var(--warning-color);"></i>
                </div>
                <h3 style="margin-bottom: 0.5rem;">FAQ</h3>
                <p style="color: var(--gray-600); font-size: 0.875rem;">Câu hỏi thường gặp</p>
            </div>
            
            <div class="card" style="text-align: center; cursor: pointer;" onclick="showContact()">
                <div style="width: 60px; height: 60px; margin: 0 auto 1rem; background: var(--info-light); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-headset" style="font-size: 1.5rem; color: var(--info-color);"></i>
                </div>
                <h3 style="margin-bottom: 0.5rem;">Liên hệ hỗ trợ</h3>
                <p style="color: var(--gray-600); font-size: 0.875rem;">Gửi yêu cầu hỗ trợ</p>
            </div>
        </div>

        <!-- Video Player Modal -->
        <div id="videoModal" class="video-player-modal">
            <div class="video-player-content">
                <button class="video-player-close" onclick="closeVideoModal()">&times;</button>
                <iframe id="videoFrame" class="video-embed" src="" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    `;
}

function renderCategories() {
    const categories = [
        { name: 'Getting Started', icon: 'fa-rocket', color: '#3b82f6', bgColor: '#dbeafe', count: mockArticles.filter(a => a.category === 'Getting Started').length || 2 },
        { name: 'Tickets', icon: 'fa-ticket-alt', color: '#10b981', bgColor: '#dcfce7', count: mockArticles.filter(a => a.category === 'Tickets').length },
        { name: 'Tasks', icon: 'fa-tasks', color: '#f59e0b', bgColor: '#fef3c7', count: mockArticles.filter(a => a.category === 'Tasks').length },
        { name: 'Approvals', icon: 'fa-check-circle', color: '#8b5cf6', bgColor: '#f3e8ff', count: mockArticles.filter(a => a.category === 'Approvals').length },
        { name: 'Reports', icon: 'fa-chart-bar', color: '#ec4899', bgColor: '#fce7f3', count: mockArticles.filter(a => a.category === 'Reports').length || 3 },
        { name: 'Settings', icon: 'fa-cog', color: '#6b7280', bgColor: '#f3f4f6', count: mockArticles.filter(a => a.category === 'Settings').length || 2 },
        { name: 'Troubleshooting', icon: 'fa-wrench', color: '#ef4444', bgColor: '#fee2e2', count: mockArticles.filter(a => a.category === 'Troubleshooting').length || 4 }
    ];

    return categories.map(cat => `
        <div class="card category-card" onclick="filterByCategory('${cat.name}'); performSearch('');">
            <div class="category-icon-wrapper" style="background: ${cat.bgColor};">
                <i class="fas ${cat.icon}" style="font-size: 2rem; color: ${cat.color};"></i>
            </div>
            <h3 style="margin-bottom: 0.5rem;">${cat.name}</h3>
            <p style="color: var(--gray-600); font-size: 0.875rem;">${cat.count || 0} bài viết</p>
        </div>
    `).join('');
}

function renderArticleView() {
    if (!currentArticle) return '<div class="card"><p>Không tìm thấy bài viết.</p></div>';
    
    const relatedArticles = currentArticle.relatedArticles
        .map(id => mockArticles.find(a => a.id === id))
        .filter(a => a);
    
    return `
        <div class="card" style="margin-bottom: 1.5rem;">
            <!-- Breadcrumb -->
            <div class="breadcrumb">
                <a href="#" onclick="showHome(); return false;">
                    <i class="fas fa-home"></i> Trợ giúp
                </a>
                <i class="fas fa-chevron-right"></i>
                <span>${currentArticle.category}</span>
                <i class="fas fa-chevron-right"></i>
                <span>${currentArticle.title}</span>
            </div>

            <!-- Article Header -->
            <h1 style="margin-bottom: 1rem;">${currentArticle.title}</h1>
            <div class="article-meta" style="padding-bottom: 1.5rem; border-bottom: 1px solid var(--gray-200);">
                <span><i class="fas fa-calendar"></i> Cập nhật: ${formatDate(currentArticle.updatedAt)}</span>
                <span><i class="fas fa-clock"></i> ${currentArticle.readTimeMinutes} phút đọc</span>
                <span><i class="fas fa-eye"></i> ${currentArticle.viewCount} lượt xem</span>
                <span><i class="fas fa-thumbs-up"></i> ${currentArticle.helpfulCount} hữu ích</span>
            </div>

            <!-- Article Actions -->
            <div class="article-actions">
                <button class="btn btn-sm" onclick="bookmarkArticle('${currentArticle.id}')">
                    <i class="fas fa-bookmark"></i> Đánh dấu
                </button>
                <button class="btn btn-sm" onclick="shareArticle('${currentArticle.id}')">
                    <i class="fas fa-share-alt"></i> Chia sẻ
                </button>
                <button class="btn btn-sm" onclick="printArticle()">
                    <i class="fas fa-print"></i> In
                </button>
            </div>

            <!-- Video Tutorial (if available) -->
            ${currentArticle.videoUrl ? `
                <div style="margin-top: 1.5rem; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                    <h3 style="margin-bottom: 1rem;">
                        <i class="fas fa-video"></i> Video hướng dẫn
                    </h3>
                    <button class="btn btn-primary" onclick="playVideo('${currentArticle.videoUrl}')">
                        <i class="fas fa-play"></i> Xem video (${currentArticle.readTimeMinutes} phút)
                    </button>
                </div>
            ` : ''}

            <!-- Article Content -->
            <div class="article-content" style="margin-top: 1.5rem;">
                ${currentArticle.content}
            </div>

            <!-- Related Articles -->
            ${relatedArticles.length > 0 ? `
                <div class="related-articles">
                    <h3 style="margin-bottom: 1rem;">
                        <i class="fas fa-link"></i> Bài viết liên quan
                    </h3>
                    ${relatedArticles.map(article => `
                        <div class="related-article-item" onclick="showArticle('${article.id}')">
                            <div style="font-weight: 600; color: var(--gray-900); margin-bottom: 0.25rem;">
                                ${article.title}
                            </div>
                            <div style="font-size: 0.875rem; color: var(--gray-600);">
                                ${article.summary}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            <!-- Feedback Section -->
            <div class="feedback-section" id="feedbackSection">
                <h3 style="margin-bottom: 0.5rem;">Bài viết này có hữu ích không?</h3>
                <p style="color: var(--gray-600); font-size: 0.875rem; margin-bottom: 1rem;">
                    Đánh giá của bạn giúp chúng tôi cải thiện nội dung
                </p>
                <div class="feedback-buttons">
                    <button class="feedback-btn" onclick="submitFeedback('${currentArticle.id}', true)">
                        <i class="fas fa-thumbs-up"></i>
                        <span>Có (${currentArticle.helpfulCount})</span>
                    </button>
                    <button class="feedback-btn" onclick="submitFeedback('${currentArticle.id}', false)">
                        <i class="fas fa-thumbs-down"></i>
                        <span>Không (${currentArticle.notHelpfulCount})</span>
                    </button>
                </div>
                <div id="feedbackForm" style="display: none;">
                    <div class="feedback-form">
                        <label style="font-weight: 600; margin-bottom: 0.5rem; display: block;">
                            Cho chúng tôi biết thêm (tùy chọn)
                        </label>
                        <textarea id="feedbackComments" 
                                  placeholder="Bạn muốn cải thiện điều gì trong bài viết này?"
                                  style="width: 100%; min-height: 100px; padding: 0.75rem; border: 1px solid var(--gray-300); border-radius: 8px;"></textarea>
                        <button class="btn btn-primary" onclick="submitDetailedFeedback('${currentArticle.id}')" style="margin-top: 0.5rem;">
                            Gửi phản hồi
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Video Player Modal -->
        <div id="videoModal" class="video-player-modal">
            <div class="video-player-content">
                <button class="video-player-close" onclick="closeVideoModal()">&times;</button>
                <iframe id="videoFrame" class="video-embed" src="" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    `;
}

function renderSearchView() {
    let filteredArticles = mockArticles;
    
    if (searchQuery) {
        filteredArticles = mockArticles.filter(article => 
            article.title.toLowerCase().includes(searchQuery) ||
            article.summary.toLowerCase().includes(searchQuery) ||
            article.content.toLowerCase().includes(searchQuery) ||
            article.tags.some(tag => tag.includes(searchQuery))
        );
    }
    
    if (selectedCategory && selectedCategory !== 'all') {
        filteredArticles = filteredArticles.filter(article => article.category === selectedCategory);
    }

    const categories = ['all', ...new Set(mockArticles.map(a => a.category))];

    return `
        <div class="card" style="margin-bottom: 2rem;">
            <div class="search-box-container">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" 
                           id="searchInput"
                           value="${searchQuery}"
                           placeholder="Tìm kiếm hướng dẫn, câu hỏi thường gặp..." 
                           style="font-size: 1rem; padding: 0.875rem 1rem 0.875rem 3rem;"
                           onkeyup="handleSearch(event)">
                </div>
            </div>
        </div>

        <div class="card">
            <!-- Breadcrumb -->
            <div class="breadcrumb">
                <a href="#" onclick="showHome(); return false;">
                    <i class="fas fa-home"></i> Trợ giúp
                </a>
                <i class="fas fa-chevron-right"></i>
                <span>Kết quả tìm kiếm</span>
            </div>

            <h2 style="margin-bottom: 1rem;">
                Tìm thấy ${filteredArticles.length} kết quả
                ${searchQuery ? ` cho "${searchQuery}"` : ''}
            </h2>

            <!-- Category Filter -->
            <div class="filter-chips">
                ${categories.map(cat => `
                    <div class="chip ${selectedCategory === cat ? 'active' : ''}" 
                         onclick="filterByCategory('${cat}')">
                        ${cat === 'all' ? 'Tất cả' : cat}
                    </div>
                `).join('')}
            </div>

            <!-- Results -->
            ${filteredArticles.length > 0 ? `
                <div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
                    ${filteredArticles.map(article => `
                        <div class="article-card" onclick="showArticle('${article.id}')">
                            <h3 style="margin-bottom: 0.5rem;">${highlightText(article.title, searchQuery)}</h3>
                            <p style="color: var(--gray-600); font-size: 0.875rem; margin-bottom: 0.5rem;">
                                ${highlightText(article.summary, searchQuery)}
                            </p>
                            <div class="article-meta">
                                <span><i class="fas fa-folder"></i> ${article.category}</span>
                                <span><i class="fas fa-clock"></i> ${article.readTimeMinutes} phút đọc</span>
                                <span><i class="fas fa-eye"></i> ${article.viewCount} lượt xem</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div style="text-align: center; padding: 3rem;">
                    <i class="fas fa-search" style="font-size: 4rem; color: var(--gray-300); margin-bottom: 1rem;"></i>
                    <h3 style="margin-bottom: 0.5rem;">Không tìm thấy kết quả</h3>
                    <p style="color: var(--gray-600); margin-bottom: 1.5rem;">
                        Thử tìm kiếm với từ khóa khác hoặc 
                        <a href="#" onclick="showContact(); return false;" style="color: var(--primary-color);">liên hệ hỗ trợ</a>
                    </p>
                    <button class="btn btn-primary" onclick="showHome()">
                        <i class="fas fa-home"></i> Về trang chủ
                    </button>
                </div>
            `}
        </div>
    `;
}

function renderVideosView() {
    return `
        <div class="card">
            <!-- Breadcrumb -->
            <div class="breadcrumb">
                <a href="#" onclick="showHome(); return false;">
                    <i class="fas fa-home"></i> Trợ giúp
                </a>
                <i class="fas fa-chevron-right"></i>
                <span>Video hướng dẫn</span>
            </div>

            <h2 style="margin-bottom: 1.5rem;">
                <i class="fas fa-video"></i> Video hướng dẫn
            </h2>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                ${mockVideos.map(video => renderVideoCard(video)).join('')}
            </div>
        </div>

        <!-- Video Player Modal -->
        <div id="videoModal" class="video-player-modal">
            <div class="video-player-content">
                <button class="video-player-close" onclick="closeVideoModal()">&times;</button>
                <iframe id="videoFrame" class="video-embed" src="" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    `;
}

function renderVideoCard(video) {
    const minutes = Math.floor(video.durationSeconds / 60);
    const seconds = video.durationSeconds % 60;
    const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    return `
        <div class="video-card" onclick="playVideo('${video.videoUrl}')">
            <div class="video-thumbnail">
                <img src="${video.thumbnailUrl}" alt="${video.title}">
                <div class="video-play-icon">
                    <i class="fas fa-play"></i>
                </div>
                <div class="video-duration">${duration}</div>
            </div>
            <div class="video-info">
                <div class="video-title">${video.title}</div>
                <p style="color: var(--gray-600); font-size: 0.875rem; margin-bottom: 0.5rem;">
                    ${video.description}
                </p>
                <div class="video-views">
                    <i class="fas fa-eye"></i> ${video.viewCount} lượt xem
                </div>
            </div>
        </div>
    `;
}

function renderFAQsView() {
    const categories = [...new Set(mockFAQs.map(f => f.category))];
    const selectedFaqCategory = selectedCategory === 'all' ? null : selectedCategory;
    
    const filteredFAQs = selectedFaqCategory 
        ? mockFAQs.filter(f => f.category === selectedFaqCategory)
        : mockFAQs;

    return `
        <div class="card">
            <!-- Breadcrumb -->
            <div class="breadcrumb">
                <a href="#" onclick="showHome(); return false;">
                    <i class="fas fa-home"></i> Trợ giúp
                </a>
                <i class="fas fa-chevron-right"></i>
                <span>Câu hỏi thường gặp</span>
            </div>

            <h2 style="margin-bottom: 1rem;">
                <i class="fas fa-question-circle"></i> Câu hỏi thường gặp (FAQ)
            </h2>

            <!-- Category Filter -->
            <div class="filter-chips" style="margin-bottom: 1.5rem;">
                <div class="chip ${!selectedFaqCategory ? 'active' : ''}" onclick="filterByCategory('all')">
                    Tất cả
                </div>
                ${categories.map(cat => `
                    <div class="chip ${selectedFaqCategory === cat ? 'active' : ''}" 
                         onclick="filterByCategory('${cat}')">
                        ${cat}
                    </div>
                `).join('')}
            </div>

            <!-- FAQ Items -->
            <div style="display: grid; gap: 0.75rem;">
                ${filteredFAQs.map(faq => `
                    <div class="accordion-item">
                        <div class="accordion-header" onclick="toggleAccordion(this)">
                            <i class="fas fa-question-circle" style="color: var(--primary-color);"></i>
                            <span>${faq.question}</span>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </div>
                        <div class="accordion-content">
                            <p>${faq.answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
                            ${faq.relatedArticleId ? `
                                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--gray-200);">
                                    <a href="#" onclick="showArticle('${faq.relatedArticleId}'); return false;" 
                                       style="color: var(--primary-color); text-decoration: none;">
                                        <i class="fas fa-arrow-right"></i> Xem bài viết chi tiết
                                    </a>
                                </div>
                            ` : ''}
                            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--gray-200); font-size: 0.875rem; color: var(--gray-600);">
                                <span style="margin-right: 1rem;">Hữu ích?</span>
                                <button class="btn btn-sm" onclick="voteFAQ('${faq.id}', true); event.stopPropagation();" 
                                        style="padding: 0.25rem 0.75rem;">
                                    <i class="fas fa-thumbs-up"></i> Có
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div style="margin-top: 2rem; padding: 1.5rem; background: var(--gray-50); border-radius: 8px; text-align: center;">
                <h3 style="margin-bottom: 0.5rem;">Không tìm thấy câu trả lời?</h3>
                <p style="color: var(--gray-600); margin-bottom: 1rem;">
                    Liên hệ với đội ngũ hỗ trợ của chúng tôi
                </p>
                <button class="btn btn-primary" onclick="showContact()">
                    <i class="fas fa-headset"></i> Liên hệ hỗ trợ
                </button>
            </div>
        </div>
    `;
}

function renderContactView() {
    return `
        <div class="card">
            <!-- Breadcrumb -->
            <div class="breadcrumb">
                <a href="#" onclick="showHome(); return false;">
                    <i class="fas fa-home"></i> Trợ giúp
                </a>
                <i class="fas fa-chevron-right"></i>
                <span>Liên hệ hỗ trợ</span>
            </div>

            <h2 style="margin-bottom: 1rem;">
                <i class="fas fa-headset"></i> Liên hệ Hỗ trợ
            </h2>
            <p style="color: var(--gray-600); margin-bottom: 2rem;">
                Gửi yêu cầu hỗ trợ và chúng tôi sẽ phản hồi sớm nhất có thể
            </p>

            <div id="contactFormMessage"></div>

            <form id="contactForm" class="contact-form" onsubmit="submitContactForm(event)">
                <div class="form-group">
                    <label for="contactSubject">Tiêu đề <span style="color: var(--danger);">*</span></label>
                    <input type="text" id="contactSubject" required 
                           placeholder="Tóm tắt vấn đề cần hỗ trợ">
                    <div class="error" id="subjectError"></div>
                </div>

                <div class="form-group">
                    <label for="contactCategory">Danh mục <span style="color: var(--danger);">*</span></label>
                    <select id="contactCategory" required>
                        <option value="">-- Chọn danh mục --</option>
                        <option value="ACCOUNT">Tài khoản</option>
                        <option value="TICKET">Phiếu yêu cầu</option>
                        <option value="TASK">Công việc</option>
                        <option value="TECHNICAL">Kỹ thuật</option>
                        <option value="OTHER">Khác</option>
                    </select>
                    <div class="error" id="categoryError"></div>
                </div>

                <div class="form-group">
                    <label for="contactPriority">Mức độ ưu tiên <span style="color: var(--danger);">*</span></label>
                    <select id="contactPriority" required>
                        <option value="">-- Chọn mức độ --</option>
                        <option value="LOW">Thấp</option>
                        <option value="MEDIUM">Trung bình</option>
                        <option value="HIGH">Cao</option>
                    </select>
                    <div class="error" id="priorityError"></div>
                </div>

                <div class="form-group">
                    <label for="contactDescription">Mô tả chi tiết <span style="color: var(--danger);">*</span></label>
                    <textarea id="contactDescription" required 
                              placeholder="Mô tả chi tiết vấn đề, các bước tái hiện (nếu có), và thông tin liên quan khác"></textarea>
                    <div class="error" id="descriptionError"></div>
                </div>

                <div class="form-group">
                    <label for="contactAttachment">Đính kèm (tùy chọn)</label>
                    <input type="file" id="contactAttachment" multiple accept="image/*,.pdf,.doc,.docx">
                    <p style="font-size: 0.875rem; color: var(--gray-500); margin-top: 0.25rem;">
                        Hỗ trợ: Ảnh, PDF, Word (tối đa 10MB)
                    </p>
                </div>

                <div style="display: flex; gap: 1rem;">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-paper-plane"></i> Gửi yêu cầu
                    </button>
                    <button type="button" class="btn" onclick="resetContactForm()">
                        <i class="fas fa-redo"></i> Làm mới
                    </button>
                </div>
            </form>

            <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--gray-200);">
                <h3 style="margin-bottom: 1rem;">Thông tin liên hệ khác</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
                    <div style="padding: 1.5rem; background: var(--gray-50); border-radius: 8px; text-align: center;">
                        <i class="fas fa-phone" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                        <h4 style="margin-bottom: 0.5rem;">Hotline</h4>
                        <p style="color: var(--gray-600); margin-bottom: 0.5rem;">024.1234.5678</p>
                        <p style="font-size: 0.875rem; color: var(--gray-500);">8:00 - 17:00 (T2-T6)</p>
                    </div>
                    
                    <div style="padding: 1.5rem; background: var(--gray-50); border-radius: 8px; text-align: center;">
                        <i class="fas fa-envelope" style="font-size: 2rem; color: var(--success); margin-bottom: 1rem;"></i>
                        <h4 style="margin-bottom: 0.5rem;">Email</h4>
                        <p style="color: var(--gray-600);">support@hospital.vn</p>
                        <p style="font-size: 0.875rem; color: var(--gray-500);">Phản hồi trong 24h</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===== Utility Functions =====

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('vi-VN', options);
}

function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: yellow; padding: 0 2px;">$1</mark>');
}

// ===== Event Handlers =====

function handleSearch(event) {
    const input = event.target;
    const query = input.value.toLowerCase();
    
    if (event.key === 'Enter') {
        performSearch(query);
        return;
    }
    
    // Show search suggestions
    if (query.length >= 2) {
        const suggestions = mockArticles.filter(article =>
            article.title.toLowerCase().includes(query) ||
            article.tags.some(tag => tag.includes(query))
        ).slice(0, 5);
        
        showSearchSuggestions(suggestions, query);
    } else {
        hideSearchSuggestions();
    }
}

function showSearchSuggestions(articles, query) {
    const container = document.getElementById('searchSuggestions');
    if (!container) return;
    
    if (articles.length === 0) {
        container.classList.remove('active');
        return;
    }
    
    container.innerHTML = articles.map(article => `
        <div class="search-suggestion-item" onclick="showArticle('${article.id}')">
            <div class="suggestion-title">${highlightText(article.title, query)}</div>
            <div class="suggestion-category">${article.category}</div>
        </div>
    `).join('');
    
    container.classList.add('active');
}

function hideSearchSuggestions() {
    const container = document.getElementById('searchSuggestions');
    if (container) {
        container.classList.remove('active');
    }
}

function toggleAccordion(header) {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');
    
    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        item.classList.add('active');
    }
}

function submitFeedback(articleId, helpful) {
    const article = mockArticles.find(a => a.id === articleId);
    if (article) {
        if (helpful) {
            article.helpfulCount++;
        } else {
            article.notHelpfulCount++;
        }
        
        // Show feedback form
        const feedbackForm = document.getElementById('feedbackForm');
        if (feedbackForm) {
            feedbackForm.style.display = 'block';
        }
        
        // Show thank you message
        const section = document.getElementById('feedbackSection');
        if (section) {
            const thankYou = document.createElement('div');
            thankYou.className = 'alert alert-success';
            thankYou.style.marginTop = '1rem';
            thankYou.innerHTML = '<i class="fas fa-check-circle"></i> Cảm ơn phản hồi của bạn!';
            section.appendChild(thankYou);
        }
    }
}

function submitDetailedFeedback(articleId) {
    const comments = document.getElementById('feedbackComments');
    if (comments) {
        const value = comments.value;
        // In a real app, this would send to the server
        console.log('Detailed feedback for', articleId, ':', value);
        
        alert('Cảm ơn phản hồi chi tiết của bạn! Chúng tôi sẽ xem xét và cải thiện nội dung.');
        const feedbackForm = document.getElementById('feedbackForm');
        if (feedbackForm) {
            feedbackForm.style.display = 'none';
        }
        comments.value = '';
    }
}

function voteFAQ(faqId, helpful) {
    const faq = mockFAQs.find(f => f.id === faqId);
    if (faq && helpful) {
        faq.helpfulCount++;
        alert('Cảm ơn phản hồi của bạn!');
    }
}

function bookmarkArticle(articleId) {
    // In a real app, this would save to user's bookmarks
    alert('Đã lưu bài viết vào danh sách đánh dấu của bạn!');
}

function shareArticle(articleId) {
    const article = mockArticles.find(a => a.id === articleId);
            if (article) {
        const url = window.location.origin + window.location.pathname + '?article=' + article.slug;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url);
            alert('Đã sao chép link bài viết!');
        } else {
            prompt('Copy link này:', url);
        }
    }
}

function printArticle() {
    window.print();
}

function playVideo(videoUrl) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');
    
    if (modal && iframe) {
        iframe.src = videoUrl + '?autoplay=1';
        modal.classList.add('active');
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');
    
    if (modal && iframe) {
        modal.classList.remove('active');
        iframe.src = '';
    }
}

function submitContactForm(event) {
    event.preventDefault();
    
    const subject = document.getElementById('contactSubject').value;
    const category = document.getElementById('contactCategory').value;
    const priority = document.getElementById('contactPriority').value;
    const description = document.getElementById('contactDescription').value;
    
    // Basic validation
    if (!subject || !category || !priority || !description) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }
    
    // In a real app, this would send to the server
    console.log('Support ticket:', { subject, category, priority, description });
    
    // Show success message
    const messageDiv = document.getElementById('contactFormMessage');
    if (messageDiv) {
        messageDiv.innerHTML = `
            <div class="alert alert-success">
                <h3 style="margin-bottom: 0.5rem;">
                    <i class="fas fa-check-circle"></i> Yêu cầu đã được gửi!
                </h3>
                <p>Mã ticket: <strong>#SUPP-${Math.floor(Math.random() * 10000)}</strong></p>
                <p>Chúng tôi sẽ phản hồi trong vòng <strong>24 giờ</strong>.</p>
                <p>Bạn sẽ nhận được email xác nhận và có thể theo dõi tiến độ trong hệ thống.</p>
                <button class="btn btn-primary" onclick="showHome()" style="margin-top: 1rem;">
                    <i class="fas fa-home"></i> Về trang chủ
                </button>
            </div>
        `;
        
        // Hide form
        const form = document.getElementById('contactForm');
        if (form) {
            form.style.display = 'none';
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function resetContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();
    }
}

// Close video modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('videoModal');
    if (modal && event.target === modal) {
        closeVideoModal();
    }
});

// Close search suggestions when clicking outside
document.addEventListener('click', function(event) {
    const searchBox = document.querySelector('.search-box-container');
    if (searchBox && !searchBox.contains(event.target)) {
        hideSearchSuggestions();
    }
});
