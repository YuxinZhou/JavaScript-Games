const csize = 50;
var board = [[0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]];
const evaluation = [[99, -8, 8, 6, 6, 8, -8, 99],
    [-8, -24, -4, -3, -3, -4, -24, -8],
    [8, -4, 7, 4, 4, 7, -4, 8],
    [6, -3, 4, 0, 0, 4, -3, 6],
    [6, -3, 4, 0, 0, 4, -3, 6],
    [8, -4, 7, 4, 4, 7, -4, 8],
    [-8, -24, -4, -3, -3, -4, -24, -8],
    [99, -8, 8, 6, 6, 8, -8, 99]];
var over = false; //is game over
var player = 1; // 1 or 2
initial_board();
var canvas = document.getElementById("myCanvas");
canvas.addEventListener('click', on_canvas_click, false);

function on_canvas_click(ev) {
    var y = ev.clientX - canvas.offsetLeft - csize;
    var x = ev.clientY - canvas.offsetTop - csize;
    x = Math.floor(x / csize);
    y = Math.floor(y / csize);
    if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
        if (check_move(x, y)) {
            update_board(x, y);
            player = 3 - player;
        }
    }
}

function initial_board() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.strokeRect(csize, csize, csize * 8, csize * 8);
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            ctx.strokeRect(csize * (i + 1), csize * (j + 1), csize, csize);
            if (board[i][j] === 1)
                draw_circle(i, j, 1);
            if (board[i][j] === 2)
                draw_circle(i, j, 2);
        }
    }
}

function draw_circle(x, y, player) {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(50 * (y + 1) + 25, 50 * (x + 1) + 25, 18, 0, Math.PI * 2, true);
    if (player === 1) {
        ctx.stroke();
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
    } else {
        ctx.fillStyle = '#191919';
        ctx.fill();
    }
}

// Check whether the move is valid
// return: True/False
function check_move(x, y) {
    if (board[x][y] !== 0)
        return false;
    const drcts = {
        'u': [-1, 0], 'd': [1, 0], 'l': [0, -1], 'r': [0, 1],
        'ru': [-1, 1], 'ld': [-1, -1], 'rd': [1, 1], 'lu': [1, -1]
    };
    for (var d in drcts) {
        if (check_by_direction(x, y, drcts[d][0], drcts[d][1]) === true)
            return true;
    }
    return false;
}

function check_by_direction(x, y, dx, dy) {
    x = x + dx;
    y = y + dy;
    if (x >= 8 || x < 0 || y >= 8 || y < 0)
        return false;
    if (board[x][y] === player || board[x][y] === 0)
        return false;
    x = x + dx;
    y = y + dy;
    while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (board[x][y] === player)
            return true;
        if (board[x][y] === 0)
            return false;
        x = x + dx;
        y = y + dy;
    }
    return false;
}

function update_board(x, y) {
    board[x][y] = player;
    draw_circle(x, y, player);
    const drcts = {
        'u': [-1, 0], 'd': [1, 0], 'l': [0, -1], 'r': [0, 1],
        'ru': [-1, 1], 'ld': [-1, -1], 'rd': [1, 1], 'lu': [1, -1]
    };
    for (var d in drcts) {
        if (check_by_direction(x, y, drcts[d][0], drcts[d][1]) === true)
            update_by_direction(x, y, drcts[d][0], drcts[d][1]);
    }
}

function update_by_direction(x, y, dx, dy) {
    x = x + dx;
    y = y + dy;
    while (x >= 0 && x < 8 && y >= 0 && y < 8)  {
        if (board[x][y] !== player) {
            board[x][y] = player;
            draw_circle(x, y, player);
            x = x + dx;
            y = y + dy;
        } else {
            break;
        }
    }
}


