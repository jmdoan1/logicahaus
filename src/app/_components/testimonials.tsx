"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  link: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Working with LogicaHaus was a blast! Jay was quick to suggest new features and we were blown away by the design!",
    author: "Corrie Nieto",
    company: "ScenePin",
    link: "/projects/scenepin",
  },
  {
    quote:
      "I’m excited! This is the first app I’ve ever seen from creation. This has been an excellent experience for me",
    author: "Ricky Li",
    company: "Costco Pharmacy Quotes",
    link: "/projects/pharmacy-quotes",
  },
  {
    quote:
      "Jay was quick to respond to my initial request, and eager to jump into the project. He had a working prototype completed faster than I expected, and was self motivated to investigate the different technologies we needed. He ultimately came up with a working solution that saved me a ton of time.",
    author: "Bobby Ren",
    company: "TKD React",
    link: "/projects/tkd-react",
  },
];

const TestimonialCard = ({
  quote,
  author,
  company,
  index,
}: Testimonial & { index: number }) => {
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
        transition: { duration: 0.5, delay: index * 0.2 },
      });
    }
  }, [controls, inView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={controls}
      className="flex flex-col justify-between items-center text-center p-6 bg-muted rounded-lg shadow-lg"
    >
      <blockquote className="text-lg mb-4 italic">
        &quot;{quote}&quot;
      </blockquote>
      <div className="flex items-center">
        <div>
          <cite className="not-italic font-semibold">{author}</cite>
          <p className="text-sm text-muted-foreground">{company}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background via-muted to-background"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
