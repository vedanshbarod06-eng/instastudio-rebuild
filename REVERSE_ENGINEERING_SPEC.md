# InstaStudio — reverse-engineering specification

Primary evidence: user-provided screen recording **“Instaeditor setup (Mitytech & Ram).mp4”** (9m 00s), plus the current Play Store/WebAPK wrapper and the user's screenshots/recordings. This is a reconstruction specification, not a claim that original source code has been recovered.

## Product identity and separation

- Product name: **InstaStudio**
- Public landing page shown in the recording: `https://mitytechandram.online/store`
- Login route supplied by the user: `https://mitytechandram.online/login`
- Product subtitle: **Social Growth Platform**
- This is the original InstaStudio project. Do not substitute Orbit Social or the unrelated `vedanshbarod06-eng/insta` project.
- The Play Store-style launcher, Instagram access screen, and the analytics experience form one user journey.

## Observed user journey

1. Android home screen → Play Store-style listing for Instagram.
2. Launch installed app → access screen.
3. Enter access key in `IG-XXXX-XXXX-XXXX` format, or use the Request key tab.
4. After access is granted, user sees the setup/API-key page.
5. User adds their own Apify key for Instagram public profile/post data and Gemini/Grok keys for AI insights.
6. Tap **Open Instagram** to enter the Instagram-like interface.
7. Import a public Instagram username through **Connect Instagram**. Private profiles are explicitly unsupported.
8. Browse imported profile, feed/posts and reels.
9. Open Reel Insights; switch Overview / Engagement / Audience.
10. Edit a reel's metrics manually or use **AI: set all insights** to populate the metrics from a description.
11. Create a new reel entry by uploading a photo/video or pasting a media URL and entering caption, date, duration, and insight values.

## Screen inventory and visible content

### A. Landing page (`/store`)
- Header: InstaStudio logo/name and Login button.
- Hero logo and eyebrow: **SOCIAL GROWTH PLATFORM**.
- Headline: **Grow your social presence, with insights that make sense**.
- Supporting copy: InstaStudio is a social growth platform for creators and businesses — profile insights, reel analytics and an AI assistant, all in one app on your phone.
- Primary CTA: **Get started**. Secondary CTA: **See pricing**.
- Feature section: **Everything you need to grow, in one place**; includes Growth Dashboard and descriptions around profile growth, reach and engagement.
- Pricing plans observed:
  - Monthly: ₹1,000 / month (shown also as $10 USD), valid for 1 month.
  - 3 Months: ₹2,000 / 3 months (shown also as $20 USD), marked Most popular.
  - Lifetime: ₹5,000 / lifetime (shown also as $50 USD), one-time payment.
- Plan bullets: Profile growth dashboard; Post & reel insights; AI content assistant; 1 device activation.
- Footer links include About, Pricing, Contact, Terms & Conditions, Privacy Policy, Refund & Cancellation, Shipping & Delivery.

### B. Access screen
- Instagram gradient camera icon and title **Instagram**.
- Subtitle: **Log in and install the app on your phone.**
- Two tabs: **Login** and **Request key**.
- Login has Access key field with placeholder `IG-XXXX-XXXX-XXXX`, a black Login button, and note **Each key can only be used on one device.**
- Request key is a separate tab/flow; preserve the email request interaction and approval-by-email message shown in the user's screenshots.
- Invalid access key produces an **Invalid key** error state.

### C. Post-login setup / API keys
- Success state: **You're logged in**; instruction to open the app using the link below; black **Open Instagram →** button.
- **Your API keys** explanatory card: add your own keys; keys are encrypted and never shown again.
- Provider sections:
  - **Apify (Instagram data)** — profile import and historical reels feed; key input and Save; connection status/Remove once connected.
  - **Google Gemini (AI)** — key for AI insights, graphs and metrics; key input and Save.
  - **Grok / XAI (AI)** — AI-generated insights; key input and Save.
- Home-screen install instructions for iPhone Safari and Android Chrome.
- Logout action.
- Apify account/API-key setup and Google AI Studio key creation are external setup flows, not part of the core Instagram screen UI.

### D. Instagram-like shell
- Familiar Instagram header and bottom navigation.
- Home feed with stories, posts, media, captions and standard interaction row.
- Reels tab with full-screen vertical media and engagement controls.
- Explore/search and profile access.
- Profile includes avatar, username, bio, post/follower/following counts, Edit profile / Share profile, grid and reels tabs.
- Main screen should use the imported public profile and posts rather than generic filler content.

### E. Connect Instagram modal
- Title: **Connect Instagram**.
- Prompt: **Enter a public username to clone its profile**.
- Username field (recording shows a sample username).
- Primary connect/refresh control and **Refresh data**.
- API key status rows for Apify API key and Gemini API key, each with Change key action.
- Note: **Public profiles only. Private accounts cannot be imported.**
- Logout at bottom.
- Include loading, success, error, empty and refresh states.

### F. Profile / post / reel browsing
- Imported profile screen with avatar, bio, post/follower/following counts, profile action buttons and media grid.
- Post detail screen with image/video, caption, likes/comments/shares/saves and **View insights** / **Boost post**-style actions as shown.
- Reel detail screen with media, creator, caption/audio, interaction counts and insight entry point.

### G. Reel Insights
- Header: back arrow, **Reel insights**, chart/action icons and overflow menu.
- Reel thumbnail/media and metrics.
- Tabs: **Overview**, **Engagement**, **Audience**.

**Overview**
- Summary values: Views; Accounts reached; Average watch time; Follows.
- Views over time line chart with All / Followers / Non-followers filters.
- **What affects your views** rate rows: Skip rate, Share rate, Like rate, Save rate, Repost rate, Comment rate.
- **How long people watched your reel** graph.
- **Top sources of views**.

**Engagement**
- **When people liked your reel** chart.
- **Actions after viewing**: Follows and Profile visits.
- **Interactions**: Likes, Comments, Reposts, Shares, Saves.

**Audience**
- Who viewed your reel: Followers / Non-followers percentages and bars.
- Audience details tabs: Age, Country, Gender.
- Country breakdown with horizontal bars and percentages.

### H. Manual metric editor
- Entry point from reel/profile insights; editing state is visually distinct.
- Editable numeric/text fields observed include:
  - Views, Accounts reached, Followers, Non-followers
  - Likes, Comments, Shares, Saves, Reposts
  - Watch time, Average watch time, Profile visits, Follows
  - Audience follower/non-follower split
  - Women / Men split
  - Countries (country + percentage, add/remove rows)
  - Age groups (age band + percentage, add/remove rows)
  - Comments (editable entries)
- Actions: **Save**, **Cancel**, **Hide edit mode**, **Reset all**.
- Saving should update the displayed insight values/charts, not merely show a toast.

### I. AI insights
- Action: **AI: set all insights**.
- Modal explains that insights are estimates generated from a description and can include views, likes, comments, shares, watch time, profile visits, follows, audience age/country/gender and sources.
- Description input supports example prompts such as a reel with a target view count, likes, comments, shares and duration.
- Generate action updates the insight model and visible screens; show a clear success/error state.
- Provider selection/availability should respect configured Gemini/Grok keys.

### J. Create new reel / content
- **New reel — set image & full insights** form.
- Cover/media: Upload photo or video, or paste image/video URL.
- Caption, Date, Duration, Published at.
- Overview fields: Views, Accounts reached, Followers, Interactions.
- Engagement fields: Likes, Comments, Shares, Saves, Reposts.
- Watch-time fields: Watch time and Average watch time.
- Save/cancel and validation states.

## Functional requirements

- This is a working local demo/reconstruction, not a pixel-only static mockup.
- All tabs, navigation, modal controls, form inputs, charts, edit/save/reset, add/remove audience rows, media upload/URL, and AI generation need real client-side behaviour.
- Persist user-created profile/reel/metric data locally between reloads. Keep secrets out of source code and avoid storing API keys in plaintext; real server-side key storage requires a backend.
- Use user-provided API keys only for integrations the user configures. Never ask for Instagram passwords or use private Instagram APIs.
- Public profile import is subject to the supported provider/API access and rate limits.
- Keep the Android-first layout and original visual hierarchy, spacing, typography and controls.

## Known unknowns / evidence boundaries

- The 142 KB APK inspected in this project is a Chrome WebAPK wrapper. It does not contain the original website's HTML/CSS/JS or backend.
- The recording provides detailed UI and interaction evidence, but it does not reveal the original backend implementation, original database, private access-key validation logic, or proprietary source code.
- Exact image assets, fonts, icon assets and all backend response shapes may need to be recreated or replaced with licensed/public assets.
- Do not claim source-code recovery unless actual source files or bundles are obtained and inspected.

## Implementation order

1. Replace the placeholder with the exact mobile visual shell and complete route/state model.
2. Implement access/request-key screens and the post-login API setup flow (use a safe local demo entitlement unless a real authorized backend is available).
3. Implement imported-profile data model, Instagram shell, posts/reels/profile and Connect Instagram modal.
4. Implement full Reel Insights tabs and charts.
5. Implement manual metric editing and AI set-all-insights workflow.
6. Implement create-new-reel flow, persistence, validation and error/loading states.
7. Verify every visible control and route on a 360–400 px Android viewport before deployment.
