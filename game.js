let blockSize = 25;
let total_row = 17;
let total_col = 17;
let board, context;
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let speedX = 0;
let speedY = 0;
let snakeBody = [];
let foodX, foodY;
let gameOver = false;
let turnCount = 0;
let gameInterval;
let bombX, bombY;
let isBombActive = false;
let powerUpX, powerUpY;
let isPowerUpActive = false;
let gameStarted = false;
let isPowerMode = false;
let isPaused = false;

window.onload = function() {
    board = document.getElementById("board");
    context = board.getContext("2d");
    initGame();

    document.getElementById("startBtn").addEventListener("click", () => {
        if (gameStarted) {
            resetGame();
        }
        startGame();
    });

    document.addEventListener("keydown", (e) => {  // 改为keydown事件
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
            e.preventDefault(); // 阻止默认滚动行为
        }
        
        if (!gameStarted && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
            startGame();
        }
        changeDirection(e);
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Space" || e.code === "KeyP") { // 空格或P键暂停
            e.preventDefault();
            if (gameStarted && !gameOver) {
                isPaused = !isPaused;
                if (isPaused) {
                    clearInterval(gameInterval);
                    document.getElementById("prompt").style.display = "block";
                    document.getElementById("prompt").innerHTML = '<i class="fas fa-pause"></i> 暂停中 (按空格继续)';
                } else {
                    const speed = parseInt(document.getElementById("difficulty").value);
                    gameInterval = setInterval(update, speed);
                    document.getElementById("prompt").style.display = "none";
                }
            }
        }
    });
};

function initGame() {
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    placeFood();
    spawnBomb();
    spawnPowerUp();
}

function startGame() {
    gameStarted = true;
    gameOver = false;
    document.getElementById("prompt").style.display = "none";
    document.getElementById("startBtn").textContent = "重新开始";
    
    clearInterval(gameInterval);
    const speed = parseInt(document.getElementById("difficulty").value);
    gameInterval = setInterval(update, speed);
}

function resetGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    speedX = 0;
    speedY = 0;
    snakeBody = [];
    turnCount = 0;
    gameOver = false;
    isBombActive = false;
    isPowerUpActive = false;
    document.getElementById("length").textContent = "1";
    document.getElementById("avgTurns").textContent = "0";
    placeFood();
    spawnBomb();
    spawnPowerUp();
    isPaused = false;
}

function update() {
    if (gameOver || isPaused) return;

    // 清空画布并绘制背景
    context.fillStyle = "#2c3e50";
    context.fillRect(0, 0, board.width, board.height);

    // 绘制食物
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // 绘制炸弹
    if (isBombActive) {
        context.fillStyle = "red";
        context.fillRect(bombX, bombY, blockSize, blockSize);
    }

    // 绘制强化道具
    if (isPowerUpActive) {
        context.fillStyle = "blue";
        context.fillRect(powerUpX, powerUpY, blockSize, blockSize);
    }

    // 更新蛇的位置
    updateSnake();

    // 碰撞检测
    checkCollisions();

    // 更新统计信息
    updateStats();

    // 随机生成新炸弹/道具
    if (Math.random() < 0.1) spawnBomb();
    if (Math.random() < 0.2) spawnPowerUp();
}

function updateSnake() {
    // 移动身体
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // 移动头部
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;

    // 绘制蛇
    context.fillStyle = isPowerMode ? "#FF69B4" : "white";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    snakeBody.forEach((segment, index) => {
        context.fillRect(segment[0], segment[1], blockSize, blockSize);
    });
}

function checkCollisions() {
    // 边界检测
    if (snakeX < 0 || snakeX >= total_col * blockSize || 
        snakeY < 0 || snakeY >= total_row * blockSize) {
        gameOver = true;
    }

    // 自身碰撞
    snakeBody.forEach(segment => {
        if (snakeX === segment[0] && snakeY === segment[1]) {
            gameOver = true;
        }
    });

    // 食物碰撞
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // 炸弹碰撞
    if (isBombActive && snakeX === bombX && snakeY === bombY) {
        gameOver = true;
    }

    // 强化道具碰撞
    if (isPowerUpActive && snakeX === powerUpX && snakeY === powerUpY) {
        snakeBody.push(...Array(3).fill([powerUpX, powerUpY]));
        isPowerMode = true;
        setTimeout(() => isPowerMode = false, 8000);
        isPowerUpActive = false;
    }

    if (gameOver) {
        clearInterval(gameInterval);
        alert("游戏结束！得分：" + snakeBody.length);
    }
}

function changeDirection(e) {
    if (!gameStarted || gameOver) return;

    const prevSpeedX = speedX;
    const prevSpeedY = speedY;

    if (e.code === "ArrowUp" && speedY !== 1) {
        speedX = 0;
        speedY = -1;
    } else if (e.code === "ArrowDown" && speedY !== -1) {
        speedX = 0;
        speedY = 1;
    } else if (e.code === "ArrowLeft" && speedX !== 1) {
        speedX = -1;
        speedY = 0;
    } else if (e.code === "ArrowRight" && speedX !== -1) {
        speedX = 1;
        speedY = 0;
    }

    if (speedX !== prevSpeedX || speedY !== prevSpeedY) {
        turnCount++;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * (total_col - 2) + 1) * blockSize;
    foodY = Math.floor(Math.random() * (total_row - 2) + 1) * blockSize;
}

function spawnBomb() {
    if (!isBombActive) {
        bombX = Math.floor(Math.random() * total_col) * blockSize;
        bombY = Math.floor(Math.random() * total_row) * blockSize;
        isBombActive = true;
        setTimeout(() => isBombActive = false, 5000);
    }
}

function spawnPowerUp() {
    if (!isPowerUpActive) {
        const edge = Math.floor(Math.random() * 4);
        switch(edge) {
            case 0: 
                powerUpX = 0;
                powerUpY = Math.floor(Math.random() * total_row) * blockSize;
                break;
            case 1: 
                powerUpX = (total_col - 1) * blockSize;
                powerUpY = Math.floor(Math.random() * total_row) * blockSize;
                break;
            case 2: 
                powerUpX = Math.floor(Math.random() * total_col) * blockSize;
                powerUpY = 0;
                break;
            case 3: 
                powerUpX = Math.floor(Math.random() * total_col) * blockSize;
                powerUpY = (total_row - 1) * blockSize;
                break;
        }
        isPowerUpActive = true;
        setTimeout(() => isPowerUpActive = false, 5000);
    }
}

function updateStats() {
    const length = snakeBody.length + 1;
    document.getElementById("length").textContent = length;
    const avgTurns = length > 1 ? (turnCount / (length - 1)).toFixed(2) : 0;
    document.getElementById("avgTurns").textContent = avgTurns;
}