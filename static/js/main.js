
/*input 오른쪽 x버튼임. 누르면 입력어 지움 */
var clearInput = function(obj) {
    obj.parentNode.querySelector('input').value = ""
}

/*input에 입력하고 엔터 누르면 바로 검색 button click되게 하는 거*/
function goCropsList(e){
    const txt = document.getElementById("search_region_input").value;
    const code = e.code;

    if(code == 'Enter'){
        document.getElementById("search_region_button").click();
    }
}


/*누르면 하단에 div 보이는 거*/
function showContent(content) {
    var contentD = document.getElementById("intro_res_box_default");
    var contentA = document.getElementById("intro_res_box1");
    var contentB = document.getElementById("intro_res_box2");
    var contentC = document.getElementById("intro_res_box3");
    var contentA1 = document.getElementById("intro_img1");
    var contentB1 = document.getElementById("intro_img2");
    var contentC1 = document.getElementById("intro_img3");

    // 내용 숨김
    contentD.style.display = "none";
    contentA.style.display = "none";
    contentB.style.display = "none";
    contentC.style.display = "none";
    contentA1.style.visibility = "hidden";
    contentB1.style.visibility = "hidden";
    contentC1.style.visibility = "hidden";

    // 선택한 내용 보이기
    if (content === "A") {
        contentA.style.display = "block";
        contentA1.style.visibility = "visible";
    } else if (content === "B") {
        contentB.style.display = "block";
        contentB1.style.visibility = "visible";
    } else if (content === "C") {
        contentC.style.display = "block";
        contentC1.style.visibility = "visible";
    }
}


//service_intro에서 생산 순위 지역 선택

document.addEventListener('DOMContentLoaded', function() {
    // .other_region_box_s에 클릭 이벤트를 추가
    document.querySelector('.other_region_box_s').addEventListener('click', function(event) {
        // 클릭된 요소가 .other_region_s 클래스를 가지고 있는지 확인
        if (event.target.classList.contains('other_region_s')) {
            // 모든 .other_region_s 요소의 배경색을 초기화
            document.querySelectorAll('.other_region_s').forEach(function(item) {
                item.style.backgroundColor = '';
            });

            // 클릭된 요소의 배경색을 변경
            event.target.style.backgroundColor = '#e4e4e5';
            
            document.querySelector('.intro_res_ranking_1_info_city').textContent = event.target.textContent;  
        }
    });
});

//service_intro에서 강수량 지역 선택

document.addEventListener('DOMContentLoaded', function() {
    // .other_region_box_s에 클릭 이벤트를 추가
    document.querySelector('.other_region_box_s2').addEventListener('click', function(event) {
        // 클릭된 요소가 .other_region_s 클래스를 가지고 있는지 확인
        if (event.target.classList.contains('other_region_s2')) {
            // 모든 .other_region_s 요소의 배경색을 초기화
            document.querySelectorAll('.other_region_s2').forEach(function(item) {
                item.style.backgroundColor = '';
            });

            // 클릭된 요소의 배경색을 변경
            event.target.style.backgroundColor = '#e4e4e5';
            
            document.querySelector('.rain_value_info_city').textContent = event.target.textContent;  
        }
    });
});





document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const motion_ls = document.querySelectorAll('.motion_l');
    const motion_rs = document.querySelectorAll('.motion_r');

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