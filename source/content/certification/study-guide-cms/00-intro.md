---
title: WebOps Certification
subtitle: Study Guide Introduction
certificationpage: true
type: certificationpage
layout: certificationpage
showtoc: true
tags: []
permalink: docs/certification/study-guide
contenttype: [guide]
innav: [false]
categories: []
cms: [drupal, wordpress]
audience: []
product: []
integration: [--]
nexturl: /certification/study-guide/webops
---

At Pantheon we consider velocity to be the indispensable shared characteristic of successful websites and web teams. Successful web teams make changes confidently and quickly because the target for what will win on the web never stops moving.

We've developed our views of WebOps to reflect and articulate in greater detail how web teams can increase their velocity to grow the value of their work.

Our perspective on WebOps is broad. At Pantheon we see WebOps as the composed of three interrelated parts:

* The **people **who define and bring about the website's success
* The **processes** they use to increase their velocity toward success
* The technology **platform** they rely on to stabilize their success

This view of WebOps is more holistic and cross-functional than the technological meaning of "website operations" that was the focus when that term came into usage.

A lot has changed in the decades that professionals have operated websites, particularly in those three areas noted above.

* The number of **people** involved in operating a professional website has climbed enormously. It's not just "webmasters" operating websites anymore.
* The **waterfall processes** that still structure a great deal of projects are increasingly ineffective.
* The general-purpose servers operated by IT generalists to host websites are giving way to purpose-built **platforms**.

Teams that don't respond appropriately to these overwhelming market pressures set themselves up for one or more of the failure modes of the website operations.

## Three Failure Modes of Website Operations

Websites can fail in so so so many ways. Here are three common modes of failure that highlight the way websites strain people, process, and platforms.

### People Failure: From Authoritative Webmaster to Unorganized Web Mob.

Were you ever a "webmaster?"

If you are reading this study guide for a Pantheon WebOps Certification test, there is a decent chance that you remember those days. There was a time when one person could hold in their head all the expertise necessary to build, launch, and operate a successful website.

Back then, not only could one person **_know _**all the things about website operations they somehow had enough time to **_do_** all the things.

Those days are gone.

The complexity is too complex. The stakeholders' stakes are too high. The workflows are too much work. No one person can do it all.

Like it or not, the game of website operations has become a team sport.

But for too many organizations the players might not recognize each other as teammates. Too often, co-workers treat each other as opponents. 20 years ago, you may have been a webmaster. Now you find yourself in a situation where:

* Your CMO (Chief Marketing Officer) is mad
* that your CPL (Cost Per Lead) is up
* and your CWV (Core Web Vitals) are down
* because your CDN (Content Delivery Network)
* (that is only understood by your CTO (Chief Technology Officer))
* slowed when your CHR (Cache Hit Ratio) tanked
* as your CRO (Conversion Rate Optimization) contractor
* restructured CSS (Cascading Style Sheet) selectors
* (while updating a CTA (Call To Action)) which
* broke crufty custom custom code (in the CMS (Content Management System))
* that your CIO (Chief Information Officer) needed to comply with
* the CCPA (California Consumer Privacy Act)

<Youtube src="qL3KNmRPI3Y" title="Steve Gets Overloaded with Initialisms Again" />

Every person in this situation can point blame at someone else. No one here seems to be accountable for the holistic success of the website.

The world of the web is too wide for solo webmasters, but when they're replaced by an uncoordinated web mob, the results can be like the above disaster. A strong and accountable product owner can avert such problems. Jump ahead to the **PEOPLE** section of the next chapter if you want to learn more.

Of course, directly addressing the **people**-problems in this hypothetical disaster is hard. You could avoid that question and blame the technology **platform **instead that allowed such bugs and replace it through a slow **process**.

Ignoring the people challenges can bring you straight into a process failure.


### Process Failure: The Never Ending Relaunch

What if our hypothetical failing website above with its broken CDN, CSS, and CMS could be wiped away entirely and replaced with the perfect website?

That doesn't sound realistic. But that's the dream that pulls too many teams into the failure mode of The Never Ending Relaunch.

In The Never Ending Relaunch, all the folks who are trying, and failing, to keep this site from collapsing decide to start from scratch. They hope that they can redesign, rebuild, and relaunch a new site before the current falls apart completely. [We've written more extensively about how that process is destined for pain](https://pantheon.io/resources/ebooks/how-kill-website-relaunch).

There is no such thing as a perfect website. And even if a website _could_ be perfect today and achieve absolute success today against its KPIs, would the site be perfect tomorrow? The world keeps turning. The expectations of website visitors keep rising. Can the website keep up?

Left untouched, or left running on inertia, most every website decays over time unless a team intentionally changes it for the better.

And "better" is a constantly moving target. (Remember in 2013-ish when every fresh website needed huge images with a parallax scrolling effect. Yikes. Yesterday's "better" might be tomorrow's "worse.")

In this reality of constant change, the best any website, web team, or web platform can do is increase their velocity toward that ever-moving target of better.

The last few decades of software engineering have provided tried and true agile formulas with varying amounts of dogma in their processes. Whether your process is Scrum with a capital "S" or perhaps just playing project management jazz with little more than the agile manifesto on your metaphorical music stand, the ideas are the same in their essence:

* Figure out where you want to go
* Understand where you are now
* Take a step in the right direction
* Repeat

Whichever flavor of project management **processes** your **people** like, there's still one more failure mode of website operations to avoid.


### Platform failure: Serving Servers

Even with a solid cross-functional team of **people** and iterative **processes, **the path to resolving the above hypothetical web disaster needs a solid technology platform.

LAMP stack systems like WordPress and Drupal evolved first in an era that assumed general purpose servers. Those early webmasters often filled their days with fine-tuning linux boxes to suit a given purpose. Now web architecture revolves more around speciality pieces of infrastructure. Now major cloud providers show reference architectures that suggest buying and configuring 9 or 10 different products to run one environment for one CMS. Both sound like non-starters for our hypothetical.

Again there's a risk carried over from the old mindset of website operations that valued this layer of technical expertise above all else. The risk is that this platform layer consumes all your energy and budget.

Is the web team solely responsible for every layer of technology from the JavaScript running on site visitor's devices to the operating systems on the servers producing the site? If so, there is a high likelihood that any bug at any layer sets off a chain of frustrations like we saw in that hypothetical situation going from CDN to CSS to CMS.

Clear boundaries between layers of **platform** technology ensure that the **people** responsible for making the website successful are less likely to get bogged down as they execute their **process**.

Avoiding the slow spots and driving velocity is essential for success on the web. This guide will introduce you to how the Pantheon Platform supports web teams.
