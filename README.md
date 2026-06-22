# Your Blog — Setup Guide

A clean, minimal lifestyle blog ready to host anywhere.

## File Structure

```
blog/
├── index.html          ← Homepage
├── about.html          ← About page
├── archive.html        ← All posts list
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← Nav, scroll effects, newsletter
├── posts/
│   └── post-template.html  ← Copy this for every new post
└── images/             ← Put your photos here
```

## Customize It

### 1. Your name & brand
Search and replace `Your Blog` with your actual blog name across all HTML files.

### 2. YouTube link
Replace `https://youtube.com/@yourchannel` with your real YouTube URL in all files.

### 3. About page
Open `about.html` and fill in your story. Add your photo to `images/` and update the `<img>` tag.

### 4. Writing new posts
1. Duplicate `posts/post-template.html`
2. Rename it (e.g. `posts/my-first-trip.html`)
3. Update the title, category, date, and body content
4. Add the post to `archive.html` and the homepage grid in `index.html`

### 5. Adding images
Drop photos into the `images/` folder and reference them like:
```html
<img src="images/my-photo.jpg" alt="Description" />
```
For images inside `posts/`, use `../images/my-photo.jpg`

### 6. Newsletter
The form currently shows a "Subscribed ✓" confirmation but doesn't send emails.
To collect real emails, connect it to a free service like:
- **Mailchimp** (mailchimp.com) — free up to 500 subscribers
- **Buttondown** (buttondown.email) — clean, simple, writer-focused
- **Beehiiv** (beehiiv.com) — great for creators with YouTube channels

Each provides a form action URL — replace the `<form>` tag's `action` attribute with it.

## Hosting (Free Options)

### GitHub Pages (easiest)
1. Create a free GitHub account at github.com
2. Create a new repository (e.g. `myblog`)
3. Upload all these files
4. Go to Settings → Pages → Source: main branch
5. Your blog will be live at `username.github.io/myblog`

### Netlify (even easier, custom domain)
1. Go to netlify.com → sign up free
2. Drag and drop your blog folder onto their dashboard
3. Done — live in seconds, custom domain free

### Custom Domain
Both GitHub Pages and Netlify let you connect a custom domain (e.g. `yourname.com`).
Buy one from Namecheap or Squarespace Domains (~$12/year) and follow their setup guide.

## Adding a New Post Checklist

- [ ] Duplicate `posts/post-template.html`
- [ ] Update `<title>`, `<meta name="description">`, and `<h1>`
- [ ] Set the correct `post-category` and date
- [ ] Write your content in the `.post-body` section
- [ ] Add a cover image (optional)
- [ ] Add the post to `archive.html`
- [ ] Add the post to the grid in `index.html` (or make it the new featured post)
