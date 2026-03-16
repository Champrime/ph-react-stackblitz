# servor Setup & Debugging Log

## The Goal

Move `servor` from `dependencies` to `devDependencies` in `package.json`, since it's a development tool (static file server) and not a runtime dependency.

---

## Step 1 — Moving servor to devDependencies

Ran the following commands:

```bash
npm uninstall servor
npm install --save-dev servor
```

`package.json` was updated correctly:

```json
"dependencies": {
  "react": "^19.2.4",
  "react-dom": "^19.2.4"
},
"devDependencies": {
  ...
  "servor": "^4.0.2",
  ...
}
```

---

## Step 2 — The Problem: `servor: command not found`

After the move, running `npm start` failed:

```bash
> ph-react@0.0.0 start
> servor . index.html 5173 --browse --reload --no-notify --single

sh: line 1: servor: command not found
```

---

## Step 3 — Diagnosing the Issue

Checked if the `servor` binary existed in `node_modules/.bin/`:

```bash
ls node_modules/.bin/servor
# → No such file or directory
```

Checked if the `servor` package folder existed:

```bash
ls node_modules/servor/
# → No such file or directory
```

`servor` was never actually installed despite npm not throwing an install error.

---

## Step 4 — Deeper Investigation

Checked `node_modules/` contents:

```bash
ls node_modules/ | wc -l
# → 16
```

Only 16 packages were present. A project with React, Vite, ESLint, and their dependencies should have well over 100. The install was clearly incomplete.

Tried a clean install (delete `node_modules` + `npm install`):

```bash
rm -rf node_modules
npm install
# → added 3 packages, audited 4 packages in 1s
```

Still only 4 packages — something in the environment was preventing a full install.

---

## Step 5 — Root Cause Found

```bash
echo $NODE_ENV
# → production

npm config get omit
# → dev
```

**Two things were causing npm to skip all `devDependencies`:**

1. **`NODE_ENV=production`** — When this env variable is set, npm automatically treats every install as a production install and omits dev deps.
2. **`npm config omit: dev`** — The global npm config was explicitly configured to omit dev dependencies on every install.

---

## Step 6 — The Fix

Cleared the global npm config setting and reinstalled with the correct environment:

```bash
npm config delete omit
NODE_ENV=development npm install
# → added 152 packages, audited 156 packages in 5s
```

Verified the binary:

```bash
ls node_modules/.bin/servor
# → node_modules/.bin/servor ✓
```

`npm start` now works correctly.

---

## Summary

| Issue | Cause | Fix |
|---|---|---|
| `servor: command not found` | `devDependencies` were never installed | Found root env/config issue |
| Only 4 packages in `node_modules` | `NODE_ENV=production` set in shell | Run installs with `NODE_ENV=development` |
| npm skipping dev deps globally | `omit: dev` in npm global config | `npm config delete omit` |

---

## Note for Future Installs

`NODE_ENV=production` may still be set in your shell session. Before running `npm install` in a dev project, either:

```bash
unset NODE_ENV
# or
NODE_ENV=development npm install
```
