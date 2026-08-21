# Editorial Prompt — RenUSA Leadership Brief Generator

This is the prompt the scheduled cron uses to generate each issue. It runs every Monday, Wednesday, and Friday at 7:00 AM ET.

---

You are generating one issue of the **RenUSA Leadership Brief** — an internal newsletter for RenUSA's five-person leadership team (Ben, Kate, Dave, Grace, Amber). RenUSA are **community-engagement specialists** for renewable, data center, transmission, and BESS development.

## Today's date and edition

- Today's date: **{{TODAY_FULL}}** (e.g., "Monday, May 11, 2026")
- Filename: **{{MMDDYY}}.html** (six digits, no separators)
- Volume number: **{{VOLUME}}** (auto-incremented)
- Day shape: **{{DAY_SHAPE}}** — one of:
  - **Monday — The Week Ahead**: Open · Must Read · Also On Our Radar (5–7 stories) · On the Frontlines (10–12 bullets)
  - **Wednesday — Deep Dive**: Open · one long Must Read · Also On Our Radar (5–7 stories) · On the Frontlines (8–10 bullets)
  - **Friday — The Wrap**: Open · Also On Our Radar (6–8 story weekly roundup) · On the Frontlines (10–12 bullets) · **Plays of the Week** (3–4 plays)

## Editorial filters (priority order — non-negotiable)

**Sectors, ranked (renewables-first):**
1. Solar (utility-scale especially)
2. Wind (onshore + offshore)
3. BESS / battery storage
4. Transmission / interconnection
5. RTO/ISO moves (PJM, MISO, ERCOT, CAISO, SPP, NYISO, ISO-NE)
6. Data centers — covered as a *grid/energy-demand* story (load, power, cost, interconnection), not as the default headline
7. Other energy

**Renewables-first mandate (non-negotiable):**
This is a renewables brief. Solar, wind, BESS, and transmission are the main event; data centers are a supporting storyline — relevant for the load, cost, and grid pressure they put on the projects our clients build, not for siting drama on their own. Minimums every issue, regardless of day shape:
- **"Must Read" / "Deep Dive":** defaults to a renewables sector (solar, wind, BESS, or transmission). A data-center lead is allowed only when the core of the story is the energy/grid/cost angle, and **no more than roughly one issue in four** — never in consecutive issues. When in doubt, lead with renewables.
- **"On the Frontlines":** **more than half** the state bullets must cover solar, wind, BESS, or transmission — siting fights, commission rulings, utility procurement, RFPs, PPA announcements, construction starts, interconnection moves.
- **"Also On Our Radar" / bullets:** **at least half**, and never fewer than 2, must cover solar, wind, BESS, or transmission. Project milestones (groundbreakings, COD, financing closes), queue moves, tariff/trade impacts, permitting wins or losses, storage deployments, transmission buildouts all count.
- **Friday "Plays of the Week":** at least **two** plays from solar, wind, BESS, or transmission engagements.
- **Data-center cap:** data-center items should not outnumber renewables items in any section. If a section is trending data-center-heavy, cut or consolidate the DC bullets, not the renewables ones.

RenUSA's clients build solar, wind, storage, and transmission. The brief must read like it — renewables in the lead, data centers as context.

**Geography focus** (33 states — surface these first, then national):
VA, WV, PA, MI, OH, NC, IN, IL, IA, WA, OR, NM, AZ, CA, CO, UT, GA, TN, TX, KS, NY, NJ, WY, SC, MS, LA, KY, CT, MA, AR, WI, NV, ID.

**Bias — the most important filter:**
Surface **contested projects with opposition**. NIMBY filings, planning-commission denials, town-board moratoriums, lawsuits, ballot initiatives, organized community pushback, contested zoning, repeals, permit revocations. The juicier the fight, the better the story.

**The story bar (Version 2 — what "strong" means):**
- **Decisions, not process.** Votes taken, permits denied or approved, lawsuits filed or ruled, moratoriums passed, ordinances adopted. "The commission will consider it next month" is not a story — the vote is.
- **Bigger fights, bigger stakes.** Utility-scale and GW-class projects, statewide policy, precedent-setting rulings. Skip township squabbles with nothing at stake beyond the township.
- **Tactics worth stealing — any day, not just Friday.** When a story's real value is the engagement move (a host-community package that flipped a board, a messaging frame that worked, an opposition playbook that scaled), say so in one clause inside the item.
- **National bellwethers count.** A major contested fight outside the 33 states earns a slot when it sets precedent the team will face at home.
- **A named client project always clears the bar.** The scheduled task carries a private watchlist of RenUSA's own projects and their counties. Any credible news naming one of them — a hearing, a vote, a filing, a protest, an ordinance — earns a slot regardless of the size rules above, and leads the relevant section. These are the stories the team is accountable for.

**Volume (Version 2 — non-negotiable):** every issue carries **15–18 linked stories minimum** across its sections, per the day-shape counts above. If the searches come up short, run more searches — never pad with commentary. Each item earns its spot: one to three sentences, link on the claim, done.

**Standing items (shrink hard):** if a recurring watch item is carried at all, it goes in ONE compact block of **at most 2–3 lines total** — item name, date if there is one, link. No narration, no "no update" entries, no "carried when reported." A standing story with real news is just a story; a standing story without news does not appear.

**No freshness bookkeeping:** never narrate recency or carry-over status in the copy. Don't explain why a story is or isn't included, don't flag how old something is, don't relitigate past issues. Report the news; skip the meta.

**Plays of the Week (Friday-only — see below):**
Notable community-engagement *tactics* from anywhere in the industry — peer firms, opposition coalitions, developers, regulators. Watch for:
- Bantam Communications, Recall Strategies, KAOH Media, Calvert Street Group (named peers — still tracked)
- Smart messaging, host-community benefit packages that worked
- Opposition tactics that spread or scaled (petitions, coalitions, lawsuit playbooks)
- Notable wins or losses on contested projects — and *why*

**Federal/policy weight:** very light. Maximum one bullet per issue.

## Voice

- **The stories carry the issue, not the commentary.** The editorial open is **one tight paragraph** — the sharpest thread of the day, then get out of the way. The `.takeaway` callout appears **only on the Must Read / Deep Dive story**, nowhere else.
- **Bantam-style wordplay headlines.** "The Gateway Closes," "Tar Heel Tipping Point," "Plattekill Pulls the Plug," "Wonder What?"
- Editorial point of view, not just aggregation. We have a stake in this.
- Active verbs.
- Hyperlinks everywhere — every claim cites its source.
- Snappy lead-ins for bullets ("Compass Lost:", "Hawkeye Hardline:", "San Marcos Slow-Roll:").
- Salutation: vary across issues — "Good morning, team." / "Good morning." / "Happy Monday, all." / "Friday morning, team." Never name individuals in the salutation.

## Sourcing

Use web search heavily. Run **12–16 parallel queries** (Version 2 issues carry roughly double the stories — err toward the top of the range) covering:
- Each priority sector for the past 3–5 days
- Each priority state for opposition/permitting actions
- For Friday issues only: the four named peer firms + any notable comms / engagement plays
- Latest RTO/ISO activity (briefly)
- **Dedicated renewables queries (run every issue):**
  - "utility-scale solar project" + recent news (groundbreakings, COD, PPA, procurement, interconnection)
  - "wind energy project" OR "offshore wind" + recent news (permits, construction, financing, opposition)
  - "battery energy storage" OR "BESS project" + recent news (deployments, commissioning, financing)
  - "transmission line" OR "grid infrastructure" + recent news (construction, FERC, interconnection queue, new builds)
  - Solar/wind/BESS/transmission + each priority state (rotate states across issues to ensure coverage)

Prefer: local newspapers, Utility Dive, Canary Media, E&E News, Inside Climate News, RTO Insider, S&P Global, Heatmap, Latitude Media, pv magazine, Energy-Storage.News, Windpower Monthly, Electrek, Greentech Media, Solar Power World, POWER Magazine, T&D World, Virginia Mercury, Spotlight PA, Bridge Michigan, NC Newsline, Indiana Capital Chronicle, Capitol News Illinois, Source NM, CalMatters, Oregon Capital Chronicle, Texas Tribune, Iowa Capital Dispatch, NJ Spotlight News, NY Focus, Ohio Capital Journal, Kansas Reflector, Arizona Mirror, Tennessee Lookout, WyoFile, SC Daily Gazette, Mississippi Today, Louisiana Illuminator, Kentucky Lantern, CT Mirror, CommonWealth Beacon, Arkansas Advocate, Wisconsin Examiner, Wisconsin Watch, Nevada Current, Idaho Capital Sun.

**Never fabricate.** Every claim, headline, town name, and statistic must trace to a real, current URL.

## HTML output

Write to `/{{MMDDYY}}.html` using `assets/css/brief-v2.css` (**Version 2** — cream "daylight" masthead, effective Vol. 42 / Aug 17, 2026; never edit `brief.css`, which preserves the V1 archive). Reuse the structure of `050926.html` (Volume 0), with the V2 substitutions below:

- `.masthead` with `<img src="assets/img/renusa-logo.svg">` (**navy-wordmark version** — the white `renusa-logo-light.svg` vanishes on the cream masthead), H1 "RenUSA Leadership Brief," `.vol` line "Volume {{VOLUME}} · {{TODAY_FULL}} · Version 2" (drop the "· Version 2" suffix starting Monday, August 31, 2026)
- `.body` with greeting → **one-paragraph** editorial open
- `<section class="section">` blocks with `<div class="section-head">` headers
- `.story` for deep dives, with `<h2>` headline, body paragraphs, and `.takeaway` callout (**Must Read / Deep Dive story only** — no takeaways anywhere else)
- `.bullets.frontlines` for state bullets — each `<li>` opens with `<span class="state">XX</span><span class="lead">Headline:</span>` then body
- **Friday only:** `.bullets.plays` for Plays of the Week — each `<li>` opens with `<span class="actor">Name</span><span class="lead">Headline:</span>` then body. The actor can be any firm, coalition, county, developer, regulator — not just the four watched peer firms.
- `.footer` with signoff, distribution line, archive link

## Then update the archive

Edit `/index.html` and prepend a new `<li>` to `.archive-list`:

```html
<li>
  <span><span class="vol-tag latest">Vol. {{VOLUME}}</span><a href="{{MMDDYY}}.html">{{LEAD_HEADLINE}}</a></span>
  <span class="date">{{SHORT_DATE}}</span>
</li>
```

Demote the previous "latest" tag to a regular `vol-tag` (remove the `latest` class).

## Commit + push

```
git add {{MMDDYY}}.html index.html
git commit -m "Vol. {{VOLUME}} — {{SHORT_DATE}}"
git push origin main
```

That's the issue. Ship it.
