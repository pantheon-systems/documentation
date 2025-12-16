import React from "react";
import styles from "./style.module.css";
import { cn } from "@/lib/utils";

export const ReviewDate = ({ date }: { date: string }) => {
  var formattedDate = new Date(`${date}`);
  formattedDate.setMinutes(
    formattedDate.getMinutes() + formattedDate.getTimezoneOffset()
  );
  return (
    <>
      <h4 className={cn(styles.reviewDate, "review-date toc-ignore")}>
        Last reviewed: {formattedDate.toDateString().replace(/^\S+\s/, "")}
      </h4>
    </>
  );
};
