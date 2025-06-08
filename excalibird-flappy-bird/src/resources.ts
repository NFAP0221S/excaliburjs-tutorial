import { ImageSource, Loader } from "excalibur";
import * as ex from "excalibur";

// 리소스를 한 곳에 모아두면 관리하기 편리합니다.
export const Resources = {
  // Sword: new ImageSource("./images/sword.png"), // Vite public/ directory serves the root images
  BirdImage: new ex.ImageSource("./images/bird.png"),
} as const;
// 'as const'는 타입스크립트에서 리소스에 강한 타입을 부여하는 유용한 트릭입니다.
// 그래서 Resources.Sword를 입력하면 ImageSource 타입이 됩니다.

// 우리는 로더를 만들고 모든 리소스를 부트 로더에 추가합니다.
// DefaultLoader를 확장하여 직접 로더를 만들 수도 있습니다.
export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
