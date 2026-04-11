// Scroll function
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });

    // Update Active Icon
    document.querySelectorAll('.sidebar i').forEach(icon => {
        icon.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Add some basic scroll reveal animation
window.addEventListener('scroll', () => {
    let reveals = document.querySelectorAll('section');
    reveals.forEach(section => {
        let windowHeight = window.innerHeight;
        let revealTop = section.getBoundingClientRect().top;
        let revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }
    });
});

// Initial styling for animation
const grid = document.querySelector('.portfolio-grid');
const cards = document.querySelectorAll('.project-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            cards.forEach(c => c.classList.remove('active'));
            entry.target.classList.add('active');
        }
    });
}, {
    root: grid,
    // threshold ကို 0.7 ထားရင် အလယ်နား ရောက်တာနဲ့ ကြီးလာပါလိမ့်မယ်
    threshold: 0.7
});

cards.forEach(card => observer.observe(card));

// Page load ဖြစ်တာနဲ့ ဒုတိယမြောက် (အလယ်က) card ဆီကို scroll လုပ်ပေးဖို့
window.addEventListener('load', () => {
    const middleIndex = Math.floor(cards.length / 2);
    cards[middleIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
});
// Smooth Scrolling with Active Link Update
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });

    // Sidebar Active Link Update
    document.querySelectorAll('.sidebar i').forEach(icon => {
        icon.classList.remove('active');
    });
    event.target.classList.add('active');
}


// ၂။ Form Submission ကို JavaScript နဲ့ ကိုင်တွယ်ခြင်း (AJAX နည်းလမ်း)
const contactForm = document.getElementById('myContactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // Form Refresh မဖြစ်အောင် တားတာ

        const button = this.querySelector('.send-btn');
        const formData = new FormData(this);

        // Button ခလုတ်ကို ခဏ ပိတ်ထားမယ် (စာပို့နေတုန်းမှာ)
        button.innerText = "TRANSMITTING...";
        button.style.opacity = "0.5";
        button.disabled = true;

        try {
            // Formspree ဆီကို Data လှမ်းပို့တာ
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // စာပို့တာ အောင်မြင်ရင်
                alert('SUCCESS: Transmission received. I will contact you soon!');
                this.reset(); // Form ထဲက စာတွေကို ဖျက်လိုက်တာ
            } else {
                // တစ်ခုခု မှားယွင်းရင်
                alert('ERROR: Something went wrong. Please try again.');
            }
        } catch (error) {
            alert('CRITICAL ERROR: Connection failed.');
        } finally {
            // ခလုတ်ကို မူလအတိုင်း ပြန်ပြင်မယ်
            button.innerText = "TRANSMIT MESSAGE";
            button.style.opacity = "1";
            button.disabled = false;
        }
    });
}

// ၃။ Scroll လုပ်ရင် Active Sidebar Icon ကို အလိုအလျောက် ပြောင်းပေးတာ
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navIcons = document.querySelectorAll('.sidebar i');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navIcons.forEach(icon => {
        icon.classList.remove('active');
        // အကယ်၍ icon ရဲ့ onclick ထဲမှာ လက်ရှိ section id ပါရင် active ပေးမယ်
        if (icon.getAttribute('onclick') && icon.getAttribute('onclick').includes(current)) {
            icon.classList.add('active');
        }
    });
});

/* --- Optional: Scroll-based Active Link Update --- */
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navIcons = document.querySelectorAll('.sidebar i');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navIcons.forEach(icon => {
        icon.classList.remove('active');
        if (icon.getAttribute('onclick').includes(current)) {
            icon.classList.add('active');
        }
    });
});
$(document).ready(function () {
    // Education Slide Effect
    $('.education-card').on('click', function () {
        $(this).find('.edu-details').slideToggle(300);
        $(this).find('.arrow-icon').toggleClass('rotate');
        $(this).toggleClass('active-card');
    });

    // Contact Form AJAX
    $('#cyberContactForm').on('submit', function (e) {
        e.preventDefault();
        let $btn = $(this).find('button[type="submit"]');
        $btn.text("TRANSMITTING...").prop('disabled', true).css('opacity', '0.5');

        $.ajax({
            url: $(this).attr('action'),
            method: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function () {
                alert('Success! Transmission received.');
                $('#cyberContactForm')[0].reset();
            },
            error: function () {
                alert('Error! Something went wrong.');
            },
            complete: function () {
                $btn.text("TRANSMIT MESSAGE").prop('disabled', false).css('opacity', '1');
            }
        });
    });
});
$(document).ready(function () {
    $('.download-cv').on('click', function () {
        let $this = $(this);
        let originalText = $this.html();

        // ခလုတ်နှိပ်လိုက်ရင် အသွင်အပြင် ခဏပြောင်းမယ်
        $this.html("PREPARING... <i class='bx bx-loader-alt bx-spin'></i>");
        $this.css('opacity', '0.7');

        // ၂ စက္ကန့်ကြာရင် မူလအတိုင်း ပြန်ဖြစ်သွားမယ်
        setTimeout(function () {
            $this.html(originalText);
            $this.css('opacity', '1');
        }, 2000);
    });
});
