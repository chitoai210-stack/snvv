const SECRET_PASS = "CT011002"; 
let nhacMaSound, beepSound;

// Nội dung tin nhắn (Tách theo dòng xuống dòng trong yêu cầu của bạn)
const messageLines = [
    "<span class='date-highlight'>- 08/01/2026 -</span>",
    "Dù không được đúng ngày cho lắm, nhưng coi như là quà sinh nhật muộn nhe. Thì là, hãy xem đây là 1 món quà tinh thần, của 1 ai đó trên thế giới này, not me !",
    "Không biết ngày hôm nay của bạn như thế nào, sẽ có chuyện vui, chuyện buồn, tức dzận, hay chỉ là 1 ngày bình thường như bao ngày ? Có nhận được những lời chúc mừng từ những người mình yêu thương và trân trọng ?",
    "Dù có chuyện gì đi nữa, sau tất cả, đến thời điểm hiện tại, bạn hãy thật vui vẻ và hạnh phúc nhé ! Vì những điều đã trải qua, vì khi đọc những dòng này, bạn vẫn có thể mỉm cười, có thể khóc, có thể ở bên những người mình yêu quý và chia sẻ những cảm xúc ấy !",
    "Có thể là ngày mai, 1 tháng, 1 năm, 10 năm hay 20 năm nữa, tất cả chúng ta sẽ còn ở bên nhau, có thể không, có thể sẽ quên đi nhau theo dòng thời gian, nhưng với mình, những điều chúng ta đã từng, những kỷ niệm đó sẽ không bị lãng quên và sẽ mãi ở 1 góc của não bộ. (gì chứ tui say đắm trong quá khứ lắm, vui buồn gì cũng nhớ)",
    "Nếu sau này không ai chúc mừng sinh nhật bạn nữa, thề với bạn là sẽ luôn có 1 người ghi nhớ điều đó, chỉ cần . 1 cái là sẽ có lời chúc tới ngay và luôn ! (thặc ra là nhớ hết, tại tùy hoàn cảnh có chúc được hay ko thoai)",
    "Nãy giờ nói cũng hơi nhiều, nhưng chúc thì cũng như mọi lần. Cầu mong cho bạn luôn được bình an và khỏe mạnh (à thì sức khỏe thôi chứ tiền tài học hành tự thân lo nhóe, ngắn gọn cho nó linh)",
    "Bonus: thật ra tụi mình ko có hình nào đẹp hết, nên mò trên trang cá nhân mới có hình",
    "<span class='highlight-hpbd'>Hết rồi đó. SINH NHỰT ZUI ZẺ NHE <3</span>",
    "<span class='highlight-sign'>maxinhdep</span>"
];

document.addEventListener('DOMContentLoaded', () => {
    nhacMaSound = document.getElementById('sound-nhacma');
    beepSound = document.getElementById('sound-beep');

    document.getElementById('pass-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPass();
    });
});

function checkPass() {
    const inputVal = document.getElementById('pass-input').value;
    if (inputVal === SECRET_PASS) {
        document.getElementById('password-screen').style.display = 'none';
        const startOverlay = document.getElementById('start-overlay');
        startOverlay.style.display = 'flex';
        
        nhacMaSound.volume = 0.8;
        nhacMaSound.play().catch(() => console.log("Cần tương tác để phát nhạc"));

        startOverlay.addEventListener('click', () => {
            startOverlay.style.display = 'none';
            runCountdown();
        });
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}

function runCountdown() {
    const countdownScreen = document.getElementById('countdown-screen');
    const numberEl = document.getElementById('countdown-number');
    const circleEl = document.getElementById('circle-effect');
    
    countdownScreen.style.display = 'flex';
    let count = 5;

    const tick = () => {
        numberEl.textContent = count;
        
        // --- FIX: RESET ANIMATION CHO MỖI SỐ ---
        circleEl.classList.remove('animate-reverse');
        void circleEl.offsetWidth; // Trigger Reflow (Bắt buộc)
        circleEl.classList.add('animate-reverse');

        beepSound.currentTime = 0;
        beepSound.play();

        count--;
        
        if (count < 0) {
            clearInterval(timer);
            // Chờ 1s cho số 0 (hoặc số 1) chạy xong animation cuối
            setTimeout(showContentSequence, 1000); 
        }
    };

    tick(); // Chạy ngay lập tức
    const timer = setInterval(tick, 1000);
}

function showContentSequence() {
    document.getElementById('countdown-screen').style.display = 'none';
    const contentScreen = document.getElementById('content-screen');
    contentScreen.style.display = 'flex';

    // 1. Ảnh xuất hiện ở giữa (mặc định CSS đã set ở giữa)
    // Đợi 2 giây, rồi di chuyển ảnh sang trái
    setTimeout(() => {
        const img = document.getElementById('ma-img');
        img.classList.add('move-left');

        // Sau khi ảnh bắt đầu di chuyển 1 chút, bắt đầu hiện chữ
        setTimeout(() => {
            runTextAnimation();
        }, 1000); 
    }, 2000);
}

function runTextAnimation() {
    const container = document.getElementById('message-container');
    let lineIndex = 0;

    function showNextLine() {
        if (lineIndex < messageLines.length) {
            const p = document.createElement('p');
            p.innerHTML = messageLines[lineIndex]; // Dùng innerHTML để nhận thẻ span
            container.appendChild(p);

            // Timeout nhỏ để kích hoạt transition CSS
            setTimeout(() => {
                p.classList.add('show-text');
            }, 50);

            // Tự động cuộn xuống nếu văn bản dài
            container.scrollTop = container.scrollHeight;

            // Kiểm tra nếu là dòng cuối ("maxinhdep")
            if (lineIndex === messageLines.length - 1) {
                startFireworks(); // BẮN PHÁO HOA
            }

            lineIndex++;
            // Thời gian chờ giữa các dòng (đọc nhanh hay chậm chỉnh ở đây: 1500ms)
            setTimeout(showNextLine, 2000); 
        }
    }

    showNextLine();
}

// --- LOGIC PHÁO HOA (CANVAS) ---
function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function createParticle(x, y) {
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: x,
                y: y,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                radius: Math.random() * 4 + 1,
                velocity: {
                    x: (Math.random() - 0.5) * 6,
                    y: (Math.random() - 0.5) * 6
                },
                life: 100,
                alpha: 1
            });
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        // Tạo hiệu ứng mờ đuôi
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            if (p.life > 0) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fill();
                ctx.globalAlpha = 1;

                p.x += p.velocity.x;
                p.y += p.velocity.y;
                p.life--;
                p.alpha -= 0.01;
            } else {
                particles.splice(index, 1);
            }
        });

        // Tự động bắn ngẫu nhiên
        if (Math.random() < 0.05) {
            createParticle(Math.random() * canvas.width, Math.random() * canvas.height * 0.5);
        }
    }
    
    // Bắt đầu vòng lặp
    animate();
    
    // Bắn ngay 1 phát chào mừng
    createParticle(canvas.width / 2, canvas.height / 2);
}
