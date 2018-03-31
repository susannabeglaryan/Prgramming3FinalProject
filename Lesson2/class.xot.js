class Grass extends KendaniEak {

    mul(speed) {
        this.multiply++;
        this.direction = random(this.yntrelVandak(0));
        if (this.multiply >= speed && this.direction) {
            var newGrass = new Grass(this.direction[0], this.direction[1], this.index);
            newGrass.parentX = this.x;
            newGrass.parentY = this.y;
            grassArr.push(newGrass);
            matrix[this.direction[1]][this.direction[0]] = this.index;
            this.multiply = 0;
        }
    }

    bazmanal() {
        switch (season) {
            case "spring":
                this.mul(1);
                break;
            case "summer":
                this.mul(3);
                break;
            case "autumn":
                this.mul(5);
                break;
            case "winter":
                this.mul(8);
                break;
        }
    }
}
