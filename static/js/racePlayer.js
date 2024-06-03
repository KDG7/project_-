let currentIndex_p = 0;
let slides_p = Array.from(document.querySelectorAll('.slide_p'));
    

function showSlide_p(index) {
    const indicators = document.querySelectorAll('.indicator_p');
    const totalSlides_p = slides_p.length;
    const prevContainer = document.querySelector('.slider_prev_p');
    const nextContainer = document.querySelector('.slider_next_p');
    const mainContainer = document.querySelector('.slider_p .slides_p');

    currentIndex_p = index;

    // 현재 슬라이드 인덱스가 음수인 경우, 가장 마지막 슬라이드로 설정
    if (currentIndex_p < 0) {
        currentIndex_p = totalSlides_p - 1;
    }
    // 현재 슬라이드 인덱스가 슬라이드 개수보다 큰 경우, 첫 번째 슬라이드로 설정
    else if (currentIndex_p >= totalSlides_p) {
        currentIndex_p = 0;
    }

    // 이전, 현재, 다음 슬라이드를 클론하여 각 컨테이너에 추가
    prevContainer.innerHTML = slides_p[(currentIndex_p - 1 + totalSlides_p) % totalSlides_p].outerHTML;
    mainContainer.innerHTML = slides_p[currentIndex_p].outerHTML;
    nextContainer.innerHTML = slides_p[(currentIndex_p + 1) % totalSlides_p].outerHTML;

    // 인디케이터 업데이트
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active_p', i === currentIndex_p);
    });
}

function initializeIndicators_p() {
    const slides_p = document.querySelectorAll('.slide_p');
    const indicatorsContainer = document.querySelector('.indicators_p');
    indicatorsContainer.innerHTML = '';

    slides_p.forEach((index) => {
        const indicator_p = document.createElement('span');
        indicator_p.classList.add('indicator_p');
        indicator_p.setAttribute('data-slide', index);
        indicator_p.addEventListener('click', () => {
            showSlide_p(index);
        });
        indicatorsContainer.appendChild(indicator_p);
    });

    showSlide_p(currentIndex_p);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeIndicators_p();

    const prevButton = document.querySelector('.prev_p');
    const nextButton = document.querySelector('.next_p');
    const slider_prev_p = document.querySelector('.slider_prev_p')
    const slider_p = document.querySelector('.slider_p')
    const slider_next_p = document.querySelector('.slider_next_p')

    prevButton.addEventListener('click', () => {
        slider_prev_p.classList.remove('move_ll');
        slider_p.classList.remove('move_ll2');
        slider_next_p.classList.remove('move_ll');
        slider_next_p.classList.remove('move_ll3');
        slider_prev_p.classList.remove('move_rr3');
        slider_prev_p.classList.remove('move_rr');
        slider_p.classList.remove('move_rr2');
        slider_next_p.classList.remove('move_rr');
        void slider_next_p.offsetWidth;
        void slider_prev_p.offsetWidth;
        void slider_p.offsetWidth;

        showSlide_p(currentIndex_p - 1);
        slider_prev_p.classList.add('move_rr3');
        slider_p.classList.add('move_rr2');
        slider_next_p.classList.add('move_rr');
    });

    nextButton.addEventListener('click', () => {
        slider_prev_p.classList.remove('move_ll');
        slider_p.classList.remove('move_ll2');
        slider_next_p.classList.remove('move_ll');
        slider_next_p.classList.remove('move_ll3');
        slider_prev_p.classList.remove('move_rr3');
        slider_prev_p.classList.remove('move_rr');
        slider_p.classList.remove('move_rr2');
        slider_next_p.classList.remove('move_rr');
        void slider_next_p.offsetWidth;
        void slider_prev_p.offsetWidth;
        void slider_p.offsetWidth;

        showSlide_p(currentIndex_p + 1);
        slider_prev_p.classList.add('move_ll');
        slider_p.classList.add('move_ll2');
        slider_next_p.classList.add('move_ll3');
    });
});
