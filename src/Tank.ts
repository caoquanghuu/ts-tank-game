// import { MoveEngine } from "./MoveEngine";
import { Point } from "./types";
// import { Bullet } from "./bullet";
import { MoveAbleObject } from "./MoveAbleObject";



export class Tank extends MoveAbleObject {

    public _moveAbleObject : MoveAbleObject;
    
    // private _bullet : Bullet;

    constructor(isPlayer: boolean = false) {  
        super()
        if (isPlayer) {
            this._image = (document.getElementById('tank-1').cloneNode(true) as HTMLDivElement);
        //     document.addEventListener('keydown',this.onKeyDown.bind(this))
        //     document.addEventListener('keyup',this.onKeyUp.bind(this))
            this._moveAbleObject = new MoveAbleObject(true);
        //     // this._bullet = new Bullet(true);
        } else {
            this._image = (document.getElementById('tank-2').cloneNode(true) as HTMLDivElement);
            this._moveAbleObject = new MoveAbleObject();
        //     // this._bullet = new Bullet(false);
        }
        
        document.getElementById('game-container').appendChild(this._image);
    }

    public update(deltaTime: number) {
        // di chuyen
        this._moveAbleObject.update(deltaTime);
        super._move(deltaTime);
        // this._bullet.update(deltaTime);
        // Update HP

        // 
    }

    // public _getTankDirection() {
    //     return this._moveEngine.getDirection();
    // }

    // public _getTankPosition () {
    //     this._tankPosition.y = Number.parseInt(this._image.style.top);
    //     this._tankPosition.x = Number.parseInt(this._image.style.left);
    //     return this._tankPosition;
    // }
}