import React from "react"

import { Popover as PDSPopover } from "@pantheon-systems/pds-toolkit-react"

const Popover = ({ icon, title, content }) => {
  const processedContent = <div dangerouslySetInnerHTML={{ __html: content }} />

  return <PDSPopover content={processedContent} title={title} />
}

export default Popover
