# Freelance Project Logo Upgrade

## Scope
- Add the uploaded NextGen, One Step Myanmar, and Mhway Myanmar logos under the existing public logo directory with stable, readable filenames.
- Add a clear `freelanceLogos` mapping and associate each freelance project with its logo.
- Replace each star badge with a rounded glass logo badge.
- Show the company initial while an image loads and retain it if loading fails.
- Verify all three public paths and the rendered cards.

## Technical details
- Use root-relative `/logos/...` paths so production hosting serves the files directly.
- Keep the existing project card layout, colors, motion, and non-interactive behavior unchanged.
