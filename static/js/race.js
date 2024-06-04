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
const trackWidth = 840;
const runnerWidth = 50;
const frameDuration = 50; // 각 프레임의 시간 간격

document.getElementById('betType').addEventListener('change', function() {
    const betType = parseInt(this.value);
    document.getElementById('horseNumber2').style.display = (betType > 2) ? 'inline' : 'none';
    document.getElementById('horseNumber3').style.display = (betType > 4) ? 'inline' : 'none';
});

function startRace() {
    const betType = parseInt(document.getElementById('betType').value);
    const horseNumber1 = parseInt(document.getElementById('horseNumber1').value);
    const horseNumber2 = (betType > 2) ? parseInt(document.getElementById('horseNumber2').value) : null;
    const horseNumber3 = (betType > 4) ? parseInt(document.getElementById('horseNumber3').value) : null;
    const betAmount = parseInt(document.getElementById('betAmount').value);

    if ((horseNumber1 < 1 || horseNumber1 > 7) || (betType > 2 && (horseNumber2 < 1 || horseNumber2 > 7)) || (betType > 4 && (horseNumber3 < 1 || horseNumber3 > 7)) || betAmount < 100 || betAmount > 100000) {
        alert("잘못된 입력입니다.");
        return;
    }

    const betData = { betType, horseNumber1, betAmount };
    if (horseNumber2) betData.horseNumber2 = horseNumber2;
    if (horseNumber3) betData.horseNumber3 = horseNumber3;

    fetch('/place_bet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(betData)
    })
    .then(response => response.json())
    .then(data => {
        finalPositions = data.finalPositions.map(item => item[0]);
        totalBet += betAmount;
        totalWin += data.winningAmount;
        let resultHtml = `${data.winner}번 말이 1등이었습니다!<br>`;
        resultHtml += `당신이 획득한 금액은 ${data.winningAmount.toFixed(2)}원입니다.<br>`;
        resultHtml += `이번 라운드 말들의 순위입니다:<br>`;
        data.finalPositions.forEach(([horse, position], index) => {
            resultHtml += `${index + 1}등: ${horse}번 말<br>`;
        });
        resultHtml += `게임 종료!<br>`;
        resultHtml += `총 투자한 금액: ${totalBet}원<br>`;
        resultHtml += `당신이 획득한 총 금액: ${totalWin.toFixed(2)}원<br>`;
        resultHtml += `순수익: ${(totalWin - totalBet).toFixed(2)}원<br>`;
        document.getElementById('finalResult').innerHTML = resultHtml;
        document.getElementById('raceResult').innerText = `최종 순위: ${finalPositions.map((pos, i) => `${pos}번: ${i + 1}등`).join(', ')}`;

        document.getElementById('startButton').disabled = true;
        document.getElementById('startButton').innerText = "다시 시작";

        resetRace();
        startHorseRace();
    });
}

function startHorseRace() {
    let raceTime = 0;
    let maxTime = 10000; // 최대 레이스 시간 (10초)
    let raceInterval = setInterval(() => {
        raceTime += frameDuration;
        runners.forEach((runner, index) => {
            let finalPosition = finalPositions.indexOf(index + 1) + 1;
            let speed = (8 - finalPosition) * 2.0; // 순위에 따른 속도 조정 (1위가 가장 빠름)
            let currentLeft = parseInt(runner.style.left || 0);
            let newLeft = currentLeft + Math.random() * speed;

            if (newLeft < trackWidth - runnerWidth) {
                runner.style.left = newLeft + 'px';
            } else {
                runner.style.left = (trackWidth - runnerWidth) + 'px';
            }
        });

        // 모든 말이 끝까지 달린 경우 확인
        if (runners.every(runner => parseInt(runner.style.left || 0) >= trackWidth - runnerWidth) || raceTime >= maxTime) {
            clearInterval(raceInterval);
            finalizeRace();
        }
    }, frameDuration);
}

function finalizeRace() {
    runners.forEach((runner, index) => {
        runner.style.left = (trackWidth - runnerWidth) + 'px'; // 모든 말을 끝 지점으로 이동
    });

    setTimeout(() => {
        document.getElementById('startButton').disabled = false;
    }, 500); // 종료 메시지 표시
}

function resetRace() {
    runners.forEach((runner) => {
        runner.style.left = '0px'; // 출발점으로 이동
    });
}
