import { gsap } from "gsap";
import { Paths } from "../assets/Constants";

export const carSpeedAnimation = (car: any, callBack?: any) => {
  return gsap.to(car, {
    y: 5,
    yoyo: true,
    repeat: -1,
    duration: 0.2,
    onComplete: () => callBack,
  });
};

export const mountainAnimation = (
  mountain: any,
  width: number,
  callBack?: any
) => {
  var shiftSize = (width * 80) / 100;

  return gsap.to(mountain, {
    duration: 12,
    zIndex: 1,
    delay: 2,
    x: -shiftSize,
    y: 380,
    scale: 7,
    repeat: -1,
    ease: "none",
  });
};

export const mountainRightAnimation = (mountain: any, width: number) => {
  var shiftSize = width + 200;
  return gsap.to(mountain, {
    duration: 15,
    delay: 2,
    x: shiftSize,
    y: 380,
    scale: 3,
    repeat: -1,
    ease: "none",
  });
};

export const planetRightAnimation = (planet: any, width: number) => {
  var shiftSize = (width * 80) / 100;
  return gsap.to(planet, {
    duration: 10,
    delay: 1.5,
    x: shiftSize,
    y: 380,
    scale: 3,
    repeat: -1,
    ease: "none",
  });
};

export const planetLeftAnimation = (planet: any, width: number) => {
  var shiftSize = width + 200;
  return gsap.to(planet, {
    duration: 10,
    delay: 1.5,
    x: -shiftSize,
    y: 380,
    scale: 4,
    repeat: -1,
    ease: "none",
  });
};

export const enemyCenterCarAnimation = (enemyCar: any, width: number) => {
  return gsap.to(enemyCar, {
    duration: 4,
    x: 0,
    y: 380,
    scale: 4,
    repeat: -1,
    ease: "none",
  });
};
export const enemyLeftCarAnimation = (enemyCar: any, width: number) => {
  var shiftSize = (width * 40) / 100;
  return gsap.to(enemyCar, {
    duration: 4,
    x: -shiftSize,
    y: 380,
    scale: 4,
    repeat: -1,
    ease: "none",
  });
};

export const enemyRightCarAnimation = (enemyCar: any, width: number) => {
  var shiftSize = (width * 40) / 100;
  return gsap.to(enemyCar, {
    duration: 4,
    x: shiftSize,
    y: 380,
    scale: 4,
    repeat: -1,
    ease: "none",
  });
};
export const changePath = (
  car: any,
  path: string,
  currentPosition: string,
  prevPath: string,
  width: number,
  callBack?: any
) => {
  var numb = currentPosition.match(/\d/g);
  var shiftSize = (width * 14) / 100;
  var pos = Number(numb?.join(""));
  if (path === Paths.LEFT && Paths.RIGHT === prevPath) {
    return gsap.to(car, {
      x: 0,
      duration: 0.2,
      onComplete: () => callBack,
    });
  } else if (path === Paths.RIGHT && Paths.LEFT === prevPath) {
    return gsap.to(car, {
      x: 0,
      duration: 0.2,
      onComplete: () => callBack,
    });
  } else if (path === Paths.LEFT && Paths.CENTER === prevPath) {
    return gsap.to(car, {
      x: pos - shiftSize,
      duration: 0.2,
      onComplete: () => callBack,
    });
  } else if (path === Paths.RIGHT && Paths.CENTER === prevPath) {
    return gsap.to(car, {
      x: pos + shiftSize,
      duration: 0.2,
      onComplete: () => callBack,
    });
  } else if (path === Paths.LEFT && path !== prevPath) {
    return gsap.to(car, {
      x: pos - shiftSize,
      duration: 0.2,
      onComplete: () => callBack,
    });
  } else if (path === Paths.RIGHT && path !== prevPath) {
    return gsap.to(car, {
      x: pos + shiftSize,
      duration: 0.2,
      onComplete: () => callBack,
    });
  }
};
