"use client";

import { JSX, useEffect } from "react";
import {
  AnimationDefinition,
  HTMLMotionProps,
  motion,
  Target,
  Transition,
  useAnimation,
  VariantLabels,
} from "framer-motion";
import { useInView } from "react-intersection-observer";

const MotionDiv = (
  props: Omit<
    HTMLMotionProps<"div">,
    "ref" | "animate" | "initial" | "transition"
  > & {
    initial: boolean | VariantLabels | Target;
    final: Omit<AnimationDefinition, "transition">;
    transition: Transition;
  }
) => {
  const { initial, final, transition, className, ...rest } = props;
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({ ...final, transition });
    }
  }, [controls, inView, final, transition]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={initial}
      className={"flex items-center text-center " + className}
      {...rest}
    />
  );
};

const DelayedDiv = ({
  delay,
  children,
  yMuliplier = 1,
  durationMuliplier = 1,
}: {
  delay: number;
  children: JSX.Element | JSX.Element[];
  yMuliplier?: number;
  durationMuliplier?: number;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 * durationMuliplier, delay },
      });
    }
  }, [controls, inView, delay, durationMuliplier]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50 * yMuliplier, opacity: 0 }}
      animate={controls}
      className="flex flex-col items-center text-center"
    >
      {children}
    </motion.div>
  );
};

const Who = () => {
  const shrugControls = useAnimation();
  const logicaControls = useAnimation();

  const [shrugRef, shrugInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [logicaRef, logicaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (shrugInView) {
      shrugControls.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 1,
        },
      });
    }
  }, [shrugControls, shrugInView]);

  useEffect(() => {
    if (logicaInView) {
      logicaControls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          //   delay: 1,
        },
      });
    }
  }, [logicaControls, logicaInView]);

  const delayLogicaMain = 0.4;
  const delayLogicaEach = 0.1;

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 space-y-2">
        <MotionDiv
          initial={{ y: 50, opacity: 0 }}
          final={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="justify-center"
        >
          <h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            style={{ display: "flex", flex: "row" }}
          >
            Who is{" "}
            <motion.div
              ref={logicaRef}
              initial={{ y: -100, opacity: 0 }}
              animate={logicaControls}
            >
              <div className="text-center ml-2">
                {/* <DelayedDiv delay={0.5} durationMuliplier={0.2} yMuliplier={-1}></DelayedDiv> */}
                <span className="gradient-text">LogicaHaus</span>
              </div>
            </motion.div>
            ?
          </h2>
        </MotionDiv>
        <DelayedDiv delay={0.5}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              I&apos;m really just a dude named Jay
            </p>
            <motion.div
              ref={shrugRef}
              initial={{ x: 50, opacity: 0 }}
              animate={shrugControls}
              className="flex flex-col items-center space-y-4 text-center ml-2"
            >
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                ¯\_(ツ)_/¯
              </p>
            </motion.div>
          </div>
        </DelayedDiv>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <DelayedDiv delay={1.5}>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              but
            </p>
          </DelayedDiv>
          <DelayedDiv delay={1.7}>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              .
            </p>
          </DelayedDiv>
          <DelayedDiv delay={1.9}>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              .
            </p>
          </DelayedDiv>
          <DelayedDiv delay={2.1}>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              .
            </p>
          </DelayedDiv>
        </div>
        <DelayedDiv delay={2.75}>
          <p
            className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            style={{ display: "flex", flexDirection: "row" }}
          >
            Despite being a solo operation, LogicaHaus leverages a robust
            network of skilled designers and developers to tackle projects of
            any size or complexity. This flexible approach allows us to scale
            our resources to meet your specific needs, whether you&apos;re
            looking for the personalized attention of a single freelancer or the
            comprehensive support of a full development team
          </p>
        </DelayedDiv>
      </div>
    </section>
  );
};

export default Who;
