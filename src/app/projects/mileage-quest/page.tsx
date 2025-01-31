import List from "@/app/_components/list";

export default function Page() {
  const baseAssetUrl = "/assets/projects/mileage-quest";
  return (
    <section>
      <h1 className="h1">Mileage Quest</h1>
      <img src={`${baseAssetUrl}/mq.png`} />
      <br />
      Mileage Quest tracks all your drives in the background automatically.
      <br />
      <br />
      <List>
        <li>
          A simple tap after a trip confirms the mileage will be recorded.
        </li>
        <li>
          Generate reports and send them automatically to your job, accountant,
          or when filing for tax purposes.
        </li>
        <li>Enter multiple vehicles.</li>
        <li>
          Biometric Login: This makes it secure and easy to check on your
          mileage.
        </li>
        <li>
          Easily sync with your calendar to identify trips from earlier this
          year, or years ago!
        </li>
        <li>
          Vacation Mode: Allows you to pause the app until you’re ready to log
          miles again.
        </li>
        <li>
          Work Period: Determine the time of your work week to automatically
          classify mileage as business
        </li>
        <li>Dark Mode is available.</li>
      </List>
      <br />
      All app features are available with more coming soon!
      <br />
      <br />
      If you’re a service driver, healthcare provider, courier, part of a fleet,
      or just the average person looking for a few more dollars from their tax
      return, Mileage Quest is the only app you’ll need to easily and
      automatically track your mileage for each trip.
      <br />
      <br />
      Learn More
      <br />
      Terms and Conditions: https://mileagequest.app/terms-conditions/
      <br />
      Privacy Policy: https://mileagequest.app/privacy-policy/
    </section>
  );
}
