# Features file

One feature per line, in the form `Name :: term | term | /regex/`.

```
# Lines starting with # are comments.
[shipped]
Create a widget :: create a widget | widget_create
Delete a widget :: delete a widget | widget_delete

[planned]
Export widgets :: export | /widget\s+export/
```

- `[shipped]`, `[planned]`, or any other bracketed word sets the status for the lines below it. The default is `shipped`.
- Terms are separated by `|`. A plain term matches at a word start, case-insensitive. A term wrapped in slashes is a regular expression.
- A line with no `::` uses the whole line as both name and term.

## Rating rules

| Rating | Rule |
|---|---|
| Dedicated | A page title or H1 matches, or one page has two or more matching headings |
| Partial | One matching heading, or at least 3 body mentions |
| Mention | 1 or 2 body mentions |
| None | No match |

These are leads. Choose terms the way readers would search, not the way the product team names things, and add synonyms. Then read the best pages before you write the verdict.

## Where to get the feature list

Use the product's own sources: release notes, a changelog, a command or tool listing, and the roadmap. Don't list features from memory.
