import { Point } from "./types";
import { Tank } from "./Tank";
import { Game } from "./main";
import { MoveEngine } from "./MoveEngine";
import { MoveAbleObject } from "./MoveAbleObject";

export class Bullet extends MoveAbleObject{
    // private _directionChangeTime = 1000;

    // private  : HTMLDivElement;
    
    // private _bulletSpeed: number = 500;
    
    // public _tankPosition : Point;

    // private _isInput : boolean = false;

    // public _tank : Tank;
    public _moveAbleObject : MoveAbleObject;

    constructor(isInput: boolean = false) {
        super()
        this._image = (document.getElementById('tank-bullet').cloneNode(true) as HTMLDivElement);
        
        if (isInput) {
            //player fire bullet
            document.addEventListener('keydown', this.fireBullet.bind(this));
        } else {
            //random fire bullet
            document.getElementById('game-container').appendChild(this._image);
        }
        
        this._isInput = isInput;
    }

    private fireBullet(event : any) {
        if (event === 32) {
            this._move(16);
        }
       
    }

    // private getBulletDirection () {
    //    return this._tank._getTankDirection();
     
    // }

    // private getBulletStartPosition () {
    //     return this._tank._getTankPosition();
    // }

    public update(deltaTime: number) {
        // di chuyen
        super._move(deltaTime);
    }
}