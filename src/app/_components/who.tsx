import { JSX } from "react";
import MotionSpan from "./motion-span";

const Who = () => {
  const durationDefault = 0.5;
  const durationGradient = 1.5;
  const durationNetwork = 3;

  const delayLogicaMain = durationDefault;
  const delayLogicaEach = 0.1;
  const delayDude = delayLogicaMain + 1.5;
  const delayShrug = delayDude + durationDefault + 0.5;
  const delayBut = delayShrug + 0.75;
  const delayNetwork = delayBut + 1.25;

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 space-y-2">
        <MotionSpan
          initial={{ y: 50, opacity: 0 }}
          final={{ y: 0, opacity: 1 }}
          transition={{ duration: durationDefault }}
          className="justify-center"
        >
          <h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
            style={{ display: "flex", flex: "row", whiteSpace: "wrap" }}
          >
            Who is{" "}
            <AnimatedLogicaHaus
              {...{
                durationGradient,
                delayLogicaEach,
                delayLogicaMain,
              }}
            />
            ?
          </h2>
        </MotionSpan>
        <MotionSpan
          initial={{ y: 50, opacity: 0 }}
          final={{ y: 0, opacity: 1 }}
          transition={{ duration: durationDefault, delay: delayDude }}
          className="justify-center"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <MotionSpan
              initial={{ x: 77.078125 / 2 }}
              final={{ x: 0 }}
              transition={{
                duration: durationDefault - 0.1,
                delay: delayShrug + 0.1,
              }}
              className="justify-center"
            >
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I&apos;m really just a dude named Jay
              </p>
            </MotionSpan>
            <div>
              <MotionSpan
                initial={{ x: 77.078125 / 2 + 50, opacity: 0 }}
                final={{ x: 0, opacity: 1 }}
                transition={{ duration: durationDefault, delay: delayShrug }}
                className="flex flex-col items-center space-y-4 text-center ml-2"
              >
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ¯\_(ツ)_/¯
                </p>
              </MotionSpan>
            </div>
          </div>
        </MotionSpan>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <MotionSpan
            initial={{ y: 50, opacity: 0 }}
            final={{ y: 0, opacity: 1 }}
            transition={{ duration: durationDefault, delay: delayBut }}
            className="flex flex-col items-center space-y-4 text-center ml-2"
          >
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              but
            </p>
          </MotionSpan>
          <MotionSpan
            initial={{ y: 100, opacity: 0 }}
            final={{ y: 0, opacity: 1 }}
            transition={{
              duration: durationDefault,
              delay: delayBut + 0.1,
            }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              .
            </p>
          </MotionSpan>
          <MotionSpan
            initial={{ y: 100, opacity: 0 }}
            final={{ y: 0, opacity: 1 }}
            transition={{
              duration: durationDefault,
              delay: delayBut + 0.2,
            }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              .
            </p>
          </MotionSpan>
          <MotionSpan
            initial={{ y: 100, opacity: 0 }}
            final={{ y: 0, opacity: 1 }}
            transition={{
              duration: durationDefault,
              delay: delayBut + 0.3,
            }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              .
            </p>
          </MotionSpan>
        </div>
        {...RevealFromTop({
          delay: delayNetwork,
          duration: durationNetwork,
          children: (
            <p className="max-w-[900px] text-muted-foreground text-center md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Despite being a solo operation, LogicaHaus leverages a robust
              network of skilled designers and developers to tackle projects of
              any size or complexity. This flexible approach allows us to scale
              our resources to meet your specific needs, whether you&apos;re
              looking for the personalized attention of a single freelancer or
              the comprehensive support of a full development team
            </p>
          ),
        })}
      </div>
    </section>
  );
};

export default Who;

const AnimatedLogicaHaus = ({
  delayLogicaMain,
  delayLogicaEach,
  durationGradient,
}: {
  delayLogicaMain: number;
  delayLogicaEach: number;
  durationGradient: number;
}) => {
  const txt = "LogicaHaus";
  return (
    <span className=" text-center ml-2 relative">
      <MotionSpan
        initial={{ opacity: 0 }}
        final={{ opacity: 1 }}
        transition={{
          duration: durationGradient,
          delay: delayLogicaMain + delayLogicaEach * txt.length,
        }}
        className="gradient-text pb-1"
      >
        {txt}
      </MotionSpan>
      <MotionSpan
        initial={{ opacity: 1 }}
        final={{ opacity: 0 }}
        transition={{
          duration: durationGradient,
          delay: delayLogicaMain + delayLogicaEach * txt.length,
        }}
        className="text-muted-foreground flex flex-row absolute top-0 bottom-1 left-0 right-0"
      >
        {txt.split("").map((letter, index) => (
          <MotionSpan
            key={index}
            initial={{ y: -100, opacity: 0 }}
            final={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
              delay: delayLogicaMain + delayLogicaEach * index,
            }}
            className="text-muted-foreground"
          >
            {letter}
          </MotionSpan>
        ))}
      </MotionSpan>
    </span>
  );
};

const RevealFromTop = ({
  delay,
  duration,
  children,
}: {
  delay: number;
  duration: number;
  children: JSX.Element | JSX.Element[];
}): JSX.Element[] => {
  return [
    <MotionSpan
      key={0}
      initial={{ height: 0, opacity: 0 }}
      final={{ height: "auto", opacity: 1 }}
      transition={{
        duration,
        delay,
      }}
      className="flex flex-col items-center space-y-4 text-center overflow-hidden"
    >
      {children}
    </MotionSpan>,
    <MotionSpan
      key={1}
      initial={{ opacity: 0 }}
      final={{ height: 0 }}
      transition={{ duration, delay }}
    >
      {children}
    </MotionSpan>,
  ];
};
