# @gmozer/github

This library encapsulates GitHub data fetching logic for the gmozer.ca portfolio website.

## Features

- **GitHub Stats**: Fetches repository counts and commit contributions.
- **Caching**: Utilizes Next.js `unstable_cache` for efficient data retrieval.
- **Mock Data**: Provides mock data fallback for development or API failures.

## Usage

Import the `getGithubStats` function to fetch data:

```typescript
import { getGithubStats } from '@gmozer/github';

const stats = await getGithubStats();
```

## Environment Variables

This library requires `GITHUB_TOKEN` to be set in your environment variables to authenticate with the GitHub API.

## Running unit tests

Run `nx test github` to execute the unit tests via [Vitest](https://vitest.dev/).
