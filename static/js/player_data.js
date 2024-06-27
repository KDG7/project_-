let seoulCachedData_p = null;
let busanCachedData_p = null;
let jejuCachedData_p = null;
let filteredItems_p = [];
const updateInterval_p = 60000; // 60초마다 데이터 갱신

// 데이터를 가져와 캐시에 저장하는 함수 (서울)
async function fetchDataAndDisplayItems() {
    const apiUrl = 'https://apis.data.go.kr/B551015/API12_1/jockeyInfo_1?ServiceKey=5mHP3AIBIBjKTzNoLMxDZtyiU308Vbj6xbRjFBb%2BS51zfBxMxIFTcFvNJ26FAESp28%2FgwFAdE9wZhgnQ9jznhA%3D%3D&pageNo=1&numOfRows=818&_type=json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const items = data.response.body.items.item;
        filteredItems_p = items.filter(item => item.meet === '서울' && parseInt(item.age) <= 40);
        filteredItems_p.sort((a, b) => b.ord1CntT - a.ord1CntT);
        seoulCachedData_p = filteredItems_p; // 캐시에 저장
        filteredItems_p = [];
    } catch (error) {
        console.error('Error fetching the data:', error);
    }
}

// 데이터를 가져와 캐시에 저장하는 함수 (부산경남)
async function busanfetchDataAndDisplayItems() {
    const apiUrl = 'https://apis.data.go.kr/B551015/API12_1/jockeyInfo_1?ServiceKey=5mHP3AIBIBjKTzNoLMxDZtyiU308Vbj6xbRjFBb%2BS51zfBxMxIFTcFvNJ26FAESp28%2FgwFAdE9wZhgnQ9jznhA%3D%3D&pageNo=1&numOfRows=818&_type=json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const items = data.response.body.items.item;
        filteredItems_p = items.filter(item => item.meet === '부산경남' && parseInt(item.age) <= 40);
        filteredItems_p.sort((a, b) => b.ord1CntT - a.ord1CntT);
        busanCachedData_p = filteredItems_p; // 캐시에 저장
        filteredItems_p = [];
    } catch (error) {
        console.error('Error fetching the data:', error);
    }
}

// 데이터를 가져와 캐시에 저장하는 함수 (제주)
async function jejufetchDataAndDisplayItems() {
    const apiUrl = 'https://apis.data.go.kr/B551015/API12_1/jockeyInfo_1?ServiceKey=5mHP3AIBIBjKTzNoLMxDZtyiU308Vbj6xbRjFBb%2BS51zfBxMxIFTcFvNJ26FAESp28%2FgwFAdE9wZhgnQ9jznhA%3D%3D&pageNo=1&numOfRows=818&_type=json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const items = data.response.body.items.item;
        filteredItems_p = items.filter(item => item.meet === '제주' && parseInt(item.age) <= 40);
        filteredItems_p.sort((a, b) => b.ord1CntT - a.ord1CntT);
        jejuCachedData_p = filteredItems_p; // 캐시에 저장
        filteredItems_p = [];
    } catch (error) {
        console.error('Error fetching the data:', error);
    }
}

fetchDataAndDisplayItems();
busanfetchDataAndDisplayItems();
jejufetchDataAndDisplayItems();

function startDataUpdate_p() {
    setInterval(fetchDataAndDisplayItems, updateInterval_p);
    setInterval(busanfetchDataAndDisplayItems, updateInterval_p);
    setInterval(jejufetchDataAndDisplayItems, updateInterval_p);
}

let slides_p = [];

document.addEventListener('DOMContentLoaded', () => {
    const seoulButton = document.getElementById('seoul');
    const busanButton = document.getElementById('busan');
    const jejuButton = document.getElementById('jeju');
    const seoulRPButton = document.getElementById('seoul_rP_button');
    const slider_prev_p = document.querySelector('.slider_prev_p')
    const slider_p = document.querySelector('.slider_p')
    const slider_next_p = document.querySelector('.slider_next_p')

    let seoulRPButtonListener;

    function setupButtons(filteredItems) {
        if (seoulRPButtonListener) {
            seoulRPButton.removeEventListener('click', seoulRPButtonListener); // 기존 이벤트 리스너 제거
        }

        seoulRPButtonListener = () => {
            removeSlideElements();
            displayItems(filteredItems);

            slides_p = Array.from(document.querySelectorAll('.slide_p'));

            initializeIndicators_p();

            const prevButton = document.querySelector('.prev_p');
            const nextButton = document.querySelector('.next_p');

            prevButton.addEventListener('click', prevButtonListener);
            nextButton.addEventListener('click', nextButtonListener);
        };

        seoulRPButton.addEventListener('click', seoulRPButtonListener);
    }

    function prevButtonListener() {
        resetSlideClasses();
        showSlide_p(currentIndex_p - 1);
        slider_prev_p.classList.add('move_rr3');
        slider_p.classList.add('move_rr2');
        slider_next_p.classList.add('move_rr');
    }

    function nextButtonListener() {
        resetSlideClasses();
        showSlide_p(currentIndex_p + 1);
        slider_prev_p.classList.add('move_ll');
        slider_p.classList.add('move_ll2');
        slider_next_p.classList.add('move_ll3');
    }

    function resetSlideClasses() {
        const slider_prev_p = document.querySelector('.slider_prev_p');
        const slider_p = document.querySelector('.slider_p');
        const slider_next_p = document.querySelector('.slider_next_p');

        slider_prev_p.classList.remove('move_ll', 'move_ll2', 'move_ll3', 'move_rr', 'move_rr2', 'move_rr3');
        slider_p.classList.remove('move_ll', 'move_ll2', 'move_ll3', 'move_rr', 'move_rr2', 'move_rr3');
        slider_next_p.classList.remove('move_ll', 'move_ll2', 'move_ll3', 'move_rr', 'move_rr2', 'move_rr3');

        void slider_next_p.offsetWidth;
        void slider_prev_p.offsetWidth;
        void slider_p.offsetWidth;
    }

    seoulButton.addEventListener('click', () => {
        removeSlideElements();
        setupButtons(seoulCachedData_p);
        
    });

    busanButton.addEventListener('click', () => {
        removeSlideElements();
        setupButtons(busanCachedData_p);
        
    });

    jejuButton.addEventListener('click', () => {
        removeSlideElements();
        setupButtons(jejuCachedData_p);
        
    });

    function removeSlideElements() {
        const slideElements = document.getElementsByClassName("slide_p");
        const elementsArray = Array.from(slideElements);
        slides_p = [];
        elementsArray.forEach(function(element) {
            element.remove();
        });
    }
});

function displayItems(filteredItems) {
    const playerInfoDiv = document.getElementById('slides_p');
    playerInfoDiv.innerHTML = '';

    if (filteredItems.length > 0) {
        for (let i = 0; i < Math.min(filteredItems.length, 10); i++) {
            const item = filteredItems[i];
            const playerInfo = document.createElement('div');

            playerInfo.className = 'slide_p';
            playerInfo.innerHTML = `
                <h2>${item.jkName}</h2>
                <p>나이: ${item.age}</p>
                <p>생년월일: ${item.birthday}</p>
                <div class="total_year_ranking_p">
                    <div class="total_ranking_p">
                        <p>전체 1착 : ${item.ord1CntT}회</p>
                        <p>전체 2착 : ${item.ord2CntT}회</p>
                        <p>전체 3착 : ${item.ord3CntT}회</p>
                    </div>
                    <div class="year_ranking_p">
                        <p>올해 1착 : ${item.ord1CntY}회</p>
                        <p>올해 2착 : ${item.ord2CntY}회</p>
                        <p>올해 3착 : ${item.ord3CntY}회</p>
                    </div>            
                </div>
            `;
            playerInfoDiv.appendChild(playerInfo);
        }
    } else {
        playerInfoDiv.innerHTML = '<p>해당 지역의 기수 정보가 없습니다.</p>';
    }
}

window.onload = startDataUpdate_p;