const SECRET_PASS = "MA080103"; 
let nhacMaSound, beepSound, rasenSound, phanthanSound, cuoiSound;
// Biến lưu trạng thái để xử lý click chuyển nhanh
let currentStage = 'IDLE'; 
let currentTimeout = null;
let currentInterval = null;

// --- CẤU HÌNH NỘI DUNG VÀ THỜI GIAN (time: mili-giây) ---
const messageLines = [
    { 
        text: "<span class='date-highlight'>- 08/01/2026 -</span>", 
        time: 2000 
    },
    { 
        text: "Dù không được đúng ngày cho lắm, nhưng coi như là quà sinh nhật muộn nhe. Thì là, hãy xem đây là 1 món quà tinh thần, của 1 ai đó trên thế giới này, not me !", 
        time: 5000 
    },
    { 
        text: "Thật ra, đó giờ cũng nhận được nhiều món quà ý nghĩa của bạn Minh Em, mà thật sự chưa có dịp để có gì đó tặng bạn. Tài hèn sức mọn bạn coi cho zui, cũng mong là", 
        time: 8000 
    },
    { 
        text: "Dù có chuyện gì đi nữa, sau tất cả, đến thời điểm hiện tại, bạn hãy thật vui vẻ và hạnh phúc nhé ! Vì những điều đã trải qua, vì khi đọc những dòng này, bạn vẫn có thể mỉm cười, có thể khóc, có thể ở bên những người mình yêu quý và chia sẻ những cảm xúc ấy !", 
        time: 10000 
    },
    { 
        text: "Có thể là ngày mai, 1 tháng, 1 năm, 10 năm hay 20 năm nữa, tất cả chúng ta sẽ còn ở bên nhau, có thể không, có thể sẽ quên đi nhau theo dòng thời gian, nhưng với mình, những điều chúng ta đã từng, những kỷ niệm đó sẽ không bị lãng quên và sẽ mãi ở 1 góc của não bộ. (gì chứ tui say đắm trong quá khứ lắm, vui buồn gì cũng nhớ)", 
        time: 15000 
    },
    { 
        text: "Nếu sau này không ai chúc mừng sinh nhật bạn nữa, thề với bạn là sẽ luôn có 1 người ghi nhớ điều đó, chỉ cần . 1 cái là sẽ có lời chúc tới ngay và luôn ! (thặc ra là nhớ hết, tại tùy hoàn cảnh có chúc được hay ko thoai)", 
        time: 8000 
    },
    { 
        text: "Nãy giờ nói cũng hơi nhiều, nhưng chúc thì cũng như mọi lần. Cầu mong cho bạn luôn được bình an và khỏe mạnh (à thì sức khỏe thôi chứ tiền tài học hành tự thân lo nhóe, ngắn gọn cho nó linh)", 
        time: 6000 
    },
    { 
        text: "Bonus: thật ra tụi mình ko có hình nào đẹp hết, nên mò trên trang cá nhân mới có hình", 
        time: 5000 
    },
    { 
        text: "<span class='highlight-hpbd'>Hết rồi đó. SINH NHỰT ZUI ZẺ NHE <3</span>", 
        time: 4000 
    },
    { 
        text: "<span class='highlight-sign'>maxinhdep</span>", 
        time: 3000 
    }
];

document.addEventListener('DOMContentLoaded', () => {
    nhacMaSound = document.getElementById('sound-nhacma');
    beepSound = document.getElementById('sound-beep');
    rasenSound = document.getElementById('sound-rasen');
    phanthanSound = document.getElementById('sound-phanthan');
    cuoiSound = document.getElementById('sound-cuoi');

    // --- Load nội dung ghi chú đã lưu ---
    const savedNote = localStorage.getItem('userBirthdayNote');
    const noteArea = document.getElementById('persistent-note');
    if (savedNote) {
        noteArea.value = savedNote;
    }
    noteArea.addEventListener('input', function() {
        localStorage.setItem('userBirthdayNote', this.value);
    });

    document.getElementById('pass-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPass();
    });
});

function checkPass() {
    const inputVal = document.getElementById('pass-input').value;
    if (inputVal === SECRET_PASS) {
        document.getElementById('password-screen').style.display = 'none';
        
        const startOverlay = document.getElementById('start-overlay');
        const warningBox = document.getElementById('warning-box');
        const clickMsg = document.getElementById('click-msg');
        
        startOverlay.style.display = 'flex';
        nhacMaSound.volume = 0.8;
        nhacMaSound.play().catch(() => console.log("Audio interact needed"));

        // Hiện cảnh báo 8s
        currentTimeout = setTimeout(() => {
            warningBox.style.display = 'none'; 
            clickMsg.style.display = 'block';  
        }, 8000); 

        // Click để bắt đầu (và bỏ qua 8s nếu chưa hết)
        startOverlay.addEventListener('click', () => {
            clearTimeout(currentTimeout); // Dừng chờ 8s
            startOverlay.style.display = 'none';
            runCountdown();
        });
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}

function runCountdown() {
    currentStage = 'COUNTDOWN';
    const countdownScreen = document.getElementById('countdown-screen');
    const numberEl = document.getElementById('countdown-number');
    const circleEl = document.getElementById('circle-effect');
    countdownScreen.style.display = 'flex';
    let count = 5;

    // --- MỚI: Click để tua nhanh countdown ---
    const skipCountdown = () => {
        if (currentStage === 'COUNTDOWN') {
            count = 0; // Đưa về 0 để hàm runTick xử lý chuyển cảnh
        }
    };
    countdownScreen.addEventListener('click', skipCountdown);

    const runTick = () => {
        numberEl.textContent = count;
        circleEl.classList.remove('animate-reverse');
        void circleEl.offsetWidth; 
        setTimeout(() => { circleEl.classList.add('animate-reverse'); }, 10);
        
        if (count > 0) { // Chỉ kêu beep nếu chưa hết
            beepSound.currentTime = 0;
            beepSound.play();
        }

        if (count === 0) {
            countdownScreen.removeEventListener('click', skipCountdown);
            setTimeout(runKageSequence, 500); // Giảm delay chút cho mượt
            return;
        }
        count--;
        currentTimeout = setTimeout(runTick, 1000);
    };
    runTick();
}

function runKageSequence() {
    document.getElementById('countdown-screen').style.display = 'none';
    const kageScreen = document.getElementById('kage-screen');
    kageScreen.style.display = 'flex';
    phanthanSound.currentTime = 0;
    phanthanSound.play();
    phanthanSound.onended = function() {
        kageScreen.style.display = 'none';
        runGifSequence(); 
    };
}

function runGifSequence() {
    currentStage = 'GIF1';
    const gif1Screen = document.getElementById('gif-screen');
    const videoEl = gif1Screen.querySelector('video');
    gif1Screen.style.display = 'flex';
    if(videoEl) { videoEl.currentTime = 0; videoEl.play(); }
    rasenSound.currentTime = 5; 
    rasenSound.play();

    // Hàm chuyển cảnh
    const finishGif1 = () => {
        if (currentStage !== 'GIF1') return;
        currentStage = 'TRANSITION'; // Khóa để không gọi 2 lần
        clearTimeout(currentTimeout);
        
        rasenSound.pause();
        if(videoEl) videoEl.pause();
        
        const whiteFlash = document.getElementById('white-flash');
        whiteFlash.style.display = 'block';
        whiteFlash.style.opacity = '1';

        setTimeout(() => {
            gif1Screen.style.display = 'none'; 
            whiteFlash.style.opacity = '0';
            runGif2Sequence();
            setTimeout(() => { whiteFlash.style.display = 'none'; }, 1000);
        }, 500);
    };

    // --- MỚI: Click để chuyển nhanh ---
    gif1Screen.onclick = finishGif1;

    // Mặc định chạy 5s
    currentTimeout = setTimeout(finishGif1, 5000);
}

function runGif2Sequence() {
    currentStage = 'GIF2';
    const gif2Screen = document.getElementById('gif2-screen');
    const textEl = document.getElementById('mockery-text');
    const queEl = document.getElementById('que-text');
    
    gif2Screen.style.display = 'flex';
    cuoiSound.currentTime = 0; cuoiSound.play();

    textEl.textContent = "Lêu lêu, đồ chưa có bồ";
    textEl.style.display = 'block';
    
    // Hàm kết thúc GIF 2 chuyển sang nội dung chính
    const finishGif2 = () => {
        if (currentStage !== 'GIF2') return;
        currentStage = 'TRANSITION';
        clearTimeout(currentTimeout);
        clearInterval(currentInterval); // Xóa spam nếu đang chạy
        
        // Dọn dẹp DOM
        const spams = document.querySelectorAll('.spam-item');
        spams.forEach(el => el.remove());
        
        gif2Screen.style.display = 'none';
        cuoiSound.pause();
        showContentSequence();
    };

    // --- MỚI: Click để chuyển nhanh ---
    gif2Screen.onclick = finishGif2;

    // Logic cũ chạy tuần tự
    currentTimeout = setTimeout(() => {
        textEl.textContent = "làm gì có anh nào mét 8 đâu";
        currentTimeout = setTimeout(() => {
            textEl.style.display = 'none'; 
            let spamCount = 0;
            currentInterval = setInterval(() => {
                const spamItem = document.createElement('div');
                spamItem.classList.add('spam-item');
                spamItem.innerText = "lêu lêu";
                spamItem.style.left = Math.random() * 90 + "%";
                spamItem.style.top = Math.random() * 90 + "%";
                spamItem.style.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
                gif2Screen.appendChild(spamItem);
                spamCount++;
                if(spamCount > 30) clearInterval(currentInterval);
            }, 100);

            currentTimeout = setTimeout(() => {
                clearInterval(currentInterval);
                const spams = document.querySelectorAll('.spam-item');
                spams.forEach(el => el.remove());
                queEl.style.display = 'block';
                currentTimeout = setTimeout(finishGif2, 3000); // Đợi chữ Quê 3s rồi chuyển
            }, 3000); 
        }, 2000); 
    }, 2000);
}

// --- MÀN HÌNH CHÍNH ---
function showContentSequence() {
    const contentScreen = document.getElementById('content-screen');
    contentScreen.style.display = 'flex'; 

    const imgSection = document.querySelector('.image-section');
    const textSection = document.querySelector('.text-section');

    setTimeout(() => {
        imgSection.classList.add('fade-in-center');
        setTimeout(() => {
            imgSection.classList.add('move-left');
            textSection.classList.add('slide-in-right');
            setTimeout(() => {
                runTextAnimation();
            }, 1600); 
        }, 2500); 
    }, 2000); 
}

function runTextAnimation() {
    currentStage = 'TEXT_RUNNING';
    const container = document.getElementById('message-container');
    const contentScreen = document.getElementById('content-screen');
    let lineIndex = 0;

    // --- HÀM ĐÃ SỬA LỖI ---
    function showNextLine() {
        if (lineIndex < messageLines.length) {
            const currentLine = messageLines[lineIndex]; 
            
            const p = document.createElement('p');
            p.innerHTML = currentLine.text; 
            container.appendChild(p);
            
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });

            setTimeout(() => { p.classList.add('show-text'); }, 50);

            // SỬA: Tăng index NGAY LẬP TỨC để tránh click handler hiểu lầm
            lineIndex++;

            const readingTime = currentLine.time;

            if (lineIndex >= messageLines.length) {
                // Đã là dòng cuối (vừa in xong)
                startFireworks(); 
                currentTimeout = setTimeout(endSequence, readingTime); 
            } else {
                // Vẫn còn dòng tiếp theo
                currentTimeout = setTimeout(showNextLine, readingTime);
            }
        }
    }

    // --- Click để tua nhanh ---
    contentScreen.addEventListener('click', () => {
        if (currentStage === 'TEXT_RUNNING') {
            clearTimeout(currentTimeout);
            
            // Vì lineIndex đã được tăng ngay sau khi in dòng hiện tại
            // Nên nếu lineIndex >= length nghĩa là đã in hết rồi
            if (lineIndex >= messageLines.length) {
                 endSequence();
            } else {
                 showNextLine();
            }
        }
    });

    showNextLine();
}

function endSequence() {
    // Thêm check để đảm bảo chỉ chạy 1 lần
    if (currentStage === 'FINISHED') return;
    currentStage = 'FINISHED';

    const textSection = document.querySelector('.text-section');
    const imgSection = document.querySelector('.image-section');
    const noteContainer = document.getElementById('final-note-container');

    textSection.classList.add('fade-out');

    setTimeout(() => {
        imgSection.classList.remove('move-left'); 
        setTimeout(() => {
            noteContainer.style.display = 'block';
        }, 1500);
    }, 1500);
}

// --- PHÁO HOA ---
function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    
    function createParticle(x, y) {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: x, y: y,
                color: `hsl(${Math.random() * 360}, 100%, 70%)`,
                radius: Math.random() * 3 + 1,
                velocity: { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 },
                life: 150, alpha: 1
            });
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';

        particles.forEach((p, index) => {
            if (p.life > 0) {
                ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
                ctx.globalAlpha = 1; p.x += p.velocity.x; p.y += p.velocity.y;
                p.life--; p.alpha -= 0.01;
            } else { particles.splice(index, 1); }
        });
        
        if (Math.random() < 0.1) { 
            createParticle(Math.random() * canvas.width, Math.random() * canvas.height * 0.5); 
        }
    }
    animate();
    createParticle(canvas.width / 2, canvas.height / 3);
}
