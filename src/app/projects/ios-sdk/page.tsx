export default function Page() {
  const baseAssetUrl = "/assets/projects/ios-sdk";
  return (
    <section>
      <h1 className="h1">Private Swift Framework</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img alt="undisclosed" src={`${baseAssetUrl}/undisclosed.png`} />
      </div>
      <br />
      <p style={{ textAlign: "center" }}>
        Took over maintenance and expansion of existing iOS framework (not
        publicly listed). The client name and the nature of the work can be
        disclosed privately if requested, but can not be published on public
        platforms per the terms of the contract
      </p>
      <br />
      <h2 className="h2">Significant contributions</h2>
      <ul className={"list-disc list-inside"}>
        <li>
          Updated documentation leading to significantly lower rate of end-user
          support requests
        </li>
        <li>
          Created example apps to help end-users interact with functionality
        </li>
        <li>
          Developed custom bash script to automate the build and release
          process, including builds for each swift version, file cleanup,
          conversion of .README file into multiple readable formats, and more,
          saving hours of manual labor per release.
        </li>
        <li>
          Converted deployment method to produce .xcframework packages,
          eliminating the need to provide additional ARM 64 .framework packages
        </li>
        <li>
          Found solution to provide support for bitcode_enabled app after
          previous dev had claimed
        </li>
        <li>Maintain support for multiple Swift, iOS, and Xcode versions</li>
        <li>
          Regular research into the relevant field to provide updates outside of
          client requests
        </li>
      </ul>
      <br />
      <h2 className="h2">Work Ongoing</h2>
      <br />
      <p style={{ textAlign: "center" }}>November 2022 - Present</p>
    </section>
  );
}
