import {
  DefaultLoader,
  Engine,
  ExcaliburGraphicsContext,
  Scene,
  SceneActivationContext,
} from "excalibur";
import { Player } from "./player";

export class MyLevel extends Scene {
  override onInitialize(engine: Engine): void {
    // 게임의 구성 요소를 설정하는 곳으로 이 메서드에서 작업하는 것을 권장합니다.
    const player = new Player();
    this.add(player); // Actors need to be added to a scene to be drawn
  }

  override onPreLoad(loader: DefaultLoader): void {
    // 이 씬에서만 필요한 리소스를 여기에 추가해서 로드할 수 있습니다.
  }

  override onActivate(context: SceneActivationContext<unknown>): void {
    // Excalibur가 이 씬으로 전환될 때 호출됩니다.
    // 한 번에 하나의 씬만 활성화됩니다.
  }

  override onDeactivate(context: SceneActivationContext): void {
    // Excalibur가 이 씬에서 다른 씬으로 전환될 때 호출됩니다.
    // 한 번에 하나의 씬만 활성화됩니다.
  }

  override onPreUpdate(engine: Engine, elapsedMs: number): void {
    // 씬에서 어떤 업데이트가 일어나기 전에 호출됩니다.
  }

  override onPostUpdate(engine: Engine, elapsedMs: number): void {
    // 씬에서 모든 업데이트가 끝난 후 호출됩니다.
  }

  override onPreDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
    // Excalibur가 화면에 그리기 전에 호출됩니다.
  }

  override onPostDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
    // Excalibur가 화면에 그린 후 호출됩니다.
  }
}
