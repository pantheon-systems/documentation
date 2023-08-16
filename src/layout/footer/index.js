import { graphql, StaticQuery, Link } from "gatsby"
import React from "react"
import MarketoForm from "../../components/marketoForm"
import {
  Button,
  InputText,
  FlexContainer,
  Form,
  FooterLinks,
  FooterHeading,
  SiteFooter,
} from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const topicLinks = [
  {
    text: "Get Started",
    url: "#",
  },
  {
    text: "Develop",
    url: "#",
  },
  {
    text: "Go Live",
    url: "#",
  },
  {
    text: "Platform Architecture",
    url: "#",
  },
  {
    text: "Automate & Integrate",
    url: "#",
  },
  {
    text: "Optimize Performance",
    url: "#",
  },
  {
    text: "Manage Teams & Orgs",
    url: "#",
  },
  {
    text: "Troubleshoot",
    url: "#",
  },
]

const helpLinks = [
  {
    text: "Contact",
    url: "#",
  },
  {
    text: "Hire an Agency",
    url: "#",
  },
  {
    text: "Status",
    url: "#",
  },
  {
    text: "Support",
    url: "#",
  },
]

const communityLinks = [
  {
    text: "Code of Conduct",
    url: "#",
  },
  {
    text: "Contributors",
    url: "#",
  },
  {
    text: "Community & Power Users Group",
    url: "#",
  },
  {
    text: "Learn to Contribute",
    url: "#",
  },
]

const Footer = ({ data }) => {
  const pantheonLogo = data.allFile.edges.find(
    (file) => file.node.publicURL.indexOf("pantheon-logo-symbol") > -1
  )

  const CCLogo = data.allFile.edges.find(
    (file) => file.node.publicURL.indexOf("CC-BY-SA_icon") > -1
  )

  return (
    <SiteFooter>
      <div className="pds-footer__links-area pds-grid pds-grid--wide">
        <div className="pds-footer__links-area-column pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-12 pds-grid-item--lg-8">
          <FlexContainer
            spacing="standard"
            justifyContent="between"
            mobileFlex="reverse"
          >
            <FooterLinks
              headingText="Topics"
              headingLevel="h2"
              linkItems={topicLinks}
            />
            <FooterLinks
              headingText="Help"
              headingLevel="h2"
              linkItems={helpLinks}
              className="pds-spacing-mar-block-start-xl@sm"
            />
            <FooterLinks
              headingText="Community"
              headingLevel="h2"
              linkItems={communityLinks}
              className="pds-spacing-mar-block-start-xl@sm"
            />
          </FlexContainer>
        </div>
        <div className="pds-footer__links-area-column pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-12 pds-grid-item--lg-4">
          <FooterHeading
            headingText="Connect"
            headingLevel="h2"
            className="pds-spacing-pad-block-start-xl pds-spacing-pad-block-start-none@lg"
          />
          <p className="footer-form-intro">
            Awesome development news, tutorials, and tips. Plus get 3 free
            downloads, just for signing up. If you don't love it, unsubscribe
            with just a click.
          </p>
          <Form
            layout="single-field"
            className="pds-spacing-mar-block-start-3xl"
          >
            <InputText
              id="subscribe-email-footer"
              type="email"
              label="Email address"
            />
            <Button
              label="Subscribe"
              buttonType="submit"
              onClick="sampleClick()"
            />
          </Form>
          <div className="pds-form pds-spacing-mar-block-start-3xl">
            <MarketoForm
              baseUrl="https://app-ab05.marketo.com"
              munchkinId="316-GSV-089"
              formId={2014}
              formName="mktoForm_2014"
            />
          </div>
        </div>
      </div>
    </SiteFooter>
  )
}

export default (props) => (
  <StaticQuery
    query={graphql`
      {
        allFile(
          filter: {
            relativePath: {
              in: ["pantheon-logo-symbol.svg", "CC-BY-SA_icon.png"]
            }
          }
        ) {
          edges {
            node {
              id
              publicURL
            }
          }
        }
      }
    `}
    render={(data) => <Footer data={data} {...props} />}
  />
)
