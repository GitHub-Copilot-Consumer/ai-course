# Course Site (Hugo)

This directory contains the Hugo site for the course materials.

## Requirements

- Hugo extended (see https://gohugo.io/getting-started/installing/)

Recommended version:
- HUGO_VERSION=0.121.1

## Setup

1. Install Hugo extended for your platform.
2. Initialize the theme submodule (from this directory):

```bash
git submodule update --init --recursive
```

If you need to add the submodule from scratch:

```bash
git submodule add https://github.com/alex-shpak/hugo-book themes/hugo-book
```

## Local Preview

```bash
hugo server -D
```

## Build

```bash
hugo --minify -d public
```

The build output is written to `public/`.
