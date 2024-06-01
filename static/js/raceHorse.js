let currentIndex = 0;
let slides = Array.from(document.querySelectorAll('.slide_h'));
    

function showSlide(index) {
    const indicators = document.querySelectorAll('.indicator_h');
    const totalSlides = slides.length;
    const prevContainer = document.querySelector('.slider_prev_h');
    const nextContainer = document.querySelector('.slider_next_h');
    const mainContainer = document.querySelector('.slider_h .slides_h');

    currentIndex = index;

    // 현재 슬라이드 인덱스가 음수인 경우, 가장 마지막 슬라이드로 설정
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }
    // 현재 슬라이드 인덱스가 슬라이드 개수보다 큰 경우, 첫 번째 슬라이드로 설정
    else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    // 이전, 현재, 다음 슬라이드를 클론하여 각 컨테이너에 추가
    prevContainer.innerHTML = slides[(currentIndex - 1 + totalSlides) % totalSlides].outerHTML;
    mainContainer.innerHTML = slides[currentIndex].outerHTML;
    nextContainer.innerHTML = slides[(currentIndex + 1) % totalSlides].outerHTML;

    // 인디케이터 업데이트
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active_h', i === currentIndex);
    });
}

function initializeIndicators() {
    const slides = document.querySelectorAll('.slide_h');
    const indicatorsContainer = document.querySelector('.indicators_h');
    indicatorsContainer.innerHTML = '';

    slides.forEach((index) => {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator_h');
        indicator.setAttribute('data-slide', index);
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
        indicatorsContainer.appendChild(indicator);
    });

    showSlide(currentIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeIndicators();

    const prevButton = document.querySelector('.prev_h');
    const nextButton = document.querySelector('.next_h');
    const slider_prev_h = document.querySelector('.slider_prev_h')
    const slider_h = document.querySelector('.slider_h')
    const slider_next_h = document.querySelector('.slider_next_h')

    prevButton.addEventListener('click', () => {
        slider_prev_h.classList.remove('move_ll');
        slider_h.classList.remove('move_ll2');
        slider_next_h.classList.remove('move_ll');
        slider_next_h.classList.remove('move_ll3');
        slider_prev_h.classList.remove('move_rr3');
        slider_prev_h.classList.remove('move_rr');
        slider_h.classList.remove('move_rr2');
        slider_next_h.classList.remove('move_rr');
        void slider_next_h.offsetWidth;
        void slider_prev_h.offsetWidth;
        void slider_h.offsetWidth;

        showSlide(currentIndex - 1);
        slider_prev_h.classList.add('move_rr3');
        slider_h.classList.add('move_rr2');
        slider_next_h.classList.add('move_rr');
    });

    nextButton.addEventListener('click', () => {
        slider_prev_h.classList.remove('move_ll');
        slider_h.classList.remove('move_ll2');
        slider_next_h.classList.remove('move_ll');
        slider_next_h.classList.remove('move_ll3');
        slider_prev_h.classList.remove('move_rr3');
        slider_prev_h.classList.remove('move_rr');
        slider_h.classList.remove('move_rr2');
        slider_next_h.classList.remove('move_rr');
        void slider_next_h.offsetWidth;
        void slider_prev_h.offsetWidth;
        void slider_h.offsetWidth;

        showSlide(currentIndex + 1);
        slider_prev_h.classList.add('move_ll');
        slider_h.classList.add('move_ll2');
        slider_next_h.classList.add('move_ll3');
    });
});
