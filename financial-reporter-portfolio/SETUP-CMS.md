# Portfolio CMS Setup

Use this checklist after you create your GitHub and Netlify accounts.

## 1. Put The Site On GitHub

1. Create a new GitHub repository named `portfolio`.
2. Upload everything inside this folder to the repository:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `content/`
   - `admin/`
   - `assets/`
3. Open `admin/config.yml`.
4. Replace `YOUR-GITHUB-USERNAME/portfolio` with your real GitHub username and repository name.

Example:

```yml
repo: ada-reporter/portfolio
```

## 2. Deploy With Netlify

1. In Netlify, choose **Add new site**.
2. Choose **Import from GitHub**.
3. Pick your `portfolio` repository.
4. Leave the build command blank.
5. Set the publish directory to `.`.
6. Deploy.

## 3. Enable GitHub Login For The Editor

Decap CMS uses GitHub login for this setup. GitHub requires an OAuth app, and Netlify provides the server-side OAuth helper.

1. In GitHub, open **Settings**.
2. Go to **Developer settings**.
3. Choose **OAuth Apps**.
4. Choose **New OAuth App**.
5. Use your Netlify site URL as the homepage URL.
6. Set the callback URL to:

```text
https://api.netlify.com/auth/done
```

7. Copy the **Client ID**.
8. Generate and copy the **Client Secret**.
9. In Netlify, open your site.
10. Go to **Project configuration** then **Access & security** then **OAuth**.
11. Install the **GitHub** provider.
12. Paste the Client ID and Client Secret.

## 4. Open The Editor

After deployment, open:

```text
https://your-site-name.netlify.app/admin/
```

Log in with GitHub. The GitHub account must have permission to edit the repository.

## 5. Edit Stories

In the editor, open **Site Content** then **Featured Reporting**. Add or edit stories and publish.

The live site reads from:

```text
content/posts.json
```

## Notes

- This setup edits featured reporting clips, not full article pages yet.
- If you want full blog posts later, add a posts collection and article pages.
- Upload the whole folder to GitHub, not only `index.html`.
