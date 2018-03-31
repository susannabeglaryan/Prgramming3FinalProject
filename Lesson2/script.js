var socket = io.connect();

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = random(100);
            if (r < 40) r = 0;
            else if (r < 60) r = 1;
            else if (r < 85) r = 2;
            else if (r < 92) r = 3;
            else if (r < 99.5) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

function isEnded(matrix) {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] != matrix[0][0])
                return false;
        }
    }

    return true;
}

var matrix;
var w = 30;
var h = 30;
var side = 24;
var grassArr = [];
var xotakerArr = [];
var gishatichArr = [], xotakerGishatichArr = [], hivandutyunArr = [];
var seasons = ["winter", "spring", "summer", "autumn"];
season = "";
var index;

var val = prompt("Enter seaason");
switch (val) {
    case "spring":
        index = 1;
        break;
    case "summer":
        index = 2;
        break;
    case "autumn":
        index = 3;
        break;
    case "winter":
        index = 0;
        break;
    default:
        index = 1;
        break;
}


season = seasons[index];
setInterval(function () {
    if (index < 3) {
        index++;
    }
    else {
        index = 0;
    }
    season = seasons[index];
}, 3000);

function setup() {
    matrix = genMatrix(w, h);
    createCanvas(side * w, (side * h + 40));
    background("#acacac");
    frameRate(5);
    for (var y in matrix) {
        for (var x in matrix[y]) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x * 1, y * 1, 1));
            }
            else if (matrix[y][x] == 2) {
                xotakerArr.push(new Xotaker(x * 1, y * 1, 2));
            }
            else if (matrix[y][x] == 3) {
                gishatichArr.push(new Gishatich(x * 1, y * 1, 3));
            }
            else if (matrix[y][x] == 4) {
                xotakerGishatichArr.push(new XotakerGishatich(x * 1, y * 1, 4));
            }
            else if (matrix[y][x] == 5) {
                hivandutyunArr.push(new Hivandutyun(x * 1, y * 1, 5));
            }
        }
    }
}

function draw() {
    if (frameCount % 10 == 0) {
        var igakanXotaker = 0, arakanXotaker = 0, igakanGishatich = 0, arakanGishatich = 0, igakanXotakerGishatich = 0, arakanXotakerGishatich = 0;

        for (y in matrix) {
            for (x in matrix[y]) {
                if (matrix[y][x] == 2) {
                    for (let i = 0; i < xotakerArr.length; i++) {
                        if (xotakerArr[i].serArakan && xotakerArr[i].x == x && xotakerArr[i].y == y) {
                            arakanXotaker++;
                        }
                        else if (!xotakerArr[i].serArakan && xotakerArr[i].x == x && xotakerArr[i].y == y)
                            igakanXotaker++;
                    }
                }
            }
        }
        for (y in matrix) {
            for (x in matrix[y]) {
                if (matrix[y][x] == 3) {
                    for (let i = 0; i < gishatichArr.length; i++) {
                        if (gishatichArr[i].serArakan && gishatichArr[i].x == x && gishatichArr[i].y == y) {
                            arakanGishatich++;
                        }
                        else if (!gishatichArr[i].serArakan && gishatichArr[i].x == x && gishatichArr[i].y == y)
                            igakanGishatich++;
                    }
                }
            }
        }
        for (y in matrix) {
            for (x in matrix[y]) {
                if (matrix[y][x] == 4) {
                    for (let i = 0; i < xotakerGishatichArr.length; i++) {
                        if (xotakerGishatichArr[i].serArakan && xotakerGishatichArr[i].x == x && xotakerGishatichArr[i].y == y) {
                            arakanXotakerGishatich++;
                        }
                        else if (!xotakerGishatichArr[i].serArakan && xotakerGishatichArr[i].x == x && xotakerGishatichArr[i].y == y)
                            arakanXotakerGishatich++;
                    }
                }
            }
        }
        statistics = {
            "Frame number": frameCount,
            "Խոտերի քանակ՝ ": grassArr.length,
            "Խոտակերների քանակ՝ ": xotakerArr.length,
            "Խոտակերների հիվանդության տոկոս՝ ": (hivandutyunArr.length * 100) / (hivandutyunArr.length + xotakerArr.length) + "%",
            "Իգական Խոտակեր": (igakanXotaker * 100) / xotakerArr.length + "%",
            "Արական Խոտակեր": (arakanXotaker * 100) / xotakerArr.length + "%",
            "Գիշատիչների քանակ՝ ": gishatichArr.length,
            "Իգական Գիշատիչ": (igakanGishatich * 100) / gishatichArr.length + "%",
            "Արական Գիշատիչ": (arakanGishatich * 100) / gishatichArr.length + "%",
            "Խոտակեր-գիշատիչների քանակ՝ ": xotakerGishatichArr.length,
            "Իգական Խոտակեր-գիշատիչ": (igakanXotakerGishatich * 100) / xotakerGishatichArr.length + "%",
            "Արական Խոտակեր-գիշատիչ": (arakanXotakerGishatich * 100) / xotakerGishatichArr.length + "%"
        }
        socket.emit("send statistics", statistics);
    }

    if (isEnded(matrix)) {
        background("#000000");
        textSize(32);
        if (matrix[0][0] == 0)
            text('The End', w * side / 2, h * side / 2);
        else if (matrix[0][0] = 1)
            text('Grasses won!', w * side / 2, h * side / 2);
        fill("#fff");
    } else {
        background("#acacac");
        for (var y in matrix) {
            for (var x in matrix[y]) {
                if (matrix[y][x] == 0)
                    fill("#acacac");
                else if (matrix[y][x] == 1) {
                    switch (season) {
                        case "winter":
                            fill("white");
                            break;
                        case "spring":
                            fill("#479447");
                            break;
                        case "summer":
                            fill("#207320");
                            break;
                        case "autumn":
                            fill("#ad6001");
                            break;
                    }
                }
                else if (matrix[y][x] == 2) {
                    for (let i = 0; i < xotakerArr.length; i++) {
                        if (xotakerArr[i].serArakan && xotakerArr[i].x == x && xotakerArr[i].y == y) {
                            fill("#ffff00");
                        }
                        else if (!xotakerArr[i].serArakan && xotakerArr[i].x == x && xotakerArr[i].y == y)
                            fill("#ffff8d");
                    }
                }
                else if (matrix[y][x] == 3) {
                    for (let i = 0; i < gishatichArr.length; i++) {
                        if (gishatichArr[i].serArakan && gishatichArr[i].x == x && gishatichArr[i].y == y)
                            fill("#ff0000");
                        else if (!gishatichArr[i].serArakan && gishatichArr[i].x == x && gishatichArr[i].y == y)
                            fill("#fd5656");
                    }
                }
                else if (matrix[y][x] == 4) {
                    for (let i = 0; i < xotakerGishatichArr.length; i++) {
                        if (xotakerGishatichArr[i].serArakan && xotakerGishatichArr[i].x == x && xotakerGishatichArr[i].y == y)
                            fill("#000000");
                        else if (!xotakerGishatichArr[i].serArakan && xotakerGishatichArr[i].x == x && xotakerGishatichArr[i].y == y)
                            fill("#272727");
                    }
                }
                else if (matrix[y][x] == 5)
                    fill("#0000ff");


                rect(x * side, y * side, side, side);
            }
        }

        for (var i in grassArr) {
            grassArr[i].bazmanal();
        }

        for (var i in xotakerArr) {
            xotakerArr[i].bazmanal();
            xotakerArr[i].utel();
            xotakerArr[i].mahanal();
        }

        for (var i in gishatichArr) {
            gishatichArr[i].bazmanal();
            gishatichArr[i].utel();
            gishatichArr[i].mahanal();
        }

        for (var i in xotakerGishatichArr) {
            xotakerGishatichArr[i].bazmanal();
            xotakerGishatichArr[i].utelXot();
            xotakerGishatichArr[i].utelXotaker();
            xotakerGishatichArr[i].mahanal();
        }

        for (var i in hivandutyunArr) {
            hivandutyunArr[i].varakel();
            hivandutyunArr[i].mahanal();
        }

        fill("black")
        textSize(32);
        text(season, 10, 750);

    }

}