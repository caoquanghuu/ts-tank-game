import { Point } from "./types";

export class Bullet {
    private _bulletImage: HTMLDivElement = (document.getElementById('tank-bullet').cloneNode(true) as HTMLDivElement);
    private _bulletSpeed: number = 500;
    public _tankPosition : Point;
    private _isInput: boolean = false;
    private _bulletDirection: string;
    public _playerTank: HTMLDivElement = document.getElementById('game-container').firstChild as HTMLDivElement;

    constructor(isInput: boolean = false) {
        if (isInput) {
            document.addEventListener('keydown', this.fireBullet.bind(this));
        } else {
            //random fire bullet
        }
        this._isInput = isInput;
        
    }

    private fireBullet(event : any) {
        if (event === 32) {
            
        }
       
    }

    getBulletDirection () {
       
        switch (this._playerTank.style.transform) {
            case 'rotate(0deg)' || null :
                // up
                this._bulletDirection = 'up';
                break;
            case 'rotate(180deg)' :
                this._bulletDirection = 'down';
                break;
            case 'rotate(270deg)':
                this._bulletDirection = 'left';
                break;
            case 'rotate(90deg)':
                this._bulletDirection = 'right';
                break;
            case 'rotate(-45deg)':
                this._bulletDirection = 'up-left';
                break;
            case 'rotate(45)' :
                this._bulletDirection = 'up-right';
                break;
            case 'rotate(225deg)':
                this._bulletDirection = 'down-left';
                break;
            case 'rotate(135deg)':
                this._bulletDirection = 'down-right';
            
        }
    }
    public getTankPosition () {
        this._tankPosition.x = this._playerTank.offsetLeft;
        this._tankPosition.y = this._playerTank.offsetTop;
        return this._tankPosition;
    }

    public bulletMove(deltaTime: number) {
        let nextY : number;
        let nextX : number;
        switch (this._bulletDirection) {
            case 'up':
                nextY = this._tankPosition.y + this._bulletSpeed*deltaTime/1000*1;
                break;
            case 'down':
                nextY = this._tankPosition.y + this._bulletSpeed*deltaTime/1000*(-1);
                break;
            case 'left':
                nextX = this._tankPosition.x + this._bulletSpeed*deltaTime/1000*(-1);
                break;
            case 'right':
                nextX = this._tankPosition.x + this._bulletSpeed*deltaTime/1000*1;
                break;
            case 'up-left':
                nextY = this._tankPosition.y + this._bulletSpeed*deltaTime/1000*(1);
                nextX = this._tankPosition.x + this._bulletSpeed*deltaTime/1000*(-1);
                break;
            case 'up-right':
                nextX = this._tankPosition.x + this._bulletSpeed*deltaTime/1000*1;
                nextY = this._tankPosition.y + this._bulletSpeed*deltaTime/1000*1;
                break;
            case 'down-left':
                nextX = this._tankPosition.x + this._bulletSpeed*deltaTime/1000*(-1);
                nextY = this._tankPosition.y + this._bulletSpeed*deltaTime/1000*(-1);
                break;
            case 'down-right':
                nextY = this._tankPosition.y + this._bulletSpeed*deltaTime/1000*(-1);
                nextX = this._tankPosition.x + this._bulletSpeed*deltaTime/1000*1;
                break;
            default:                
        }
    }
    public update(deltaTime: number) {
        this.bulletMove(deltaTime);
    }
}