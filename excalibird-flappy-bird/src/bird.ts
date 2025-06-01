// bird.ts
import * as ex from "excalibur";
import { Ground } from "./ground";

export class Bird extends ex.Actor {
  constructor() {
    super({
      pos: ex.vec(200, 300),
      width: 16, // 일단은 회전을 볼 수 있도록 박스를 사용합니다
      height: 16, // 나중에 원형 콜라이더로 변경할 예정입니다
      color: ex.Color.Yellow,
    });
  }

  /**
   * `onInitialize`는 액터의 첫 번째 업데이트 이전에 호출됩니다. 이 메서드는 오버라이드하기 위한 것입니다.
   * 여기서 자식 액터들의 초기화가 이루어져야 합니다.
   *
   * 이벤트 핸들러 `.on('initialize', (evt) => {...})`와 동일합니다
   */
  override onInitialize(): void {
    this.acc = ex.vec(0, 1200); // 초당 픽셀 수 1200
  }

  /**
   * 두 엔티티가 ColliderComponent를 가지고 처음 충돌하거나 접촉할 때 한 번 발생합니다.
   * 콜라이더가 계속 접촉 상태를 유지하면 분리되어 다시 충돌할 때까지 발생하지 않습니다.
   * @param self
   * @param other
   * @param side
   * @param contact
   */
  override onCollisionStart(_self: ex.Collider, other: ex.Collider): void {
    if (other.owner instanceof Ground) {
      this.stop();
    }
  }

  start() {} // later we'll use this to start our bird after game over

  stop() {
    this.vel = ex.vec(0, 0); // 속도를 0으로 설정
    this.acc = ex.vec(0, 0); // 가속도를 0으로 설정
  } // later we'll use this to stop our bird after collision
}
