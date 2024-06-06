document.addEventListener('DOMContentLoaded', () => {
    // apiUrl은 데이터를 가져올 api url 을 저장한다.
    // currentindex는 현재 표시 중인 경주 계획의 인덱스를 저장한다.
    // filtereditems는 필터링된 경주 경주 계획 항목들을 저장한다.
    const apiUrl = 'https://apis.data.go.kr/B551015/API72_2/racePlan_2?ServiceKey=5mHP3AIBIBjKTzNoLMxDZtyiU308Vbj6xbRjFBb%2BS51zfBxMxIFTcFvNJ26FAESp28%2FgwFAdE9wZhgnQ9jznhA%3D%3D&pageNo=1&numOfRows=250&_type=json';
    let currentIndex = 0;
    let filteredItems = [];

    // fetch함수를 사용하여 api에서 데이터를 가져온다.
    fetch(apiUrl)
        // 데이터를 json 형식으로 변환하고, 'items' 변수에 api응답에서
        // 경주 계획 항목들을 저장한다.
        .then(response => response.json())
        .then(data => {
            const items = data.response.body.items.item;

            // '서울', '부산경남', '제주' 버튼에 클릭 이벤트 리스너를 추가.
            // 각 버튼 클릭시 currentindex를 0으로 초기화하고, 해당지역의
            // 경주 계획 항목들로 'filtereditems를 필터링한다.
            // 그런 다음 날짜 순으로 정렬하고, displayitem 함수를 호출한다.
            document.getElementById('stadiumSeoul').addEventListener('click', () => {
                currentIndex = 0;
                filteredItems = items.filter(item => item.meet === '서울');
                filteredItems.sort((a, b) => new Date(a.rcDate) - new Date(b.rcDate)); // Sort by date
                displayItem();
            });
            document.getElementById('stadiumBusan').addEventListener('click', () => {
                currentIndex = 0;
                filteredItems = items.filter(item => item.meet === '부산경남');
                filteredItems.sort((a, b) => new Date(a.rcDate) - new Date(b.rcDate)); // Sort by date
                displayItem();
            });
            document.getElementById('stadiumJeju').addEventListener('click', () => {
                currentIndex = 0;
                filteredItems = items.filter(item => item.meet === '제주');
                filteredItems.sort((a, b) => new Date(a.rcDate) - new Date(b.rcDate)); // Sort by date
                displayItem();
            });
            // 이전 버튼을 클릭 시 currentindex가 0보다 크면 currentindex 감소
            document.getElementById('stadiumPrev').addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    displayItem();
                }
            });
            // 다음 버튼 클릭시 currentindex가 fitereditems의 길이보다 작으면
            // currentindex를 증가시킨다.
            // 그런다음 displayitem 함수를 호출하여 현재 항목을 표시한다.
            document.getElementById('stadiumNext').addEventListener('click', () => {
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
    // raceplaninfodiv에 해당 항목을 가져와 정포를 표시함.
    // 네비게이션 버튼을 활성화 또는 비활성화하여 사용자가 항목의 처음
    // 혹은 끝에 도달했음을 알린다. 항목이 없으면 해당 지역의 경주계획정보가 없음을 표시한다.
    function displayItem() {
        const stadiumInfoDiv = document.getElementById('stadiumInfo');
        stadiumInfoDiv.innerHTML = ''; // 이전 항목을 클리어한다.(초기화)

        // 이 조건문은 fitereditems 배열이 비어있지 않은지 확인
        // 만약 비어있다면, 아무 항목도 표시하지 않도록 하기 위해서이다.
        if (filteredItems.length > 0) {
            // currentindex를 사용하여 filtereditems 배열에서 현재 표시할 항목을 가져온다.
            // item은 현재 경주 계획 항목을 나타낸다.
            const item = filteredItems[currentIndex];

            // document.createElement를 사용하여 새로운 <div> 요소를 생성한다.
            // 이 요소는 경주 계획 정보를 담게된다.
            // raceplaninfo.className = race_plan_info는 생성된 div요소에 
            // race_plan_info라는 클래스를 추가한다.
            const stadiumInfo = document.createElement('div');
            stadiumInfo.className = 'stadium_info';
            // innerHTML 속성을 사용하여 raceplaninfo 요소의 내용을 설정한다.
            // 템플릿 리터럴롤 html 구조를 작성하고 item 객체의 속성 값을 삽입한다.
            stadiumInfo.innerHTML = `
                <h2>경주 이름: ${item.rcName}</h2>
                <p>모임: ${item.meet}</p>
                <p>순위: ${item.rank}</p>
                <p>경주 날짜: ${item.rcDate}</p>
                <p>경주 거리: ${item.rcDist}</p>
                <p>예정 시작 시간: ${item.schStTime}</p>
                <p>1위 상금: ${item.chaksun1}</p>
                <p>2위 상금: ${item.chaksun2}</p>
                <p>3위 상금: ${item.chaksun3}</p>
                <p>4위 상금: ${item.chaksun4}</p>
                <p>5위 상금: ${item.chaksun5}</p>
            `;
            // raceplaninfodiv는 displayitem 함수 내에서 정의된 변수로, 경주 계획 정보를
            // 표시할 DOM 요소를 가리킨다. 'appendchild' 메서드를 사용하여 raceplaninfodiv
            // 요소에 새로 생성한 raceplaninfo 요소를 자식으로 추가한다. 이로써 브라우저 화면에 경주꼐획정보가 표시된다.
            // DOM = Document Object Model이다. 
            // html,xml 문서의 구조화된 표현으로, 웹페이지의 콘텐츠를 프로그래밍적으로
            // 접군하고 조작할 수 있게 해준다. Dom은 문서를 트리 구조로 표현하며,
            // 각요소는 노드로 나타낸다. 이 트리구조는 웹 브라우저가 html 문서를 파싱하여 생성한다
            stadiumInfoDiv.appendChild(stadiumInfo);

            // Enable/disable navigation buttons
            document.getElementById('stadiumPrev').disabled = currentIndex === 0;
            document.getElementById('stadiumNext').disabled = currentIndex === filteredItems.length - 1;
        } else {
            stadiumInfoDiv.innerHTML = '<p>해당 지역의 경주 계획 정보가 없습니다.</p>';
        }
    }
});