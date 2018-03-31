class Gishatich extends KendaniEak {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = Math.round(Math.random() * 16);
        this.serArakan = (Math.round((Math.random() * 1)) == 0) ? true : false;
    }

    changeSpeed() {
        switch (season) {
            case "spring":
                this.speed = 7;
                break;
            case "summer":
                this.speed = 8;
                break;
            case "autumn":
                this.speed = 9;
                break;
            case "winter":
                this.speed = 10;
                break;
        }
    }

    yntrelVandak(ch) {
        // this.stanalNorKordinatner();
        return super.yntrelVandak(ch);
    }

    stanalNorKordinatner() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    sharjvel() {
        this.changeSpeed();
        var vand = random(this.yntrelVandak(0));
        if (vand && this.multiply >= this.speed / 2) {
            this.energy--;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 3;
        }
    }

    utel() {
        this.changeSpeed();
        this.energy--;
        var vand = random(this.yntrelVandak(2));
        if (vand && this.multiply >= this.speed / 2) {
            this.energy += this.speed / 2;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 3;
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                    xotakerArr.splice(i, 1);
                }
            }
        }
        else this.sharjvel();
    }

    bazmanal() {
        this.changeSpeed();
        var vand = random(this.yntrelVandak(0));
        var zuyg = random(this.yntrelVandak(3));
        for (var i in gishatichArr) {
            if (zuyg && vand) {
                if (gishatichArr[i].x == zuyg[0] && gishatichArr[i].y == zuyg[1]) {
                    var potencialZuyg = gishatichArr[i];
                }
            }
        }
        if (vand && zuyg && this.energy >= this.speed && potencialZuyg.serArakan != this.serArakan) {
            this.energy = 1;
            var newgishatich = new Gishatich(vand[0], vand[1], 3);
            gishatichArr.push(newgishatich);
        }
    }

    mahanal() {
        this.changeSpeed();
        if (this.energy <= -(this.speed / 2)) {
            matrix[this.y][this.x] = 0;
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                    gishatichArr.splice(i, 1);
                }
            }
        }
    }
}
