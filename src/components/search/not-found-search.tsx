"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { TextInput } from "@/components/ui/pds-re-export";

/** The search field on the 404 page: it takes the reader to the search results. */
export const NotFoundSearch = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = value.trim();
    if (term) router.push(`/search?search=${encodeURIComponent(term)}`);
  };

  return (
    <form role="search" onSubmit={submit} className="docs-not-found-search">
      <TextInput
        id="not-found-search"
        type="search"
        label="Search the documentation"
        showLabel={false}
        placeholder="Search Pantheon documentation"
        value={value}
        hasClearButton
        onClear={() => setValue("")}
        onChange={(event) => setValue(event.target.value)}
      />
    </form>
  );
};
