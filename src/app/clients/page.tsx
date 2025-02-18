import { OrganizationList, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = await auth();

  if (userId) {
    console.log("----------------------------------");
    console.log({ userId });
    // Query DB for user specific information or display assets only to signed in users
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();
  console.log("----------------------------------");
  console.log({ user });
  user?.emailAddresses.forEach((email) => console.log({ email }));

  return (
    <section>
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <div
          style={{
            display: "inline-block",
            transform: "scale(1.5)",
            transformOrigin: "center",
          }}
        >
          <UserButton />
        </div>
      </div>
      <div style={{ justifyItems: "center", margin: 50 }}>
        <OrganizationList
          hidePersonal
          afterSelectOrganizationUrl="/clients/org/:slug"
        />
      </div>
    </section>
  );
}
