document.addEventListener('DOMContentLoaded', () => {
    // apiUrl은 데이터를 가져올 api url 을 저장한다.
    // currentindex는 현재 표시 중인 기수의 인덱스를 저장한다.
    // filtereditems는 필터링된 기수 정보 항목들을 저장한다.
    const apiUrl = 'https://apis.data.go.kr/B551015/API12_1/jockeyInfo_1?ServiceKey=5mHP3AIBIBjKTzNoLMxDZtyiU308Vbj6xbRjFBb%2BS51zfBxMxIFTcFvNJ26FAESp28%2FgwFAdE9wZhgnQ9jznhA%3D%3D&pageNo=1&numOfRows=818&_type=json';
    let currentIndex = 0;
    let filteredItems = [];

    // fetch함수를 사용하여 api에서 데이터를 가져온다.
    fetch(apiUrl)
        // 데이터를 json 형식으로 변환하고, 'items' 변수에 api응답에서
        // 기수 정보 항목들을 저장한다.
        .then(response => response.json())
        .then(data => {
            const items = data.response.body.items.item;

            // '서울', '부산경남', '제주' 버튼에 클릭 이벤트 리스너를 추가.
            // 각 버튼 클릭시 currentindex를 0으로 초기화하고, 해당지역의
            // 기수 정보들로 'filtereditems를 필터링한다.
            // 그런 다음 날짜 순으로 정렬하고, displayitem 함수를 호출한다.
            document.getElementById('playerSeoul').addEventListener('click', () => {
                currentIndex = 0;
                filteredItems = items.filter(item => item.meet === '서울');
                filteredItems.sort((a, b) => new Date(a.birthday) - new Date(b.birthday)); // Sort by birthday
                displayItem();
            });
            document.getElementById('playerBusan').addEventListener('click', () => {
                currentIndex = 0;
                filteredItems = items.filter(item => item.meet === '부산경남');
                filteredItems.sort((a, b) => new Date(a.birthday) - new Date(b.birthday)); // Sort by birthday
                displayItem();
            });
            document.getElementById('playerJeju').addEventListener('click', () => {
                currentIndex = 0;
                filteredItems = items.filter(item => item.meet === '제주');
                filteredItems.sort((a, b) => new Date(a.birthday) - new Date(b.birthday)); // Sort by birthday
                displayItem();
            });
            // 이전 버튼을 클릭 시 currentindex가 0보다 크면 currentindex 감소
            document.getElementById('playerPrev').addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    displayItem();
                }
            });
            // 다음 버튼 클릭시 currentindex가 fitereditems의 길이보다 작으면
            // currentindex를 증가시킨다.
            // 그런다음 displayitem 함수를 호출하여 현재 항목을 표시한다.
            document.getElementById('playerNext').addEventListener('click', () => {
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
    // playerinfodiv에 해당 항목을 가져와 정포를 표시함.
    // 네비게이션 버튼을 활성화 또는 비활성화하여 사용자가 항목의 처음
    // 혹은 끝에 도달했음을 알린다. 항목이 없으면 해당 지역의 기수정보가 없음을 표시한다.
    function displayItem() {
        const playerInfoDiv = document.getElementById('playerInfo');
        playerInfoDiv.innerHTML = ''; // Clear previous content

        // 이 조건문은 fitereditems 배열이 비어있지 않은지 확인
        // 만약 비어있다면, 아무 항목도 표시하지 않도록 s하기 위해서이다.
        if (filteredItems.length > 0) {
            // currentindex를 사용하여 filtereditems 배열에서 현재 표시할 항목을 가져온다.
            // item은 현재 경주 계획 항목을 나타낸다.
            const item = filteredItems[currentIndex];

            // document.createElement를 사용하여 새로운 <div> 요소를 생성한다.
            // 이 요소는 기수 정보를 담게된다.
            // playerinfo.className = jockey_info는 생성된 div요소에 
            // player_info라는 클래스를 추가한다.
            const playerInfo = document.createElement('div');
            playerInfo.className = 'player_info';
            // innerHTML 속성을 사용하여 playerinfo 요소의 내용을 설정한다.
            // 템플릿 리터럴롤 html 구조를 작성하고 item 객체의 속성 값을 삽입한다.
            playerInfo.innerHTML = `
                <h2>${item.jkName}</h2>
                <p>나이: ${item.age}</p>
                <p>생일: ${item.birthday}</p>
                <p>모임: ${item.meet}</p>
                <p>전체 1착 횟수: ${item.ord1CntT}</p>
                <p>올해 1착 횟수: ${item.ord1CntY}</p>
                <p>전체 2착 횟수: ${item.ord2CntT}</p>
                <p>올해 2착 횟수: ${item.ord2CntY}</p>
                <p>전체 3착 횟수: ${item.ord3CntT}</p>
                <p>올해 3착 횟수: ${item.ord3CntY}</p>
            `;
            // playerinfodiv는 displayitem 함수 내에서 정의된 변수로, 경주 계획 정보를
            // 표시할 DOM 요소를 가리킨다. 'appendchild' 메서드를 사용하여 playerinfodiv
            // 요소에 새로 생성한 playerinfo 요소를 자식으로 추가한다. 이로써 브라우저 화면에 경주꼐획정보가 표시된다.
            // DOM = Document Object Model이다. 
            // html,xml 문서의 구조화된 표현으로, 웹페이지의 콘텐츠를 프로그래밍적으로
            // 접군하고 조작할 수 있게 해준다. Dom은 문서를 트리 구조로 표현하며,
            // 각요소는 노드로 나타낸다. 이 트리구조는 웹 브라우저가 html 문서를 파싱하여 생성한다
            playerInfoDiv.appendChild(playerInfo);

            // Enable/disable navigation buttons
            document.getElementById('playerPrev').disabled = currentIndex === 0;
            document.getElementById('playerNext').disabled = currentIndex === filteredItems.length - 1;
        } else {
            playerInfoDiv.innerHTML = '<p>해당 지역의 기수 정보가 없습니다.</p>';
        }
    }
});