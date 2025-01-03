import List, { NestedList } from "@/app/_components/list";

export default function Page() {
  const baseAssetUrl = "/assets/projects/swipper";
  return (
    <section>
      <h1 className="h1">Swipper Video Chat</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          maxHeight: 600,
        }}
      >
        <img
          src={`${baseAssetUrl}/IMG_2927.png`}
          style={{ objectFit: "contain", objectPosition: "100% 50%" }}
        />
        <img
          src={`${baseAssetUrl}/IMG_2895.png`}
          style={{ objectFit: "contain", objectPosition: "0% 50%" }}
        />
      </div>

      <p>
        Video chat with random people! With just one swipe, you can make new
        friends and have great conversations!
        <br />
        <br />
        Swipper is a video chatting app that randomly matches users together to
        create a great chatting experience. Don't like your partner? No problem,
        just swipe again and join a new conversation!
        <br />
        <br />
        Step 1: Swipe right to match with a partner Step 2: Swipe right again to
        match find a new partner Step 3: Swipe left to disconnect
        <br />
        <br />
        DISCLAIMER: 1: Swipper includes nudity detection software and users will
        be automatically banned 2: Users can submit reports and will be banned
        after receiving a certain number of reports
        <br />
        <br />
        <b>Timeline:</b>
      </p>
      <List>
        <li>01/29/17 - Initial Contract Signed</li>
        <li>01/31/17 - MVP Completed</li>
        <li>02/01/17 - Additional Work Contracted</li>
        <li>02/11/17 - Additional Work Completed</li>
        <li>02/15/17 - Submitted to app store for review</li>
        <li>
          02/17/17 - Rejected by app store due to app category
          <NestedList>
            <li>
              Client was initially warned of this potential outcome before work
              began
            </li>
          </NestedList>
        </li>
      </List>
    </section>
  );
}
