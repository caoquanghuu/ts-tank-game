import { Tank } from "./Tank";
import { Bullet } from "./bullet";
import { Point } from "./types";
// import { Bullet } from "./bullet";
import { getRandomArbitrary } from "./util";
const FPS = 60;

export class Game {
    private _tanks: Tank[] = []

    public _player: Tank;

    private _enemies: Tank[] = [];

    private _playerHP: number = 5;
    private  _playerScore: number = 0;

    private _scoreBar = <HTMLDivElement>(document.getElementById('current-score'));
    private _HPBar = <HTMLDivElement>(document.getElementById('current-hp'))

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

        this._tanks.forEach(tank => tank.update(deltaTime));

        this.checkCollision();
        this.checkCollisionOfTanks();
    }

    checkCollisionOfTanks() {
        const cloneTanks = this._tanks.map(tank => tank);
        this._tanks.forEach(tank => {
            const isCollision = cloneTanks.some(cloneTank =>  this.checkTanksPosition(cloneTank, tank));
            if (isCollision) {
                // co van cham giua cac tank
                console.log('co va cham giua cac tanks');
            }
        })
    }

    checkTanksPosition(cloneTank : Tank, tank : Tank) {
        const pos1 = cloneTank._position;
        const pos2 = tank._position;

        const r = 100;

        const distance = Math.sqrt(Math.pow((pos1.x - pos2.x), 2) + Math.pow((pos1.y - pos2.y), 2));

        if(distance === 0) {
            return false;
        } else if (distance <= r) {
            return true;
        }

        return false;
    }



    checkCollision() {
        const bullets = this._tanks.map(tank => tank._bullet);
        this._tanks.forEach(tank => {
            // tank._position
            const isCollision =  bullets.some(bullet => this.ktraVaCham(bullet, tank));
            if (isCollision) {
                // tank.die();
                console.log('co va cham');
                this.tankDie(tank);
            }
        });
    }

    ktraVaCham(bullet: Bullet, tank: Tank ) {
        const pos1 = tank._position;
        const pos2 = bullet._position;
        bullet;
        tank;

        // dan ko hien tren man hinh.
        if (!bullet.visible) {
            return false;
        }

        // bullet & tank deu la bot 
        if (tank.isPlayerTank === false && bullet.isPlayerBullet === false) {
            return false;
        }

        // bullet & tank deu la player
        if (tank.isPlayerTank === true && bullet.isPlayerBullet === true) {
            return false;
        }
       
        const r = 50;
        const distance = Math.sqrt(Math.pow((pos1.x - pos2.x), 2) + Math.pow((pos1.y - pos2.y), 2))
        // console.log(distance);
        if (distance <= r) {
            bullet.removeBullet();
            return true;
        }
        return false;
    }

    private tankDie(tankDie : Tank) {
       
       const isEneTankDie = this._enemies.some(tank => tank === tankDie);

       // update tank hp
        if (this._player === tankDie) {
            this._playerHP -= 1;
            this.updateHP();
        }

       if (this._playerHP === 0) {
            const p = this._tanks.findIndex(tank => tank === this._player)
            this._tanks.splice(p, 1);
       }

       if(isEneTankDie) {
            this._playerScore += 1;
            this.updateScore();

            const a = this._tanks.findIndex(tank => tank === tankDie);
            this._tanks.splice(a, 1);

            const b = this._enemies.findIndex(tank => tank === tankDie);
            this._enemies.splice(b, 1);

            tankDie.visible = false;
            tankDie._bullet.visible = false;
            tankDie.tankStatus = false;
       }

       
    }

    private spawnEnemy() {
        const newEne = new Tank();
        newEne.setPosition({x: getRandomArbitrary(1,499) , y: getRandomArbitrary(1, 499)});
        
        this._enemies.push(newEne);
        this._tanks.push(newEne);

        setTimeout(() => {this.spawnEnemy();}, 30000);
    }

    private updateScore() {
        this._scoreBar.innerHTML = `${this._playerScore}`;
    }

    private updateHP() {
        this._HPBar.innerHTML = `${this._playerHP}`;
    }
}


window.onload = () => {
    new Game();
}