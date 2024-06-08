document.getElementById('startButton').addEventListener('click', startRace);

const runners = [
    document.getElementById('runner1'),
    document.getElementById('runner2'),
    document.getElementById('runner3'),
    document.getElementById('runner4'),
    document.getElementById('runner5'),
    document.getElementById('runner6'),
    document.getElementById('runner7')
];

let finalPositions = [];
let totalBet = 0;
let totalWin = 0;
let userSelectedHorse;
let userBetAmount;
let userWinningAmount;
let currentAmount = 500000; // 초기 금액 50만원 설정
const trackWidth = 840;
const runnerWidth = 50;
const frameDuration = 50; // 각 프레임의 시간 간격
let raceInterval;
let raceInProgress = false;

document.getElementById('betType').addEventListener('change', function() {
    const betType = parseInt(this.value);
    document.getElementById('horseNumber2Container').style.display = (betType > 2) ? 'flex' : 'none';
    document.getElementById('horseNumber3Container').style.display = (betType > 4) ? 'flex' : 'none';
    // 올바르지 않은 입력을 숨기기 위해 에러 메시지 숨김
    hideErrorMessages();
    // 승식 변경 시 입력된 값을 초기화
    document.getElementById('horseNumber1').value = '';
    document.getElementById('horseNumber2').value = '';
    document.getElementById('horseNumber3').value = '';
});

function startRace() {
    if (raceInProgress) {
        resetRace();
        document.getElementById('startButton').innerText = "게임 시작";
        raceInProgress = false;
        return;
    }

    const betType = parseInt(document.getElementById('betType').value);
    const horseNumber1 = parseInt(document.getElementById('horseNumber1').value);
    const horseNumber2 = (betType > 2) ? parseInt(document.getElementById('horseNumber2').value) : null;
    const horseNumber3 = (betType > 4) ? parseInt(document.getElementById('horseNumber3').value) : null;
    const betAmount = parseInt(document.getElementById('betAmount').value);

    // 입력 값이 모두 입력되었는지 확인
    if (!horseNumber1 || !betAmount || (betType > 2 && horseNumber2 === null) || (betType > 4 && horseNumber3 === null)) {
        inputErrorMSG("D"); // 입력 값이 모두 입력되지 않음
        return;
    }

    // 각 입력 값의 유효성 검사
    if (horseNumber1 < 1 || horseNumber1 > 7 || 
        (betType > 2 && (horseNumber2 < 1 || horseNumber2 > 7)) || 
        (betType > 4 && (horseNumber3 < 1 || horseNumber3 > 7))) {
        inputErrorMSG("A"); // 잘못된 말 번호 입력
        return;
    }

    if (betAmount < 100 || betAmount > 100000) {
        inputErrorMSG("B"); // 배팅 금액 범위 오류
        return;
    }

    if (betAmount > currentAmount) {
        inputErrorMSG("C"); // 잔액 부족
        return;
    }

    // 중복 말 번호 검사
    const selectedHorses = [horseNumber1];
    if (horseNumber2 !== null) selectedHorses.push(horseNumber2);
    if (horseNumber3 !== null) selectedHorses.push(horseNumber3);
    if (new Set(selectedHorses).size !== selectedHorses.length) {
        inputErrorMSG("A"); // 중복된 말 번호 입력
        return;
    }

    // 모든 입력이 올바르게 되었으므로 에러 메시지를 숨김
    hideErrorMessages();

    // 사용자가 배팅할 때마다 잔액 업데이트
    currentAmount -= betAmount;
    userBetAmount = betAmount;
    userSelectedHorse = horseNumber1;

    const betData = { betType, horseNumber1, betAmount };
    if (horseNumber2 !== null) betData.horseNumber2 = horseNumber2;
    if (horseNumber3 !== null) betData.horseNumber3 = horseNumber3;

    fetch('/place_bet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(betData)
    })
    .then(response => response.json())
    .then(data => {
        finalPositions = data.finalPositions.map(item => item[0]);
        totalBet += betAmount;
        userWinningAmount = data.winningAmount;
        
        // 레이스 시작
        document.getElementById('startButton').innerText = "다시 시작";
        raceInProgress = true;
        startHorseRace();
    });
}

function startHorseRace() {
    let raceTime = 0;
    let maxTime = 20000; // 최대 레이스 시간 (20초)
    let allRunnersFinished = false;

    raceInterval = setInterval(() => {
        raceTime += frameDuration;
        allRunnersFinished = true; // 모든 말이 도착했다고 가정

        runners.forEach((runner, index) => {
            let finalPosition = finalPositions.indexOf(index + 1) + 1;
            let speed = (8 - finalPosition) * 2.0; // 순위에 따른 속도 조정 (1위가 가장 빠름)
            let currentLeft = parseInt(runner.style.left || 0);
            let newLeft = currentLeft + Math.random() * speed;

            if (newLeft < trackWidth - runnerWidth) {
                runner.style.left = newLeft + 'px';
                allRunnersFinished = false; // 말이 아직 도착하지 않았음을 표시
            } else {
                runner.style.left = (trackWidth - runnerWidth) + 'px';
                if (finalPosition === 1) {
                    clearInterval(raceInterval); // 일등 말이 도착하면 레이스 종료
                    finalizeRace();
                }
            }
        });

        // 모든 말이 끝까지 달린 경우 또는 최대 시간에 도달한 경우
        if (allRunnersFinished || raceTime >= maxTime) {
            clearInterval(raceInterval);
            finalizeRace();
        }
    }, frameDuration);
}

function finalizeRace() {
    const resultElement = document.getElementById('betResult');
    const betType = parseInt(document.getElementById('betType').value);

    if (betType === 2 && finalPositions.includes(userSelectedHorse)) {
        // 연승 베팅에서 사용자가 선택한 말이 3등 안에 들어왔을 때
        if (finalPositions.indexOf(userSelectedHorse) < 3) {
            resultElement.textContent = `+${userWinningAmount.toLocaleString()}`; // 획득 금액 출력
            totalWin += userWinningAmount; // 총 획득 금액 업데이트
        } else {
            resultElement.textContent = `-${userBetAmount.toLocaleString()}`;
        }
    } else {
        if (finalPositions[0] === userSelectedHorse) {
            resultElement.textContent = `+${userWinningAmount.toLocaleString()}`; // 획득 금액 출력
            totalWin += userWinningAmount; // 총 획득 금액 업데이트
        } else {
            resultElement.textContent = `-${userBetAmount.toLocaleString()}`;
        }
    }

    document.getElementById('race_game_over').style.display = 'block';
    document.getElementById('startButton').disabled = false;

    // 1등부터 3등까지의 말의 순위를 화면에 출력
    document.getElementById('firstplace').innerText = finalPositions[0] ? `${finalPositions[0]}번 말` : '없음';
    document.getElementById('secondplace').innerText = finalPositions[1] ? `${finalPositions[1]}번 말` : '없음';
    document.getElementById('thirdplace').innerText = finalPositions[2] ? `${finalPositions[2]}번 말` : '없음';

    // 금액 변동 결과를 업데이트
    currentAmount += userWinningAmount; // 획득 금액을 현재 금액에 추가
    document.getElementById('totalBet').innerText = totalBet.toLocaleString();
    document.getElementById('totalWin').innerText = totalWin.toLocaleString();
    document.getElementById('netProfit').innerText = (totalWin - totalBet).toLocaleString();
    document.getElementById('currentAmount').innerText = currentAmount.toLocaleString();

    // 현재 금액을 기준으로 배팅 금액 최대값 업데이트
    document.getElementById('betAmount').max = Math.min(100000, currentAmount);
}

function resetRace() {
    runners.forEach((runner) => {
        runner.style.left = '0px'; // 출발점으로 이동
    });
    document.getElementById('finalResult').innerHTML = ''; // 결과 초기화
    document.getElementById('raceResult').innerText = ''; // 결과 초기화
    document.getElementById('race_game_over').style.display = 'none'; // 종료 메시지 숨기기
    finalPositions = []; // 최종 순위 초기화
    clearInterval(raceInterval); // 이전 레이스 인터벌 정지
    raceInProgress = false; // 레이스 상태 초기화
    document.getElementById('startButton').innerText = "게임 시작"; // 버튼 텍스트 초기화
    document.getElementById('startButton').disabled = false; // 시작 버튼 활성화
}

function inputErrorMSG(content) {
    var content_n = document.getElementById("number_error_horse");
    var content_i = document.getElementById("input_error_horse");
    var content_m = document.getElementById("money_error_horse");
    var content_ni = document.getElementById("no_input_error_horse");

    // 내용 숨김
    content_n.style.display = "none";
    content_i.style.display = "none";
    content_m.style.display = "none";
    content_ni.style.display = "none";
    void content_n.offsetWidth;
    void content_i.offsetWidth;
    void content_m.offsetWidth;
    void content_ni.offsetWidth;
    
    // 선택한 내용 보이기
    if (content === "A") {
        content_n.style.display = "block";
    } else if (content === "B") {
        content_i.style.display = "block";
    } else if (content === "C") {
        content_m.style.display = "block";
    } else if (content === "D") {
        content_ni.style.display = "block";
    }
}

// 에러 메시지 숨김 함수 추가
function hideErrorMessages() {
    var content_n = document.getElementById("number_error_horse");
    var content_i = document.getElementById("input_error_horse");
    var content_m = document.getElementById("money_error_horse");
    var content_ni = document.getElementById("no_input_error_horse");

    content_n.style.display = "none";
    content_i.style.display = "none";
    content_m.style.display = "none";
    content_ni.style.display = "none";
}
