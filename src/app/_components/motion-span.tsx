"use client";

import { useEffect } from "react";
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

const MotionSpan = (
  props: Omit<
    HTMLMotionProps<"div">,
    "ref" | "animate" | "initial" | "transition"
  > & {
    initial: boolean | VariantLabels | Target;
    final: Omit<AnimationDefinition, "transition">;
    transition: Transition;
    element?: "div" | "span";
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
    <motion.span
      ref={ref}
      animate={controls}
      initial={initial}
      className={"flex items-center text-center " + className}
      {...rest}
    />
  );
};

export default MotionSpan;
