"use client";

import { useState } from "react";
import TextInput from "../text-input";
import { LeadCaptureAttributes } from "@/lib/content-publisher/smart-component";

const LeadCapture = ({ title, body }: LeadCaptureAttributes) => {
  const [inputValue, setInputValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted)
    return (
      <div className="lead-capture-card-container">
        <div className="card-content">
          <div className="flex flex-col gap-3">
            <div className="text-2xl font-bold">Thank you.</div>
            <div className="text-neutral-content">
              The form was submitted successfully.
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="lead-capture-card-container">
      <div className="card-content">
        <div className="flex flex-col gap-3 mb-8">
          <div className="text-2xl font-bold">{title}</div>
          <div className="text-neutral-content">
            <div className="flex flex-col gap-3">
              <div>{body ?? "Body"}</div>
              <div>
                <TextInput
                  label="Email"
                  onChange={setInputValue}
                  value={inputValue}
                  placeholder={"Enter email"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            className="primary-button disabled:cursor-not-allowed"
            onClick={() => setSubmitted(true)}
            disabled={!Boolean(inputValue)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadCapture;
