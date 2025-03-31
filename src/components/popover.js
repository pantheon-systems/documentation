import React, { useState, useEffect} from "react"

import { Popover as PDSPopover } from "@pantheon-systems/pds-toolkit-react"

const Popover = ({ icon, title, content }) => {
  const processedContent = <div dangerouslySetInnerHTML={{ __html: content }} />
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <PDSPopover content={processedContent} title={title} />
}

export default Popover
