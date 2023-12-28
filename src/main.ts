import { Tank } from "./Tank";
import { Bullet } from "./bullet";
import { Point } from "./types";
// import { Bullet } from "./bullet";
import { getRandomArbitrary } from "./util";
const FPS = 60;

export class Game {
    private _tanks: Tank[] = []

    public _player: Tank;
    // private _playerTankBullet: Bullet[];
    private _enemies: Tank[] = [];
    // private _enemiesTankBullet: Bullet[];

    constructor() {
        // Khoi tao update
        setInterval(this.update.bind(this, 1000 / FPS), 1000 / FPS)

        // khoi tao doi tuong
        this._player = new Tank(true);

        this.spawnEnemy();

        this._tanks.push(this._player);
    }

    update(deltaTime: number) {
        // Moi frame, update se dc goi 1 lan. => 60 lan 1s
        // delta time la thoi gian moi frame

        // console.log(deltaTime)
        this._tanks.forEach(tank => tank.update(deltaTime));

        this.checkCollision();
    }

    checkCollision() {
        const bullets = this._tanks.map(tank => tank._bullet);
        this._tanks.forEach(tank => {
            // tank._position
            const isCollision =  bullets.some(bullet => this.ktraVaCham(bullet, tank));
            if (isCollision) {
                // tank.die();
                console.log('co va cham')
            }
        });
    }

    ktraVaCham(bullet: Bullet, tank: Tank ) {
        const pos1 = tank._position;
        const pos2 = bullet._position;

        // dan ko hien tren man hinh.
        if (!bullet.visible) {
            return false;
        }

        // bullet & tank deu la bot
        if (tank.isPlayerTank && tank._bullet.isPlayerBullet === false) {
            return false;
        }

        // bullet & tank deu la player
        if (tank.isPlayerTank  && tank._bullet.isPlayerBullet === true) {
            return false;
        }


        const r = 50;
        const distance = Math.sqrt(Math.pow((pos1.x - pos2.x), 2) + Math.pow((pos1.y - pos2.y), 2))
        // console.log(distance);
        if (distance <= r) {
            return true;
        }
        return false;
    }

    private spawnEnemy() {
        const newEne = new Tank();
        newEne.setPosition({x: getRandomArbitrary(1,499) , y: getRandomArbitrary(1, 499)});
        
        this._enemies.push(newEne);
        this._tanks.push(newEne);

        setTimeout(() => {this.spawnEnemy();}, 30000);
    }
}


window.onload = () => {
    new Game();
}