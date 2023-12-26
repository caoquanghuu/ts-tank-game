import { MoveEngine } from "./MoveEngine";
import { Point } from "./types";
import { getRandomArbitrary } from "./util";

export class MoveAbleObject {
    public _image: HTMLDivElement;
    public _speed: number = 100;
    public _position: Point;
    protected _moveEngine: MoveEngine;

    constructor(id: string) {
        // id -> _image
        this._image = (document.getElementById(id).cloneNode(true) as HTMLDivElement);
        document.getElementById('game-container').appendChild(this._image)
        this._image.style.position = 'absolute'
    }

    public _move(deltaTime: number) {

        if (!this._moveEngine) {
            return;
        }

        const direction = this._moveEngine.getDirection();

        if (direction.x ===0 && direction.y ===0 ) {
            // da di
            return;
        } else {
            
        }
    
        const nextY = Number.parseInt(this._image.style.top) + this._speed * deltaTime / 1000 * direction.y;
        const nextX = Number.parseInt(this._image.style.left) + this._speed * deltaTime / 1000 * direction.x;

        if (nextX < 0) return;
        if (nextY < 0) return;

        if (nextX >= 500) return;
        if (nextY >= 500) return;

        this.setPosition({ x: nextX, y: nextY});
        this.rotateDirection(direction);
    }

    public setPosition(position: Point) {
        this._position = position;
        this._image.style.top = `${position.y}px`;
        this._image.style.left = `${position.x}px`;
    }

    public rotateDirection(point : Point) {
        if (point.y === -1) {this._image.style.transform = 'rotate(0deg)'};
        if (point.y === 1) {this._image.style.transform = 'rotate(180deg)'};
        if (point.x === -1) {this._image.style.transform = 'rotate(270deg)'};
        if (point.x === 1) {this._image.style.transform = 'rotate(90deg)'};
        if ((point.y === -1) && (point.x === -1)) {this._image.style.transform = 'rotate(-45deg)'};
        if ((point.y === -1) && (point.x === 1)) {this._image.style.transform = 'rotate(45deg)'};
        if ((point.y === 1) && (point.x === -1))  {this._image.style.transform = 'rotate(225deg)'};
        if ((point.y === 1) && (point.x === 1)) {this._image.style.transform = 'rotate(135deg)'};
    }

    public update(dt: number) {
        this._move(dt);
    }
}