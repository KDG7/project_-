function fetchDataAndDisplayItems() {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://apis.data.go.kr/B551015/API12_1/jockeyInfo_1?ServiceKey=5mHP3AIBIBjKTzNoLMxDZtyiU308Vbj6xbRjFBb%2BS51zfBxMxIFTcFvNJ26FAESp28%2FgwFAdE9wZhgnQ9jznhA%3D%3D&pageNo=1&numOfRows=818&_type=json';
        let filteredItems = [];

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const items = data.response.body.items.item;
                filteredItems = items.filter(item => item.meet === '서울' && parseInt(item.age) <= 50);
                filteredItems.sort((a, b) => new Date(a.birthday) - new Date(b.birthday)); // Sort by birthday
                resolve(filteredItems);
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
                reject(error);
            });
    });
}
function busanfetchDataAndDisplayItems() {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://apis.data.go.kr/B551015/API12_1/jockeyInfo_1?ServiceKey=5mHP3AIBIBjKTzNoLMxDZtyiU308Vbj6xbRjFBb%2BS51zfBxMxIFTcFvNJ26FAESp28%2FgwFAdE9wZhgnQ9jznhA%3D%3D&pageNo=1&numOfRows=818&_type=json';
        let filteredItems = [];

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const items = data.response.body.items.item;
                filteredItems = items.filter(item => item.meet === '부산경남' && parseInt(item.age) <= 50);
                filteredItems.sort((a, b) => new Date(a.birthday) - new Date(b.birthday)); // Sort by birthday
                resolve(filteredItems);
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
                reject(error);
            });
    });
}
function jejufetchDataAndDisplayItems() {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://apis.data.go.kr/B551015/API12_1/jockeyInfo_1?ServiceKey=5mHP3AIBIBjKTzNoLMxDZtyiU308Vbj6xbRjFBb%2BS51zfBxMxIFTcFvNJ26FAESp28%2FgwFAdE9wZhgnQ9jznhA%3D%3D&pageNo=1&numOfRows=818&_type=json';
        let filteredItems = [];

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const items = data.response.body.items.item;
                filteredItems = items.filter(item => item.meet === '제주' && parseInt(item.age) <= 50);
                filteredItems.sort((a, b) => new Date(a.birthday) - new Date(b.birthday)); // Sort by birthday
                resolve(filteredItems);
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
                reject(error);
            });
    });
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
        fetchDataAndDisplayItems()
            .then(filteredItems => {
                setupButtons(filteredItems);
            })
            .catch(error => {
                console.error('Error fetching and displaying items:', error);
            });
    });

    busanButton.addEventListener('click', () => {
        removeSlideElements();
        busanfetchDataAndDisplayItems()
            .then(filteredItems => {
                setupButtons(filteredItems);
            })
            .catch(error => {
                console.error('Error fetching and displaying items:', error);
            });
    });

    jejuButton.addEventListener('click', () => {
        removeSlideElements();
        jejufetchDataAndDisplayItems()
            .then(filteredItems => {
                setupButtons(filteredItems);
            })
            .catch(error => {
                console.error('Error fetching and displaying items:', error);
            });
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