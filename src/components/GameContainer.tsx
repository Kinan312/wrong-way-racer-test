import { useState, useEffect, useRef, useCallback } from "react";
import { CardMedia, Card } from "@mui/material";
import { gsap } from "gsap";
import { connect, useDispatch } from "react-redux";
import {
  carSpeedAnimation,
  changePath,
  enemyCenterCarAnimation,
  enemyLeftCarAnimation,
  enemyRightCarAnimation,
  mountainAnimation,
  mountainRightAnimation,
  planetLeftAnimation,
  planetRightAnimation,
} from "../utils/carAnimations";
import { Paths } from "../assets/Constants";
import { changePathState } from "../store/reducers/PlayersReducers";
import "../styles/GameContainer.css";
import skyImg from "../assets/sky.png";
import landImg from "../assets/road.png";

function GameContainer(props: any) {
  const [carClass, setCarClass] = useState({
    style: "carCenter",
    carPath: Paths.CENTER,
  });
  const gameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const planetR = useRef() as React.MutableRefObject<HTMLInputElement>;
  const planetL = useRef() as React.MutableRefObject<HTMLInputElement>;
  const mountainR = useRef() as React.MutableRefObject<HTMLInputElement>;
  const mountainL = useRef() as React.MutableRefObject<HTMLInputElement>;
  const carC = useRef() as React.MutableRefObject<HTMLInputElement>;
  const enemyC = useRef() as React.MutableRefObject<HTMLInputElement>;
  const dispatch = useDispatch();

  const renderChangedPath = useCallback(
    (enemyPath: string, car: any) => {
      if (enemyPath === Paths.CENTER && carClass.carPath === Paths.CENTER) {
        changePath(
          car,
          Paths.RIGHT,
          carC.current._gsap.x,
          props.prevPath,
          gameRef.current.clientWidth
        );

        dispatch(changePathState(Paths.RIGHT));
        return setCarClass({
          ...carClass,
          style: "carRight",
          carPath: Paths.RIGHT,
        });
      } else if (
        enemyPath === Paths.RIGHT &&
        carClass.carPath === Paths.RIGHT
      ) {
        changePath(
          car,
          Paths.LEFT,
          carC.current._gsap.x,
          Paths.CENTER,
          gameRef.current.clientWidth
        );
        dispatch(changePathState(Paths.CENTER));
        return setCarClass({
          ...carClass,
          style: "carCenter",
          carPath: Paths.CENTER,
        });
      } else if (enemyPath === Paths.LEFT && carClass.carPath === Paths.LEFT) {
        changePath(
          car,
          Paths.RIGHT,
          carC.current._gsap.x,
          Paths.CENTER,
          gameRef.current.clientWidth
        );
        dispatch(changePathState(Paths.CENTER));
        return setCarClass({
          ...carClass,
          style: "carCenter",
          carPath: Paths.CENTER,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.newEnemy]
  );

  useEffect(() => {
    const car = [carC.current];
    const mountainLeft = [mountainL.current];
    const mountainRight = [mountainR.current];
    const planetLeft = [planetL.current];
    const planetRight = [planetR.current];
    const ctx = gsap.context(() => {
      carSpeedAnimation(car);
      mountainAnimation(mountainLeft, gameRef.current.clientWidth);
      mountainRightAnimation(mountainRight, gameRef.current.clientWidth);
      planetLeftAnimation(planetLeft, gameRef.current.clientWidth);
      planetRightAnimation(planetRight, gameRef.current.clientWidth);
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const enemy = [enemyC.current];
    const enemyPath = props.newEnemy;
    const car = [carC.current];
    const ctx = gsap.context(() => {
      if (props.newEnemy === "center") {
        enemyCenterCarAnimation(enemy, gameRef.current.clientWidth);
      } else if (props.newEnemy === "right") {
        enemyRightCarAnimation(enemy, gameRef.current.clientWidth);
      } else if (props.newEnemy === "left") {
        enemyLeftCarAnimation(enemy, gameRef.current.clientWidth);
      }
      renderChangedPath(enemyPath, car);
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.newEnemy]);

  // -----------------Example to move car by Arrows Keyboard ------------------------

  /* useEffect(() => {
    const car = [carC.current];
    const left = "ArrowLeft";
    const right = "ArrowRight";
    const ctx = gsap.context(() => {
      carSpeedAnimation(car);
      document.addEventListener("keydown", (event: any) => {
        event.stopPropagation();
        if (event.code === right && props.prevPath === Paths.CENTER) {
          changePath(car, Paths.RIGHT, carC.current._gsap.x, props.prevPath);
          dispatch(changePathState(Paths.RIGHT));
          setCarClass("carRight");
        } else if (event.code === left && props.prevPath === Paths.CENTER) {
          changePath(car, Paths.LEFT, carC.current._gsap.x, props.prevPath);
          dispatch(changePathState(Paths.LEFT));
          setCarClass("carLeft");
        } else if (event.code === left && props.prevPath === Paths.RIGHT) {
          changePath(car, Paths.LEFT, carC.current._gsap.x, Paths.CENTER);
          dispatch(changePathState(Paths.CENTER));
          setCarClass("carCenter");
        } else if (event.code === right && props.prevPath === Paths.LEFT) {
          changePath(car, Paths.RIGHT, carC.current._gsap.x, Paths.CENTER);
          dispatch(changePathState(Paths.CENTER));
          setCarClass("carCenter");
        } else {
          event.stopPropagation();
          return null;
        }
      });
      return () => ctx.revert();
    });
  }, [props]); */

  return (
    <Card
      sx={{ maxWidth: "90%", width: "90%", borderRadius: "12px" }}
      ref={gameRef}
    >
      <CardMedia
        className="skyImg"
        height={"200"}
        component="img"
        image={skyImg}
        alt="sky"
      />

      <CardMedia
        className="roadImg"
        height={"50%"}
        component="img"
        image={landImg}
        alt="road"
      />

      <div className="mountain"></div>
      <div className="mountainLeft" ref={mountainL}></div>

      <div className="mountainRight" ref={mountainR}></div>

      <div className="planetLeft" ref={planetL}></div>

      <div className="planetRight" ref={planetR}></div>

      {props.newEnemy ? (
        props.newEnemy === Paths.CENTER ? (
          <div id="enemyCar" ref={enemyC} className={`enemy enemyCenter`}></div>
        ) : props.newEnemy === Paths.LEFT ? (
          <div id="enemyCar" ref={enemyC} className={`enemy enemyLeft`}></div>
        ) : (
          <div id="enemyCar" ref={enemyC} className={`enemy enemyRight`}></div>
        )
      ) : (
        <div className="enemy"></div>
      )}
      <div className={`car ${carClass.style}`} ref={carC}></div>
    </Card>
  );
}

const mapStateToProps = (state: any) => {
  return {
    prevPath: state.plReducer.prevPath,
  };
};

export default connect(mapStateToProps, {})(GameContainer);
