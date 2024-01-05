import { Direction, Point } from "./types";
import { getRandomArbitrary, randomEnumKey } from "./util";

export class MoveEngine {
  private _isRandomMove: boolean = false;
  private _moveDirection: Point = {x: 0, y: 0};
  private _directionChangeTime = 3000;
  private _forceDirectionCountdown = 200; // ms
  private _direction: Direction = Direction.UP;

  constructor(isUseInput: boolean = false, randomMove: boolean = false) {
    if (isUseInput) {
      // Player control
      document.addEventListener("keydown", this.onKeyDown.bind(this));
      document.addEventListener("keyup", this.onKeyUp.bind(this));
    } else {
      // random control
    }
    this._isRandomMove = randomMove;
  }

  get moveDirection(): Point {
    return this._moveDirection;
  }

  set moveDirection(direction : Point) {
    this._moveDirection = {x: direction.x , y: direction.y};
  }

  get direction(): Direction {
    return this._direction;
  }

  set direction(direction : Direction) {
    this._direction = direction;
  }

  set directionChangeTime(dt: number) {
    this._directionChangeTime = dt;
  }

  public forceChangeDirection() {
    if (this._forceDirectionCountdown <= 0) {
      this._forceDirectionCountdown = 200;
      this._directionChangeTime = 0;
    }
  }

  public update(dt: number) {
    if (this._isRandomMove) {
      this._directionChangeTime -= dt;
      if (this._directionChangeTime <= 0) {
        this._directionChangeTime = 3000;

        this.randomMove();
      }
    }
    if (this._forceDirectionCountdown) {
      this._forceDirectionCountdown -= dt;
    }
  }


  private randomMove() { 
    this.direction = randomEnumKey(Direction);
  }

  private onKeyDown(event: any) {
    switch (event.keyCode) {
      case 38:
        // up
        this._moveDirection.y = -1;
        this._direction = Direction.UP;
        break;
      case 40:
        // down
        this._moveDirection.y = 1;
        this._direction = Direction.DOWN;
        break;
      case 37:
        // left
        this._moveDirection.x = -1;
        this._direction = Direction.LEFT;
        break;
      case 39:
        // right
        this._moveDirection.x = 1;
        this._direction = Direction.RIGHT;
        break;

      default:
        break;
    }
  }

  private onKeyUp(event: any) {
    this._direction = Direction.STAND;
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
