document.addEventListener('DOMContentLoaded', () => {
    // apiUrl은 데이터를 가져올 api url 을 저장한다.
    // currentindex는 현재 표시 중인 말정보의 인덱스를 저장한다.
    // filtereditems는 필터링된 말 정보 항목들을 저장한다.
    const apiUrl = 'https://apis.data.go.kr/B551015/API8_2/raceHorseInfo_2?ServiceKey=5mHP3AIBIBjKTzNoLMxDZtyiU308Vbj6xbRjFBb%2BS51zfBxMxIFTcFvNJ26FAESp28%2FgwFAdE9wZhgnQ9jznhA%3D%3D&pageNo=1&numOfRows=3629&_type=json';
    let currentIndex = 0;
    let filteredItems = [];

    // fetch함수를 사용하여 api에서 데이터를 가져온다.
    fetch(apiUrl)
        // 데이터를 json 형식으로 변환하고, 'items' 변수에 api응답에서
        // 말 정보 항목들을 저장한다.
        .then(response => response.json())
        .then(data => {
            const items = data.response.body.items.item;

            // '서울', '부산경남', '제주' 버튼에 클릭 이벤트 리스너를 추가.
            // 각 버튼 클릭시 currentindex를 0으로 초기화하고, 해당지역의
            // 말정보 항목들로 'filtereditems를 필터링한다.
            // 그런 다음 날짜 순으로 정렬하고, displayitem 함수를 호출한다.
            document.getElementById('horseSeoul').addEventListener('click', () => {
                currentIndex = 0;
                filteredItems = items.filter(item => item.meet === '서울');
                displayItem();
            });
            document.getElementById('horseBusan').addEventListener('click', () => {
                currentIndex = 0;
                filteredItems = items.filter(item => item.meet === '부산경남');
                displayItem();
            });
            document.getElementById('horseJeju').addEventListener('click', () => {
                currentIndex = 0;
                filteredItems = items.filter(item => item.meet === '제주');
                displayItem();
            });
            // 이전 버튼을 클릭 시 currentindex가 0보다 크면 currentindex 감소
            document.getElementById('horsePrev').addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    displayItem();
                }
            });
            // 다음 버튼 클릭시 currentindex가 fitereditems의 길이보다 작으면
            // currentindex를 증가시킨다.
            // 그런다음 displayitem 함수를 호출하여 현재 항목을 표시한다.
            document.getElementById('horseNext').addEventListener('click', () => {
                if (currentIndex < filteredItems.length - 1) {
                    currentIndex++;
                    displayItem();
                }
            });
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });

    // displayitem 함수 displayitem이 실행되는 곳에 이 함수가 실행
    // slidesContainer에 해당 항목을 가져와 정포를 표시함.
    // 네비게이션 버튼을 활성화 또는 비활성화하여 사용자가 항목의 처음
    // 혹은 끝에 도달했음을 알린다. 항목이 없으면 해당 지역의 말정보가 없음을 표시한다.
    function displayItem() {
        // displayHorse 함수는 slidesContainer 요소에 말 정보를 표시한다.
        const horseInfoDiv = document.getElementById('horseInfo');
        horseInfoDiv.innerHTML = ''; // 이전 항목을 클리어한다.(초기화)

        // 이 조건문은 fitereditems 배열이 비어있지 않은지 확인
        // 만약 비어있다면, 아무 항목도 표시하지 않도록 하기 위해서이다.
        // fitereditems 배열이 비어있지 않으면 각 항목을 
        // 슬라이드로 생성하여 slidesContainer에 추가한다.
        if (filteredItems.length > 0) {
            // currentindex를 사용하여 filtereditems 배열에서 현재 표시할 항목을 가져온다.
            // item은 현재 경주 계획 항목을 나타낸다.
            const item = filteredItems[currentIndex]
            const horseInfo = document.createElement('div');
            horseInfo.className = 'horse_info';
            
            horseInfo.innerHTML = `
                <h2>${item.hrName}</h2>
                <p>생년월일: ${item.birthday}</p>
                <p>성별: ${item.sex}</p>
                <p>모색: ${item.meet}</p>
                <p>1등(최근 1년): ${item.ord1CntY}</p>
                <p>1등(통산 1년): ${item.ord1CntT}</p>
                <p>2등(최근 1년): ${item.ord2CntY}</p>
                <p>2등(통산 1년): ${item.ord2CntT}</p>
                <p>3등(최근 1년): ${item.ord3CntY}</p>
                <p>3등(통산 1년): ${item.ord3CntT}</p>
            `;
            horseInfoDiv.appendChild(horseInfo);

            document.getElementById('horsePrev').disabled = currentIndex === 0;
            document.getElementById('horseNext').disabled = currentIndex === filteredItems.length - 1;

        } else {
            // filtereditems 배열이 비어있으면 "해당 지역의 경주마 정보가 없다" 메세지 표시
            slidesContainer.innerHTML = '<p>해당 지역의 경주마 정보가 없습니다.</p>';
        }
    }
});