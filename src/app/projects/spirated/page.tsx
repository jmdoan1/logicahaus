export default function Page() {
  const baseAssetUrl = "/assets/projects/spirated";

  return (
    <section>
      <h1 className="h1">Spirated</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={`${baseAssetUrl}/preview.png`} style={{ maxWidth: 800 }} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          maxWidth: "100%",
          maxHeight: 400,
          margin: 30,
        }}
      >
        {/* <img
          src={`${baseAssetUrl}/Screenshot1.png`}
          style={{ flex: 1, objectFit: "contain" }}
        /> */}
        <img
          src={`${baseAssetUrl}/Screenshot2.png`}
          style={{ flex: 2, objectFit: "contain" }}
        />
      </div>
      <br />
      <h2 className="h2">Built in Expo</h2>
      <br />
      <h3 className="h3">Status: Alpha</h3>
      <br />
      <div style={{ textAlign: "center" }}>
        <h3 className="h3">Features</h3>
        <br />
        ~ Mobile and web functionality ~
        <br />
        ~ Responsive design for all screen sizes ~
        <br />
        ~ Personal bios ~
        <br />
        ~ Ratings and reviews ~
        <br />
        ~ Comments and likes ~
        <br />
        ~ Recent activity feeds ~
        <br />
        ~ Location based search ~
        <br />
        ~ Interactive map views ~
        <br />
        ~ Interactive list views ~
        <br />~ Image upload and editing ~
      </div>
    </section>
  );
}
