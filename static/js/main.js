


/*누르면 우측에 div 보이는 거*/
function showContent(content) {
    var contentD = document.getElementById("intro_res_box_default");
    var contentA = document.getElementById("intro_res_box1");
    var contentA1 = document.getElementById("intro_img1");
    var contentB1 = document.getElementById("intro_img2");
    var contentC1 = document.getElementById("intro_img3");

    // 내용 숨김
    contentD.style.display = "none";
    contentA.style.display = "none";
    contentA1.style.visibility = "hidden";
    contentB1.style.visibility = "hidden";
    contentC1.style.visibility = "hidden";
    
    void contentA.offsetWidth;
    void contentA1.offsetWidth;
    void contentB1.offsetWidth;
    void contentC1.offsetWidth;

    // 선택한 내용 보이기
    if (content === "A") {
        contentA.style.display = "block";
        contentA1.style.visibility = "visible";
    } else if (content === "B") {
        contentA.style.display = "block";
        contentB1.style.visibility = "visible";
    } else if (content === "C") {
        contentA.style.display = "block";
        contentC1.style.visibility = "visible";
    }
}






document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const motion_ls = document.querySelectorAll('.motion_l');
    const motion_rs = document.querySelectorAll('.motion_r');
    const motion_us = document.querySelectorAll('.motion_u');

    const handleScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 100;

            if (sectionTop < triggerPoint) {
                section.classList.add('show');
            } else {
                section.classList.remove('show');
            }
        });
        motion_ls.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 100;

            if (sectionTop < triggerPoint) {
                section.classList.add('show');
            } else {
                section.classList.remove('show');
            }
        });
        motion_rs.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 100;

            if (sectionTop < triggerPoint) {
                section.classList.add('show');
            } else {
                section.classList.remove('show');
            }
        });
        motion_us.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 100;

            if (sectionTop < triggerPoint) {
                section.classList.add('show');
            } else {
                section.classList.remove('show');
            }
        });
    };

    // 스크롤 시 handleScroll 함수 실행
    window.addEventListener('scroll', handleScroll);

    // 페이지 로드 시에도 애니메이션 적용 (초기화)
    handleScroll();
});



$('.horse_menu_up_left').click(function() {
    $('.horse_menu_up_center').removeClass('under_line');
    $('.horse_menu_up_right').removeClass('under_line');
    $(this).addClass('under_line');
    return false;
});
$('.horse_menu_up_center').click(function() {
    $('.horse_menu_up_left').removeClass('under_line');
    $('.horse_menu_up_right').removeClass('under_line');
    $(this).addClass('under_line');
    return false;
});
$('.horse_menu_up_right').click(function() {
    $('.horse_menu_up_left').removeClass('under_line');
    $('.horse_menu_up_center').removeClass('under_line');
    $(this).addClass('under_line');
    return false;
});


//정보 버튼 구현
function showContent_info(content) {
    var content_rH = document.getElementById("rH");
    var content_rP = document.getElementById("rP");
    var content_rG = document.getElementById("rG");

    // 내용 숨김
    content_rH.style.display = "none";
    content_rP.style.display = "none";
    content_rG.style.display = "none";
    void content_rH.offsetWidth;
    void content_rP.offsetWidth;
    void content_rG.offsetWidth;
    
    // 선택한 내용 보이기
    if (content === "A") {
        content_rH.style.display = "block";
    } else if (content === "B") {
        content_rP.style.display = "block";
    } else if (content === "C") {
        content_rG.style.display = "block";
    }
}