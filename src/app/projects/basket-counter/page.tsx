import { SBSProject } from "@/app/_components/project-templates";

export default function Page() {
  const baseAssetUrl = "/assets/projects/basket-counter";
  const features = ["Form validation", "Local storage", "CSV Exports"];
  const timeline = [
    "05/27/17 - Work Began",
    "05/31/17 - Final product delivered to client",
  ];

  return (
    <SBSProject
      title="Basket Counter"
      description={`This simple productivity tracking app was requested by a mushroom farm where employees could keep track of how many baskets of mushrooms they'd harvested, which areas of the farm they were harvested from, and where they'd been stored. The owner was then able to compile reports that could be exported to CSV.`}
      features={features}
      timeline={timeline}
      imageLeft={`${baseAssetUrl}/bc-1.png`}
      imageRight={`${baseAssetUrl}/bc-2.png`}
      altLeft="Preview of input form"
      altRight="Preview of share sheet"
      imageRatio={100 / 41}
    />
  );
}
