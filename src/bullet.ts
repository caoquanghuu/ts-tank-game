import { MoveAbleObject } from "./MoveAbleObject";
import { MoveEngine } from "./MoveEngine";
import { Point } from "./types";

export class Bullet extends MoveAbleObject {
    public _speed : number = 200;
    public isPlayerBullet: boolean;

    constructor(isPlayer: boolean) {
        super('tank-bullet');
        this._image.style.visibility = 'auto';
        this._moveEngine = new MoveEngine(false, false); 
        this.isPlayerBullet = isPlayer;
    }

    public triggerFire(position: Point, direction: Point) {
        this.visible = true;
        this.setBulletPosition(position , direction);
        this._moveEngine.setDirection(direction);
    }

    private setBulletPosition(position: Point, direction : Point) {

          if (direction.x === 0 && direction.y === 1)
            {
                this._position.x  = position.x + 25;
                this._position.y= position.y + 75;
            };
            if (direction.x === 0 && direction.y === -1)
            {
                this._position.x  = position.x + 25;
                this._position.y= position.y - 25;
            };
            if (direction.x === 1 && direction.y === 0)
            {
                this._position.x  = position.x + 75;
                this._position.y= position.y + 25;
            }
            if (direction.x === -1 && direction.y === 0)
            {
                this._position.x  = position.x - 25;
                this._position.y= position.y + 25;
            }
            if (direction.x === -1 && direction.y === -1)
            {
                this._position.x  = position.x - 15;
                this._position.y= position.y - 15;
            }
            if (direction.x === 1 && direction.y === 1)
            {
                this._position.x  = position.x + 65;
                this._position.y= position.y + 65;
            }
            if (direction.x === 1 && direction.y === -1)
            {
                this._position.x  = position.x + 65;
                this._position.y= position.y - 15;
            }
            if (direction.x === -1 && direction.y === 1)
            {
                this._position.x  = position.x - 15;
                this._position.y= position.y + 65;
            }

            this._image.style.left = `${this._position.x}px`;
            this._image.style.top = `${this._position.y}px`;
    }


    public removeBullet() {
        this.visible = false;
    }

    public update(dt: number) {
        super.update(dt)
        if ((this._position?.x < 1 || this._position?.x > 499) || (this._position?.y < 1 || this._position?.y > 499)) {
            this.removeBullet();
        }
    }
}