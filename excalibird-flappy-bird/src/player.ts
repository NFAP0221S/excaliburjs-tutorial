import {
  Actor,
  Collider,
  CollisionContact,
  Engine,
  Side,
  vec,
} from "excalibur";
import { Resources } from "./resources";

// Actor는 화면에 그리고 움직이고 싶은 모든 것을 만들 때 주로 사용하는 기본 단위입니다.
// 여기에는 사용할 수 있는 많은 유용한 컴포넌트들이 포함되어 있습니다

// actor.transform
// actor.motion
// actor.graphics
// actor.body
// actor.collider
// actor.actions
// actor.pointer
// Actor에는 다양한 유용한 컴포넌트가 포함되어 있습니다.
// actor.transform
// actor.motion
// actor.graphics
// actor.body
// actor.collider
// actor.actions
// actor.pointer

export class Player extends Actor {
  constructor() {
    super({
      // Actor에 이름을 지정하는 것은 선택 사항이지만, 디버깅이나 개발자 도구, 디버그 모드에서 도움이 됩니다.
      // https://github.com/excaliburjs/excalibur-extension/
      // Chrome: https://chromewebstore.google.com/detail/excalibur-dev-tools/dinddaeielhddflijbbcmpefamfffekc
      // Firefox: https://addons.mozilla.org/en-US/firefox/addon/excalibur-dev-tools/
      name: "Player",
      pos: vec(150, 150),
      width: 100,
      height: 100,
      // anchor: vec(0, 0), // Actors default center colliders and graphics with anchor (0.5, 0.5)
      // collisionType: CollisionType.Active, // Collision Type Active means this participates in collisions read more https://excaliburjs.com/docs/collisiontypes
    });
  }

  override onInitialize() {
    // 일반적으로 로직은 "On initialize"에 작성하는 것이 좋습니다.
    // 이 메서드는 첫 업데이트 전에 실행됩니다.
    // 다음과 같은 경우에 유용합니다:
    // 1. 그래픽을 위한 이미지 등 리소스가 로드되어야 할 때
    // 2. excalibur가 초기화되고 시작된 후에 동작해야 할 때
    // 3. 생성자에서가 아니라 런타임에 로직을 실행하고 싶을 때
    // 4. 지연 초기화가 필요할 때
    this.graphics.add(Resources.Sword.toSprite());

    // actions는 적의 순찰 등 반복적인 행동을 스크립트로 작성할 때 유용합니다.
    this.actions.delay(2000);
    this.actions.repeatForever((ctx) => {
      ctx.moveBy({ offset: vec(100, 0), duration: 1000 });
      ctx.moveBy({ offset: vec(0, 100), duration: 1000 });
      ctx.moveBy({ offset: vec(-100, 0), duration: 1000 });
      ctx.moveBy({ offset: vec(0, -100), duration: 1000 });
    });

    // 가끔 Actor를 클릭하고 싶을 때가 있습니다!
    // 포인터 이벤트는 z 순서대로 화면에서 아래로 전달되며, 원하면 취소할 수 있습니다.
    // if (true) {
    //   evt.cancel();
    // }
    this.on("pointerdown", (evt) => {
      console.log("You clicked the actor @", evt.worldPos.toString());
    });
  }

  override onPreUpdate(engine: Engine, elapsedMs: number): void {
    // 매 프레임마다 Actor의 내장 동작 전에 실행되는 업데이트 로직을 여기에 작성하세요.
  }

  override onPostUpdate(engine: Engine, elapsedMs: number): void {
    // 매 프레임마다 Actor의 내장 동작 이후에 실행되는 업데이트 로직을 여기에 작성하세요.
  }

  override onPreCollisionResolve(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact
  ): void {
    // 충돌이 해결되기 전에 호출되며, 이 충돌을 무시하고 싶으면 contact.cancel()을 호출하세요.
  }

  override onPostCollisionResolve(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact
  ): void {
    // 충돌이 해결되고 겹침이 해소될 때마다 호출됩니다.
  }

  override onCollisionStart(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact
  ): void {
    // 두 객체가 접촉할 때마다 호출됩니다.
  }

  override onCollisionEnd(
    self: Collider,
    other: Collider,
    side: Side,
    lastContact: CollisionContact
  ): void {
    // 두 객체가 분리될 때마다 호출됩니다.
  }
}
