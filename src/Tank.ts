import { MoveEngine } from "./MoveEngine";
import { Point } from "./types";
import { Bullet } from "./bullet";
import { MoveAbleObject } from "./MoveAbleObject";


export class Tank extends MoveAbleObject {
    private _bullet: Bullet;

    constructor(isPlayer: boolean = false) {
        super(isPlayer ? 'tank-1' : 'tank-2');
        
        if (isPlayer) {
            this._moveEngine = new MoveEngine(true);
            this._bullet = new Bullet();
            document.addEventListener('keydown',this.onKeyDown.bind(this))
            document.addEventListener('keyup',this.onKeyUp.bind(this))
        } else {
            this._moveEngine = new MoveEngine(false, true);
            this._bullet = new Bullet();
        }
        this._bullet.visible = false;
    }

    private onKeyDown() {
        
    }

    private onKeyUp(event: any) {
        if (event.keyCode === 32) {
            // Fire bullet.
            this.fireBullet();
        }
    }

    private fireBullet() {
        const direction = this._moveEngine.getDirection();
        this._bullet.triggerFire(this._position, {x: direction.x, y: direction.y})
    }
    
    public update(deltaTime: number) {
        // di chuyen
        this._moveEngine.update(deltaTime);
        this._move(deltaTime);
        this._bullet.update(deltaTime);
        // Update HP
    }
}