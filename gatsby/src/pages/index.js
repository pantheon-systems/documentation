import React from "react"
// import { Link, graphql } from "gatsby"

// import SiteInfo from "../components/siteInfo"
// import Layout from "../components/layout"
// import SEO from "../components/seo"

class Index extends React.Component {
  render() {
    // const { data } = this.props
    // const siteTitle = data.site.siteMetadata.title
    // const posts = data.allMarkdownRemark.edges

    return (
      <div>Noting here yet...</div>
      // <Layout location={this.props.location} title={siteTitle}>
      //   <SEO
      //     title={siteTitle}
      //     keywords={[`blog`, `gatsby`, `javascript`, `react`, `opensource`, `mexicali`, `mexico`]}
      //     image={data.image.childImageSharp.fluid.src}
      //   />
      //   <SiteInfo />
      //   {data.allMeetupEvent.edges.map(({ node }) => (
      //     <div key={node.id}>
      //       <h3>
      //         <Link style={{ boxShadow: `none` }} to={`event/${node.local_date}`}>
      //           {node.fields.name}
      //         </Link>
      //       </h3>
      //       <small>{node.local_date}</small>
      //       <div dangerouslySetInnerHTML={{ __html: node.description }} />
      //     </div>
      //   ))}
      //   <h4>
      //     <Link style={{ boxShadow: `none` }} to={`events`}>
      //       ver todos los eventos
      //     </Link>
      //   </h4>
      //   <hr />
      //   {posts.map(({ node }) => {
      //     const title = node.frontmatter.title || node.fields.slug
      //     return (
      //       <div key={node.fields.slug}>
      //         <h3>
      //           <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
      //             {title}
      //           </Link>
      //         </h3>
      //         <small>{node.frontmatter.date}. Escrito por: <strong>{node.frontmatter.author.name}</strong>.</small> 
      //         <p
      //           dangerouslySetInnerHTML={{
      //             __html: node.frontmatter.description || node.excerpt,
      //           }}
      //         />
      //       </div>
      //     )
      //   })}
      //   <h4>
      //     <Link style={{ boxShadow: `none` }} to={`blogs`}>
      //       ver todas las entradas de blog
      //     </Link>
      //   </h4>
      //   <hr />
      // </Layout>
    )
  }
}

export default Index

// export const pageQuery = graphql`

// `
