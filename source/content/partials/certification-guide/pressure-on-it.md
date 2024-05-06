### Pressure on IT: Preserve Stability

<Alert title="By the end of this section, you should be able to:" type="info" >

* Describe the types of challenges that IT leaders are typically most concerned about.
* Explain why marketing teams might view IT as a bottleneck.

</Alert>

While Marketing teams are laser focused on hitting those KPIs, driving customer engagement, brand visibility, and lead generation, IT teams have their own set of pressures. 

Some of the concerns that keep IT up at night include:

* **System Stability**: IT operates in a world where any system downtime can result in significant business losses, as well as lost productivity and damage to the company’s reputation.
* **Data Security:** IT must protect data from breaches, which could result in financial loss, damage to the brand reputation, and legal consequences.
* **Infrastructure Scalability:** As businesses grow, IT is responsible for ensuring that the company’s digital infrastructure keeps pace with the growing needs of the business. This involves anticipating future needs, planning for increases in traffic, and implementing systems that are flexible enough to scale with the business.
* **Technology Maintenance and Upgrades:** Aging technology that is not maintained properly can quickly become a security liability. IT ensures that key technologies are secure and up to date with the latest security updates. They manage software updates, hardware upgrades, and integration of new technologies into existing infrastructure.
* **Compliance:** IT teams have to ensure that all systems are compliant with the appropriate regulations for their industry in order to avoid legal penalties.  

IT **people** tend to prefer **processes** that emphasize thoroughness over speed in the face of these responsibilities. Marketing often requires fast turnarounds to keep up with market trends, competitive pressures, or campaign schedules. This discrepancy can often lead Marketing to view IT as a bottleneck.

Another important thing to keep in mind is that the marketing website is just one application among many. IT is usually also responsible for managing entire fleets of systems and applications that make enterprises and organizations run. Where the Marketing team sees the website as a growth engine and a living, breathing entity, IT views it through the lens of mitigating risk, and maintaining stability, security and scalability. The old adage, “if it ain’t broke, don’t fix it” tends to resonate with IT’s aversion to risk. Marketing’s desire to experiment and continuously iterate on the website has the potential to make IT very nervous.

That's why you need a WebOps platform!

WebOps platforms automate repetitive tasks where constant manual interventions are not only inefficient, but also risky, in that they introduce risk of human error, threatening the stability and security of the website. A WebOps platform provides the tools and workflows to allow teams to automatically adhere to best practices every time by packaging multiple manual steps into automated, repeatable functions. This process is commonly known as a CI/CD pipeline, which includes three separate but related practices: Continuous Integration, Continuous Delivery, and Continuous Deployment (see fig. 1.1 for more detail).  

#### Web Development Terminology: CI/CD Workflow

**Continuous Integration** (CI) is the process of automatically turning the commits you make in your codebase into a usable build (website). It involves integrating changes from multiple contributors into the main codebase frequently, often several times a day. Each integration is verified by an automated build and test process to catch errors early. Continuous Integration requires some level of testing to verify that the build process succeeded. With CI you define how your code is transformed into a working site; often living in a sandbox environment.

**Continuous Delivery** introduces the concept of a “deployment pipeline.” Continuous Delivery forces you to define in detail how your deployment pipeline takes changes from that sandbox and gets them to the production environment. Sites on Pantheon use a deployment pipeline that goes through our Dev, Test and Live environments. Doing Continuous Delivery requires adding on to the automated tests created to fulfill Continuous Integration. When your changes move through the deployment pipeline, your Continuous Delivery process should validate that the site works in each environment.

**Continuous Deployment** is a business decision to send all changes straight through the deployment pipeline once tests have passed on those changes. With a strong deployment pipeline created in Continuous Delivery, Continuous Deployment is a simple business question. Ask your stakeholders “Do you want each change sent through the deployment pipeline to live as soon as the change is approved/merged? Or do you want changes held so that they are deployed in bunches at the end of each sprint (or other schedule)?” For many web agencies and their clients it is preferable to stick with scheduled releases.

With guardrails in place through WebOps automation, IT can rest easier knowing that they don’t have to manually evaluate each task against their risk mitigation framework. They can allow Marketing to enjoy the convenience and velocity of self-service capabilities such as spinning up new website environments, publishing code commits, and granting limited access to additional developers on a project.

With a WebOps platform, IT is no longer a bottleneck to Marketing, and instead becomes a business partner, strategizing with Marketing over how best to implement WebOps and therefore increase velocity of delivery, remove complexity, and deliver better results. Marketing relies on IT for strategic guidance and implementation, but they are no longer reliant on IT for common, repetitive tasks that could be done more efficiently without having to loop in IT. 