import { Point } from "./types";
import { getRandomArbitrary } from "./util";
export class MoveEngine {

    private _isRandomMove: boolean = false;
    private _moveDirection: Point = { x: 0, y: 0 };
    private _directionChangeTime = 1000;
    public _isCollision: boolean = false;

    constructor(isUseInput: boolean = false, randomMove: boolean = false) {
        if (isUseInput) {
            // Player control
            document.addEventListener('keydown', this.onKeyDown.bind(this))
            document.addEventListener('keyup', this.onKeyUp.bind(this))
        } else {
            // random control
        }
        this._isRandomMove = randomMove;
    }

    public getDirection(): Point {
        // if(!this._isCollision) {
        //     return this._moveDirection;
        // } else {
        //     const newMoveDirection : Point = {x: -this._moveDirection.x, y: -this._moveDirection.y};
        //     return newMoveDirection;
        // }
        return this._moveDirection;
    }

    public setDirection(direction: Point) {
        this._moveDirection.x = direction.x;
        this._moveDirection.y = direction.y;
    }

    public update(dt: number) {
        if (this._isRandomMove) {
            this._isCollision;

            this._directionChangeTime -= dt;
            if (this._directionChangeTime <= 0) {
                this._directionChangeTime = 1000;

                this.randomMove();
            }

        }
    }

    private randomMove() {
        if (!this._isCollision) {
            this._moveDirection.x = Math.round(getRandomArbitrary(-1, 1));
            this._moveDirection.y = Math.round(getRandomArbitrary(-1, 1));
        } else {
            const x: number = this._moveDirection.x;
            const y: number = this._moveDirection.y;
            if (x === 1) {
                switch (y) {
                    case -1:
                        {
                            this._moveDirection.x = Math.round(getRandomArbitrary(-1, 0));
                            this._moveDirection.y = Math.round(getRandomArbitrary(0, 1));
                            break;
                        }
                    case 0:
                        {
                            this._moveDirection.x = Math.round(getRandomArbitrary(-1, 0));
                            this._moveDirection.y = Math.round(getRandomArbitrary(-1, 1));
                            break;
                        }
                    case 1:
                        {
                            this._moveDirection.x = Math.round(getRandomArbitrary(-1, 0));
                            this._moveDirection.y = Math.round(getRandomArbitrary(-1, 0));
                            break;
                        }
                }
            } else if (x === 0) {
                switch (y) {
                    case -1:
                        {
                            this._moveDirection.x = Math.round(getRandomArbitrary(-1, 1));
                            this._moveDirection.y = Math.round(getRandomArbitrary(0, 1));
                            break;
                        }
                    case 1:
                        {
                            this._moveDirection.x = Math.round(getRandomArbitrary(-1, 1));
                            this._moveDirection.y = Math.round(getRandomArbitrary(0, -1));
                            break;
                        }
                }

            } else if (x === -1) {
                switch (y) {
                    case -1:
                        {
                            this._moveDirection.x = Math.round(getRandomArbitrary(0, 1));
                            this._moveDirection.y = Math.round(getRandomArbitrary(0, 1));
                            break;
                        }
                    case 0:
                        {
                            this._moveDirection.x = Math.round(getRandomArbitrary(0, 1));
                            this._moveDirection.y = Math.round(getRandomArbitrary(-1, 1));
                            break;
                        }
                    case 1:
                        {
                            this._moveDirection.x = Math.round(getRandomArbitrary(0, 1));
                            this._moveDirection.y = Math.round(getRandomArbitrary(-1, 0));
                            break;
                        }
                }
            }
        }
    }


    private onKeyDown(event: any) {
        switch (event.keyCode) {
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
