import { SBSProject } from "@/app/_components/project-templates";

export default function Page() {
  const baseAssetUrl = "/assets/projects/qwickweights";
  return (
    <SBSProject
      title="QwickWeights"
      description={`
Designed with speed and efficiency in mind, QwickWeights sets out to aid
weight lifters when calculating how many of each available weight plate
to add to a barbell in order to reach their target total weight in order
to avoid any second guessing.

Upon opening the app for the first time, the user is shown a guide of
how to use the app. Their first step is to enter the weight plates they
have and how many are available of each. They can then enter A) the
weight of the bar they are using and B) the total weight they want to
lift. The app then calculates which plates to use or informs them that
the specific weight is not possible with the available weights. The user
can choose whether or not to save their list of weights for future uses
within the settings page.

The main view also allows for choosing music and controlling playback
within the app for the convenience of not having to switch to the music
app.
          `}
      imageLeft={`${baseAssetUrl}/qw-1.png`}
      imageRight={`${baseAssetUrl}/qw-2.png`}
      altLeft="App preview"
      altRight="App preview"
      imageRatio={100 / 41}
    />
  );
}
