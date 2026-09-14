# Project previews

Project card actions and detail actions open `ProjectPreview`, a native modal dialog with an animated panel and an embedded browsing context. Closing removes the iframe to stop its media and restores focus and portfolio scroll position. The toolbar remains outside the course so Back to portfolio is always available. Reduced-motion preferences disable the panel animation.

The Storyline projects use their original S3 URLs. The written storyboard uses its existing local URL; its portfolio and companion-course links are routed within the viewer while embedded.

## Kalina launch page

`public/projects/kalina-choking-response/course-preview.html` is a copy of the public course HTML retrieved on September 14, 2026 from:

https://richardportfolio10.s3.ap-southeast-2.amazonaws.com/build/index.html

The only insertion is a comment and a `<base>` pointing to that S3 build directory. Styles, scripts, images, video and narration still load from S3; course content is unchanged. Hosting the launch HTML on the portfolio origin allows the existing SCORM parent-window API search to reach its standalone fallback. Embedding the original HTML directly throws a cross-origin exception during `SCORM.init()` and prevents course initialization.

When the hosted course HTML changes, refresh this launch copy and retain the base element directly after `<head>`. Verify Start Course, slide navigation and narration inside the portfolio. This is a standalone portfolio preview, not an LMS tracking session.

## Verification

Check every card action and the detail-panel launch, same-tab operation, Back to portfolio, restored focus/scroll, keyboard controls, reload, slow loading, reduced motion, and phone/tablet widths. Check the storyboard's own portfolio/course links too. Cross-origin course scripts and their internal keyboard behavior remain controlled by the hosted course.
