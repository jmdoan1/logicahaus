import NewTabLink from "@/app/_components/new-tab-link";

export default function Page() {
  const baseAssetUrl = "/assets/projects/scenepin";
  return (
    <section>
      <h1 className="h1">ScenePin</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={`${baseAssetUrl}/preview-x.png`}
          style={{ maxHeight: 400, scale: 1.5 }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div style={{ flex: 1 }}>
          <img src={`${baseAssetUrl}/IMG_4657.png`} />
        </div>
        <div style={{ flex: 1 }}>
          <img src={`${baseAssetUrl}/IMG_4658.png`} />
          <img src={`${baseAssetUrl}/IMG_4661.png`} />
        </div>
        <div style={{ flex: 1 }}>
          <img src={`${baseAssetUrl}/IMG_4659.png`} />
        </div>
      </div>
      <h2 className="h2">
        Find your favorite movie scene and snap a photo — with you in it!
      </h2>
      <br />
      With ScenePin, movie buffs all over the world have a handy tool to find
      out exactly where their favorite movie scenes were shot and to make
      themselves a part of the movie magic. You can use ScenePin as your very
      own travel guide. Like the hobbits in Lord of the Rings, you can explore
      the Shire — in New Zealand, have lunch with Harry and Sally at Katz’s
      Delicatessen — in Manhattan, or pay a visit to the Grand Budapest Hotel —
      filmed at a department store in Gorlitz, Germany. With ScenePin you can
      not only find that iconic film location but also take pictures of yourself
      there!
      <br />
      <h3 className="h3">Features:</h3>
      <br />
      <b>HUGE COLLECTION OF GREAT FILMS:</b> ScenePin has the largest database
      of film and television stills -- from major Hollywood studios to indie
      favorites, to black and white classics. Whether you love action and
      adventure, romance, or film noire — you’re sure to find that one scene
      that you adore in our huge collection of great films.
      <br />
      <br />
      <b>WORLDWIDE:</b> There’s no corner of the Earth too remote for ScenePin.
      From tropical jungles to urban jungles, wherever your favorite scene was
      filmed is where we are. You can easily search for your favorite scene —
      even the difficult ones — because we allow you to search by film,
      franchise, movie location, or by real location.
      <br />
      <br />
      <b>RECREATE THE PHOTOS:</b> If you want to really feel like you’re a part
      of the movie, you can use the ScenePin app to seamlessly put your own
      image directly into your favorite onscreen moments.
      <br />
      <br />
      <b>FIND SCENES NEAR YOU:</b> Ever wonder if a famous film or television
      show was filmed near your hometown? Visiting New York and just wondering
      why that one street corner looks so familiar? All you have to do is open
      ScenePin and we’ll tell you what was filmed right near you!
      <br />
      <br />
      Thanks for trying out the best travel guide for film and television. Feel
      free to contact us through the app if you have any suggestions for
      ScenePin, to leave us a review, and if you’re enjoying ScenePin, share it
      with a friend.
      <br />
      <br />
      <h2 className="h2">Timeline</h2>
      <br />
      <p style={{ textAlign: "center" }}>
        <b>Project Start:</b> January 2022
      </p>
      <p style={{ textAlign: "center" }}>
        <b>Alpha Released:</b> May 2022
      </p>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          placeContent: "center",
          width: "100%",
        }}
      >
        <NewTabLink
          style={{ textAlign: "center" }}
          href="https://apps.apple.com/us/app/scenepin/id1622468157"
        >
          <h2 className="h3">
            <u>VIEW IN APP STORE</u>
          </h2>
        </NewTabLink>
        <NewTabLink
          style={{ textAlign: "center" }}
          href="https://play.google.com/store/apps/details?id=com.doanworks.scenepin"
        >
          <h2 className="h3">
            <u>VIEW IN GOOGLE PLAY STORE</u>
          </h2>
        </NewTabLink>
      </div>
    </section>
  );
}
