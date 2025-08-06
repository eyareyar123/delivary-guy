/**
 * Commit Message Format: [TYPE] - message
 *
 * Allowed types:
 * [FEAT]     - A new feature or significant enhancement
 * [FIX]      - A bug fix or error correction
 * [STYLE]    - Code style changes (formatting, linting, etc.)
 * [REFACTOR] - Code restructuring without changing behavior
 * [DOCS]     - Documentation updates or additions
 * [TEST]     - Adding or updating tests
 * [CHORE]    - Maintenance tasks (e.g. dependency updates)
 * [PERF]     - Performance improvements
 * [CI]       - Changes to CI/CD configuration
 * [BUILD]    - Changes to build system or tooling
 *
 * Format is strictly enforced using Commitlint + Husky.
 * Example: [FIX] - Correct login bug
 */
module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^\[(FEAT|FIX|STYLE|REFACTOR|DOCS|TEST|CHORE|PERF|CI|BUILD)\] - (.+)$/,
      headerCorrespondence: ["type", "subject"],
    },
  },
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "FEAT",
        "FIX",
        "STYLE",
        "REFACTOR",
        "DOCS",
        "TEST",
        "CHORE",
        "PERF",
        "CI",
        "BUILD",
      ],
    ],
    "subject-empty": [2, "never"],
    "type-case": [2, "always", "upper-case"],
  },
};
