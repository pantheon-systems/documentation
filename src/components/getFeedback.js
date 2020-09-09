import React from "react"

const GetFeedBack = ({ formId, page, topic }) => {

  return (
    <>
    <script dangerouslySetInnerHTML={{
      __html: 
          (function(w,d,s,u,g,a,b){w['GetFeedbackObject']=g;w[g]=w[g]||function(){
          (w[g].q=w[g].q||[]).push(arguments)};a=d.createElement(s),
          b=d.getElementsByTagName(s)[0];a.async=1;a.src=u;b.parentNode.insertBefore(a,b)
          })(window,document,'script','//websites.cdn.getfeedback.com/embed/4et5x7k3g8/gf.js','gf')
          (gf('setParameters', {'PAGE': page, 'TOPIC': topic}))
        ,
      }}
    />

    </>
  )
}

export default GetFeedBack
