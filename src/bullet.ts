import { MoveAbleObject } from "./MoveAbleObject";
import { MoveEngine } from "./MoveEngine";
import { Direction, Point } from "./types";

export class Bullet extends MoveAbleObject {
  private _isPlayerBullet: boolean;

  constructor(isPlayer: boolean) {
    super("tank-bullet");
    this.speed = 200;
    this.imageObject.visible = false;
    this.moveEngine = new MoveEngine(false, false);
    this.isPlayerBullet = isPlayer;
  }

  get isPlayerBullet() {
    return this._isPlayerBullet;
  }

  set isPlayerBullet(isPlayer: boolean) {
    this._isPlayerBullet = isPlayer;
  }

  public triggerFire(position: Point, direction: Direction) {
    this.imageObject.visible = true;
    this.setBulletPosition(position, direction);
    // this.moveEngine.direction = direction;
  }

  private setBulletPosition(position: Point, direction: Direction) {
    if (direction === Direction.DOWN) {
      this.imageObject.position.x = position.x + 25;
      this.imageObject.position.y = position.y + 75;
    }
    if (direction === Direction.UP) {
      this.imageObject.position.x = position.x + 25;
      this.imageObject.position.y = position.y - 25;
    }
    if (direction === Direction.RIGHT) {
      this.imageObject.position.x = position.x + 75;
      this.imageObject.position.y = position.y + 25;
    }
    if (direction === Direction.LEFT) {
      this.imageObject.position.x = position.x - 25;
      this.imageObject.position.y = position.y + 25;
    }

    // this.imageObject.position.x = `${this.position.x}px`;
    // this.image.style.top = `${this.position.y}px`;
  }

  public removeBullet() {
    this.imageObject.visible = false;
  }

  public update(dt: number) {
    super.update(dt);
    if (
      this.imageObject.position?.x < 1 ||
      this.imageObject.position?.x > 499 ||
      this.imageObject.position?.y < 1 ||
      this.imageObject.position?.y > 499
    ) {
      this.removeBullet();
    }
  }
}
