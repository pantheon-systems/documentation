import React from "react";

import styles from "./style.module.css";
import { cn } from "@/lib/utils";

const PublishedDate = ({
  dateString,
  className,
}: {
  dateString: string;
  className: string;
}) => {
  // Todo, more type checking.
  if (!dateString) {
    return null;
  }
  const [year, month, day] = dateString.split("-"); // Extract year, month, and day
  const formattedDate = `${new Date(parseInt(year), parseInt(month) - 1).toLocaleString("default", { month: "long" })} ${parseInt(day)}, ${year}`;

  return (
    <div
      className={cn("docs-published-date", className, styles.docsPublishedDate)}
    >
      {formattedDate}
    </div>
  );
};

export default PublishedDate;
