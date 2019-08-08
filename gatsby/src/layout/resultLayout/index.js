import React from "react"
import ResultHeader from "../resultHeader"
import Footer from "../footer"
import './style.css'

const ResultLayout = ({ children }) => {
  return (
    <div className="pantheon-docs">
      <ResultHeader />
      {children}
      <Footer />
    </div>
  )
}

export default ResultLayout
