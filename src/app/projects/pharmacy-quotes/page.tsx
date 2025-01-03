export default function Page() {
  const baseAssetUrl = "/assets/projects/pharmacy-quotes";
  return (
    <section>
      <h1 className="h1">Kirkland Washington Costco Prescription Pricing</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxHeight: 650,
        }}
      >
        <img
          src={`${baseAssetUrl}/1.png`}
          style={{
            width: "50%",
            objectFit: "contain",
            objectPosition: "100% 50%",
          }}
        />
        <img
          src={`${baseAssetUrl}/IMG_1801.png`}
          style={{
            width: "50%",
            objectFit: "contain",
            objectPosition: "0% 50%",
          }}
        />
      </div>
      In the state of Washington, pharmacies are required to charge the same
      price for prescription drugs to all customers, regardless of whether they
      have insurance or not. In this pharmacy pricing app, users can anonymously
      submit pricing requests for their prescriptions by providing the
      medicine's name, strength, and quantity. Employees can then log in and
      edit the request for spelling errors, add price info, provide additional
      comments, and mark it as a hot deal. This data then becomes available for
      all users of the app.
    </section>
  );
}
