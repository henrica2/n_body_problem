export { Vector2 };

class Vector2 {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Functions that modify an existing vector
    add(Vector2) {
        this.x = this.x + Vector2.x;
        this.y = this.y + Vector2.y;
    }

    sub(Vector2) {
        this.x = this.x - Vector2.x;
        this.y = this.y - Vector2.y;
    }

    scale(scalar) {
        this.x = this.x * scalar;
        this.y = this.y * scalar;
    }

    divide(scalar) {
        if (scalar > 0) {
            this.x = this.x / scalar;
            this.y = this.y / scalar;
        }
    }

    normalize() {
        const m = this.mag();
        this.divide(m);
    }

    setMag(mag) {
        this.normalize();
        this.scale(mag);
    }

    // Functions that return a property of an existing vector
    mag() {
        const mag = Math.sqrt((this.x * this.x) + (this.y * this.y));
        return mag;
    }

    // Static functions that return a new vector2
    static addVector2(vector2a, vector2b) {
        const x = vector2a.x + vector2b.x;
        const y = vector2a.y + vector2b.y;
        return new Vector2(x, y);
    }

    static subVector2(vector2a, vector2b) {
        const x = vector2a.x - vector2b.x;
        const y = vector2a.y - vector2b.y;
        return new Vector2(x, y);
    }

    static scaleVector2(vector2, scalar) {
        const x = vector2.x * scalar;
        const y = vector2.y * scalar;
        return new Vector2(x, y);
    }

    static divideVector2(vector2, scalar) {
        const x = vector2.x / scalar;
        const y = vector2.y / scalar;
        return new Vector2(x, y);
    }

    static normalizeVector2(vector2) {
        const mag = vector2.mag();
        const x = vector2.x / mag;
        const y = vector2.y / mag;
        return new Vector2(x, y);
    }

    static getMag(Vector2) {
        const mag = Math.sqrt((Vector2.x * Vector2.x) + (Vector2.y * Vector2.y));
        return mag;
    }

    static randomVector() {
        const x = Math.random() * (1 - (-1)) + (-1);
        const y = Math.random() * (1 - (-1)) + (-1);
        let v = new Vector2(x, y);
        v.normalize();
        return v;
    }
}

