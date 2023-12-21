import { Tank } from "./Tank";

const FPS = 60;

class Game {
    private _tanks: Tank[] = []

    private _player: Tank;
    private _enemies: Tank[] = [];

    constructor() {
        // Khoi tao update
        setInterval(this.update.bind(this, 1000 / FPS), 1000 / FPS)

        // khoi tao doi tuong
        this._player = new Tank(true);

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
}


window.onload = () => {
    new Game();
}