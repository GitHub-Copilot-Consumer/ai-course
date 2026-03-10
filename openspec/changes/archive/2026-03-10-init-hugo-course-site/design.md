## Context

The repository does not currently have a course website scaffold. We need a static site that supports frequent content updates and can be built locally and in CI with minimal dependencies.

## Goals / Non-Goals

**Goals:**
- Provide a Hugo site scaffold with a clear content hierarchy for lessons, assignments, and resources.
- Establish a baseline configuration and theme setup that is easy to update.
- Enable local preview and a repeatable build step for publishing.

**Non-Goals:**
- Full visual redesign or custom theme development.
- Automated content migration from other systems.

## Decisions

- Use Hugo extended as the static site generator to support common themes and asset pipelines. Alternatives considered: Jekyll (slower builds, Ruby toolchain), MkDocs (less flexible for multi-section content).
- Manage the theme as a Hugo module to keep updates straightforward. Alternative: vendored theme files (simpler, but harder to update).
- Define content types as top-level sections (`content/lessons`, `content/assignments`, `content/resources`) to keep authoring simple. Alternative: nested taxonomy-only structure (harder for authors to discover).
- Prefer a single config file (`config.yaml`) with site params grouped for readability. Alternative: multiple config files per environment (overkill for initial setup).

## Risks / Trade-offs

- [Theme module updates may change look] → Pin module version initially and document update steps.
- [Hugo version mismatches across environments] → Add a `HUGO_VERSION` note and ensure CI uses the same version.
- [Content structure may need adjustment later] → Keep sections minimal and document how to extend.
