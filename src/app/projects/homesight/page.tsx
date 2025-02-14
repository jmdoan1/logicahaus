"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const baseAssetUrl = "/assets/projects/homesight";
  const [count, setCount] = useState(0);
  const [viewWidth, setViewWidth] = useState<number>(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateImgWidth = () => {
      setViewWidth(Math.floor(window.innerWidth));
    };

    updateImgWidth();
    window.addEventListener("resize", updateImgWidth);
    return () => window.removeEventListener("resize", updateImgWidth);
  }, []);

  const imageNumber = useCallback(() => (count % 11) + 1, [count]);

  return (
    <section className="bg-gradient-to-br from-background via-muted to-background py-12 md:py-24 lg:py-32">
      <div className="max-w-screen-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 block lg:hidden">
          HomeSight
        </h2>

        {/* Images for large screens (floated) */}
        <Image
          src={`${baseAssetUrl}/${imageNumber()}-light.PNG`}
          alt="Preview of homesight app in light mode"
          width={viewWidth * 0.3}
          height={(viewWidth * 0.3 * 100) / 41}
          className="object-contain float-left hidden lg:block"
        />
        <Image
          src={`${baseAssetUrl}/${imageNumber()}-dark.PNG`}
          alt="Preview of homesight app in dark mode"
          width={viewWidth * 0.3}
          height={(viewWidth * 0.3 * 100) / 41}
          className="object-contain float-right hidden lg:block"
        />

        {/* Images for smaller screens (stacked or side-by-side at 50% each) */}
        <div className="block lg:hidden">
          <div className="flex flex-wrap justify-center gap-4">
            <Image
              src={`${baseAssetUrl}/${imageNumber()}-light.PNG`}
              alt="Preview of homesight app in light mode"
              width={viewWidth * 0.3}
              height={(viewWidth * 0.3 * 100) / 41}
              className="object-contain"
            />
            <Image
              src={`${baseAssetUrl}/${imageNumber()}-dark.PNG`}
              alt="Preview of homesight app in dark mode"
              width={viewWidth * 0.3}
              height={(viewWidth * 0.3 * 100) / 41}
              className="object-contain"
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-6 hidden lg:block">
          HomeSight
        </h2>
        <p>
          Minim ut adipisicing enim. Adipisicing Lorem est dolor ullamco enim
          anim fugiat et consectetur commodo aute Lorem est. Irure est esse
          Lorem dolor Lorem tempor exercitation sunt. Esse elit laborum proident
          fugiat. Proident fugiat reprehenderit labore aliqua excepteur.
          <br />
          <br />
          Ex culpa deserunt ex consectetur nulla ea eiusmod sint occaecat nisi
          veniam adipisicing ex ea excepteur. Dolore enim officia Lorem magna
          aliqua ullamco elit esse velit laboris labore. Velit consectetur dolor
          Lorem. Proident est tempor aliqua velit nisi nostrud fugiat deserunt.
          Ad anim velit reprehenderit voluptate cupidatat dolor eiusmod sit.
          <br />
          <br />
          Aliquip eu duis eu culpa duis ea nostrud tempor. Dolor elit laborum
          incididunt pariatur cupidatat in sint veniam enim occaecat enim dolore
          quis tempor Lorem. Sunt eiusmod anim enim quis fugiat culpa ipsum.
          Minim pariatur duis dolor minim ad nulla. Exercitation sit enim elit
          culpa nisi eiusmod aliquip exercitation exercitation tempor. Aliqua
          laboris in amet enim velit do consequat consectetur.
          <br />
          <br />
          Nostrud consectetur nostrud excepteur non quis ipsum aute cupidatat
          elit nostrud consectetur adipisicing deserunt occaecat. Ad fugiat quis
          qui in culpa do consequat aliqua non ut esse ullamco. Occaecat tempor
          ad aute consectetur ullamco officia mollit est irure. Aute ut in
          reprehenderit aliqua laboris magna anim duis eiusmod qui quis. Sunt
          dolore sint velit sit in nulla non. Dolor fugiat eiusmod culpa ex
          ipsum ut occaecat laboris labore officia ullamco.
          <br />
          <br />
          Minim ut adipisicing enim. Adipisicing Lorem est dolor ullamco enim
          anim fugiat et consectetur commodo aute Lorem est. Irure est esse
          Lorem dolor Lorem tempor exercitation sunt. Esse elit laborum proident
          fugiat. Proident fugiat reprehenderit labore aliqua excepteur.
          <br />
          <br />
          Ex culpa deserunt ex consectetur nulla ea eiusmod sint occaecat nisi
          veniam adipisicing ex ea excepteur. Dolore enim officia Lorem magna
          aliqua ullamco elit esse velit laboris labore. Velit consectetur dolor
          Lorem. Proident est tempor aliqua velit nisi nostrud fugiat deserunt.
          Ad anim velit reprehenderit voluptate cupidatat dolor eiusmod sit.
          <br />
          <br />
          Aliquip eu duis eu culpa duis ea nostrud tempor. Dolor elit laborum
          incididunt pariatur cupidatat in sint veniam enim occaecat enim dolore
          quis tempor Lorem. Sunt eiusmod anim enim quis fugiat culpa ipsum.
          Minim pariatur duis dolor minim ad nulla. Exercitation sit enim elit
          culpa nisi eiusmod aliquip exercitation exercitation tempor. Aliqua
          laboris in amet enim velit do consequat consectetur.
          <br />
          <br />
          Nostrud consectetur nostrud excepteur non quis ipsum aute cupidatat
          elit nostrud consectetur adipisicing deserunt occaecat. Ad fugiat quis
          qui in culpa do consequat aliqua non ut esse ullamco. Occaecat tempor
          ad aute consectetur ullamco officia mollit est irure. Aute ut in
          reprehenderit aliqua laboris magna anim duis eiusmod qui quis. Sunt
          dolore sint velit sit in nulla non. Dolor fugiat eiusmod culpa ex
          ipsum ut occaecat laboris labore officia ullamco.
          <br />
          <br />
        </p>
      </div>
    </section>
  );
}
