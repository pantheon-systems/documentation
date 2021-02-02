import React, { useEffect, useState } from "react"
//import { UseStaticQuery } from "gatsby"
//import Octokit from "@octokit/rest"

/*const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})*/

const NewLocalDevChangelog = () => {
  let data = {}

  /*const fetchData = async () => {
    const response = await fetch('https://pantheon-localdev.s3.amazonaws.com/changelog.json', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return response.json()
  }
  fetchData()
  .then(data => console.log(data))*/

  fetch('https://pantheon-localdev.s3.amazonaws.com/changelog.json', {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(stringifiedData => data = JSON.parse(stringifiedData))
    .catch(err => console.log(err))


  return (
    <>
    {JSON.stringify(data)}
    </>
  )

}

export default NewLocalDevChangelog