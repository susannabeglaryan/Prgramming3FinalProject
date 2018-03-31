class Hivandutyun extends KendaniEak {

    mul(speed) {
        var vand = random(this.yntrelVandak(2));
        if (vand) {
            var newhivandutyun = new Hivandutyun(vand[0], vand[1], 5);
            hivandutyunArr.push(newhivandutyun);
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == vand[0] && xotakerArr[i].y == vand[1]) {
                    xotakerArr.splice(i, 1);
                }
            }
        }

    }

    varakel () {
        switch (season) {
            case "spring":
                this.mul(18);
                break;
            case "summer":
                this.mul(15);
                break;
            case "autumn":
                this.mul(10);
                break;
            case "winter":
                this.mul(8);
                break;
        }
    }

    mah() {
        matrix[this.y][this.x] = 0;
        for (var i in hivandutyunArr) {
            if (hivandutyunArr[i].x == this.x && hivandutyunArr[i].y == this.y) {
                hivandutyunArr.splice(i, 1);
            }
        }
    }

    mahanal() {
        if (frameCount % 15 == 0) this.mah();
    }
}