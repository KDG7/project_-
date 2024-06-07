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
});

// 수정: 배팅 금액 단위 500원으로 조정
document.getElementById('betAmount').step = 500;
// 최대 배팅 금액을 현재 금액 이하로 설정
document.getElementById('betAmount').max = currentAmount;
// 배팅 금액 최소 및 최대값 설정
document.getElementById('betAmount').min = 100;
document.getElementById('betAmount').max = Math.min(100000, currentAmount);

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

    // 입력 값 유효성 검사
    if ((horseNumber1 < 1 || horseNumber1 > 7) || (betType > 2 && (horseNumber2 === null || horseNumber2 < 1 || horseNumber2 > 7)) || (betType > 4 && (horseNumber3 === null || horseNumber3 < 1 || horseNumber3 > 7)) || betAmount < 100 || betAmount > 100000 || betAmount > currentAmount) {
        alert("잘못된 입력입니다.");
        return;
    }
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
        totalWin += userWinningAmount;
        
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
            resultElement.textContent = `+${userWinningAmount}`; // 획득 금액 출력
        } else {
            resultElement.textContent = `-${userBetAmount}`;
        }
    } else {
        if (finalPositions[0] === userSelectedHorse) {
            resultElement.textContent = `+${userWinningAmount}`; // 획득 금액 출력
        } else {
            resultElement.textContent = `-${userBetAmount}`;
        }
    }

    document.getElementById('race_game_over').style.display = 'block';
    document.getElementById('startButton').disabled = false;

    // 1등부터 3등까지의 말의 순위를 화면에 출력
    document.getElementById('firstplace').innerText = finalPositions[0] ? `${finalPositions[0]}번 말` : '없음';
    document.getElementById('secondplace').innerText = finalPositions[1] ? `${finalPositions[1]}번 말` : '없음';
    document.getElementById('thirdplace').innerText = finalPositions[2] ? `${finalPositions[2]}번 말` : '없음';

    // 금액 변동 결과를 업데이트
    currentAmount += userWinningAmount - userBetAmount; // 현재 금액 업데이트
    document.getElementById('totalBet').innerText = totalBet;
    document.getElementById('totalWin').innerText = totalWin.toFixed(2);
    document.getElementById('netProfit').innerText = (totalWin - totalBet).toFixed(2);
    document.getElementById('currentAmount').innerText = currentAmount.toFixed(2);

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
