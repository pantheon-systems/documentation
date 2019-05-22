import React, { useState, useEffect } from "react"

const MarketoForm = ({ baseUrl, munchkinId, formId, formName }) => {
  const [initialized, setInitialized] = useState(false)
  const [isSent, setIsSent] = useState(false)

  useEffect(() => {
    if (!initialized) {
      const scriptsToLoad = ["/js/forms2/js/forms2.min.js"]

      Promise.all(
        scriptsToLoad.map(scriptItem => {
          return new Promise((resolve, reject) => {
            const script = document.createElement("script")
            script.src = `${baseUrl}${scriptItem}`
            script.async = true
            document.body.appendChild(script)

            script.onload = () => resolve(scriptItem)
            script.onerror = () => reject(scriptItem)
          })
        })
      )
        .then(item => {
          const windowGlobal = typeof window !== "undefined" && window

          if (windowGlobal && windowGlobal.MktoForms2) {
            MktoForms2.loadForm(baseUrl, munchkinId, formId, o => {
              o.onSuccess(() => {
                // Set component to sent
                setIsSent(true)
                // return false to avoid page reload
                return false
              })
            })
          }

          setInitialized(true)
        })
        .catch(() => console.log("An error ocurred loading Marketo scripts..."))
    }
  })

  return !isSent ? (
    <form id={formName} name={formName} />
  ) : (
    <p>Thank You for Signing Up</p>
  )
}

export default MarketoForm
