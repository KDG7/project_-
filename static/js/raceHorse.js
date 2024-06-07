let currentIndex_h = 0;

function showSlide_h(index) {
    const indicators_h = document.querySelectorAll('.indicator_h');
    const totalSlides_h = slides_h.length;
    const prevContainer_h = document.querySelector('.slider_prev_h');
    const nextContainer_h = document.querySelector('.slider_next_h');
    const mainContainer_h = document.querySelector('.slider_h #slides_h');

    currentIndex_h = index;

    // 현재 슬라이드 인덱스가 음수인 경우, 가장 마지막 슬라이드로 설정
    if (currentIndex_h < 0) {
        currentIndex_h = totalSlides_h - 1;
    }
    // 현재 슬라이드 인덱스가 슬라이드 개수보다 큰 경우, 첫 번째 슬라이드로 설정
    else if (currentIndex_h >= totalSlides_h) {
        currentIndex_h = 0;
    }

    // 이전, 현재, 다음 슬라이드를 클론하여 각 컨테이너에 추가
    prevContainer_h.innerHTML = slides_h[(currentIndex_h - 1 + totalSlides_h) % totalSlides_h].outerHTML;
    mainContainer_h.innerHTML = slides_h[currentIndex_h].outerHTML;
    nextContainer_h.innerHTML = slides_h[(currentIndex_h + 1) % totalSlides_h].outerHTML;

    // 인디케이터 업데이트
    indicators_h.forEach((indicator, i) => {
        indicator.classList.toggle('active_h', i === currentIndex_h);
    });
}

function initializeIndicators_h() {
    const slides_h = document.querySelectorAll('.slide_h');
    const indicatorsContainer = document.querySelector('.indicators_h');
    indicatorsContainer.innerHTML = '';

    slides_h.forEach((index) => {
        const indicator_h = document.createElement('span');
        indicator_h.classList.add('indicator_h');
        indicator_h.setAttribute('data-slide', index);
        indicator_h.addEventListener('click', () => {
            showSlide_h(index);
        });
        indicatorsContainer.appendChild(indicator_h);
    });

    showSlide_h(currentIndex_h);
}
