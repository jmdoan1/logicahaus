export const githubAccount = "https://github.com/jmdoan1";
export const githubUrl = `${githubAccount}/logicahaus`;

export interface Project {
  name: string;
  slug: string;
  scale: number;
  rotate?: number;
  marginTop?: string;
}

export const projects: Project[] = [
  {
    name: "Dashr (v2)",
    slug: "dashr",
    scale: 1.65,
    marginTop: "5%",
  },
  {
    name: "Homesight",
    slug: "homesight",
    scale: 1.7,
    rotate: 10,
  },
  // {
  //   name: "KeepAwayk",
  //   slug: "keepawayk",
  //   scale: 1,
  // },
  {
    name: "Spirated",
    slug: "spirated",
    scale: 1.45,
    rotate: 10,
  },
  {
    name: "ScenePin",
    slug: "scenepin",
    scale: 1.45,
  },
  {
    name: "Mileage Quest",
    slug: "mileage-quest",
    scale: 1.65,
  },
  {
    name: "iOS SDK",
    slug: "ios-sdk",
    scale: 1.55,
  },
  {
    name: "Trivia Pal",
    slug: "trivia-pal",
    scale: 1.75,
    rotate: 10,
  },
  {
    name: "Basket Counter",
    slug: "basket-counter",
    scale: 1.7,
  },
  {
    name: "Dashr (v1)",
    slug: "dashr-og",
    scale: 1.7,
  },
  {
    name: "HiLo",
    slug: "hilo",
    scale: 1.7,
  },
  {
    name: "Memboard",
    slug: "memboard",
    scale: 1.7,
  },
  {
    name: "WatchFlippers",
    slug: "watchflippers",
    scale: 1.7,
  },
  {
    name: "Pharmacy Quotes",
    slug: "pharmacy-quotes",
    scale: 1.7,
  },
  {
    name: "MPG Tracker",
    slug: "mpg-tracker",
    scale: 1.7,
  },
  {
    name: "QwickWeights",
    slug: "qwickweights",
    scale: 1.7,
  },
  {
    name: "Swipper",
    slug: "swipper",
    scale: 1.7,
  },
];

export const links = (isHome: boolean) => [
  { title: "Projects", link: isHome ? "#projects" : "/projects" },
  isHome ? { title: "Features", link: "/#features" } : undefined,
  { title: "About", link: "/#about" },
  isHome ? { title: "Testimonials", link: "/#testimonials" } : undefined,
  { title: "Contact", link: isHome ? "#contact" : "/contact" },
  { title: "Play", link: "/playground" },
];
