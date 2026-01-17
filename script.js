const SECRET_PASS = "CT011002"; 
let nhacMaSound, beepSound, rasenSound, phanthanSound;

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

// --- 1. KAGE BUSHIN ---
function runKageSequence() {
    document.getElementById('countdown-screen').style.display = 'none';
    const kageScreen = document.getElementById('kage-screen');
    kageScreen.style.display = 'flex';

    phanthanSound.currentTime = 0;
    phanthanSound.play();

    setTimeout(() => {
        kageScreen.style.display = 'none';
        runGifSequence(); 
    }, 2500); 
}

// --- 2. VIDEO GIF RASEN ---
function runGifSequence() {
    const gif1Screen = document.getElementById('gif-screen');
    gif1Screen.style.display = 'flex';
    
    // TUA ĐẾN GIÂY THỨ 5
    rasenSound.currentTime = 5; 
    rasenSound.play();

    setTimeout(() => {
        gif1Screen.style.display = 'none'; 
        rasenSound.pause();
        runGif2Sequence(); 
    }, 5000); // Phát trong 5s (từ giây 5 đến giây 10 của bài nhạc)
}

// --- 3. GIF LÊU LÊU ---
function runGif2Sequence() {
    const gif2Screen = document.getElementById('gif2-screen');
    const textEl = document.getElementById('mockery-text');
    gif2Screen.style.display = 'flex';

    let count = 0;
    const maxCount = 3;

    function loopText() {
        if (count < maxCount) {
            textEl.style.display = 'block';
            setTimeout(() => {
                textEl.style.display = 'none'; 
                setTimeout(() => {
                    count++;
                    loopText(); 
                }, 500); 
            }, 2000); 
        } else {
            gif2Screen.style.display = 'none';
            showContentSequence(); 
        }
    }
    loopText();
}

// --- 4. MÀN HÌNH CHÍNH (LOGIC MỚI) ---
function showContentSequence() {
    const contentScreen = document.getElementById('content-screen');
    contentScreen.style.display = 'flex'; 

    const imgSection = document.querySelector('.image-section');
    const textSection = document.querySelector('.text-section');

    // BƯỚC 1: Hiện ảnh từ từ ở giữa (trong 2s)
    setTimeout(() => {
        imgSection.classList.add('fade-in-center');

        // BƯỚC 2: Sau khi hiện xong (2s) -> Trượt ảnh sang trái
        setTimeout(() => {
            imgSection.classList.add('move-left');
            
            // BƯỚC 3: Cùng lúc đó, chữ trượt từ phải vào
            textSection.classList.add('slide-in-right');

            // BƯỚC 4: Sau khi trượt xong (1.5s transition) -> Bắt đầu hiện chữ từng dòng
            setTimeout(() => {
                runTextAnimation();
            }, 1600); 

        }, 2500); 
    }, 100); // Delay nhỏ để trình duyệt render
}

function runTextAnimation() {
    const container = document.getElementById('message-container');
    let lineIndex = 0;

    function showNextLine() {
        if (lineIndex < messageLines.length) {
            const p = document.createElement('p');
            p.innerHTML = messageLines[lineIndex];
            container.appendChild(p);

            setTimeout(() => { p.classList.add('show-text'); }, 50);

            const plainText = p.innerText || p.textContent;
            let readingTime = 1000 + (plainText.length * 60);
            if (readingTime < 1500) readingTime = 1500;

            if (lineIndex === messageLines.length - 1) {
                // Dòng cuối
                startFireworks();
                setTimeout(() => {
                    endSequence();
                }, 2000); 
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
    
    // Mờ chữ
    textSection.classList.add('fade-out');

    setTimeout(() => {
        const imgSection = document.querySelector('.image-section');
        // Ảnh trượt về giữa
        imgSection.classList.remove('move-left');
    }, 2000);
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
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                radius: Math.random() * 3 + 1,
                velocity: { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 },
                life: 150, alpha: 1
            });
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            if (p.life > 0) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fill();
                ctx.globalAlpha = 1;
                p.x += p.velocity.x; p.y += p.velocity.y;
                p.life--; p.alpha -= 0.01;
            } else {
                particles.splice(index, 1);
            }
        });

        if (Math.random() < 0.1) {
            createParticle(Math.random() * canvas.width, Math.random() * canvas.height * 0.6);
        }
    }
    animate();
    createParticle(canvas.width / 2, canvas.height / 2);
}
