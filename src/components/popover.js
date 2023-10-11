import React from "react"

import { Tooltip } from "@pantheon-systems/pds-toolkit-react"

const Popover = ({ icon, title, content }) => {
  const tooltipContent = title ? [title, ": ", content] : content

  return <Tooltip iconName="circleInfo" tooltipText={tooltipContent} />
}

export default Popover
