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

    set visible(visible: boolean) {
        this._image.style.display = visible ? 'inherit' : 'none';
    }

    get visible() {
        return this._image.style.display !== 'none'
    }

    public triggerFire(position: Point, direction: Point) {
        this.visible = true;
        this.setBulletPosition(position , direction);
        this._moveEngine.setDirection(direction);
    }

    public setBulletPosition(position: Point, direction : Point) {
          this._position = position; 

            if (direction.x === 0 && direction.y === 1)
            {
                this._image.style.left  = `${position.x + 25}px`;
                this._image.style.top= `${position.y + 75}px`;
            };
            if (direction.x === 0 && direction.y === -1)
            {
                this._image.style.left  = `${position.x + 25}px`;
                this._image.style.top= `${position.y -25}px`;
            };
            if (direction.x === 1 && direction.y === 0)
            {
                this._image.style.left  = `${position.x + 75}px`;
                this._image.style.top= `${position.y + 25}px`;
            }
            if (direction.x === -1 && direction.y === 0)
            {
                this._image.style.left  = `${position.x - 25}px`;
                this._image.style.top= `${position.y + 25}px`;
            }
            if (direction.x === -1 && direction.y === -1)
            {
                this._image.style.left  = `${position.x - 15}px`;
                this._image.style.top= `${position.y - 15}px`;
            }
            if (direction.x === 1 && direction.y === 1)
            {
                this._image.style.left  = `${position.x + 65}px`;
                this._image.style.top= `${position.y + 65}px`;
            }
            if (direction.x === 1 && direction.y === -1)
            {
                this._image.style.left  = `${position.x +65}px`;
                this._image.style.top= `${position.y - 15}px`;
            }
            if (direction.x === -1 && direction.y === 1)
            {
                this._image.style.left  = `${position.x - 15}px`;
                this._image.style.top= `${position.y + 65}px`;
            }
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