import { Tank } from "./Tank";
import { Bullet } from "./bullet";
import { getRandomArbitrary } from "./util";
const FPS = 60;

export class Game {
    private _tanks: Tank[] = []

    public _player: Tank;
    private _playerTankBullet: Bullet[];
    private _enemies: Tank[] = [];
    private _enemiesTankBullet: Bullet[];

    constructor() {
        // Khoi tao update
        setInterval(this.update.bind(this, 1000 / FPS), 1000 / FPS)

        // khoi tao doi tuong
        this._player = new Tank(true);

        // this.spawnEnemy();

        const ene1 = new Tank();
        ene1.setPosition({ x: 0, y: 100});

        this._enemies.push(ene1);
        
        this._tanks.push(...this._enemies);
        this._tanks.push(this._player);
    }

    update(deltaTime: number) {
        // Moi frame, update se dc goi 1 lan. => 60 lan 1s
        // delta time la thoi gian moi frame

        // console.log(deltaTime)
        this._tanks.forEach(tank => tank.update(deltaTime));
    }

    private spawnEnemy() {
        const newEne = new Tank();
        newEne.setPosition({x: getRandomArbitrary(1,499) , y: getRandomArbitrary(1, 499)});
        
        this._enemies.push(newEne);
        this._tanks.push(...this._enemies);

        setTimeout(() => {this.spawnEnemy();},10000);
    }

}


window.onload = () => {
    new Game();
}