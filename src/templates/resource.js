import React from "react"
import { graphql } from "gatsby"

import Layout from "../layout/layout"
import HeaderBody from "../components/headerBody"
import SEO from "../layout/seo"
import MdxWrapper from "../components/mdxWrapper"


class ResourceTemplate extends React.Component {
  componentDidMount() {
    $("[data-toggle=popover]").popover({
      trigger: "click",
      placement: "right",
    })

    $("body").on("click", function (e) {
      $('[data-toggle="popover"]').each(function () {
        if (
          !$(this).is(e.target) &&
          $(this).has(e.target).length === 0 &&
          $(".popover").has(e.target).length === 0
        ) {
          $(this).popover("hide")
        }
      })
    })

    $("body").keyup(function (e) {
      $('[data-toggle="popover"]').each(function () {
        if (event.which === 27) {
          $(this).popover("hide")
        }
      })
    })
  }

  render() {
    const node = this.props.data.page
    const isoDate = this.props.data.date

    return (
      <Layout>
        <SEO
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"/images/assets/default-thumb-doc.png"}
          categories={node.frontmatter.categories}
          tags={node.frontmatter.tags}
          reviewed={isoDate.frontmatter.reviewed}
          type={node.frontmatter.type}
        />
        <div className="">
          <div className="pds-container pds-container--wide">
            <div id="doc" className="doc article col-md-9 md-70">
              <HeaderBody
                title={node.frontmatter.title}
                subtitle={node.frontmatter.subtitle}
                description={node.frontmatter.description}
                slug={node.fields.slug}
                contributors={node.frontmatter.contributors}
                featured={node.frontmatter.featuredcontributor}
                editPath={node.fields.editPath}
                reviewDate={node.frontmatter.reviewed}
                isoDate={isoDate.frontmatter.reviewed}
              />
              <article style={{ marginTop: "15px", marginBottom: "45px" }}>
                <MdxWrapper mdx={node.body} />

              </article>
            </div>
            {/* <GetFeedback formId="tfYOGoE7" page={"/" + node.fields.slug} /> */}
          </div>
        </div>
      </Layout>
    )
  }
}

export default ResourceTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    page: mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
        editPath
      }
      frontmatter {
        title
        description
        categories
        contributors {
          yamlId
          name
          twitter
          bio
          avatar
          url
        }
        featuredcontributor
        reviewed(formatString: "MMMM DD, YYYY")
        tags
        type
      }
      fileAbsolutePath
    }
    date: mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        reviewed
      }
    }
  }
`
