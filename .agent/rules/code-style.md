---
trigger: always_on
---

1. **Prefer types over interfaces**: Always use `type` definitions instead of `interface` for consistency and to avoid accidental declaration merging.
2. **No `any` type**: Do not use the `any` type. Use explicit types or `unknown` if absolutely necessary.
3. **Use Vitest**: Use `vitest` for all testing.
4. **Typecheck after coding**: Always run strict type checking `pnpm run typecheck` (e.g., `tsc --noEmit`) after implementing code.
5. **Lint after coding**: Always run linting (preferring Biome) after implementing code `pnpm run lint`.
6. **Run tests after coding**: Always run tests after implementing code `pnpm run test`.
7. **Build verification**: After changing 5+ files, always run the build command to verify system integrity `pnpm run build`.
8. **Prefer Biome over ESLint**: Use Biome for linting and formatting. Do not introduce ESLint.
9. **Prefer pnpm**: Use `pnpm` as the package manager.
