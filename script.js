// Cấu hình Passcode
const SECRET_PASS = "CT011002"; 

// Biến âm thanh
let beepSound, themeSound;

document.addEventListener('DOMContentLoaded', () => {
    beepSound = document.getElementById('sound-beep');
    themeSound = document.getElementById('sound-theme');
    
    // Xử lý sự kiện nhấn Enter khi nhập pass
    document.getElementById('pass-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            checkPass();
        }
    });
});

// --- BƯỚC 1: KIỂM TRA PASSWORD ---
function checkPass() {
    const inputVal = document.getElementById('pass-input').value;
    const errorMsg = document.getElementById('error-msg');
    const passScreen = document.getElementById('password-screen');
    const startOverlay = document.getElementById('start-overlay');

    if (inputVal === SECRET_PASS) {
        // Pass đúng -> Ẩn màn hình pass, hiện màn hình Start
        passScreen.style.display = 'none';
        startOverlay.style.display = 'flex';
        
        // Gán sự kiện click cho màn hình Start
        startOverlay.addEventListener('click', startSequence);
    } else {
        // Pass sai
        errorMsg.style.display = 'block';
        // Hiệu ứng rung lắc nhẹ
        passScreen.querySelector('.pass-box').animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
        ], { duration: 300 });
    }
}

// --- BƯỚC 2: BẮT ĐẦU CHUỖI SỰ KIỆN ---
function startSequence() {
    const startOverlay = document.getElementById('start-overlay');
    const countdownScreen = document.getElementById('countdown-screen');
    
    // Ẩn nút start, hiện màn đếm ngược
    startOverlay.style.display = 'none';
    countdownScreen.style.display = 'flex';

    // Bật nhạc nền nhẹ
    themeSound.volume = 0.5;
    themeSound.play().catch(e => console.log("Chưa tương tác user"));

    runCountdown();
}

// --- BƯỚC 3: LOGIC ĐẾM NGƯỢC + VÒNG TRÒN ---
function runCountdown() {
    let count = 5;
    const numberEl = document.getElementById('countdown-number');
    const circleEl = document.querySelector('.circle-run');
    
    // Hàm chạy mỗi giây
    const tick = () => {
        // Cập nhật số
        numberEl.textContent = count;
        
        // Reset animation vòng tròn (để nó chạy lại từ đầu mỗi giây)
        circleEl.classList.remove('animate-circle');
        void circleEl.offsetWidth; // Trigger reflow (hack để reset animation CSS)
        circleEl.classList.add('animate-circle');

        // Phát tiếng beep
        beepSound.currentTime = 0;
        beepSound.play();

        count--;

        if (count < 0) {
            clearInterval(timer);
            finishCountdown();
        }
    };

    // Chạy ngay nhịp đầu tiên
    tick();
    
    // Lặp lại mỗi 1 giây
    const timer = setInterval(tick, 1000);
}

// --- BƯỚC 4: KẾT THÚC ĐẾM NGƯỢC -> HIỆN CONTENT ---
function finishCountdown() {
    const countdownScreen = document.getElementById('countdown-screen');
    const contentScreen = document.getElementById('content-screen');
    const video = document.getElementById('main-video');

    countdownScreen.style.display = 'none';
    contentScreen.style.display = 'flex'; // Hiện khung video

    // Tắt nhạc nền đếm ngược (nếu muốn), hoặc để nó chạy tiếp
    themeSound.pause(); 

    // Phát video
    video.play();
    video.volume = 1.0;
}
