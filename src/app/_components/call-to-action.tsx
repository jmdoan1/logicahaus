"use client";

import { useEffect } from "react";
import { Button } from "@/app/_components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const CallToAction = () => {
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
        transition: { duration: 0.5 },
      });
    }
  }, [controls, inView]);

  return (
    <section
      id="contact"
      className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ y: 50, opacity: 0 }}
          animate={controls}
          className="flex flex-col items-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="max-w-[900px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Let&apos;s turn your vision into reality. Contact us today for a
              free consultation.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center mt-6">
            <Link href={"/contact"}>
              <Button size="lg" variant="secondary">
                Get in touch
              </Button>
            </Link>
          </div>
          {/* <Link
            className="underline text-xs"
            target="_blank"
            rel="noopener noreferrer"
            href={
              "https://letmegooglethat.com/?q=stupid+fuckin+agencies+I%27ll+regret+hiring"
            }
          >
            Browse our network of partner agencies
          </Link> */}
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
