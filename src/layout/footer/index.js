import { graphql, StaticQuery, Link } from "gatsby"
import React from "react"
import MarketoForm from "../../components/marketoForm"
import {
  Button,
  CTASlice,
  InputText,
  FlexContainer,
  Form,
  FooterLinks,
  FooterHeading,
  SiteFooter,
  SocialLinks,
} from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const topicLinks = [
  <Link to="/get-started/">Get Started</Link>,
  <Link to="/develop/">Develop</Link>,
  <Link to="/go-live/">Go Live</Link>,
  <Link to="/platform/">Explore Platform Architecture</Link>,
  <Link to="/automate/">Automate & Integrate</Link>,
  <Link to="/performance/">Optimize Performance</Link>,
  <Link to="/manage/">Manage Teams & Organizations</Link>,
  <Link to="/troubleshoot/">Troubleshoot</Link>,
]

const helpLinks = [
  <a href="https://pantheon.io/contact-us" className="cta docs-cta">
    Contact
  </a>,
  <a
    href="https://directory.pantheon.io/agencies?docs"
    className="cta docs-cta"
  >
    Hire an Agency
  </a>,
  <a href="https://status.pantheon.io/">Status</a>,
  <Link to="/guides/support/">Support</Link>,
]

const communityLinks = [
  <Link to="/code-of-conduct/">Code of Conduct</Link>,
  <Link to="/contributors/">Contributors</Link>,
  <Link to="/pantheon-community/">Community & Power Users Group</Link>,
  <Link to="/contribute/">Learn to Contribute</Link>,
]

const Footer = ({ data }) => {
  const pantheonLogo = data.allFile.edges.find(
    (file) => file.node.publicURL.indexOf("pantheon-logo-symbol") > -1
  )

  const CCLogo = data.allFile.edges.find(
    (file) => file.node.publicURL.indexOf("CC-BY-SA_icon") > -1
  )

  const primaryCTA = {
    text: "Learn Pantheon",
    url: "https://pantheon.io/learn-pantheon?docs",
  }

  const secondaryCTA = {
    text: "Office Hours",
    url: "https://pantheon.io/developers/office-hours?docs",
  }

  return (
    <>
      <CTASlice
        backgroundColor="secondary"
        containerWidth="wide"
        headingText="Got questions? We've got answers!"
        primaryLink={primaryCTA}
        secondaryLink={secondaryCTA}
      />
      <SiteFooter containerWidth="wide">
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
            <p className="footer-form-intro pds-ts-s">
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
            <SocialLinks className="pds-spacing-mar-block-start-xl" />
          </div>
        </div>

        <div className="cc-license pds-spacing-mar-block-start-5xl">
          <div className="cc-license__logo">
            {CCLogo && (
              <img
                src={CCLogo.node.publicURL}
                alt="Creative Commons Attribution-ShareAlike Logo"
              />
            )}
          </div>
          <p className="cc-license__text pds-ts-s">
            Our Documentation is licensed under a Creative Commons
            Attribution-ShareAlike 4.0 International License. Code snippets are
            additionally licensed under The MIT License.
          </p>
        </div>
      </SiteFooter>
    </>
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
