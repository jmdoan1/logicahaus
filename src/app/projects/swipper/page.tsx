import { SBSProject } from "@/app/_components/project-templates";
import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";

const baseAssetUrl = "/assets/projects/swipper";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Swipper",
  description: "Random video chats",
  openGraph: {
    title: "Swipper",
    description: "Random video chats",
    url: baseUrl + baseAssetUrl.replace("/assets", ""),
    siteName: "LogicaHaus",
    locale: "en_US",
    type: "website",
    images: `${baseAssetUrl}/preview.png`,
  },
  twitter: {
    card: "summary_large_image",
    images: `${baseAssetUrl}/preview.png`,
  },
};

export default function Page() {
  return (
    <SBSProject
      title="Swipper Video Chat"
      description={`
Video chat with random people! With just one swipe, you can make new friends and have great conversations!

Swipper is a video chatting app that randomly matches users together to create a great chatting experience. Don't like your partner? No problem, just swipe again and join a new conversation!

Step 1: Swipe right to match with a partner
Step 2: Swipe right again to match find a new partner
Step 3: Swipe left to disconnect
              `}
      imageLeft={`${baseAssetUrl}/IMG_2927.png`}
      imageRight={`${baseAssetUrl}/IMG_2895.png`}
      altLeft="App preview"
      altRight="App preview"
      imageRatio={100 / 41}
      features={[
        "Twilio video chat",
        "Random user matching",
        "Nudity detection",
        "User reporting and blocking",
      ]}
      timeline={[
        "01/29/17 - Initial Contract Signed",
        "01/31/17 - MVP Completed",
        "02/01/17 - Additional Work Contracted",
        "02/11/17 - Additional Work Completed",
        "02/15/17 - Submitted to app store for review",
        "02/17/17 - Rejected by app store due to app category (Client was initially warned of this potential outcome before work began)",
      ]}
    />
  );
}
