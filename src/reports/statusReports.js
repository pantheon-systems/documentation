import React, { useEffect, useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import Octokit from "@octokit/rest"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import showdown from "showdown"

const converter = new showdown.Converter()

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function getWeeklyClosedPRBodies() {
  let response;
  try {
    response = await octokit.pulls.list({
      owner: "pantheon-systems",
      repo: "documentation",
      state: "closed",
      sort: "updated",
      per_page: "30",
      page: "0",
      direction: "desc",
    })
  } catch (err) {
    console.log(err)
  }
  return response.data
}

async function getAllPulls() {
  const allPulls = await getWeeklyClosedPRBodies()
  //console.log("allPulls in Function", allPulls)
}


const StatusReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await octokit.pulls.list({
        owner: "pantheon-systems",
        repo: "documentation",
        state: "closed",
        sort: "updated",
        per_page: "30",
        page: "1",
        direction: "desc",
      })
      //console.log('response :: ', response) //For Debugging
      setData(response.data)
    };
    fetchData();
    
  }, [])

  var thisDate = new Date()
  //console.log("Today is: ", thisDate) //For Debugging

  const summRegex = /(?<=Summary\s*)[\s\S]*?(?=\s*##)/g
  //console.log("summRegex: ", summRegex)

  return (
    <>
    <Layout>
    <div>
      <h1>Recently Merged PRs</h1>
      <h2> Today is {thisDate.toString()} </h2>
      <br />
      <div id="summaries" style={{paddingLeft: "3em"}}>

        {data.map((item) => {
          //var date = new Date(item.closed_at)
          var mergeDate = new Date(item.merged_at)
          var summary = summRegex.exec(item.body)
          //console.log("summary: ", item.body.match(summRegex)) //For Debugging
          //console.log("Body:", item.body)//For Debugging
          return (
            <>
              {item.body.match(summRegex) ? 
                <>
                <div id={item.id} dangerouslySetInnerHTML={{
                  __html: converter.makeHtml(item.body.match(summRegex).toString() + ` <a href=${item._links.html.href}>PR ${item.number}</a>`)
                }}/>
                </>
                : 
                <>
                <div id={item.id} dangerouslySetInnerHTML={{
                  __html: converter.makeHtml(item.body.toString() + ` <a href=${item._links.html.href}>PR ${item.number}</a>`)
                }} />
                </>
                }

            <p key={`${item.id}-date`} style={{userSelect: "none"}}>
              Merged on {mergeDate.getMonth() + 1}/{mergeDate.getDate()}/{mergeDate.getFullYear()}
            </p>
            <hr key={`${item.id}-hr`}/>
            <br key={`${item.id}-postBreak`}/>
            </>
          )
        })}
        </div>

    </div>
    </Layout>
    </>
  );
};

export default StatusReport
