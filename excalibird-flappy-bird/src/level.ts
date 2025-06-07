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
import { PipeFactory } from "./pipe-factory";
import { Config } from "./config";

export class Level extends Scene {
  random = new ex.Random();
  pipeFactory = new PipeFactory(this, this.random, Config.PipeInterval);
  bird: Bird = new Bird(this);
  ground!: Ground;
  score: number = 0;
  best: number = 0;
  scoreLabel = new ex.Label({
    text: "Score: 0",
    x: 0,
    y: 0,
    z: 1,
    font: new ex.Font({
      size: 20,
      color: ex.Color.White,
    }),
  });
  bestLabel = new ex.Label({
    text: "Best: 0",
    x: 400,
    y: 0,
    z: 1,
    font: new ex.Font({
      size: 20,
      color: ex.Color.White,
      textAlign: ex.TextAlign.End,
    }),
  });
  startGameLabel = new ex.Label({
    text: "Tap to Start",
    x: 200,
    y: 200,
    z: 2,
    font: new ex.Font({
      size: 30,
      color: ex.Color.White,
      textAlign: ex.TextAlign.Center,
    }),
  });
  override onInitialize(engine: ex.Engine): void {
    this.add(this.bird);
    this.ground = new Ground(ex.vec(0, engine.screen.drawHeight - 64));
    this.add(this.ground);
    const topPipe = new Pipe(ex.vec(engine.screen.drawWidth, 150), "top");
    this.add(topPipe);
    const bottomPipe = new Pipe(ex.vec(engine.screen.drawWidth, 300), "bottom");
    this.add(bottomPipe);

    //this.pipeFactory.start();
    this.showStartInstructions();

    this.add(this.scoreLabel);
    this.add(this.bestLabel);
    const bestScore = localStorage.getItem("bestScore");
    if (bestScore) {
      this.best = +bestScore;
      this.setBestScore(this.best);
    } else {
      this.setBestScore(0);
    }
  }
  showStartInstructions() {
    this.startGameLabel.graphics.isVisible = true;
    this.engine.input.pointers.once("down", () => {
      this.reset();
      this.startGameLabel.graphics.isVisible = false;
      this.bird.start();
      this.pipeFactory.start();
      this.ground.start();
    });
  }
  reset() {
    this.bird.reset();
    this.pipeFactory.reset();
    this.score = 0;
    this.scoreLabel.text = `Score: ${this.score}`;
  }
  triggerGameOver() {
    this.pipeFactory.stop();
    this.bird.stop();
    this.ground.stop();
    this.showStartInstructions();
  }
  incrementScore() {
    this.scoreLabel.text = `Score: ${++this.score}`;
    this.setBestScore(this.score);
  }
  setBestScore(score: number) {
    if (score > this.best) {
      localStorage.setItem("bestScore", this.score.toString());
      this.best = score;
    }
    this.bestLabel.text = `Best: ${this.best}`;
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
