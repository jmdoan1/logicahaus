import List, { NestedList } from "@/app/_components/list";

export default function Page() {
  const baseAssetUrl = "/assets/projects/memboard";
  return (
    <section>
      <h1 className="h1">MemBoard: The Keyboard That Remembers For You</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          maxHeight: 600,
        }}
      >
        <img
          src={`${baseAssetUrl}/mem-1.png`}
          style={{ objectFit: "contain", objectPosition: "100% 50%" }}
        />
        <img
          src={`${baseAssetUrl}/mem-2.png`}
          style={{ objectFit: "contain", objectPosition: "0% 50%" }}
        />
      </div>
      <p>
        <i>"MemBoard: The Keyboard That Remembers For You"</i> is a custom iOS
        Keyboard that lets you save text for later use. Memboard presents itself
        as a table view and a bottom row consisting of 5 buttons: next keyboard,
        add to list, space bar, delete, return. Users can use any keyboard to
        type the text they want to add, then switch to MemBoard, press the "+"
        button, and the text will be added to their list. To circumvent certain
        limitations to the amount of text a keyboard can read, the app includes
        a feature to add any text, regardless of the keyboard's capabilities.
      </p>
      <br />
      <p>
        <b>Timeline:</b>
      </p>
      <List>
        <li>04/09/2017 - Began Work</li>
        <li>
          04/09/2017 - Functional Prototype
          <NestedList>
            <li>Total time: 1 hour</li>
          </NestedList>
        </li>
        <li>
          04/16/2017 - Design and code complete for keyboard and accompanying
          app
          <NestedList>
            <li>Total time: 8.5 hours</li>
          </NestedList>
        </li>
        <li>04/17/2017 - App Store submission and web page creation</li>
      </List>
    </section>
  );
}
