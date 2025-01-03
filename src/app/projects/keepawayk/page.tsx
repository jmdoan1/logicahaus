import NewTabLink from "@/app/_components/new-tab-link";

export default function Page() {
  const baseAssetUrl = "/assets/projects/keepawayk";
  return (
    <section>
      <h1 className="h1">KeepAwayk</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          maxHeight: 600,
          width: "100%",
        }}
      >
        <img
          src={`${baseAssetUrl}/vid-2.gif`}
          style={{ width: "100%", maxWidth: 1000 }}
        />
      </div>
      <br />
      <p>
        <i>KeepAwayk</i> is a simple MacOS utility that keeps your mac awake
        (while keeping pesky managers away). Users can modify how often an
        action occurs and toggle which actions it will randomly perform,
        including mouse movements, left clicks, right clicks, and key presses.
        Activity can also be toggled on/off with the ⌘+Y hotkey.
      </p>
      <br />
      <div style={{ textAlign: "center" }}>
        <NewTabLink style={{}} href="https://github.com/jmdoan1/KeepAwayk">
          <h3 className="h3">
            <u>View on GitHub</u>
          </h3>
        </NewTabLink>
      </div>
    </section>
  );
}
