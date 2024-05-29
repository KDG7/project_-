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

var game_over = document.getElementById('race_game_over');

// 미리 정해진 결과 (예: 최종 순위)
const finalPositions = [7, 6, 5, 4, 3, 2, 1]; // 1등: runner2, 2등: runner5, ...

const trackWidth = 840;
const runnerWidth = 50;
const frameDuration = 50; // 각 프레임의 시간 간격

function startRace() {
    game_over.style.display = "none";
    document.getElementById('startButton').disabled = true;

    let raceTime = 0;
    let raceInterval = setInterval(() => {
        raceTime += frameDuration;
        runners.forEach((runner, index) => {
            let finalPosition = finalPositions[index];
            let speed = (8 - finalPosition) * 2.0; // 순위에 따른 속도 조정 (1위가 가장 빠름)
            let currentLeft = parseInt(runner.style.left || 0);
            let newLeft = currentLeft + Math.random() * speed;

            if (newLeft < trackWidth - runnerWidth) {
                runner.style.left = newLeft + 'px';
            }
        });

        // 1위 선수 확인
        let leader = runners[finalPositions.indexOf(1)];
        if (parseInt(leader.style.left || 0) >= trackWidth - runnerWidth - 2) {
            clearInterval(raceInterval);
            finalizeRace();
        }
    }, frameDuration);
    
    resetRace();
}

function finalizeRace() {
    runners.forEach((runner, index) => {
        runner.style.left = parseInt(runner.style.left || 0) + 'px'; // 현재 위치에 정지
    });

    setTimeout(() => {
        game_over.style.display = "block";
        document.getElementById('startButton').disabled = false;
    }, 500); // 종료 메시지 표시

}

function resetRace() {
    runners.forEach((runner) => {
        runner.style.left = '0px'; // 출발점으로 이동
    });
}