import { MoveEngine } from "./MoveEngine";
import { Point } from "./types";
import { Bullet } from "./bullet";
import { MoveAbleObject } from "./MoveAbleObject";
import { getRandomArbitrary } from "./util";

export class Tank extends MoveAbleObject {
    public _bullet: Bullet;
    public isPlayerTank : boolean;
    public tankStatus : boolean = true; // alive = true, die = false.
   

    constructor(isPlayer: boolean = false) {
        super(isPlayer ? 'tank-1' : 'tank-2');
        this.isPlayerTank = isPlayer;
        if (isPlayer) {
            this._moveEngine = new MoveEngine(true);
            this._bullet = new Bullet(true);

            document.addEventListener('keydown',this.onKeyDown.bind(this))
            document.addEventListener('keyup',this.onKeyUp.bind(this)) 
        } else {
            this._moveEngine = new MoveEngine(false, true);
            this._bullet = new Bullet(false);
           
                this.startFireBullet();

            // setInterval(() => {this.fireBullet()},getRandomArbitrary(5000,10000))
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

    public startFireBullet() {
        if (this.tankStatus) {
            setInterval(() => {this.fireBullet()},2000);
        }
        
    }

    private fireBullet() {
        // const direction = this.getLastDirection();
        const direction = this.lastDirection;
        this._bullet.triggerFire(this._position, {x: direction.x, y: direction.y})
    }
    
    public update(deltaTime: number) {
        // di chuyen
            this._moveEngine.update(deltaTime);
        this._move(deltaTime);
        this._bullet.update(deltaTime);
        this.tankStatus;
        
        // Update HP
    }


}