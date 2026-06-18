import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonArticleView = () => {
  return (
    <>
      <Skeleton height={75} width={"25%"} />
      <br />
      <br />
      <Skeleton count={5} />
      <br />
      <Skeleton count={3} />
      <Skeleton count={2} />
      <br />
      <Skeleton count={4} />
    </>
  );
};
