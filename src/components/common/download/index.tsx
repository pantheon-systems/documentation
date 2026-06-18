import React from "react";

import { Icon } from "@/components/ui/pds-re-export";

import styles from "./style.module.css";
import { cn } from "@/lib/utils";

export const Download = ({ file }: { file: string }) => {
  const downloadPath = `/docs/scripts/${file}.txt`;
  return (
    <div className={cn("script-file-download", styles.scriptFileDownload)}>
      <a href={downloadPath} download={file} className="pds-button">
        {file}
        <Icon iconName="download" iconSize="lg" />
      </a>
    </div>
  );
};
