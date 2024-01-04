import { MoveEngine } from "./MoveEngine";
import { Bullet } from "./bullet";
import { MoveAbleObject } from "./MoveAbleObject";
import { getRandomArbitrary } from "./util";
import { Point } from "./types";

export class Tank extends MoveAbleObject {
  private _bullet: Bullet;
  private _isPlayerTank: boolean;
  private _tankStatus: boolean = true; // alive = true, die = false.
  private _isCollisionWithOtherTanks: boolean = false;

  constructor(isPlayer: boolean = false) {
    super(isPlayer ? "tank-1" : "tank-2");

    this._isPlayerTank = isPlayer;

    if (isPlayer) {
      this.moveEngine = new MoveEngine(true);
      this._bullet = new Bullet(true);

      document.addEventListener("keyup", this.onKeyUp.bind(this));
    } else {
      this.moveEngine = new MoveEngine(false, true);
      this._bullet = new Bullet(false);

      setInterval(() => {
        this.fireBullet();
      }, getRandomArbitrary(5000, 10000));
    }

    this._bullet.visible = false;
  }

  get bullet() {
    return this._bullet;
  }

  get tankStatus() {
    return this._tankStatus;
  }

  get isPlayerTank() {
    return this._isPlayerTank;
  }

  get isCollisionWithOtherTanks() {
    return this._isCollisionWithOtherTanks;
  }

  set isPlayerTank(isPlayer: boolean) {
    this._isPlayerTank = isPlayer;
  }

  set tankStatus(status: boolean) {
    this._tankStatus = status;
  }

  set isCollisionWithOtherTanks(isCollision: boolean) {
    this._isCollisionWithOtherTanks = isCollision;
  }

  private onKeyUp(event: any) {
    if (event.keyCode === 32) {
      // Fire bullet.
      this.fireBullet();
    }
  }

  private fireBullet() {
    // const direction = this.getLastDirection();
    if (this.tankStatus) {
      const direction = this.lastDirection;
      this._bullet.triggerFire(this.position, {
        x: direction.x,
        y: direction.y,
      });
    }
  }

  private setNewDirectionForAiTankWhenHaveCollision() {
    if (!this._isPlayerTank) {
      if (this.isCollisionWithOtherTanks) {
        const lastDirection = this.moveEngine.direction;
        const newDirection: Point = {
          x: -lastDirection.x,
          y: -lastDirection.y,
        };
        this.moveEngine.direction = newDirection;
      }
    }
  }

  private disableAKeyBoard(keyName: string) {
    window.addEventListener("keydown", function (event) {
      if (event.key === keyName) {
        event.preventDefault();
        return false;
      }
    });
  }

  private disableKeyDownWhenPlayerTankHaveCollision() {
    if (this._isPlayerTank) {
      if (this.isCollisionWithOtherTanks) {
        if (this.lastDirection.x === 1 && this.lastDirection.y === 1) {
          this.disableAKeyBoard("ArrowRight");
          this.disableAKeyBoard("ArrowDown");
        }
      }
    }
  }

  public update(deltaTime: number) {
    // di chuyen
    this.moveEngine.update(deltaTime);
    this._move(deltaTime);
    this._bullet.update(deltaTime);
    // tank status
    this.tankStatus;
    this.setNewDirectionForAiTankWhenHaveCollision();
    this.disableKeyDownWhenPlayerTankHaveCollision();
  }
}
