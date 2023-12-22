import { Point } from "./types";
import { getRandomArbitrary } from "./util";

export class MoveEngine {

    private _isInput: boolean = false;
    private _moveDirection: Point = { x: 0, y: 0 };

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

    public update(dt: number) {
        if (this._isInput) return;

        this._directionChangeTime -= dt;
        if (this._directionChangeTime <= 0) {
            this._directionChangeTime = 1000;

            this.randomMove();
        }
    }

    private randomMove() {
       this._moveDirection.x = Math.round(getRandomArbitrary(-1 , 1));
       this._moveDirection.y = Math.round(getRandomArbitrary(-1 , 1));
    }

    private onKeyDown(event: any) {
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

    private onKeyUp(event: any) {
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
}