// bird.ts
import * as ex from "excalibur";
export class Bird extends ex.Actor {
  constructor() {
    super({
      pos: ex.vec(200, 300),
      width: 16, // 일단은 회전을 볼 수 있도록 박스를 사용합니다
      height: 16, // 나중에 원형 콜라이더로 변경할 예정입니다
      color: ex.Color.Yellow,
    });
  }
}
