// Mock Data for Help Center

const mockArticles = [
    {
        id: 'art_001',
        title: 'Cách tạo Phiếu Yêu Cầu mới',
        slug: 'cach-tao-phieu-yeu-cau-moi',
        category: 'Tickets',
        subcategory: 'Cơ bản',
        summary: 'Hướng dẫn từng bước cách tạo và gửi phiếu yêu cầu hỗ trợ trong hệ thống',
        content: `
            <h2>Tổng quan</h2>
            <p>Phiếu yêu cầu (Ticket) là công cụ chính để báo cáo sự cố, yêu cầu hỗ trợ hoặc đề xuất cải tiến trong hệ thống QLCV Y Khoa.</p>
            
            <h2>Hướng dẫn từng bước</h2>
            <h3>Bước 1: Truy cập trang tạo Ticket</h3>
            <p>Từ menu bên trái, chọn <strong>Phiếu yêu cầu</strong>, sau đó nhấn nút <strong>"Tạo Ticket mới"</strong> ở góc trên bên phải.</p>
            
            <h3>Bước 2: Điền thông tin cơ bản</h3>
            <ul>
                <li><strong>Tiêu đề:</strong> Tóm tắt ngắn gọn vấn đề (tối đa 100 ký tự)</li>
                <li><strong>Loại sự cố:</strong> Chọn loại phù hợp (Kỹ thuật, Quy trình, Khác)</li>
                <li><strong>Mức độ ưu tiên:</strong> Đánh giá mức độ khẩn cấp
                    <ul>
                        <li>Critical: Hệ thống ngừng hoạt động</li>
                        <li>High: Ảnh hưởng nghiêm trọng đến công việc</li>
                        <li>Medium: Gây bất tiện nhưng có thể làm việc</li>
                        <li>Low: Cải tiến, đề xuất</li>
                    </ul>
                </li>
            </ul>
            
            <h3>Bước 3: Mô tả chi tiết</h3>
            <p>Trong phần mô tả, hãy cung cấp thông tin đầy đủ:</p>
            <ul>
                <li>Mô tả vấn đề gặp phải</li>
                <li>Các bước để tái hiện lỗi</li>
                <li>Kết quả mong muốn</li>
                <li>Ảnh hưởng đến công việc</li>
            </ul>
            
            <h3>Bước 4: Đính kèm file (tùy chọn)</h3>
            <p>Nếu có screenshot hoặc tài liệu liên quan, hãy đính kèm để hỗ trợ xử lý nhanh hơn.</p>
            
            <h3>Bước 5: Gửi Ticket</h3>
            <p>Kiểm tra lại thông tin và nhấn nút <strong>"Gửi Ticket"</strong>. Bạn sẽ nhận được email xác nhận và số Ticket để theo dõi.</p>
            
            <h2>Các thực hành tốt nhất</h2>
            <ul>
                <li>Tiêu đề rõ ràng, ngắn gọn</li>
                <li>Mô tả chi tiết, có cấu trúc</li>
                <li>Đánh giá mức độ ưu tiên chính xác</li>
                <li>Đính kèm screenshot nếu có thể</li>
                <li>Theo dõi và cập nhật thông tin khi được yêu cầu</li>
            </ul>
            
            <h2>Xử lý sự cố</h2>
            <p><strong>Không thể gửi Ticket:</strong> Kiểm tra kết nối mạng hoặc liên hệ IT Helpdesk.</p>
            <p><strong>Không nhận được email xác nhận:</strong> Kiểm tra thư mục spam hoặc xác nhận email trong hồ sơ.</p>
        `,
        tags: ['ticket', 'create', 'guide'],
        readTimeMinutes: 5,
        viewCount: 1247,
        helpfulCount: 234,
        notHelpfulCount: 12,
        updatedAt: '2026-03-25',
        relatedArticles: ['art_002', 'art_003'],
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 'art_002',
        title: 'Hiểu về Trạng thái Ticket',
        slug: 'hieu-ve-trang-thai-ticket',
        category: 'Tickets',
        subcategory: 'Cơ bản',
        summary: 'Giải thích các trạng thái khác nhau của ticket và ý nghĩa của chúng',
        content: `
            <h2>Tổng quan</h2>
            <p>Mỗi ticket trong hệ thống đi qua nhiều trạng thái khác nhau từ lúc tạo đến khi hoàn thành.</p>
            
            <h2>Các trạng thái Ticket</h2>
            
            <h3>NEW - Mới tạo</h3>
            <p>Ticket vừa được tạo và đang chờ được phân công cho nhân viên xử lý.</p>
            
            <h3>ASSIGNED - Đã phân công</h3>
            <p>Ticket đã được giao cho nhân viên IT nhưng chưa bắt đầu xử lý.</p>
            
            <h3>IN_PROGRESS - Đang xử lý</h3>
            <p>Nhân viên IT đang tích cực giải quyết vấn đề.</p>
            
            <h3>WAITING_USER - Chờ thông tin từ người dùng</h3>
            <p>Cần thêm thông tin hoặc xác nhận từ người tạo ticket.</p>
            
            <h3>RESOLVED - Đã giải quyết</h3>
            <p>Vấn đề đã được xử lý, chờ người dùng xác nhận.</p>
            
            <h3>CLOSED - Đã đóng</h3>
            <p>Ticket đã hoàn tất và được đóng.</p>
            
            <h3>REJECTED - Từ chối</h3>
            <p>Ticket không hợp lệ hoặc nằm ngoài phạm vi hỗ trợ.</p>
            
            <h2>Chuyển đổi trạng thái</h2>
            <p>Dòng chảy trạng thái tiêu chuẩn:</p>
            <p><strong>NEW → ASSIGNED → IN_PROGRESS → RESOLVED → CLOSED</strong></p>
        `,
        tags: ['ticket', 'status', 'workflow'],
        readTimeMinutes: 3,
        viewCount: 892,
        helpfulCount: 178,
        notHelpfulCount: 8,
        updatedAt: '2026-03-24',
        relatedArticles: ['art_001', 'art_004'],
        videoUrl: null
    },
    {
        id: 'art_003',
        title: 'Theo dõi SLA của Ticket',
        slug: 'theo-doi-sla-cua-ticket',
        category: 'Tickets',
        subcategory: 'Nâng cao',
        summary: 'Hiểu cách theo dõi và quản lý SLA (Service Level Agreement) cho các ticket',
        content: `
            <h2>SLA là gì?</h2>
            <p>SLA (Service Level Agreement) là cam kết về thời gian giải quyết ticket dựa trên mức độ ưu tiên.</p>
            
            <h2>Thời gian SLA theo mức độ</h2>
            <ul>
                <li><strong>Critical:</strong> 2 giờ</li>
                <li><strong>High:</strong> 4 giờ</li>
                <li><strong>Medium:</strong> 8 giờ</li>
                <li><strong>Low:</strong> 24 giờ</li>
            </ul>
            
            <h2>Màu sắc cảnh báo SLA</h2>
            <ul>
                <li><strong style="color: #10b981;">Xanh lá:</strong> Còn hơn 50% thời gian</li>
                <li><strong style="color: #f59e0b;">Vàng:</strong> Còn 25-50% thời gian</li>
                <li><strong style="color: #ef4444;">Đỏ:</strong> Còn dưới 25% thời gian</li>
                <li><strong style="color: #dc2626;">Đỏ đậm + Chớp:</strong> Đã vi phạm SLA</li>
            </ul>
            
            <h2>Theo dõi SLA</h2>
            <p>Trên danh sách ticket và trang chi tiết, bạn sẽ thấy thanh tiến trình SLA với màu sắc tương ứng.</p>
            <p>Hệ thống cũng gửi thông báo khi ticket sắp vi phạm SLA.</p>
            
            <h2>Ảnh hưởng của vi phạm SLA</h2>
            <p>Vi phạm SLA ảnh hưởng đến:</p>
            <ul>
                <li>Đánh giá hiệu suất cá nhân</li>
                <li>Chất lượng dịch vụ tổng thể</li>
                <li>Mức độ hài lòng của người dùng</li>
            </ul>
        `,
        tags: ['sla', 'ticket', 'priority'],
        readTimeMinutes: 4,
        viewCount: 567,
        helpfulCount: 123,
        notHelpfulCount: 5,
        updatedAt: '2026-03-23',
        relatedArticles: ['art_001', 'art_002'],
        videoUrl: null
    },
    {
        id: 'art_004',
        title: 'Làm việc với Task được phân công',
        slug: 'lam-viec-voi-task-duoc-phan-cong',
        category: 'Tasks',
        subcategory: 'Cơ bản',
        summary: 'Hướng dẫn cách nhận, cập nhật và hoàn thành các task được phân công',
        content: `
            <h2>Nhận Task</h2>
            <p>Task có thể đến với bạn theo 2 cách:</p>
            <ul>
                <li>Được phân công trực tiếp bởi quản lý</li>
                <li>Tự nhận từ Công việc chờ nhận (Task Pool)</li>
            </ul>
            
            <h2>Cập nhật tiến độ</h2>
            <h3>Cách 1: Thanh Progress</h3>
            <p>Kéo thanh tiến độ để cập nhật % hoàn thành (0-100%).</p>
            
            <h3>Cách 2: Danh sách Subtasks</h3>
            <p>Tick vào checkbox của các công việc con đã hoàn thành. Hệ thống tự động tính % hoàn thành.</p>
            
            <h3>Ghi nhận thời gian</h3>
            <p>Sử dụng Time Log để ghi nhận thời gian làm việc thực tế.</p>
            
            <h2>Hoàn thành Task</h2>
            <ol>
                <li>Đảm bảo tiến độ = 100%</li>
                <li>Viết ghi chú tổng kết</li>
                <li>Nhấn "Hoàn thành Task"</li>
                <li>Nếu cần phê duyệt, task chuyển sang trạng thái PENDING_APPROVAL</li>
            </ol>
            
            <h2>Các trường hợp đặc biệt</h2>
            <p><strong>Task bị Block:</strong> Báo ngay cho quản lý với lý do cụ thể.</p>
            <p><strong>Không đủ thông tin:</strong> Yêu cầu làm rõ trong phần Comments.</p>
            <p><strong>Vượt quá khả năng:</strong> Thảo luận với quản lý sớm nhất có thể.</p>
        `,
        tags: ['task', 'assigned', 'progress'],
        readTimeMinutes: 6,
        viewCount: 1453,
        helpfulCount: 289,
        notHelpfulCount: 15,
        updatedAt: '2026-03-26',
        relatedArticles: ['art_005', 'art_006'],
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 'art_005',
        title: 'Sử dụng Task Pool hiệu quả',
        slug: 'su-dung-task-pool-hieu-qua',
        category: 'Tasks',
        subcategory: 'Nâng cao',
        summary: 'Cách chọn và nhận task từ Task Pool phù hợp với kỹ năng của bạn',
        content: `
            <h2>Task Pool là gì?</h2>
            <p>Task Pool là nơi tập trung các task chưa được phân công cụ thể. Nhân viên có thể chủ động chọn task phù hợp với kỹ năng và khả năng của mình.</p>
            
            <h2>Lợi ích</h2>
            <ul>
                <li>Tự chủ trong việc chọn công việc</li>
                <li>Cải thiện kỹ năng quản lý thời gian</li>
                <li>Tăng động lực làm việc</li>
                <li>Phát triển kỹ năng mới</li>
            </ul>
            
            <h2>Cách chọn Task phù hợp</h2>
            <h3>1. Sử dụng bộ lọc</h3>
            <ul>
                <li>Lọc theo kỹ năng yêu cầu</li>
                <li>Lọc theo mức độ ưu tiên</li>
                <li>Lọc theo thời gian ước tính</li>
                <li>Lọc theo deadline</li>
            </ul>
            
            <h3>2. Đánh giá task trước khi nhận</h3>
            <ul>
                <li>Xem chi tiết yêu cầu</li>
                <li>Kiểm tra thời gian ước tính</li>
                <li>Đánh giá khả năng hoàn thành đúng hạn</li>
                <li>Xem xét workload hiện tại</li>
            </ul>
            
            <h2>Best Practices</h2>
            <ul>
                <li>Không nhận quá nhiều task cùng lúc</li>
                <li>Ưu tiên task có deadline gần</li>
                <li>Chọn task phù hợp với kỹ năng</li>
                <li>Cân nhắc thời gian cần để hoàn thành</li>
                <li>Cập nhật tiến độ thường xuyên</li>
            </ul>
            
            <h2>Quy tắc chung</h2>
            <p><strong>First Come, First Served:</strong> Task được lấy bởi người đầu tiên nhấn "Nhận việc".</p>
            <p><strong>Trách nhiệm:</strong> Khi đã nhận task, bạn có trách nhiệm hoàn thành đúng hạn.</p>
        `,
        tags: ['task-pool', 'self-assignment', 'skills'],
        readTimeMinutes: 5,
        viewCount: 734,
        helpfulCount: 156,
        notHelpfulCount: 9,
        updatedAt: '2026-03-25',
        relatedArticles: ['art_004', 'art_006'],
        videoUrl: null
    },
    {
        id: 'art_006',
        title: 'Quy trình Phê duyệt Task',
        slug: 'quy-trinh-phe-duyet-task',
        category: 'Approvals',
        subcategory: 'Quy trình',
        summary: 'Hiểu về quy trình phê duyệt và cách xử lý task cần phê duyệt',
        content: `
            <h2>Khi nào cần Phê duyệt?</h2>
            <p>Một số loại task yêu cầu phê duyệt từ quản lý trước khi có thể đóng:</p>
            <ul>
                <li>Task có mức độ ưu tiên High hoặc Critical</li>
                <li>Task ảnh hưởng đến nhiều phòng ban</li>
                <li>Task liên quan đến chi phí</li>
                <li>Task theo quy trình đặc biệt</li>
            </ul>
            
            <h2>Quy trình</h2>
            <h3>1. Nhân viên hoàn thành task</h3>
            <p>Khi hoàn thành task và nhấn "Hoàn thành", nếu task cần phê duyệt, trạng thái chuyển sang PENDING_APPROVAL.</p>
            
            <h3>2. Quản lý nhận thông báo</h3>
            <p>Quản lý được thông báo qua email và trong hệ thống.</p>
            
            <h3>3. Quản lý xem xét và phản hồi</h3>
            <p>Quản lý có 3 lựa chọn:</p>
            <ul>
                <li><strong>Phê duyệt:</strong> Task chuyển sang COMPLETED</li>
                <li><strong>Yêu cầu chỉnh sửa:</strong> Task trả về IN_PROGRESS với ghi chú cần sửa</li>
                <li><strong>Từ chối:</strong> Task chuyển sang REJECTED với lý do</li>
            </ul>
            
            <h2>Xử lý khi bị yêu cầu chỉnh sửa</h2>
            <ol>
                <li>Đọc kỹ ghi chú từ quản lý</li>
                <li>Thực hiện chỉnh sửa theo yêu cầu</li>
                <li>Cập nhật ghi chú về những gì đã sửa</li>
                <li>Gửi lại để phê duyệt</li>
            </ol>
            
            <h2>Thời gian phê duyệt</h2>
            <p>Thông thường, quản lý sẽ xem xét và phản hồi trong vòng:</p>
            <ul>
                <li><strong>Critical/High:</strong> Trong vòng 2 giờ</li>
                <li><strong>Medium:</strong> Trong vòng 1 ngày</li>
                <li><strong>Low:</strong> Trong vòng 2 ngày</li>
            </ul>
        `,
        tags: ['approval', 'workflow', 'manager'],
        readTimeMinutes: 4,
        viewCount: 623,
        helpfulCount: 134,
        notHelpfulCount: 7,
        updatedAt: '2026-03-24',
        relatedArticles: ['art_004', 'art_005'],
        videoUrl: null
    }
];

const mockVideos = [
    {
        id: 'vid_001',
        title: 'Hướng dẫn Bắt đầu với QLCV',
        description: 'Video giới thiệu tổng quan về hệ thống và cách sử dụng cơ bản',
        category: 'Getting Started',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnailUrl: 'https://via.placeholder.com/320x180/3b82f6/ffffff?text=Getting+Started',
        durationSeconds: 323,
        publishedAt: '2026-03-20',
        viewCount: 1543,
        relatedArticles: []
    },
    {
        id: 'vid_002',
        title: 'Cách tạo Ticket',
        description: 'Hướng dẫn chi tiết cách tạo và gửi ticket yêu cầu hỗ trợ',
        category: 'Tickets',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnailUrl: 'https://via.placeholder.com/320x180/10b981/ffffff?text=Create+Ticket',
        durationSeconds: 225,
        publishedAt: '2026-03-21',
        viewCount: 987,
        relatedArticles: ['art_001']
    },
    {
        id: 'vid_003',
        title: 'Làm việc với Task Pool',
        description: 'Tìm hiểu cách sử dụng Task Pool và chọn task phù hợp',
        category: 'Tasks',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnailUrl: 'https://via.placeholder.com/320x180/f59e0b/ffffff?text=Task+Pool',
        durationSeconds: 252,
        publishedAt: '2026-03-22',
        viewCount: 756,
        relatedArticles: ['art_005']
    },
    {
        id: 'vid_004',
        title: 'Quản lý SLA',
        description: 'Hiểu và theo dõi SLA của các ticket',
        category: 'Tickets',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnailUrl: 'https://via.placeholder.com/320x180/ef4444/ffffff?text=SLA+Management',
        durationSeconds: 187,
        publishedAt: '2026-03-23',
        viewCount: 634,
        relatedArticles: ['art_003']
    }
];

const mockFAQs = [
    {
        id: 'faq_001',
        category: 'Account',
        question: 'Làm thế nào để đổi mật khẩu?',
        answer: 'Vào **Cài đặt > Bảo mật**, chọn "Đổi mật khẩu", nhập mật khẩu cũ và mật khẩu mới (tối thiểu 8 ký tự, có chữ hoa, số và ký tự đặc biệt).',
        relatedArticleId: null,
        order: 1,
        viewCount: 234,
        helpfulCount: 198
    },
    {
        id: 'faq_002',
        category: 'Account',
        question: 'Tôi quên mật khẩu, phải làm sao?',
        answer: 'Tại trang đăng nhập, nhấn "Quên mật khẩu?", nhập email đăng ký, kiểm tra email để nhận link reset mật khẩu. Hoặc liên hệ IT Helpdesk: support@hospital.vn hoặc ext. 1234.',
        relatedArticleId: null,
        order: 2,
        viewCount: 456,
        helpfulCount: 398
    },
    {
        id: 'faq_003',
        category: 'Tickets',
        question: 'SLA là gì và tại sao quan trọng?',
        answer: 'SLA (Service Level Agreement) là cam kết về thời gian giải quyết công việc. Mỗi mức độ ưu tiên có thời hạn SLA khác nhau: **Critical:** 2 giờ, **High:** 4 giờ, **Medium:** 8 giờ, **Low:** 24 giờ. Vi phạm SLA ảnh hưởng đến đánh giá hiệu suất.',
        relatedArticleId: 'art_003',
        order: 3,
        viewCount: 789,
        helpfulCount: 654
    },
    {
        id: 'faq_004',
        category: 'Tickets',
        question: 'Tôi có thể hủy ticket đã tạo không?',
        answer: 'Bạn không thể tự hủy ticket. Nếu cần hủy, hãy comment vào ticket với lý do và yêu cầu quản lý đóng ticket.',
        relatedArticleId: null,
        order: 4,
        viewCount: 345,
        helpfulCount: 289
    },
    {
        id: 'faq_005',
        category: 'Tasks',
        question: 'Làm thế nào để thay đổi người xử lý task?',
        answer: 'Chỉ có Quản lý mới có quyền chuyển giao task. Quản lý vào chi tiết task, nhấn "Reassign", chọn người xử lý mới, nhập lý do. Hệ thống sẽ thông báo cho cả hai bên.',
        relatedArticleId: null,
        order: 5,
        viewCount: 567,
        helpfulCount: 478
    },
    {
        id: 'faq_006',
        category: 'Tasks',
        question: 'Tôi không thể hoàn thành task đúng deadline, phải làm gì?',
        answer: 'Càng sớm càng tốt, hãy thông báo cho quản lý qua comment trong task hoặc email. Giải thích lý do và đề xuất deadline mới hợp lý.',
        relatedArticleId: null,
        order: 6,
        viewCount: 432,
        helpfulCount: 387
    },
    {
        id: 'faq_007',
        category: 'Troubleshooting',
        question: 'Tại sao tôi không nhận được thông báo email?',
        answer: 'Kiểm tra: 1) Email trong hồ sơ đúng chưa, 2) Thư mục spam, 3) Cài đặt thông báo trong Cài đặt > Thông báo, 4) Whitelist địa chỉ noreply@qlcv.hospital.vn',
        relatedArticleId: null,
        order: 7,
        viewCount: 298,
        helpfulCount: 245
    },
    {
        id: 'faq_008',
        category: 'Troubleshooting',
        question: 'Hệ thống chạy chậm, tôi nên làm gì?',
        answer: 'Thử: 1) Refresh trang (F5), 2) Xóa cache trình duyệt, 3) Đóng các tab không dùng, 4) Kiểm tra kết nối mạng, 5) Nếu vẫn chậm, báo cáo IT với screenshot và mô tả.',
        relatedArticleId: null,
        order: 8,
        viewCount: 412,
        helpfulCount: 356
    },
    {
        id: 'faq_009',
        category: 'Account',
        question: 'Làm thế nào để cập nhật thông tin cá nhân?',
        answer: 'Vào **Cài đặt > Hồ sơ**, cập nhật các thông tin cần thiết như tên, email, số điện thoại. Nhấn "Lưu thay đổi" để hoàn tất.',
        relatedArticleId: null,
        order: 9,
        viewCount: 178,
        helpfulCount: 156
    },
    {
        id: 'faq_010',
        category: 'Troubleshooting',
        question: 'Tính năng X không hoạt động, tôi phải làm gì?',
        answer: 'Kiểm tra quyền truy cập của bạn trong phần settings. Nếu vẫn không được, tạo ticket hỗ trợ với mô tả chi tiết lỗi và screenshot.',
        relatedArticleId: null,
        order: 10,
        viewCount: 291,
        helpfulCount: 234
    }
];
