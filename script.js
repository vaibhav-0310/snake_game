document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const scale = 20;
    let score = 0;
    let snake = [{x: 200, y: 200}];
    let food = {x: 0, y: 0};
    let dx = 0;
    let dy = 0;

    function drawSnake() {
        ctx.fillStyle = "#00f";
        snake.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, scale, scale);
        });
    }

    function drawFood() {
        ctx.fillStyle = "#f00";
        ctx.fillRect(food.x, food.y, scale, scale);
    }

    function moveSnake() {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score++;
            document.getElementById("score").innerText = "Score: " + score;
            generateFood();
        } else {
            snake.pop();
        }
    }

    function generateFood() {
        const cols = canvas.width / scale;
        const rows = canvas.height / scale;
        food = {
            x: Math.floor(Math.random() * cols) * scale,
            y: Math.floor(Math.random() * rows) * scale
        };
    }

    function checkCollision() {
        if (snake[0].x < 0 || snake[0].x >= canvas.width || 
            snake[0].y < 0 || snake[0].y >= canvas.height) {
            return true;
        }
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                return true;
            }
        }
        return false;
    }

    function gameLoop() {
        if (checkCollision()) {
            alert("Game Over! Score: " + score);
            location.reload();
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
        moveSnake();
        setTimeout(gameLoop, 100);
    }

    document.addEventListener("keydown", e => {
        switch(e.key) {
            case "ArrowUp":
                if (dy !== scale) {
                    dx = 0;
                    dy = -scale;
                }
                break;
            case "ArrowDown":
                if (dy !== -scale) {
                    dx = 0;
                    dy = scale;
                }
                break;
            case "ArrowLeft":
                if (dx !== scale) {
                    dx = -scale;
                    dy = 0;
                }
                break;
            case "ArrowRight":
                if (dx !== -scale) {
                    dx = scale;
                    dy = 0;
                }
                break;
        }
    });

    generateFood();
    gameLoop();
});
