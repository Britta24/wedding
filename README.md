# Wedding E-Invitation (React + Vite)

Mobile-first invitation site built to be shared on WhatsApp.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173 (also reachable from your phone on the same Wi-Fi)
```

## Build
```bash
npm run build    # output in dist/
npm run preview
```

## Edit your details
Everything lives in `src/data/weddingConfig.js`. Search for `TODO` and replace the placeholders (names, parents, mahal name, city, address, Maps link, phone numbers, WhatsApp number, hashtag, `siteUrl`).
Set `music.autoplayOnOpen: true` to start the music when guests tap the envelope.

## Replace photos and music
- Engagement photos: overwrite `src/assets/engagement-1.jpg`, `-2.jpg`, `-3.jpg` with the same file names. Portrait 4:5 photos look best. To use more photos, add files and list them in `engagement.photos`.
- Music: overwrite `public/music/wedding.mp3` (the included file is only a placeholder tone). Keep it under about 3 MB for slow networks.

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. Go to vercel.com, sign in, click **Add New > Project**, and import the repository.
3. Vercel detects Vite automatically (build command `npm run build`, output `dist`). Click **Deploy**.
4. Copy your live URL, for example `https://your-name.vercel.app`.
5. `vercel.json` (included) rewrites all routes to `index.html`.

Netlify works the same way: build command `npm run build`, publish directory `dist`.

## After deploying: link preview for WhatsApp
1. Replace `public/og-image.jpg` with your own image (1200 x 630 px, under 300 KB).
2. In `index.html`, replace every `https://your-site.vercel.app` (the `og:image`, `og:url` and `twitter:image` tags) with your real URL, and update the title and description with your names.
3. In `src/data/weddingConfig.js`, set `siteUrl` to the same URL.
4. Redeploy. WhatsApp caches previews, so test with a fresh link, or add `?v=2` to the URL when sharing.
