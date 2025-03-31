import styled from "styled-components";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e09, #d0e);
  gap: 50px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
`;

const Box = styled(motion.div)`
  background: linear-gradient(135deg, #eb75eb, #e0b0e4);
  border-radius: 40px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  width: 60px;
  height: 60px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

function Animation() {
  const [id, setId] = useState<null | string>(null);
  const [toggle, setToggle] = useState(false);
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n, i) =>
          i === 0 || i === 3 ? (
            <Box
              onClick={() => setId(n)}
              key={n}
              whileHover={{
                scale: 1.1,
                originX: i === 0 ? 1 : 0,
                originY: i === 0 ? 1 : 0,
              }}
              layoutId={n}
            />
          ) : (
            <Box key={n} onClick={() => setToggle((p) => !p)}>
              {i === 2 && toggle ? <Circle layoutId="circle"></Circle> : null}
              {i === 1 && !toggle ? <Circle layoutId="circle"></Circle> : null}
            </Box>
          )
        )}
      </Grid>
      <button onClick={() => setToggle((p) => !p)}>SWITCH</button>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box layoutId={id} style={{ width: 400, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Animation;
