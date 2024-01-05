import { ImageObject } from "./ImageObject";
import { PositionMap } from "./Map";
import { MoveEngine } from "./MoveEngine";
import { Direction, Point } from "./types";

export class MoveAbleObject {
  private _imageObject: ImageObject;

  private _speed: number;

  private _moveEngine: MoveEngine;

  private _lastDirection: Direction = Direction.UP;

  constructor(id: string) {
    // id -> _image
    this._imageObject = new ImageObject();
    this._speed = 100;
    this._imageObject.image = document.getElementById(id).cloneNode(true) as HTMLDivElement;
    document.getElementById("game-container").appendChild(this._imageObject.image);
  }

  set speed(speed: number) {
    this._speed = speed;
  }

  get moveEngine() {
    return this._moveEngine;
  }

  set moveEngine(moveEngine: MoveEngine) {
    this._moveEngine = moveEngine;
  }

  get lastDirection() {
    return this._lastDirection;
  }

  set lastDirection(direction: Direction) {
    this._lastDirection = direction;
  }

  get imageObject() {
    return this._imageObject;
  }

  public _move(deltaTime: number) {
    if (!this._moveEngine) {
      return;
    }

    const direction = this._moveEngine.direction;
    if (direction === Direction.STAND) {
      return;
    }

    this.lastDirection = direction;
    const nextPosition = { x: this._imageObject.position.x, y: this._imageObject.position.y };

    let nextX = 0;
    let nextY = 0;

    if (direction === Direction.UP || direction === Direction.DOWN) {
      nextY = (this._imageObject.position.y) + ((this._speed * deltaTime) / 1000) * direction;
    } else if (direction === Direction.LEFT || direction === Direction.RIGHT) {
      nextX = (this._imageObject.position.x) + ((this._speed * deltaTime) / 1000) * direction;
    }
    nextPosition.x = nextX;
    nextPosition.y = nextY;


    const fixedPosition = PositionMap.getMoveDistance(this._imageObject.position, nextPosition);

    this._imageObject.position = { x: fixedPosition.x, y: fixedPosition.y };
    this._imageObject.rotateImage(this._moveEngine.direction);
  }

  public update(dt: number) {
    this._move(dt);
  }
}
