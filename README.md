# RenUSA Leadership Brief

Three-times-a-week intelligence newsletter for RenUSA leadership. Ships Monday, Wednesday, and Friday at 7:00 AM ET.

**Live archive:** [https://dave-renusa.github.io/LeadershipBriefing/](https://dave-renusa.github.io/LeadershipBriefing/)

## Audience

Internal — Ben, Kate, Dave, Grace, Amber. Distributed via email to `leadership@renusa.org` and archived publicly at the URL above.

## Editorial focus

**Sectors (priority order):** data centers, solar, wind, BESS, transmission, RTOs, other energy. A **renewables floor** guarantees every issue includes at least 2 solar/wind/BESS/transmission bullets in Radar and 2 in Frontlines.

**Geography (23 states):** VA, WV, PA, MI, OH, NC, IN, IL, IA, WA, OR, NM, AZ, CA, CO, UT, GA, TN, TX, KS, NY, NJ, WY — plus national.

**Bias:** RenUSA are community-engagement specialists. The brief surfaces **contested projects with organized opposition** — moratoriums, planning-commission denials, town-board fights, lawsuits, ballot initiatives, NIMBY filings.

**Peers tracked (folded into Plays of the Week):** Bantam Communications, Recall Strategies, KAOH Media, Calvert Street Group.

## Format

Bantam *Developer Dispatch* shape, themed by day:

| Day | Shape |
|---|---|
| **Monday** | The Week Ahead — Open · Must Read · Radar · On the Frontlines |
| **Wednesday** | Deep Dive — Open · long Must Read · Radar · On the Frontlines (light) |
| **Friday** | The Wrap — Open · Radar (multi-bullet roundup) · On the Frontlines · Plays of the Week |

**Plays of the Week (Fridays only):** notable community-engagement tactics from anywhere in the industry — peer firms, opposition coalitions, developers, regulators. Higher signal than tracking four firms' press releases three times a week.

Every issue: branded masthead, "⚡ The Takeaway" callouts after deep dives, state-tagged Frontlines bullets, snappy Bantam-style headlines.

## File layout

```
/index.html              archive landing (auto-updated each issue)
/MMDDYY.html             each volume, e.g. 051126.html
/assets/css/brief.css    branded styles (navy #1b3360, crimson #b41e44, cream #e3ded4)
/assets/img/renusa-logo.svg
/assets/img/renusa-logo-light.svg  (white-wordmark for navy masthead)
/generator/prompt.md     the editorial prompt the cron uses
/pleasant-valley.html    archived PV Solar dashboard
```

## Pipeline

Each M/W/F at 7:00 AM ET, a local Claude Code scheduled task fires and:
1. Generates the issue HTML
2. `git commit && git push` → live at GitHub Pages
3. Calls `~/Desktop/DMD Working Files/RenUSA Working Files/Leadership Brief/send_brief.py` to email the brief as HTML to `leadership@renusa.org` via Gmail SMTP

## Volumes

Volume 0 (preview) shipped Sat May 9, 2026. Volume 1 ships Mon May 11, 2026 at 7:00 AM ET.
