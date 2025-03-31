import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  //flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e09, #d0e);
  position: relative;
`;

//===================================================================
// Initial Test <----------------------------------------------------
//===================================================================
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const initTest = {
  start: { scale: 0 },
  end: {
    scale: 1,
    rotateZ: 360,
    transition: { type: "spring", bounce: 0.7, delay: 2 },
  },
};
//------------------------------------------------------------------>

//===================================================================
// Box has 4 circles <-----------------------------------------------
//===================================================================
const BoxHasCircle = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const CircleInBox = styled(motion.div)`
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  place-self: center;
`;

const varCircleinBoxForBox = {
  start: { opacity: 0, scale: 0, y: 300 },
  end: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 1.5,
      delayChildren: 1.5,
      staggerChildren: 0.3,
    },
  },
};

const varCircleinBoxForCircle = {
  start: { opacity: 0, y: 30 },
  end: { opacity: 1, y: 0 },
};
//------------------------------------------------------------------>

//===================================================================
// Box Gesture in Hover and Click <----------------------------------
//===================================================================
const BoxGesture = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const varBoxGesture = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
  dragging: {
    backgroundColor: "rgb(116, 185, 255)",
    transition: { duration: 3 },
  },
};
//------------------------------------------------------------------>

//===================================================================
// Box Dragging in Hover and Click <----------------------------------
//===================================================================
const BoxConainer = styled.div`
  width: 400px;
  height: 400px;
  background-color: rgba(255, 234, 167, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const BoxDragging = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
//------------------------------------------------------------------>

//===================================================================
// Box MotionValues  <-----------------------------------------------
//===================================================================
const BoxMotionValue = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

//------------------------------------------------------------------>

//===================================================================
// SVG Animation  <--------------------------------------------------
//===================================================================
const Svg = styled(motion.svg)`
  width: 300px;
  color: white;
  height: 300px;

  stroke: white;
  stroke-width: 2px;
`;

const varSvg = {
  start: {
    pathLength: 0,
    fill: "rgba(255,255,255,0)",
  },
  end: {
    pathLength: 1,
    fill: "rgba(255,255,255,1)",
  },
};
//------------------------------------------------------------------>

//===================================================================
// Box Animate Presence  <-----------------------------------------------
//===================================================================
const BoxPresence = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  margin-bottom: 50px;
`;

const varBoxPresence = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 180,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    scale: 0,
    rotateZ: -180,
    transition: { duration: 1 },
  },
};
//------------------------------------------------------------------>

//===================================================================
// Box Slider  <-----------------------------------------------
//===================================================================
const BoxSlider = styled(motion.div)`
  position: absolute;
  //top: 20vw;
  left: 20px;
  width: 200px;
  height: 200px;
  background-color: white;
  color: black;
  border-radius: 15px;
  font-size: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoxConatainer = styled.div`
  width: 240px;
  height: 240px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const varBoxSlider = {
  initial: (goingback: boolean) => ({
    opacity: 0,
    scale: 0,
    x: goingback ? -400 : 400,
  }),
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 1 },
  },
  exit: (goingback: boolean) => ({
    opacity: 0,
    scale: 0,
    x: goingback ? 400 : -400,
    transition: { duration: 1 },
  }),
};
//------------------------------------------------------------------>

//===================================================================
// Box Slider  <-----------------------------------------------
//===================================================================
const ContainerSharedID = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
`;

const BoxSharedID = styled(motion.div)`
  width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleSharedID = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: blue;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
//------------------------------------------------------------------>

function AnimationTest() {
  const [showing, setShowing] = useState(true);
  const [isBack, setIsBack] = useState(false);
  const [visible, setVisible] = useState(0);
  const divBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const { scrollYProgress } = useScroll();
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg, rgb(10, 99, 158), #797bfd)",
      "linear-gradient(135deg, rgba(232, 67, 147,1.0), rgba(253, 121, 168,1.0))",
      "linear-gradient(135deg, rgb(86, 228, 30), rgb(157, 207, 90))",
    ]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 3]);
  return (
    <>
      {/* <Wrapper>
        <BoxGesture
          variants={initTest}
          initial="start"
          animate="end"
        ></BoxGesture>
      </Wrapper> */}

      {/* <Wrapper>
        <BoxHasCircle
          variants={varCircleinBoxForBox}
          initial="start"
          animate="end"
        >
          <CircleInBox variants={varCircleinBoxForCircle} />
          <CircleInBox variants={varCircleinBoxForCircle} />
          <CircleInBox variants={varCircleinBoxForCircle} />
          <CircleInBox variants={varCircleinBoxForCircle} />
        </BoxHasCircle>
      </Wrapper> */}

      {/* <Wrapper>
        <BoxGesture
          drag
          variants={varBoxGesture}
          whileHover="hover"
          whileTap="click"
          whileDrag="dragging"
        ></BoxGesture>
      </Wrapper> */}

      {/* <Wrapper>
        <BoxConainer ref={divBoxRef}>
          <BoxDragging
            drag
            dragElastic={0.3}
            dragConstraints={divBoxRef}
            variants={varBoxGesture}
            whileHover="hover"
            whileTap="click"
            whileDrag="dragging"
          ></BoxDragging>
        </BoxConainer>
      </Wrapper> */}

      {/* <Wrapper style={{ background: gradient }}>
        <BoxMotionValue
          style={{ x, rotateZ, scale }}
          drag="x"
          dragSnapToOrigin
        ></BoxMotionValue>
      </Wrapper> */}

      {/* <Wrapper>
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <motion.path
            variants={varSvg}
            initial="start"
            animate="end"
            transition={{
              default: { duration: 4 },
              fill: { duration: 3, delay: 3 },
            }}
            d="M224 373.1c-25.2-31.7-40.1-59.4-45-83.2-22.6-88 112.6-88 90.1 0-5.5 24.3-20.3 52-45 83.2zm138.2 73.2c-42.1 18.3-83.7-10.9-119.3-50.5 103.9-130.1 46.1-200-18.9-200-54.9 0-85.2 46.5-73.3 100.5 6.9 29.2 25.2 62.4 54.4 99.5-32.5 36.1-60.6 52.7-85.2 54.9-50 7.4-89.1-41.1-71.3-91.1 15.1-39.2 111.7-231.2 115.9-241.6 15.8-30.1 25.6-57.4 59.4-57.4 32.3 0 43.4 25.9 60.4 59.9 36 70.6 89.4 177.5 114.8 239.1 13.2 33.1-1.4 71.3-37 86.6zm47-136.1C280.3 35.9 273.1 32 224 32c-45.5 0-64.9 31.7-84.7 72.8C33.2 317.1 22.9 347.2 22 349.8-3.2 419.1 48.7 480 111.6 480c21.7 0 60.6-6.1 112.4-62.4 58.7 63.8 101.3 62.4 112.4 62.4 62.9 .1 114.9-60.9 89.6-130.2 0-3.9-16.8-38.9-16.8-39.6z"
          ></motion.path>
        </Svg>
      </Wrapper> */}

      {/* <Wrapper>
        <AnimatePresence>
          {showing ? (
            <BoxPresence
              variants={varBoxPresence}
              initial="initial"
              animate="visible"
              exit="exit"
            ></BoxPresence>
          ) : null}
        </AnimatePresence>
        <button onClick={() => setShowing((prev) => !prev)}>Show</button>
      </Wrapper> */}

      {/* <Wrapper>
        <button
          onClick={(prev) => {
            setVisible((prev) => (prev <= 0 ? 0 : prev - 1));
            setIsBack(true);
          }}
        >
          prev
        </button>
        <BoxConatainer>
          <AnimatePresence custom={isBack}>
            {["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"].map(
              (box, i) => {
                return visible === i ? (
                  <BoxSlider
                    custom={isBack}
                    variants={varBoxSlider}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    key={visible}
                  >
                    {box}
                  </BoxSlider>
                ) : null;
              }
            )}
          </AnimatePresence>
        </BoxConatainer>
        <button
          onClick={(prev) => {
            setVisible((prev) => (prev === 9 ? 9 : prev + 1));
            setIsBack(false);
          }}
        >
          next
        </button>
      </Wrapper> */}

      <Wrapper onClick={() => setShowing((prev) => !prev)}>
        <ContainerSharedID>
          <BoxSharedID>
            {showing ? (
              <CircleSharedID layoutId="circle"></CircleSharedID>
            ) : null}
          </BoxSharedID>
          <BoxSharedID>
            {!showing ? (
              <CircleSharedID layoutId="circle"></CircleSharedID>
            ) : null}
          </BoxSharedID>
        </ContainerSharedID>
      </Wrapper>
    </>
  );
}

export default AnimationTest;
