import React, { useEffect, useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import Octokit from "@octokit/rest"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import showdown from "showdown"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

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
      base: "main",
      state: "closed",
      sort: "updated",
      per_page: "50",
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

  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var thisDate = new Date()

  var renderDate = weekday[thisDate.getDay()] + ", " + (thisDate.getMonth()+1) + "/" + thisDate.getDate() + "/" + thisDate.getFullYear()

  var twoWeeksAgo = new Date()
  twoWeeksAgo.setDate(thisDate.getDate() - 14)
  var renderTwoWeeksAgo = weekday[twoWeeksAgo.getDay()] + ", " + (twoWeeksAgo.getMonth()+1) + "/" + twoWeeksAgo.getDate() + "/" + twoWeeksAgo.getFullYear()

  const [dateRange, setDateRange] = useState([
      {
        startDate: twoWeeksAgo,
        endDate: thisDate,
        key: 'selection'
      }
    ]);
    //console.log("Initial dateRange: ", dateRange[0])

  const summRegex = /(?<=Summary\s*)[\s\S]*?(?=\s*##)/g
  //console.log("summRegex: ", summRegex)

  return (
    <>
    <Layout>
    <div>
      <h1>Recently Merged PRs</h1>
      <h2> Today is {renderDate.toString()} </h2>
      <h3> Two weeks ago was {renderTwoWeeksAgo.toString()}</h3>
      <div>
      <center>
        <DateRange
          editableDateInputs={true}
          onChange={item => setDateRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          months={2}
          direction="horizontal"
        />
        </center>
      </div>
      <hr />
      <div id="summaries" style={{paddingLeft: "3em"}}>

        {data.filter(item => {
          var mergeDate = new Date(item.merged_at)
          //console.log("dateRange[0].startDate: ", dateRange[0].startDate)
          //console.log("mergeDate: ", mergeDate)
          return (
            dateRange[0].startDate < mergeDate &&
            dateRange[0].endDate >= mergeDate
          )
        }).map((item) => {
          //var date = new Date(item.closed_at)
          var mergeDate = new Date(item.merged_at)
          var summary = summRegex.exec(item.body)
          //console.log("summary: ", item.body.match(summRegex)) //For Debugging
          //console.log("Body:", item.body)//For Debugging
          return (
            <>
              {
                (item.body.match(summRegex) && item.merged_at) ?
                  <>
                  <div id={item.id} dangerouslySetInnerHTML={{
                    __html: converter.makeHtml(item.body.match(summRegex).toString() + ` <a href=${item._links.html.href}>PR ${item.number}</a>`)
                  }}/>
                  </>
                : (item.merged_at) ?
                  <>
                  <div id={item.id} dangerouslySetInnerHTML={{
                    __html: converter.makeHtml(item.body.toString() + ` <a href=${item._links.html.href}>PR ${item.number}</a>`)
                  }} />
                </>
                : null
              }
              <br />
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
