import { MoveEngine } from "./MoveEngine";
import { Point } from "./types";
import { Bullet } from "./bullet";



export class Tank {
    private _image: HTMLDivElement;

    private _speed: number = 100; // ox / s

    private _moveEngine: MoveEngine;

    private _bullet: Bullet;

    constructor(isPlayer: boolean = false) {  
        if (isPlayer) {
            this._image = (document.getElementById('tank-1').cloneNode(true) as HTMLDivElement);
            this._moveEngine = new MoveEngine(isPlayer);
        } else {
            this._image = (document.getElementById('tank-2').cloneNode(true) as HTMLDivElement);
            this._moveEngine = new MoveEngine();
        }
        
        document.getElementById('game-container').appendChild(this._image)

        this._bullet = new Bullet;
    }

    public update(deltaTime: number) {
        // di chuyen
        this._moveEngine.update(deltaTime);
        this._move(deltaTime);
        this._bullet.update(deltaTime);
        // Update HP

        // 
    }

    private _move(deltaTime: number) {
        const direction = this._moveEngine.getDirection();
        
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
}