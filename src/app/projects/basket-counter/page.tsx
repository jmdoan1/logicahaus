import List from "@/app/_components/list";

export default function Page() {
  const baseAssetUrl = "/assets/projects/basket-counter";
  return (
    <section>
      <h1 className="h1">Basket Counter</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          maxHeight: 600,
        }}
      >
        <img
          src={`${baseAssetUrl}/bc-1.png`}
          style={{ objectFit: "contain", objectPosition: "100% 50%" }}
        />
        <img
          src={`${baseAssetUrl}/bc-2.png`}
          style={{ objectFit: "contain", objectPosition: "0% 50%" }}
        />
      </div>
      This simple productivity tracking app was requested by a mushroom farm
      where employees could keep track of how many baskets of mushrooms they'd
      harvested, which areas of the farm they were harvested from, and where
      they'd been stored. The owner was then able to compile reports that could
      be exported to CSV.
      <br />
      <br />
      <b>Timeline:</b>
      <List>
        <li>05/27/17 - Work Began</li>
        <li>05/31/17 - Final product delivered to client</li>
      </List>
    </section>
  );
}
