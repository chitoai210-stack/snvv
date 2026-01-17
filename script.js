const SECRET_PASS = "CT011002"; 
let nhacMaSound, beepSound, rasenSound, phanthanSound, cuoiSound;

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
    rasenSound = document.getElementById('sound-rasen');
    phanthanSound = document.getElementById('sound-phanthan');
    cuoiSound = document.getElementById('sound-cuoi');

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
        nhacMaSound.play().catch(() => console.log("Audio interact needed"));
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

    const runTick = () => {
        numberEl.textContent = count;
        circleEl.classList.remove('animate-reverse');
        void circleEl.offsetWidth; 
        setTimeout(() => { circleEl.classList.add('animate-reverse'); }, 10);
        beepSound.currentTime = 0;
        beepSound.play();
        if (count === 0) {
            setTimeout(runKageSequence, 1000);
            return;
        }
        count--;
        setTimeout(runTick, 1000);
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
    const gif1Screen = document.getElementById('gif-screen');
    const videoEl = gif1Screen.querySelector('video');
    gif1Screen.style.display = 'flex';
    if(videoEl) { videoEl.currentTime = 0; videoEl.play(); }
    rasenSound.currentTime = 5; 
    rasenSound.play();

    setTimeout(() => {
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
    }, 5000);
}

function runGif2Sequence() {
    const gif2Screen = document.getElementById('gif2-screen');
    const textEl = document.getElementById('mockery-text');
    const queEl = document.getElementById('que-text');
    
    gif2Screen.style.display = 'flex';
    cuoiSound.currentTime = 0; cuoiSound.play();

    textEl.textContent = "Lêu lêu, đồ chưa có bồ";
    textEl.style.display = 'block';

    setTimeout(() => {
        textEl.textContent = "làm gì có anh nào mét 8 đâu";
        setTimeout(() => {
            textEl.style.display = 'none'; 
            let spamCount = 0;
            let spamInterval = setInterval(() => {
                const spamItem = document.createElement('div');
                spamItem.classList.add('spam-item');
                spamItem.innerText = "lêu lêu";
                spamItem.style.left = Math.random() * 90 + "%";
                spamItem.style.top = Math.random() * 90 + "%";
                spamItem.style.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
                gif2Screen.appendChild(spamItem);
                spamCount++;
                if(spamCount > 30) clearInterval(spamInterval);
            }, 100);

            setTimeout(() => {
                clearInterval(spamInterval);
                const spams = document.querySelectorAll('.spam-item');
                spams.forEach(el => el.remove());
                queEl.style.display = 'block';
                setTimeout(() => {
                    queEl.style.display = 'none';
                    gif2Screen.style.display = 'none';
                    cuoiSound.pause();
                    showContentSequence();
                }, 3000);
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

    // 1. Chỉ hiện nền hoa trong 2 giây
    setTimeout(() => {
        // 2. Sau 2s, ảnh hiện dần ở giữa
        imgSection.classList.add('fade-in-center');

        // 3. Sau khi ảnh hiện xong -> Trượt sang trái
        setTimeout(() => {
            imgSection.classList.add('move-left');
            textSection.classList.add('slide-in-right');

            // 4. Bắt đầu hiện chữ
            setTimeout(() => {
                runTextAnimation();
            }, 1600); 
        }, 2500); 

    }, 2000); 
}

function runTextAnimation() {
    const container = document.getElementById('message-container');
    let lineIndex = 0;

    function showNextLine() {
        if (lineIndex < messageLines.length) {
            const p = document.createElement('p');
            p.innerHTML = messageLines[lineIndex];
            container.appendChild(p);
            
            // Auto Scroll
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });

            setTimeout(() => { p.classList.add('show-text'); }, 50);

            const plainText = p.innerText || p.textContent;
            let readingTime = 1000 + (plainText.length * 60);
            if (readingTime < 1500) readingTime = 1500;

            if (lineIndex === messageLines.length - 1) {
                // KHI DÒNG CUỐI XUẤT HIỆN:
                // 1. Bắn pháo hoa NGAY LẬP TỨC
                startFireworks(); 
                
                // 2. Đợi người dùng đọc xong dòng cuối (khoảng 3s) thì mới làm mờ chữ
                setTimeout(() => {
                    endSequence();
                }, readingTime + 1500); 
            } else {
                lineIndex++;
                setTimeout(showNextLine, readingTime);
            }
        }
    }
    showNextLine();
}

function endSequence() {
    const textSection = document.querySelector('.text-section');
    const imgSection = document.querySelector('.image-section');

    // 1. Mờ chữ trước
    textSection.classList.add('fade-out');

    // 2. Đợi một chút (1.5s) để chữ mờ đi, sau đó ảnh mới trượt về giữa
    // Điều này tạo hiệu ứng: Chữ biến mất -> Ảnh mới từ từ trôi về
    setTimeout(() => {
        imgSection.classList.remove('move-left'); 
    }, 1500);
}

// --- PHÁO HOA (ĐÃ SỬA LỖI MÀN HÌNH ĐEN) ---
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
                color: `hsl(${Math.random() * 360}, 100%, 70%)`, // Màu sáng hơn chút cho đẹp trên nền tối
                radius: Math.random() * 3 + 1,
                velocity: { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 },
                life: 150, alpha: 1
            });
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        
        // --- SỬA LỖI MÀN HÌNH ĐEN TẠI ĐÂY ---
        // Thay vì tô màu đen (fillRect), ta dùng destination-out để XÓA DẦN canvas,
        // làm lộ ra ảnh nền (background) phía dưới.
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Độ mờ của đuôi pháo hoa
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Trả lại chế độ vẽ bình thường đè lên
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
            // Bắn ngẫu nhiên ở khu vực phía trên để không che mặt trong ảnh
            createParticle(Math.random() * canvas.width, Math.random() * canvas.height * 0.5); 
        }
    }
    
    animate();
    // Bắn phát đầu tiên ngay tâm
    createParticle(canvas.width / 2, canvas.height / 3);
}
