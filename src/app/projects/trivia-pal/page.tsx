import {
  ProjectContainer,
  ProjectContent,
  ProjectHeader,
} from "@/app/_components/project-templates";
import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";

const baseAssetUrl = "/assets/projects/trivia-pal";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Trivia Pal",
  description: "The ultimate quiz and trivia app!",
  openGraph: {
    title: "Trivia Pal",
    description: "The ultimate quiz and trivia app!",
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
    <ProjectContainer>
      <ProjectHeader>Trivia Pal</ProjectHeader>
      <img
        src={`${baseAssetUrl}/Screenshot.png`}
        className="w-full max-w-[1200px] mx-auto"
      />
      <br />
      <ProjectContent>
        <p style={{ width: "100%", textAlign: "center" }}>
          Challenge your knowledge with Trivia Pal! Over 4,000 questions in 24
          categories, solo or multiplayer. Get ready to prove your smarts!
        </p>
        <br />
        <h2 className="h2">Feeling smart? Prove it with Trivia Pal!</h2>
        <br />
        Trivia Pal is the ultimate quiz and trivia app designed to test your
        knowledge across a wide range of categories. Whether you&apos;re a solo
        player or love to challenge your friends, Trivia Pal has something for
        everyone.
        <br />
        <br />
        <b>Features:</b>
        <ul className={"list-disc list-inside"}>
          <li>
            <b>Endless Fun:</b> Over 4,000 questions spanning 24 unique
            categories including Entertainment, General Knowledge, History,
            Science, and more!
          </li>
          <li>
            <b>Single and Multiplayer Modes:</b> Play solo to sharpen your
            skills or challenge your friends in multiplayer mode.
          </li>
          <li>
            <b>Customizable Gameplay:</b> Choose your question types – Multiple
            Choice or True/False – and set the difficulty level to match your
            expertise.
          </li>
          <li>
            <b>User-Friendly Interface:</b> Clean and modern design ensures a
            seamless gaming experience.
          </li>
          <li>
            <b>Track Your Progress:</b> Keep track of your scores and aim for
            the top spot on the leaderboard.
          </li>
        </ul>
        <br />
        <b>Categories Include:</b>
        <ul className={"list-disc list-inside"}>
          <li>Entertainment: Movies, TV Shows, Video Games</li>
          <li>General Knowledge</li>
          <li>History</li>
          <li>Science</li>
          <li>Art</li>
          <li>Music</li>
          <li>And many more!</li>
        </ul>
        <br />
        <b>Why Trivia Pal?</b> Trivia Pal isn&apos;t just a game; it&apos;s a
        fun and engaging way to learn new facts and challenge your brain.
        Whether you&apos;re prepping for a trivia night or just want to have
        some fun, Trivia Pal is your go-to app for trivia entertainment.
        <br />
        <br />
        Download Trivia Pal today and start proving your smarts!
        <br />
        <h2 className="h2">Development Timeline</h2>
        <br />
        <ul className={"list-disc list-inside"}>
          <li>
            <b>Hybrid Expo Frontend (using free API for trivia questions)</b> -
            1 day
          </li>
          <li>
            <b>Custom Node/Postgres Backend & Data Transfer From Free API</b> -
            1 day
          </li>
          <li>
            <b>Full Frontend and Backend Customization for Smooth Gameplay</b> -
            2 days
          </li>
          <li>
            <b>
              Icon and Marketing Asset Creation and App Store/Play Store
              Submission
            </b>
            - 1 day
          </li>
          <li>
            <b>FULL TIMELINE</b> - 5 days
          </li>
        </ul>
      </ProjectContent>
    </ProjectContainer>
  );
}
