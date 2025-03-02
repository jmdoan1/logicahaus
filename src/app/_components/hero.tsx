"use client";

import { useEffect, useRef } from "react";
// import { Button } from "@/app/_components/ui/button";
import { motion, useAnimation } from "framer-motion";

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }, [controls]);

  return (
    <section className="w-full py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-background via-muted to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div
            ref={ref}
            initial={{ y: 50, opacity: 0 }}
            animate={controls}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Transforming Ideas into
              <span className="gradient-text"> Digital Reality</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              LogicaHaus is your one-stop solution for innovative software
              development. From concept to code, we bring your vision to life.
            </p>
          </motion.div>
          {/* <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
