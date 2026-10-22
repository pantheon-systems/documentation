# Gap table template

Copy this structure into the audit note. Keep every section, even when one is empty, so readers can tell "none found" from "not checked".

```markdown
# <Product> docs gap table: <pass name>

Purpose, audience, and the date the state was captured. Owners stay blank where no source names one.

**Sources read:** each source, linked. **Not read:** what you couldn't access, and why.

## 1. Named as missing earlier, now published
| Item | Source | Published page |

## 2. Still to create
| # | Page or work | Type | Evidence | Live check today | Known owner |
Types: tutorial, how-to, reference, explanation, guide, video, visual.
Features not live yet go here too, marked **Create after it ships**, with the roadmap target and ticket.

## 3. Defects in existing pages
| Published page | Source doc | Defect | Today |
Both links on every row. Say whether you read the source doc or only the page.

## 4. Open tickets for new docs (not in the table above)

## 5. Shipped features with thin or no dedicated docs (needs confirmation)
| Feature or topic | Evidence | To check |

## 6. Features still to ship (docs due on release)
| Feature | Target ship |

## 7. Open requests from stakeholders

## 8. Decisions for the meeting

## 9. Size for planning
Net new pages by source, a pace table (pages per working day against weeks), and what moves the estimate more than pace.

## 10. Limits
What one reader, one pass, and keyword counts can't establish.
```

Row rules:

- One claim per row, with a link a reader can follow.
- A row from a keyword count says so, and gets a "to check" question.
- A feature flagged or in beta lists the flag or stage in the evidence cell.
