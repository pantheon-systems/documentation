import Layout from "@/components/layout";
import { AddSearchClientComponent } from "@/components/common/addsearch-pagebody";
import { Suspense } from "react";
const SearchWrapper = () => {
  return (
    <Layout excludeSearch={true}>

      <div className="pds-container pds-spacing-mar-block-start-3xl" style={{
        borderBottom: "1px solid var(--pds-color-border-default)",
        paddingBlockEnd: "var(--pds-spacing-3xl)",
        paddingBlockStart: "var(--pds-spacing-m)"
      }}>
        <Suspense>
          <AddSearchClientComponent />
        </Suspense>
      </div>

    </Layout>
  );
}
export default SearchWrapper;
