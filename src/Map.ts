import { Direction, Point } from "./types";

class PositionMap {
    // static
  private static _positions: Point[] = [];

  public static getMoveDistance(position: Point, nextPosition: Point, isBullet: boolean = false) {

    // if _positions have some position which too close to nextPosition
    // so nextPosition ...
    // if distance < 50 -> can't move
    // if distance >=50 so nextPosition be this position



    if (nextPosition.x < 0) {
      // cham trai
      nextPosition.x = 0;
    }
    if (nextPosition.x > 500) {
      // cham phai
      nextPosition.x = 500;
    }

    if (nextPosition.y < 0) {
      // cham tren
      nextPosition.y = 0;
    }
    if (nextPosition.y > 500) {
      nextPosition.y = 500;
    }
    return nextPosition;
  }

  public static updateObjectPosition(/** */) {

  }
}


export {
    PositionMap
};