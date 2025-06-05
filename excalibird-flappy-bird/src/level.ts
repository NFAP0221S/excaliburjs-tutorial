import {
  DefaultLoader,
  Engine,
  ExcaliburGraphicsContext,
  Scene,
  SceneActivationContext,
} from "excalibur";
import * as ex from "excalibur";
import { Bird } from "./bird";
import { Ground } from "./ground";
import { Pipe } from "./pipe";

export class Level extends Scene {
  bird: Bird = new Bird();
  ground!: Ground;
  override onInitialize(engine: ex.Engine): void {
    this.add(this.bird);
    this.ground = new Ground(ex.vec(0, engine.screen.drawHeight - 64));
    this.add(this.ground);
    const topPipe = new Pipe(ex.vec(engine.screen.drawWidth, 150), "top");
    this.add(topPipe);
    const bottomPipe = new Pipe(ex.vec(engine.screen.drawWidth, 300), "bottom");
    this.add(bottomPipe);
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
