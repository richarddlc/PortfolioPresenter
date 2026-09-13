# Scroll-controlled learning studio

The hero and Studio are one continuous, pinned scene. Both use frame zero of
Richard's supplied 10-second, 24 fps, 1280 × 720 video. The separate image banner
is no longer displayed or requested by the page.

## Run the website

```sh
npm ci
npm run dev:client
```

For a static production build:

```sh
npm run check:client
npm run build:client
npm run preview:client
```

Publish the contents of `dist` with your existing static hosting provider.

## Behaviour

- Initially, the first video frame appears behind the hero text and enlarged
  portrait/name. The original video supplies all 240 frames.
- The first 80% of a viewport of scrolling expands/centres the media, fades the
  hero out and fades the first Studio caption in. Frame zero holds through this
  transition. Hidden hero links become inert so keyboard focus cannot reach them.
- Further scrolling selects the video frames and advances through four captions.
  Reverse scrolling retraces the sequence and restores the hero at the top.
- Desktop uses a 580-viewport-height section; phones use 500, including the intro.
  The final frame holds for a quarter viewport before normal page scrolling resumes.
- Phones transition from a background crop to showing the whole landscape frame,
  keeping all of the floating learning panels visible during the video sequence.
  The frame fits between the studio label and caption, with at least 24px of
  caption clearance and feathered edges. Caption resizing updates the fit.
- The Richard brand link goes to the hero. Other top navigation links bypass
  the pinned sequence; the separate Home and Studio buttons have been removed.
- Reduced motion, supported data-saver settings, unavailable canvas decoding,
  and failed frame requests retain the static hero without the long pinned section.
- Compressed frames preload near the section in 20 batches of 12 unchanged WebP
  images. Three background fetches leave a fourth slot for the current scroll
  position. At most four decodes run concurrently; twelve decoded frames are
  retained, including frame zero for immediate return to the hero. Desktop
  frames total about 4.25 MB and mobile frames 2.27 MB (decimal units).
- The preloaded poster supplies the first canvas frame. While an exact frame is
  pending, the closest decoded frame is used. A batch retries once before a
  persistent error restores the static hero. Resources are released on cleanup.

## Files

- `client/src/components/hero-section.tsx`: hero text, links and portrait.
- `client/src/components/learning-studio.tsx`: shared media, intro fade, frame
  loading, captions, scroll handling and fallback behaviour.
- `client/src/lib/active-portfolio-section.ts`: navigation for full sections and
  the Studio marker inside the combined scene.
- `client/src/index.css`: presentation and responsive layouts.
- `public/media/learning-studio`: poster, frames and metadata.
- `public/media/learning-studio/packs-v1`: the batches used by the browser.
- `client/src/lib/studio-frame-pack.ts`: validates and unpacks frame batches.
- `npm run build:studio-frames`: regenerates batches from the source WebP frames.
- `npm run test:studio-frames`: verifies all 480 desktop/mobile frames are
  preserved byte-for-byte and rejects malformed batch data.

The enlarged portrait/name, removed footer labels, removed skip link, responsive
CV button and increased brand spacing from the earlier revisions are retained.
The hero identity block now uses a portrait up to 220px and a name up to 52px,
positioned near the bottom of the viewport with 24–44px bottom padding. The Studio
call-to-action and the on-screen scroll/reverse instructions have been removed.

## Validation and limits

The static client production build and TypeScript checks pass. Automated Chrome
checks cover the initial first frame, both fades, first-frame hold, full viewport,
forward/reverse frame selection, restoring the hero, Studio navigation, pin release,
responsive overflow, reduced motion and failed-media fallback. Desktop and mobile
screenshots were visually reviewed.

The repository-wide TypeScript check has two existing server issues reproduced
before these changes: the undeclared `nanoid` import and the `allowedHosts` type in
`server/vite.ts`. They do not affect the static client build.

Validation uses Chrome with desktop and phone-sized viewports, not physical iOS
or Safari devices. Source sharpness is limited by the supplied 720p video. This is
a rendered 3D sequence, not a scene with independently interactive 3D objects.

## Premium section presentation

About, skills, experience, projects and contact share graphite surfaces, fine
borders, soft highlights and restrained depth. Transparent extruded SVG icons
replace decorative category/contact/education icons; their animation pauses
outside the viewport and is disabled with reduced motion. Utility navigation
and familiar external-link logos retain their simple readable forms.

Capability, project, career and contact cards respond subtly to mouse position.
Touch input and reduced-motion preferences disable tilt. The proficiency dials
use inset rims and animate when entering view. About uses an accordion through
tablet sizes to keep longer text comfortable to read.

Project titles are always visible, including on phones. The project detail
dialog supports Escape, trapped keyboard focus, focus restoration and scroll
locking. Checks passed at widths 320, 390, 768, 900 and 1440 in Chrome, including
no horizontal page overflow, dialog behavior, animation preferences and touch.

## Loading optimization measurement

Chrome cold-cache comparison on the local preview, with simulated 10 Mbps
download throughput and 100ms latency (one run per viewport before and after):

| Viewport | First canvas frame, before / after | All frames downloaded, before / after |
| --- | --- | --- |
| 1440px desktop | 3.67s / 2.75s | 13.73s / 6.51s |
| 390px mobile | 3.87s / 3.29s | 12.05s / 6.15s |

The frame sequence uses 20 requests instead of 240. The portrait is a 30.5 KB
WebP instead of a 2.28 MB PNG; the original remains in source. An unused Replit
development banner script was removed from the production page. These are local
simulated measurements, not guarantees for the live host or every connection.

Browser checks cover all chapters, reverse scrubbing, caption spacing at four
sizes, immediate first-frame reuse, a last-frame jump while background requests
are held, transient retry, corrupt-data fallback, and zero batch downloads with
reduced motion. Fast scrubbing can still briefly use a nearby frame on a slow
connection until the exact frame is available.
