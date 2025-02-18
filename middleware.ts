import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/clients/sign-in(.*)",
  "/clients/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  const url = new URL(request.url);

  // Check if the route is under `/clients`
  const isClientsRoute = url.pathname.startsWith("/clients");

  if (!isPublicRoute(request) && isClientsRoute) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
