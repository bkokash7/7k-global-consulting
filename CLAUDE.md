# 7K Global Consulting

Static multi-page site for 7kglobalconsulting.com. Plain HTML, no build step.
Deploys from this repo. English pages at root, Arabic under /ar.

## Practices

The site covers four practices, in this order:
1. Owner's Rep Consulting (construction oversight)
2. Intercultural Consulting (relocation, cross-cultural teams)
3. Strategic Research Consulting (demographic, cultural, sector research)
4. AI Solutions Consulting (applied AI systems)

## Design

The site matches sevenkilo.com (the parent company site, repo ../Sevenkilo): same palette,
type, and flat editorial language. Tokens live in assets/css/styles.css `:root`.

- Palette: navy #142F4E (nav, mastheads, contact strip), navy deep #0B1B2E (footer),
  rust #B4452A (eyebrows, numbering, CTA buttons), paper #FAF8F4 / #F2EEE8 (sections),
  rule #DED8CF. Do not introduce other colors.
- Type: Space Grotesk 600 headings, IBM Plex Sans body, IBM Plex Mono for eyebrows,
  buttons, numbering, and form labels. Tajawal for Arabic. Do not introduce other fonts.
- Square corners, 1px hairline rules, no shadows or hover lifts. Grids of items use
  1px gaps over a rule-colored ground.

Do not use:
- purple or blue gradients
- cards with colored left borders
- generic SaaS icon-card grids
- inconsistent section spacing

The four practices are presented as an editorial numbered index (01, 02, 03, 04),
not as a grid of feature cards.

## Copy rules

- Page headlines are plain and single-line. No poetic two-line taglines with a gold subline underneath.
- Every call-to-action button reads "Contact", never "Schedule a Consultation".
- Use "Documentation-Driven", never "Evidence-Based". Most client work is private and cannot be shown publicly.
- Tone is institutional. No personal name or founder bio anywhere on the site.
- Write plainly. No em dashes in new copy. Avoid buzzwords such as delve, unlock, elevate, seamless, robust.
- Do not use the "not just X, it's Y" sentence structure.
- Do not repeat heading patterns like "Everything you need to..." or "Built for...".

## Contact

One unified form on contact.html: Name, Email, Practice Area dropdown
(Owner's Rep / Intercultural / Strategic Research / AI Solutions / Not Sure), Message.
Submit button reads "Send Message". Routes to info@7kglobalconsulting.com.
No separate forms per practice.

## Before changing page copy

The approved copy for each page is already written and settled. Ask before rewriting
existing headline, subtext, or service-block text on any page.
