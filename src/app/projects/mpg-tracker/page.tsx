import List from "@/app/_components/list";

export default function Page() {
  const baseAssetUrl = "/assets/projects/mpg-tracker";
  return (
    <section>
      <h1 className="h1">MPG: Multi-Vehicle Fuel Efficiency Tracker</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          maxHeight: 600,
        }}
      >
        <img
          src={`${baseAssetUrl}/mpg-1.png`}
          style={{ objectFit: "contain", objectPosition: "100% 50%" }}
        />
        <img
          src={`${baseAssetUrl}/mpg-2.png`}
          style={{ objectFit: "contain", objectPosition: "0% 50%" }}
        />
      </div>
      <p>
        <i>"MPG: Multi-Vehicle Fuel Efficiency Tracker"</i> is a simple app for
        users to track their historical fuel economy (miles per gallon) every
        time they fill up their tank. The user can create a list of multiple
        vehicles and track them individually. At each fill-up, the user will
        enter A) date, B) mileage, C) gallons, D) total cost. Every time the
        view is loaded, the app orders fill-ups by date, calculates MPG for each
        'trip', and calculates average MPG, average cost per mile, and total
        cost.
      </p>
      <br />
      <b>In-app purchases:</b>
      <List>
        <li>Ad Free: $0.99 (Tier 1)</li>
        <li>
          Pro: $1.99 (Tier 2) - allows multiple users per account + CSV exports
        </li>
      </List>
      <br />
      <b>Concerns:</b>
      <List>
        <li>
          Calculated data will only be accurate if the user remembers to enter
          the data at every fill-up.{" "}
        </li>
        <li>
          Calculated MPG per fillup will only be accurate if the tank is filled
          up completely.
        </li>
      </List>
    </section>
  );
}
