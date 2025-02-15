import { SBSProject } from "@/app/_components/project-templates";

export default function Page() {
  const baseAssetUrl = "/assets/projects/watchflippers";

  const contributions = [
    "Activity tab information is parsed and interpreted to provide appropriate activity information (i.e. you vs. username & human readable sentences)",
    "Activity tab cells navigate to relevant content when tapped",
    "Push notifications navigate to relevant content",
    "Tapping on a user mention will navigate to the user",
    "'Want to Buy' page and cells",
    "Updated models to reflect API changes",
    "Additional interface creation and modification per InVision designs",
    "Bug fixing as needed",
  ];

  return (
    <SBSProject
      title="WatchFlippers"
      description={`"WatchFlippers" is an exclusive, members only marketplace for users to buy, sell, and trade watches and parts. The app allows for "for sale" posts, "wanted" (in search of) posts, comments, messaging, and more.`}
      imageLeft={`${baseAssetUrl}/IMG_3341.png`}
      imageRight={`${baseAssetUrl}/IMG_3311.png`}
      altLeft="App preview"
      altRight="App preview"
      imageRatio={100 / 41}
      contributions={contributions}
    />
  );
}
