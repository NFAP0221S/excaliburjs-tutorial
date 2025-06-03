// pipe.ts
import * as ex from "excalibur";

export class Pipe extends ex.Actor {
  constructor(pos: ex.Vector, public type: "top" | "bottom") {
    super({
      pos,
      width: 32,
      height: 1000,
      anchor:
        type === "bottom"
          ? ex.vec(0, 0) // 0, 0은 왼쪽 끝에서 0, 0은 왼쪽 끝에서
          : ex.vec(0, 1), // 0, 1은 아래쪽 끝에서 0, 1은 아래쪽 끝에서
      color: ex.Color.Green,
      vel: ex.vec(-200, 0),
      z: -1, // -1은 모든 것 아래에 있음
    });

    this.on("exitviewport", () => this.kill()); // 파이프가 화면을 벗어나면 제거
  }
}
