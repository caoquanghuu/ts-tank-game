import { MoveAbleObject } from "./MoveAbleObject";
import { MoveEngine } from "./MoveEngine";
import { Point } from "./types";

export class Bullet extends MoveAbleObject {

    constructor() {
        super('tank-bullet');
        this._image.style.visibility = 'auto';
        this._moveEngine = new MoveEngine(false, false);
    }

    set visible(visible: boolean) {
        this._image.style.display = visible ? 'inherit' : 'none';
    }

    public triggerFire(position: Point, direction: Point) {
        this.visible = true;
        this.setPosition(position);
        this._moveEngine.setDirection(direction);
    }
}