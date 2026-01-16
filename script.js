const SECRET_PASS = "CT011002"; 
let nhacMaSound, beepSound;

document.addEventListener('DOMContentLoaded', () => {
    nhacMaSound = document.getElementById('sound-nhacma');
    beepSound = document.getElementById('sound-beep');

    // Sự kiện Enter cho input pass
    document.getElementById('pass-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') checkPass();
    });
});

function checkPass() {
    const inputVal = document.getElementById('pass-input').value;
    const errorMsg = document.getElementById('error-msg');
    
    if (inputVal === SECRET_PASS) {
        // 1. Ẩn màn hình Pass
        document.getElementById('password-screen').style.display = 'none';
        
        // 2. Hiện màn hình "Nhấp để bắt đầu"
        const startOverlay = document.getElementById('start-overlay');
        startOverlay.style.display = 'flex';
        
        // 3. PHÁT NHẠC "nhacma" NGAY LẬP TỨC
        // Lưu ý: Người dùng đã tương tác (click nút Unlock hoặc Enter), nên trình duyệt sẽ cho phép phát nhạc.
        nhacMaSound.volume = 0.8; 
        nhacMaSound.play().catch(e => console.log("Lỗi phát nhạc:", e));

        // Gán sự kiện click chuyển sang đếm ngược
        startOverlay.addEventListener('click', () => {
            startOverlay.style.display = 'none';
            runCountdown();
        });

    } else {
        errorMsg.style.display = 'block';
    }
}

function runCountdown() {
    const countdownScreen = document.getElementById('countdown-screen');
    const numberEl = document.getElementById('countdown-number');
    const circleEl = document.getElementById('circle-effect');
    
    countdownScreen.style.display = 'flex';

    let count = 5;

    // Hàm thực hiện 1 nhịp đếm
    const tick = () => {
        // Cập nhật số
        numberEl.textContent = count;
        
        // --- XỬ LÝ VÒNG TUA NGƯỢC ---
        // B1: Xóa class animation (nếu có)
        circleEl.classList.remove('animate-reverse');
        
        // B2: Force Reflow (Bắt buộc trình duyệt vẽ lại để nhận diện sự thay đổi)
        void circleEl.offsetWidth; 
        
        // B3: Thêm lại class để chạy animation từ đầu
        circleEl.classList.add('animate-reverse');

        // Âm thanh beep theo từng giây
        beepSound.currentTime = 0;
        beepSound.play();

        // Logic giảm số
        count--;
        
        if (count < 0) {
            clearInterval(timer);
            setTimeout(finishCountdown, 1000); // Đợi 1s cho vòng cuối chạy xong
        }
    };

    // Chạy nhịp đầu tiên ngay lập tức
    tick();

    // Lặp lại mỗi 1 giây
    const timer = setInterval(tick, 1000);
}

function finishCountdown() {
    const countdownScreen = document.getElementById('countdown-screen');
    const contentScreen = document.getElementById('content-screen');
    const video = document.getElementById('main-video');

    countdownScreen.style.display = 'none';
    contentScreen.style.display = 'flex';
    
    video.play();
}
