// .commitlintrc.js
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
