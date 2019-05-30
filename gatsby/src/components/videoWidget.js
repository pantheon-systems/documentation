import React from "react"

const VideoWidget = ({ videoId}) => {
  return(
    <div className="panel panel-drop panel-guide"><script src="//fast.wistia.com/embed/medias/{videoId}.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div className="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div className="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div className="wistia_embed wistia_async_{videoId} videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div></div>
  )
}

export default VideoWidget 
