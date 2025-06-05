import { Color, DisplayMode, Engine, FadeInOut } from "excalibur";
import { loader } from "./resources";
import { Level } from "./level";
import * as ex from "excalibur";
import { Bird } from "./bird";
import { Ground } from "./ground";
import { Pipe } from "./pipe";

// main.ts 파일은 엔진을 설정하는 최소한의 코드만 작성하여 작게 유지하는 것이 목표입니다.

const game = new Engine({
  width: 400, // 논리적 게임 픽셀 단위의 너비와 높이
  height: 500,
  backgroundColor: ex.Color.fromHex("#54C0CA"),
  pixelArt: true, // 픽셀아트 모드는 픽셀 아트가 깨끗하게 보이도록 적절한 설정을 켜줍니다
  pixelRatio: 2,

  displayMode: DisplayMode.FitScreenAndFill, // excalibur가 창을 어떻게 채울지 결정하는 디스플레이 모드
  scenes: { Level: Level },

  // physics: {
  //   solver: SolverStrategy.Realistic,
  //   substep: 5 // 더 견고한 물리 시뮬레이션을 위한 서브스텝
  // },
  // fixedUpdateTimestep: 16 // 일관된 물리 시뮬레이션이 중요할 때 고정 업데이트 타임스텝 사용
});

const bird = new Bird();
game.add(bird);

// drawHeight는 게임 픽셀 단위로 표시되는 화면의 높이입니다
const ground = new Ground(ex.vec(0, game.screen.drawHeight - 64));
game.add(ground);

const topPipe = new Pipe(ex.vec(game.screen.drawWidth, 150), "top"); // 150은 파이프의 높이
game.add(topPipe);
const bottomPipe = new Pipe(ex.vec(game.screen.drawWidth, 300), "bottom"); // 300은 파이프의 높이
game.add(bottomPipe);

game.start().then(() => {
  game.goToScene("Level");
});

// game
//   .start("start", {
//     // name of the start scene 'start'
//     loader, // Optional loader (but needed for loading images/sounds)
//     inTransition: new FadeInOut({
//       // Optional in transition
//       duration: 1000,
//       direction: "in",
//       color: Color.ExcaliburBlue,
//     }),
//   })
//   .then(() => {
//     // Do something after the game starts
//     // 게임이 시작된 후 실행할 코드를 여기에 작성하세요
//   });
