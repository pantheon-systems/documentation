---
title: WebOps Certification
subtitle: Chapter 1
description:
certificationpage: true
showtoc: true
type: certificationpage
layout: certificationpage
tags: []
permalink: docs/certification/study-guide/chapter-1-webops
contenttype: [guide]
innav: [false]
categories: []
cms: [drupal, wordpress]
audience: []
product: []
integration: [--]
---

<Alert title="Learning Objectives for This Chapter:"  type="info" >

**What is WebOps?**

* Define WebOps and the principles it emphasizes.
* Describe WebOps' impact on the lifecycle of a web application.
* Describe why WebOps is particularly valuable for Open Source developers.
* List three general problems that can be solved through the implementation of WebOps.

**What Problems Does WebOps Solve?**

* Describe how WebOps helps solve collaboration bottlenecks between Marketing, Developers, and IT.

**Shortening the Marketer/Developer Feedback Loop**

* Define the responsibilities of a marketing leader as a Product Owner of the website
* Describe some of the common KPIs that a marketer is responsible for in order to deliver business impact through the website.
* Explain how WebOps helps shorten the feedback loop between marketing and developers.

**Creating a Partnership between IT and Marketing**

* Describe the types of challenges that IT leaders are typically most concerned about.
* Explain why marketing teams might view IT as a bottleneck.

**Reducing Friction for Developers**

* Explain some of the extra tasks a developer is typically expected to perform, beyond simply writing code.
* Describe how putting WebOps guardrails in place ahead of time helps Developers be more productive and work more efficiently.

</Alert>

## Who cares about WebOps?

Before answering fully what Pantheon means by "WebOps" as an abbreviation for Website Operations, let's look at who might even care about such a term. In the decades that Pantheon's founders have spent working within websites, they have found over and over again that making a website successful is a team effort. WebOps is a team sport.

Though sports teams tend to be more successful when everyone on the team knows they are on the team. The players know how points are scored in the game and what it takes to win.

Unfortunately for many organizations struggling with their web presence, the sense of team necessary to succeed is hard to cultivate. Too many teams discover the interpersonal and interconnected nature of operating websites when there is a problem. Often that problem reaches the highest levels of a company. Have you ever found yourself in a situation where



* Your CMO (Chief Marketing Officer) is mad
* that your CPL (Cost Per Lead) is up
* and your CWV (Core Web Vitals) are down
* because your CDN (Content Delivery Network)
* (that is only understood by your CTO (Chief Technology Officer))
* slowed when your CHR (Cache Hit Ratio) tanked
* as your CRO (Conversion Rate Optimization) practice
* restructured CSS (Cascading Style Sheet) selectors
* (while updating a CTA (Call To Action)) which
* broke fragile custom code (in the CMS (Content Management System))
* that your CIO (Chief Information Officer) needed to comply with
* the CCPA (California Consumer Privacy Act)

OK, maybe it is not realistic or even desirable for your CMOs and CTOs to consider themselves part of your WebOps team. But when your website is not operating well, when it is not doing its job, they will want a clear accounting from a web team.

The sooner the cross-functional web team forms, the sooner you can play the sport of WebOps, and play to win.



## What is WebOps?


<Alert title="Learning Objectives for This Chapter:"  type="info" >

**By the end of this section, you should be able to:**

* Define WebOps and the principles it emphasizes.
* Describe WebOps' impact on the lifecycle of a web application.
* Describe why WebOps is particularly valuable for Open Source developers.
* List three general problems that can be solved through the implementation of WebOps.

</Alert>

If you are a developer or an engineer, you're likely familiar with DevOps - a collection of practices and tools designed to unify and streamline the processes of software development ('Dev') and IT operations ('Ops'). The fact that DevOps has become so popular underscores a critical hurdle in contemporary software development - that successful software releases are a team sport, requiring cohesive cross-functional collaboration, and that bridging the gap between diverse teams, each with its own perspectives and objectives, and guiding them towards a shared goal, can be complex and challenging.

Put simply, WebOps seeks to apply the principles of DevOps to applications on the web, where digital marketing teams fight hard to deliver business impact through their most important channel - Digital. WebOps is a set of practices and principles for building and optimizing websites that emphasizes cross-functional collaboration, automation of repeatable tasks, and a continuous iterative improvement model that lasts throughout the lifecycle of a website.

WebOps is a methodology that helps cross-functional teams work in harmony, improving the productivity and efficiency of the entire web team, from developers and designers to content editors and marketing and IT stakeholders. By facilitating the shift from the monolithic waterfall approach that has traditionally guided website launches, to an iterative, continuous cycle of measurable improvements over time, WebOps allows the website to evolve as a living, breathing entity that can deliver true impact at each stage of its lifecycle.

At its core, WebOps is about breaking down silos and creating a culture of collaboration and continuous improvement. By automating repetitive tasks and using tools that facilitate communication and feedback, teams can work more rapidly and more efficiently by reducing the risk of errors or miscommunications. This puts marketing teams in position to respond to changing business needs, market shifts, and new user requirements in real time. 

WebOps also emphasizes continuous integration and delivery, meaning that changes are tested and deployed quickly and reliably. This is achieved through the use of automated testing and deployment tools, which can help catch errors early in the development process and reduce the risk of downtime or other issues.

For Open Source developers, WebOps is especially important because it provides a framework for managing the entire web development process, from design to deployment. Both Drupal and WordPress have lifecycles that often entail complex development requirements, cross-functional collaboration, performance and security considerations, and automated testing and deployment. By emphasizing collaboration, automation, and continuous integration and delivery, WebOps can help Drupal and WordPress developers work more efficiently and reduce errors.

Ultimately, WebOps sets the stage for a high-performing team dynamic, enabling cross-functional collaboration, enhancing productivity, and driving superior end results. The flexibility inherent in this approach ensures businesses can adapt and thrive in an ever-evolving digital landscape.


<Alert title="Key Takeaways:"  type="info" >

* Successful software delivery is a collaborative effort among many different stakeholders and teams. Its success depends on how well these teams work together.
* WebOps helps teams collaborate to successfully apply the principles of DevOps to their website, which is one of the most important marketing channels for driving the business forward.
* Unlike traditional software, the website is a living, breathing entity that requires continuous feedback and improvement over time. WebOps makes this feedback loop faster and easier to navigate.

</Alert>


## What Problems Does WebOps Solve?

<Alert title="By the end of this section, you should be able to:"  type="info" >

* List three general problems that can be solved through the implementation of WebOps.
* Describe how WebOps helps solve collaboration bottlenecks between Marketing, Developers, and IT.

</Alert>

WebOps addresses common points of friction that slow teams down, such as collaboration bottlenecks, code regressions, content freezes, and application maintenance. It allows cross-functional web teams to be agile, emulating the approach used by the best software-engineering and product-development teams to create successful products. Agility is what enables companies to consistently outpace the competition. Agile teams move faster and more efficiently, which is how they deliver results.

### Collaboration Bottlenecks: Who Owns the Website?

Marketing, IT, and Developers can all lay claim to ownership of the website. According to a survey of over 400 Marketing and IT leaders conducted by Hanover Research, there is a lack of consensus over who owns the site: 84% of Marketing leaders claimed to own their organization’s website, while 87% of IT leaders also claimed to own their organization’s site. Add to this impasse the Developers and Designers often caught in the middle. No website gets made without them!

In reality, the success of the website comes down to how well these three teams collaborate. When collaboration bottlenecks occur, progress on the website stalls out, and the business loses.


### WebOps Shortens the Feedback Loop Between Marketing and Developers

The website is a digital product. Teams can find success when a marketing leader acts as  the Product Owner of the website, driving the strategy and being measured on how well that strategy is executed. Marketing teams are usually responsible for the results of the website, which are commonly known as Key Performance Indicators (KPI’s). [Some of the most common KPI’s used to measure the success of a marketing website include](https://pantheon.io/blog/stop-sprinting-circles-find-your-north-star):

* **E-commerce revenue:** A site that is a point of sale will likely use revenue as the North Star. This is ultimately how you will prioritize your efforts and measure the impact.
* **Ad impressions or ad revenue:** If you're running a media property, your North Star is going to be adjacent to revenue. You'll want to pick a metric of traffic or user engagement.
* **Lead generation:** Lots of websites in a B2B business context are marketing tools whose obvious goal is to create pipeline for a business; they should focus on conversion rates and overall volume of leads. Many advocacy or campaign sites also fit this mold.
* **Unique users:** A website that exists to broadly communicate a message should be oriented around a total quantity of unique users as a way to measure how broadly its reach is being felt.
* **Daily active users: **A website that exists to engage a core audience (e.g. a community forum) should prioritize daily (or weekly) active users.

Leveraging their deep understanding of customer behavior, market trends, and business objectives, Marketers map out the strategic vision for the website. This includes defining the user journey, required functionality, and the overall look and feel of the site, to effectively communicate the brand message and drive customer engagement.

Marketing is responsible for capturing leads, even as conditions evolve, and they must be able to run experiments to optimize their approach over time. Ideally, this requires the ability to make changes at any time without having to go around other teams (such as IT). However, Marketing usually relies on developers, with their technical prowess, to implement the changes needed to bring their vision to reality.

Developers possess a unique skill set that allows them to work with code to create magical experiences for visitors to the website. Developers create the site's architecture, write the code, integrate necessary plugins or modules, and ensure the site's performance and security. Without their talent, Marketing would be unable to execute on the strategy that will help them achieve their KPIs.

Developers are autonomous and do not require help from Marketing to write code, but they must adhere to the strategic vision set out by the Marketing team by converting those high level ideas into detailed technical tasks. They break down the strategy into individual components such as feature development, design changes, plugin integrations, and performance enhancements. And they often utilize an Agile approach, breaking the tasks up into iterative development cycles, or sprints, which typically last one or two weeks.

Effective collaboration between Marketing and Developers requires a tight feedback loop between the two teams. If Marketing has an idea that needs to be implemented “yesterday”, the Developers must be able to quickly shift focus toward the prioritized work, and temporarily away from what they might be working on that is less pressing. The sooner Developers are able to solicit feedback from the Marketing team, the less likely they are to waste effort and elongate the timeline by going too far down a path that misses the mark. 

WebOps can shorten that feedback loop by providing the tools, workflows, and guardrails to ensure that each team can be in the best position to deliver and respond to feedback, ensuring that the Developers’ efforts are hitting the mark defined by Marketing at each step of the way.




## WebOps Enables IT and Marketing to Become Strategic Business Partners


<Alert title="By the end of this section, you should be able to:"  type="info" >


* Describe the types of challenges that IT leaders are typically most concerned about.
* Explain why marketing teams might view IT as a bottleneck.

</Alert>


While Marketing teams are laser focused on hitting those KPIs, driving customer engagement, brand visibility, and lead generation, IT teams have their own set of responsibilities and concerns. 

Some of the concerns that keep IT up at night include:



* **System Stability**: IT operates in a world where any system downtime can result in significant business losses, as well as lost productivity and damage to the company’s reputation.
* **Data Security:** IT must protect data from breaches, which could result in financial loss, damage to the brand reputation, and legal consequences.
* **Infrastructure Scalability: **As businesses grow, IT is responsible for ensuring that the company’s digital infrastructure keeps pace with the growing needs of the business. This involves anticipating future needs, planning for increases in traffic, and implementing systems that are flexible enough to scale with the business.
* **Technology Maintenance and Upgrades:** Aging technology that is not maintained properly can quickly become a security liability. IT ensures that key technologies are secure and up to date with the latest security updates. They manage software updates, hardware upgrades, and integration of new technologies into existing infrastructure.
* **Compliance: **IT teams have to ensure that all systems are compliant with the appropriate regulations for their industry in order to avoid legal penalties.  

IT teams tend to prioritize thoroughness over speed in the face of these responsibilities. Marketing often requires fast turnarounds to keep up with market trends, competitive pressures, or campaign schedules. This discrepancy can often lead Marketing to view IT as a bottleneck.

Another important thing to keep in mind is that the marketing website is just one application among many. IT is usually also responsible for managing entire fleets of systems and applications that make enterprises and organizations run. Where the Marketing team sees the website as a growth engine and a living, breathing entity, IT views it through the lens of mitigating risk, and maintaining stability, security and scalability. The old adage, “if it ain’t broke, don’t fix it” tends to resonate with IT’s aversion to risk. Marketing’s desire to experiment and continuously iterate on the website has the potential to make IT very nervous.

Enter WebOps! WebOps allows teams to automate repetitive tasks where constant manual interventions are not only inefficient, but also risky, in that they introduce risk of human error, threatening the stability and security of the website. A WebOps platform provides the tools and workflows to allow teams to automatically adhere to best practices every time by packaging multiple manual steps into automated, repeatable functions. This process is commonly known as a CI/CD pipeline, which includes three separate but related practices: Continuous Integration, Continuous Delivery, and Continuous Deployment (see fig. 1.1 for more detail).  



<Alert title="Web Development Terminology: CI/CD Workflow"  type="info" >

**Continuous Integration** (CI) is the process of automatically turning the commits you make in your codebase into a usable build (website). It involves integrating changes from multiple contributors into the main codebase frequently, often several times a day. Each integration is verified by an automated build and test process to catch errors early. Continuous Integration requires some level of testing to verify that the build process succeeded. With CI you define how your code is transformed into a working site; often living in a sandbox environment.

**Continuous Delivery** introduces the concept of a “deployment pipeline.” Continuous Delivery forces you to define in detail how your deployment pipeline takes changes from that sandbox and gets them to the production environment. Sites on Pantheon use a deployment pipeline that goes through our Dev, Test and Live environments. Doing Continuous Delivery requires adding on to the automated tests created to fulfill Continuous Integration. When your changes move through the deployment pipeline, your Continuous Delivery process should validate that the site works in each environment.

**Continuous Deployment** is a business decision to send all changes straight through the deployment pipeline once tests have passed on those changes. With a strong deployment pipeline created in Continuous Delivery, Continuous Deployment is a simple business question. Ask your stakeholders “Do you want each change sent through the deployment pipeline to live as soon as the change is approved/merged? Or do you want changes held so that they are deployed in bunches at the end of each sprint (or other schedule)?” For many web agencies and their clients it is preferable to stick with scheduled releases.


</Alert>



With guardrails in place through WebOps automation, IT can rest easier knowing that they don’t have to manually evaluate each task against their risk mitigation framework. They can allow Marketing to enjoy the convenience and velocity of self-service capabilities such as spinning up new website environments, publishing code commits, and granting limited access to additional developers on a project.

With WebOps, IT is no longer a bottleneck to Marketing, and instead becomes a business partner, strategizing with Marketing over how best to implement WebOps and therefore increase velocity of delivery, remove complexity, and deliver better results. Marketing relies on IT for strategic guidance and implementation, but they are no longer reliant on IT for common, repetitive tasks that could be done more efficiently without having to loop in IT. 

## WebOps Allows Developers to Focus on What They Do Best

<Alert title="By the end of this section, you should be able to:"  type="info" >


* Explain some of the extra tasks a developer is typically expected to perform, beyond simply writing code.
* Describe how putting WebOps guardrails in place ahead of time helps Developers be more productive and work more efficiently.

</Alert>




Each developer has spent years learning and perfecting a skill that mystifies and intimidates those who do not possess it: programming with code. Developers thrive on solving complex puzzles by breaking down business requirements, tasks and functions into discrete parts that work interchangeably with other parts. Their work requires deep focus, pinpoint attention to detail, a great deal of patience, as well as creativity and a collaborative spirit. 

As web applications have become more complex over time, however, being a developer has often meant taking on additional tasks that can distract them from their core passion: crafting high-quality code. 

Some examples of the additional tasks Developers must take on include:

* **Setting up and maintaining a local development environment:** This process often involves installing and configuring various software and tools, which can be time-consuming and complex.
* **Managing infrastructure:** Developers are sometimes tasked with ensuring that servers, storage, networks, and other systems are properly set up and functioning optimally.
* **Ensuring server uptime:** It's essential to keep websites accessible and performing well, which can involve monitoring servers, managing traffic loads, and troubleshooting any issues that arise.
* **Handling site maintenance:** Regular updates, backups, and troubleshooting are needed to keep a website running smoothly.
* **Deploying code to production servers:** This task involves moving code from a testing or staging environment to a live server where it's accessible to users. This process can be tricky and, if not done correctly, can lead to service disruptions.
* **Database management:** Developers often have to backup and restore databases, as well as ensure their security and performance.
* **Troubleshooting performance issues:** Developers may need to review server logs, monitor system resources, and use other tools to identify and resolve performance bottlenecks.
* **Securing websites: **This involves implementing security measures, staying up-to-date with the latest security patches, and ensuring compliance with data privacy regulations.

It’s easy to see where the lines can be blurred between what Developers are concerned with and what IT is concerned with. At the end of the day, though, Developers are the ones who are on the hook for delivering the digital product owned by Marketing and secured by IT. With real deadlines and deliverables, Developers do not have the luxury of working around these extraneous tasks and systems in order to simply write code. They must deal with whatever is in their way and causing friction. And for this reason, the only way to optimize a Developer’s time and maximize their job satisfaction is to remove as much of the friction-causing concerns as possible. Enter WebOps!

An effective WebOps solution can simplify a Developer’s job and allow them to focus on their primary work of writing code and deploying wonderful features. By packaging up environmental dependencies into a portable, containerized environment, WebOps makes it simple and straightforward to set up a local development environment where the Developer can be productive wherever and whenever they prefer - on the couch, in the early hours of the morning, on an airplane, or on the beach. A WebOps platform can securely wrap features into a pushbutton format, where tasks like spinning up a new, non-production, environment for developing and testing features, backing up the database and files to prevent data loss, versioning code to preserve the ability to roll back unwanted changes, and kicking off a Continuous Deployment pipeline can be done simply and without risk. 

And when that WebOps solution is also part of an enterprise-grade, scalable, secure and performant web hosting environment, Developers no longer have to weigh concerns around infrastructure maintenance, server uptime, or cloud security. In other words, a WebOps solution removes most of the friction that prevents Developers from being as efficient and productive as they can be. And we believe this can make their jobs more collaborative, less stressful, and ultimately more fulfilling.  

<Alert title="Chapter 1: Key Takeaways"  type="info" >

* Maximizing the impact of the website requires harmonious synchronization across multiple rolesteams, including Marketing, Developers, and IT.
* WebOps allows Marketing, Developers, and IT to collaborate more effectively and efficiently around the delivery of a marketing website.
* WebOps shortens the feedback loop between Marketers and Developers by facilitating communication, providing collaboration tools, and giving the Developers the tools necessary to share their progress with multiple stakeholders in real time.
* WebOps allows Marketing and IT to become strategic partners by ensuring that each team has the tools and automation in place to satisfy the critical metrics that each team cares about.
* Pantheon allows Developers to focus on what they do best by providing a best-in-class web development environment, multiple environments, and time-saving automation capabilities.


</Alert>
