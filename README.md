# raitaskeen.me

Source for [raitaskeen.me](https://raitaskeen.me), the portfolio of Taskeen Haider, software engineer and founder of [LegacyExodus](https://legacyexodus.tech).

The site has one page and a case study for each project:

- [LegacyExodus](https://raitaskeen.me/work/legacyexodus): a modernization engine for legacy JavaScript and TypeScript.
- [Raavi Volt](https://raitaskeen.me/work/raavi-volt): an online store for an electric shop in Lahore.
- [Annemarie-Schimmel-Haus](https://raitaskeen.me/work/annemarie-schimmel-haus): a bilingual English and German website with a staff admin.
- [LegacyExodus analysis sample](https://raitaskeen.me/work/analysis-sample): an open slice of the engine with 86 passing tests.

## Stack

Next.js 16 (App Router, static pages), React 19, TypeScript, plain CSS and the Geist typeface. Tests run on Bun, and the site is deployed on Vercel.

## Run it locally

```bash
bun install
bun run dev      # http://localhost:3000
bun test         # content checks
bun run build    # production build
```

## Where things live

| Path | What it holds |
| --- | --- |
| `lib/content.ts` | All text, dates and figures on the site |
| `app/page.tsx` | The home page |
| `app/work/[slug]/page.tsx` | Case study pages |
| `components/` | Panel, tiles, the LegacyExodus showcase, the flow graph and the video player |
| `public/media/` | Screen recordings and posters of the projects |
| `public/assets/Taskeen_Haider_Resume.pdf` | The résumé linked from the site |
| `tests/content.test.ts` | Guards job dates, figures, pull request numbers and media files |

To change any wording or number, edit `lib/content.ts`. The tests fail if a job date or a verified figure changes.

## Deploying

Work goes to the `post-production` branch, which Vercel builds as a preview. A pull request from `post-production` into `master` publishes it to raitaskeen.me.

## Contact

[raitaskeen.dev@gmail.com](mailto:raitaskeen.dev@gmail.com) · [Book a call](https://cal.com/raitaskeen) · [LinkedIn](https://www.linkedin.com/in/raitaskeen) · [GitHub](https://github.com/raitaskeen)

## License

[MIT](LICENSE)
