(function () {
    const MIN_TARGETS = 4;
    const MAX_TARGETS = 10;
    const GAME_TIME = 90; // seconds
    const world = document.getElementById('world');
    const scoreBoard = document.getElementById('score-board');
    const gameTimerEl = document.getElementById('time');
    const modal = document.getElementById('myModal');
    const span = document.getElementsByClassName("close")[0];
    const startBtn = document.getElementById("start-btn");
    let targets = []
    let targetsIntoWorld = 0;
    let score = 0;
    let currentGameTime = 0;
    let newTargetId = 0;
    let targetTimer = null;
    let gameTimer = null;

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const randomNumber = (max, min = 0) => (parseInt(Math.random() * (max - min) + min));
    const createTargets = (numerOfTargets = 1) => {
        for (let t = 0; t < numerOfTargets; t++) {
            const winHeight = window.visualViewport.height - 20;
            const winWidth = window.visualViewport.width - 40;
            const size = randomNumber(50, 5) + 'px';
            const target = document.createElement('div');
            target.setAttribute('class', 'target hit-target');
            target.setAttribute('id', newTargetId++);
            target.style['top'] = randomNumber(winHeight, winHeight / 2 + 100) + 'px';
            target.style['left'] = randomNumber(winWidth) + 'px';
            target.style['background-color'] = getRandomColor();
            target.style['width'] = size;
            target.style['height'] = size;
            world.appendChild(target);
            targets.push(target);
        }
    };
    const destroyTraget = (target, isHit = false) => {
        const tr = document.getElementById(target.id);
        if (tr) {
            world.removeChild(tr);
            //tr.setAttribute('class', 'target removed-target');
            // if (isHit) {
            //     tr.setAttribute('class', 'target hit-target');
            // } else {
            //     tr.setAttribute('class', 'target removed-target');
            // }

            //deleteEl(target.id);
            targets = targets.filter(t => target.id != t.id);
            targetsIntoWorld = targetsIntoWorld - 1;
            // if (targetsIntoWorld < MIN_TARGETS) {
            //     createTargets(MAX_TARGETS - MIN_TARGETS);
            //     targetsIntoWorld = MAX_TARGETS;
            // }
        }
    }
    const deleteEl = (trId) => {
        setTimeout(() => {
            const tr = document.getElementById(trId);
            world.removeChild(tr);
        }, 500)
    }
    const onHit = ($event) => {
        window.e = $event;
        if ($event.target.className && $event.target.className.includes('target')) {
            destroyTraget($event.target, true);
            updateScore(score + 1);
        }
    }

    const updateScore = (s) => {
        score = s;
        scoreBoard.innerHTML = score;
    }
    const updateTime = () => {
        if (currentGameTime > GAME_TIME) {
            showModal();
            document.querySelector('.modal-content h2').innerHTML = `YOUR SCORE = ${score}`;
            document.querySelector('button').innerHTML = 'RESTART GAME';
            destroyWorld();
        } else {
            gameTimerEl.innerHTML = GAME_TIME - currentGameTime;
            currentGameTime++;
        }
    }
    const initGame = () => {
        world.addEventListener('click', onHit);
        targets = []
        score = 0;
        currentGameTime = 0;
        updateScore(0);
        // createTargets(MAX_TARGETS);
        targetsIntoWorld = MAX_TARGETS;
        targetTimer = setInterval(() => {
            createTargets();
        }, 700)
        gameTimer = setInterval(() => {
            updateTime();
        }, 1000)

        // setInterval(() => {
        //     const targetNum = randomNumber(targets.length - 1);
        //     console.log(targetNum, targets.length);
        //     destroyTraget(targets[targetNum]);
        // }, 2000)
    }

    const destroyWorld = () => {
        clearInterval(targetTimer);
        clearInterval(gameTimer);
        world.innerHTML = '';
    }

    startBtn.onclick = function () {
        modal.style.display = "none";
        initGame();
    }
    const showModal = () => {
        modal.style.display = "block";
    }
    showModal();
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        initGame();
    }
})()
