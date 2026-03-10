## ADDED Requirements

### Requirement: Hugo site scaffold exists
The repository SHALL include a Hugo site scaffold with standard Hugo directories and configuration.

#### Scenario: Initial scaffold present
- **WHEN** a developer inspects the site root
- **THEN** standard Hugo directories (e.g., `content`, `layouts`, `static`) and a config file are present

### Requirement: Course content structure is defined
The site SHALL provide top-level sections for lessons, assignments, and resources to support course authoring.

#### Scenario: Content sections available
- **WHEN** an author creates new content
- **THEN** they can place files under `content/lessons`, `content/assignments`, and `content/resources`

### Requirement: Local preview is supported
The site SHALL support local preview via the Hugo development server.

#### Scenario: Run local server
- **WHEN** a developer runs the documented preview command
- **THEN** Hugo serves the site locally without errors

### Requirement: Build output is reproducible
The site SHALL support a build command that produces static output suitable for publishing.

#### Scenario: Build succeeds
- **WHEN** a developer runs the documented build command
- **THEN** Hugo generates a static site output directory without errors
