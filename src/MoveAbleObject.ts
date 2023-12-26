// import { MoveEngine } from "./MoveEngine";
import { Point } from "./types";
import { getRandomArbitrary } from "./util";

export class MoveAbleObject {
    public _image: HTMLDivElement;

    public _isInput: boolean = false;

    public _speed: number = 100;

    public _position: Point;

    public _moveDirection: Point;

    private _directionChangeTime = 1000;

    constructor(isInput: boolean = false) {
                if (isInput) {
                    // Player control
        
                    document.addEventListener('keydown',this.onKeyDown.bind(this))
                    document.addEventListener('keyup',this.onKeyUp.bind(this))
                } else {
                    // random control
                }
                this._isInput = isInput;
            }

    public getDirection(): Point {
        return this._moveDirection;
    }

    public _move(deltaTime: number) {
        const direction = this.getDirection();
    
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

    public randomMove() {
        this._moveDirection.x = Math.round(getRandomArbitrary(-1 , 1));
        this._moveDirection.y = Math.round(getRandomArbitrary(-1 , 1));
    }

    public onKeyDown(event: any) {
        switch (event.keyCode ) {
            case 38:
                // up
                this._moveDirection.y = -1;
                break;
            case 40:
                // down
                this._moveDirection.y = 1;
                break;
            case 37:
                // up
                this._moveDirection.x = -1;
                break;
            case 39:
                // right
                this._moveDirection.x = 1;
                break;
        
            default:
                break;
        }
    }

    public onKeyUp(event: any) {
        switch (event.keyCode) {
            case 38:
                // up
                this._moveDirection.y = 0;
                break;
            case 40:
                // down
                this._moveDirection.y = 0;
                break;
            case 37:
                // up
                this._moveDirection.x = 0;
                break;
            case 39:
                // right
                this._moveDirection.x = 0;
                break;
        
            default:
                break;
        }
    }

   

    public update(dt: number) {
                if (this._isInput) return;
        
                this._directionChangeTime -= dt;
                if (this._directionChangeTime <= 0) {
                    this._directionChangeTime = 1000;
        
                    this.randomMove();
                }
            }
}