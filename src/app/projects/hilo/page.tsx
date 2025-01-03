export default function Page() {
  const baseAssetUrl = "/assets/projects/hilo";
  return (
    <section>
      <h1 className="h1">HiLo</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          maxHeight: 600,
        }}
      >
        <img
          src={`${baseAssetUrl}/IMG_3324.png`}
          style={{ objectFit: "contain", objectPosition: "100% 50%" }}
        />
        <img
          src={`${baseAssetUrl}/IMG_3311.png`}
          style={{ objectFit: "contain", objectPosition: "0% 50%" }}
        />
      </div>
      "HiLo" is a platform that aims to be 'more social and less media' by
      asking users to share both the highs and lows of their day.
      <br />
      <br />
      <b>Contributions:</b>
      <ul className={"list-disc list-inside"}>
        <li>
          User mentions:
          <ul className={"list-disc ml-10"}>
            <li>Username suggestion bar while typing @...</li>
            <li>Mentions recognized in text</li>
            <li>Tapped mentions navigate to user profiles</li>
          </ul>
        </li>
        <li>Improvements to commenting</li>
        <li>Improved push notification logic from server</li>
        <li>Push notifications navigate to relevant content</li>
        <li>UI development and modification</li>
        <li>Bug fixes</li>
      </ul>
    </section>
  );
}
