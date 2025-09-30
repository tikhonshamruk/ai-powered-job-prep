import  arcjet, {detectBot, shield, tokenBucket}  from '@arcjet/next';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { request } from 'http';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', "/"])

const aj = arcjet({
  key: process.env.ARCJET_KEY!, // твой ключ из .env.local
  rules: [
    shield({mode: "LIVE"}),
    detectBot({
      mode: "LIVE",
      allow:[]
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // не больше 5 запросов в минуту
      interval:10,
      capacity: 5,
    }),
  ],
});

export default clerkMiddleware(async (auth, req) => {

  const decision = await aj.protect(req,{requested: 1})

  if(decision.isDenied()){
    return new Response(null, {status: 403})
  }

  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}