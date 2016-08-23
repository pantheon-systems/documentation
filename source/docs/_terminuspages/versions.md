---
title: Version Updates
---
## Terminus 0.11.4
<div class="zero-clipboard">
<span class="btn-clipboard">Copy</span>
<figure class="highlight"><pre><code class="curl" data-lang="curl">curl https://github.com/pantheon-systems/terminus/releases/download/0.11.4/terminus.phar -L -o /usr/local/bin/terminus && chmod +x /usr/local/bin/terminus
</code></pre></figure>
</div>
[View on GitHub for more download options](https://github.com/pantheon-systems/terminus/releases/tag/0.11.4)

## Release Notes
- Added `new-relic enable` command. ([#1141](https://github.com/pantheon-systems/terminus/pull/1141))
- Added `new-relic disable` command. ([#1141](https://github.com/pantheon-systems/terminus/pull/1141))
- Added a confirmation to `site import`. To bypass, add `--yes` to your commands. ([#1132](https://github.com/pantheon-systems/terminus/pull/1132))
- The command which was `new-relic` command has become `new-relic status`. ([#1141](https://github.com/pantheon-systems/terminus/pull/1141))
- `site import-content` has been fixed such that either 'db' or 'database' can be used as an element. ([#1138](https://github.com/pantheon-systems/terminus/pull/1138))
- Fixed type error in `site hostnames lookup` which appears when there are no results. ([#1139](https://github.com/pantheon-systems/terminus/pull/1139))
- Fixed branch selection in `site delete-branch`. ([#1143](https://github.com/pantheon-systems/terminus/pull/1143))
- Removed `sites import` command. Please create new sites with `sites create` and then import via `site import` instead. ([#1132](https://github.com/pantheon-systems/terminus/pull/1132))
- Removed checks for service level on `site redis enable` and `site solr enable`. ([#1142](https://github.com/pantheon-systems/terminus/pull/1142))
<hr>
##Version History
### Terminus 0.11.3 Release Notes

- Added 5.6 and 7.0 as version options in site set-php-version. ([#1109](https://github.com/pantheon-systems/terminus/pull/1109))
- New command site import to import site archives. ([#1099](https://github.com/pantheon-systems/terminus/pull/1099))
