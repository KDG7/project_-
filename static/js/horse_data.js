function fetchDataAndDisplayItems_h() {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://apis.data.go.kr/B551015/API8_2/raceHorseInfo_2?ServiceKey=5mHP3AIBIBjKTzNoLMxDZtyiU308Vbj6xbRjFBb%2BS51zfBxMxIFTcFvNJ26FAESp28%2FgwFAdE9wZhgnQ9jznhA%3D%3D&pageNo=1&numOfRows=3629&_type=json';
        let filteredItems = [];

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const items = data.response.body.items.item;
                filteredItems = items.filter(item => item.meet === '서울');
                resolve(filteredItems);
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
                reject(error);
            });
    });
}
function busanfetchDataAndDisplayItems_h() {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://apis.data.go.kr/B551015/API8_2/raceHorseInfo_2?ServiceKey=5mHP3AIBIBjKTzNoLMxDZtyiU308Vbj6xbRjFBb%2BS51zfBxMxIFTcFvNJ26FAESp28%2FgwFAdE9wZhgnQ9jznhA%3D%3D&pageNo=1&numOfRows=3629&_type=json';
        let filteredItems = [];

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const items = data.response.body.items.item;
                filteredItems = items.filter(item => item.meet === '부산경남');
                resolve(filteredItems);
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
                reject(error);
            });
    });
}
function jejufetchDataAndDisplayItems_h() {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://apis.data.go.kr/B551015/API8_2/raceHorseInfo_2?ServiceKey=5mHP3AIBIBjKTzNoLMxDZtyiU308Vbj6xbRjFBb%2BS51zfBxMxIFTcFvNJ26FAESp28%2FgwFAdE9wZhgnQ9jznhA%3D%3D&pageNo=1&numOfRows=3629&_type=json';
        let filteredItems = [];

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const items = data.response.body.items.item;
                filteredItems = items.filter(item => item.meet === '제주');
                resolve(filteredItems);
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
                reject(error);
            });
    });
}

let slides_h = [];

document.addEventListener('DOMContentLoaded', () => {
    const seoulButton = document.getElementById('seoul');
    const busanButton = document.getElementById('busan');
    const jejuButton = document.getElementById('jeju');
    const seoulRHButton = document.getElementById('seoul_rH_button');
    const slider_prev_h = document.querySelector('.slider_prev_h')
    const slider_h = document.querySelector('.slider_h')
    const slider_next_h = document.querySelector('.slider_next_h')

    let seoulRHButtonListener;

    function setupButtons_h(filteredItems) {
        if (seoulRHButtonListener) {
            seoulRHButton.removeEventListener('click', seoulRHButtonListener); // 기존 이벤트 리스너 제거
        }

        seoulRHButtonListener = () => {
            removeSlideElements_h();
            displayItems_h(filteredItems);

            slides_h = Array.from(document.querySelectorAll('.slide_h'));

            initializeIndicators_h();

            const prevButton = document.querySelector('.prev_h');
            const nextButton = document.querySelector('.next_h');

            prevButton.addEventListener('click', prevButtonListener_h);
            nextButton.addEventListener('click', nextButtonListener_h);
        };

        seoulRHButton.addEventListener('click', seoulRHButtonListener);
    }

    function prevButtonListener_h() {
        resetSlideClasses_h();
        showSlide_h(currentIndex_h - 1);
        slider_prev_h.classList.add('move_rr3');
        slider_h.classList.add('move_rr2');
        slider_next_h.classList.add('move_rr');
    }

    function nextButtonListener_h() {
        resetSlideClasses_h();
        showSlide_h(currentIndex_h + 1);
        slider_prev_h.classList.add('move_ll');
        slider_h.classList.add('move_ll2');
        slider_next_h.classList.add('move_ll3');
    }

    function resetSlideClasses_h() {
        const slider_prev_h = document.querySelector('.slider_prev_h');
        const slider_h = document.querySelector('.slider_h');
        const slider_next_h = document.querySelector('.slider_next_h');

        slider_prev_h.classList.remove('move_ll', 'move_ll2', 'move_ll3', 'move_rr', 'move_rr2', 'move_rr3');
        slider_h.classList.remove('move_ll', 'move_ll2', 'move_ll3', 'move_rr', 'move_rr2', 'move_rr3');
        slider_next_h.classList.remove('move_ll', 'move_ll2', 'move_ll3', 'move_rr', 'move_rr2', 'move_rr3');

        void slider_next_h.offsetWidth;
        void slider_prev_h.offsetWidth;
        void slider_h.offsetWidth;
    }

    seoulButton.addEventListener('click', () => {
        removeSlideElements_h();
        fetchDataAndDisplayItems_h()
            .then(filteredItems => {
                setupButtons_h(filteredItems);
            })
            .catch(error => {
                console.error('Error fetching and displaying items:', error);
            });
    });

    busanButton.addEventListener('click', () => {
        removeSlideElements_h();
        busanfetchDataAndDisplayItems_h()
            .then(filteredItems => {
                setupButtons_h(filteredItems);
            })
            .catch(error => {
                console.error('Error fetching and displaying items:', error);
            });
    });

    jejuButton.addEventListener('click', () => {
        removeSlideElements_h();
        jejufetchDataAndDisplayItems_h()
            .then(filteredItems => {
                setupButtons_h(filteredItems);
            })
            .catch(error => {
                console.error('Error fetching and displaying items:', error);
            });
    });

    function removeSlideElements_h() {
        const slideElements = document.getElementsByClassName("slide_h");
        const elementsArray = Array.from(slideElements);
        slides_h = [];
        elementsArray.forEach(function(element) {
            element.remove();
        });
    }
});

function displayItems_h(filteredItems) {
    const playerInfoDiv = document.getElementById('slides_h');
    playerInfoDiv.innerHTML = '';

    if (filteredItems.length > 0) {
        for (let i = 0; i < Math.min(filteredItems.length, 10); i++) {
            const item = filteredItems[i];
            const playerInfo = document.createElement('div');

            playerInfo.className = 'slide_h';
            playerInfo.innerHTML = `
                <h2>${item.hrName}</h2>
                <p>생년월일: ${item.birthday}</p>
                <p>성별: ${item.sex}</p>
                <div class="total_year_ranking_h">
                    <div class="total_ranking_h">
                        <p>전체 1착 : ${item.ord1CntT}회</p>
                        <p>전체 2착 : ${item.ord2CntT}회</p>
                        <p>전체 3착 : ${item.ord3CntT}회</p>
                    </div>
                    <div class="year_ranking_h">
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