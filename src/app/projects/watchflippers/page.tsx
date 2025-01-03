export default function Page() {
  const baseAssetUrl = "/assets/projects/watchflippers";
  return (
    <section>
      <h1 className="h1">WatchFlippers</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          maxHeight: 600,
        }}
      >
        <img
          src={`${baseAssetUrl}/IMG_3341.png`}
          style={{ objectFit: "contain", objectPosition: "100% 50%" }}
        />
        <img
          src={`${baseAssetUrl}/IMG_3311.png`}
          style={{ objectFit: "contain", objectPosition: "0% 50%" }}
        />
      </div>
      <br />
      <p>
        "WatchFlippers" is an exclusive, members only marketplace for users to
        buy, sell, and trade watches and parts. The app allows for "for sale"
        posts, "wanted" (in search of) posts, comments, messaging, and more.
      </p>
      <br />
      <b>Contributions:</b>

      <ul className={"list-disc list-inside"}>
        <li>
          Activity tab information is parsed and interpreted to provide
          appropriate activity information (i.e. you vs. username & human
          readable sentences)
        </li>
        <li>Activity tab cells navigate to relevant content when tapped</li>
        <li>Push notifications navigate to relevant content</li>
        <li>Tapping on a user mention will navigate to the user</li>
        <li>"Want to Buy" page and cells</li>
        <li>Updated models to reflect API changes</li>
        <li>
          Additional interface creation and modification per InVision designs
        </li>
        <li>Bug fixing as needed</li>
      </ul>
    </section>
  );
}
