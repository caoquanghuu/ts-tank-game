import { Direction, Point } from "./types";
import { getDistanceOfTwoPosition } from "./util";

class PositionMap {
  // static
  private static _positions: Point[] = [];

  private static _countPositionOfTanks: number = 0;

  private _keyInStaticArrayPosition: number;

  constructor() {
    PositionMap._countPositionOfTanks += 1;
    this._keyInStaticArrayPosition = PositionMap._countPositionOfTanks;
  }

  get keyInStaticArrayPosition() {
    return this._keyInStaticArrayPosition;
  }

  public static setPositionMap(
    position: Point,
    keyInStaticArrayPosition: number
  ) {
    PositionMap._positions[keyInStaticArrayPosition - 1] = position;
  }

  public static getMoveDistance(
    currentPosition: Point,
    nextPosition: Point,
    isBullet: boolean
  ) {
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

    // kiem tra xem co phai bullet khong
    if (!isBullet) {
      // loai bo vi tri cua tank khoi position map
      let newPositionMap = PositionMap._positions;
      const i = newPositionMap.findIndex(
        (position) => position === currentPosition
      );
      delete newPositionMap[i];

      //kiem tra xem next position co gan voi cac tank khac khong
      const isNextPositionCloseWithOtherTank = newPositionMap.some(
        (positions) => {
          const distance = getDistanceOfTwoPosition(positions, nextPosition);
          if (distance <= 70) {
            return true;
          }
        }
      );

      if (isNextPositionCloseWithOtherTank) {
        return currentPosition;
      }
    }

    return nextPosition;
  }

  public static updateObjectPosition(/** */) {}
}

export { PositionMap };
