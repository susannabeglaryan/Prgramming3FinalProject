class Xotaker extends KendaniEak {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = Math.round(Math.random() * 8);
        this.serArakan = (Math.round((Math.random() * 1)) == 0) ? true : false;
    }

    changeSpeed() {
        switch (season) {
            case "spring":
                this.speed = 8;
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
        this.stanalNorKordinatner();
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
        if (vand && this.multiply >= this.speed / 4) {
            this.energy--;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 2;
            this.multiply = 0;
        }
    }

    utel() {
        this.changeSpeed();
        this.energy--;
        this.multiply++;
        var vand = random(this.yntrelVandak(1));
        if (vand && this.multiply >= this.speed / 4) {
            this.energy += this.speed;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 2;
            for (var i in grassArr) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 1);
                }
            }
        }
        else this.sharjvel();

    }

    bazmanal() {
        this.changeSpeed();
        var vand = random(this.yntrelVandak(0));
        var zuyg = random(this.yntrelVandak(2));
        for (var i in xotakerArr) {
            if (zuyg && vand) {
                if (xotakerArr[i].x == zuyg[0] && xotakerArr[i].y == zuyg[1])
                    var potencialZuyg = xotakerArr[i];
            }
        }

        if (vand && zuyg && this.energy >= this.speed && potencialZuyg.serArakan != this.serArakan) {
            this.energy = 1;
            var newxotaker = new Xotaker(vand[0], vand[1], 2);
            xotakerArr.push(newxotaker);
        }
    }

    mahanal() {
        this.changeSpeed();
        if (this.energy <= -(this.speed / 2)) {
            matrix[this.y][this.x] = 0;
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                    xotakerArr.splice(i, 1);
                }
            }
        }
    }
}