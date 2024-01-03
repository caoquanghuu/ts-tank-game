import { MoveAbleObject } from "./MoveAbleObject";
import { MoveEngine } from "./MoveEngine";
import { Point } from "./types";

export class Bullet extends MoveAbleObject {
  private _isPlayerBullet: boolean;

  constructor(isPlayer: boolean) {
    super("tank-bullet");
    this.speed = 200;
    this.image.style.visibility = "auto";
    this.moveEngine = new MoveEngine(false, false);
    this.isPlayerBullet = isPlayer;
  }

  get isPlayerBullet() {
    return this._isPlayerBullet;
  }

  set isPlayerBullet(isPlayer: boolean) {
    this._isPlayerBullet = isPlayer;
  }

  public triggerFire(position: Point, direction: Point) {
    this.visible = true;
    this.setBulletPosition(position, direction);
    this.moveEngine.direction = direction;
  }

  private setBulletPosition(position: Point, direction: Point) {
    if (direction.x === 0 && direction.y === 1) {
      this.position.x = position.x + 25;
      this.position.y = position.y + 75;
    }
    if (direction.x === 0 && direction.y === -1) {
      this.position.x = position.x + 25;
      this.position.y = position.y - 25;
    }
    if (direction.x === 1 && direction.y === 0) {
      this.position.x = position.x + 75;
      this.position.y = position.y + 25;
    }
    if (direction.x === -1 && direction.y === 0) {
      this.position.x = position.x - 25;
      this.position.y = position.y + 25;
    }
    if (direction.x === -1 && direction.y === -1) {
      this.position.x = position.x - 15;
      this.position.y = position.y - 15;
    }
    if (direction.x === 1 && direction.y === 1) {
      this.position.x = position.x + 65;
      this.position.y = position.y + 65;
    }
    if (direction.x === 1 && direction.y === -1) {
      this.position.x = position.x + 65;
      this.position.y = position.y - 15;
    }
    if (direction.x === -1 && direction.y === 1) {
      this.position.x = position.x - 15;
      this.position.y = position.y + 65;
    }

    this.image.style.left = `${this.position.x}px`;
    this.image.style.top = `${this.position.y}px`;
  }

  public removeBullet() {
    this.visible = false;
  }

  public update(dt: number) {
    super.update(dt);
    if (
      this.position?.x < 1 ||
      this.position?.x > 499 ||
      this.position?.y < 1 ||
      this.position?.y > 499
    ) {
      this.removeBullet();
    }
  }
}
