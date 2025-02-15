"use client";

import { ReactNode, useEffect } from "react";
import { Code, Zap, Shield, Sparkles } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const features = [
  {
    icon: <Code className="h-10 w-10" />,
    title: "Custom Software Development",
    description:
      "Tailored solutions to meet your unique business needs and challenges.",
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: "Rapid Prototyping",
    description:
      "Quick turnaround on prototypes to validate your ideas and concepts.",
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Secure & Scalable",
    description:
      "Built with security in mind and designed to grow with your business.",
  },
  {
    icon: <Sparkles className="h-10 w-10" />,
    title: "Cutting-edge Technology",
    description: "Leveraging the latest tech to give you a competitive edge.",
  },
];

const FeatureCard = ({
  icon,
  title,
  description,
  index,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
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
        transition: { duration: 0.5, delay: index * 0.1 },
      });
    }
  }, [controls, inView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={controls}
      className="flex flex-col justify-between items-center text-center p-6 bg-muted rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="mb-4 p-2 bg-primary rounded-full text-primary-foreground">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Our Services
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
