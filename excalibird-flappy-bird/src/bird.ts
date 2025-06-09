// bird.ts
import * as ex from "excalibur";
import { Ground } from "./ground";
import { Pipe } from "./pipe";
import { Config } from "./config";
import { Level } from "./level";
import { Resources } from "./resources";

export class Bird extends ex.Actor {
  jumping = false;
  playing = false;
  upAnimation!: ex.Animation;
  downAnimation!: ex.Animation;

  startSprite!: ex.Sprite;

  constructor(private level: Level) {
    super({
      pos: Config.BirdStartPos,
      // width: 16,
      // height: 16,
      radius: 8,
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
    // Slice up image into a sprite sheet
    const spriteSheet = ex.SpriteSheet.fromImageSource({
      image: Resources.BirdImage,
      grid: {
        rows: 1,
        columns: 4,
        spriteWidth: 32,
        spriteHeight: 32,
      },
    });
    this.startSprite = spriteSheet.getSprite(1, 0);

    // Animation to play going up on tap
    this.upAnimation = ex.Animation.fromSpriteSheet(
      spriteSheet,
      [2, 1, 0], // 3rd frame, then 2nd, then first
      150, // 150ms for each frame
      ex.AnimationStrategy.Freeze
    );
    // Animation to play going down
    this.downAnimation = ex.Animation.fromSpriteSheet(
      spriteSheet,
      [0, 1, 2],
      150,
      ex.AnimationStrategy.Freeze
    );
    // Register animations by name
    this.graphics.add("down", this.downAnimation);
    this.graphics.add("up", this.upAnimation);
    this.graphics.add("start", this.startSprite);

    this.graphics.use("start");

    this.on("exitviewport", () => {
      this.level.triggerGameOver();
    });
  }

  private isInputActive(engine: ex.Engine) {
    // 스페이스바나 첫 번째 포인터가 눌려있는지 확인
    return (
      engine.input.keyboard.isHeld(ex.Keys.Space) ||
      engine.input.pointers.isDown(0)
    );
  }

  /**
   * onPostUpdate 라이프사이클 이벤트 핸들러를 안전하게 오버라이드할 수 있습니다. `.on('postupdate', (evt) =>{...})`와 동일합니다
   *
   * `onPostUpdate`는 액터가 업데이트된 직후에 호출됩니다.
   * @param engine 현재 게임 엔진에 대한 참조
   * @param elapsed 마지막 업데이트 이후 경과된 시간(밀리초)
   */
  override onPostUpdate(engine: ex.Engine): void {
    if (!this.playing) return;
    if (!this.jumping && this.isInputActive(engine)) {
      this.vel.y += -800; // 음수는 위로 올라가는 것을 의미
      this.jumping = true;
    }
    if (!this.isInputActive(engine)) {
      this.jumping = false;
    }
    // 속도가 너무 커지지 않도록 제한
    this.vel.y = ex.clamp(this.vel.y, -500, 500);
    // 파이프와 관련된 bird의 속도
    this.rotation = ex.vec(200, this.vel.y).toAngle();
  }

  start() {
    this.playing = true;
    this.pos = Config.BirdStartPos; // starting position
    this.acc = ex.vec(0, Config.BirdAcceleration); // pixels per second per second
  }
  reset() {
    this.pos = Config.BirdStartPos; // starting position
    this.stop();
  }
  stop() {
    this.playing = false;
    this.vel = ex.vec(0, 0); // 속도를 0으로 설정
    this.acc = ex.vec(0, 0); // 가속도를 0으로 설정
  } // later we'll use this to stop our bird after collision

  /**
   * 두 엔티티가 ColliderComponent를 가지고 처음 충돌하거나 접촉할 때 한 번 발생합니다.
   * 콜라이더가 계속 접촉 상태를 유지하면 분리되어 다시 충돌할 때까지 발생하지 않습니다.
   * @param self
   * @param other
   * @param side
   * @param contact
   */
  // override onCollisionStart(_self: ex.Collider, other: ex.Collider): void {
  //   if (other.owner instanceof Ground || other.owner instanceof Pipe) {
  //     this.stop();
  //   }
  // }
  override onCollisionStart(_self: ex.Collider, other: ex.Collider): void {
    if (other.owner instanceof Pipe || other.owner instanceof Ground) {
      this.level.triggerGameOver();
    }
  }
}
