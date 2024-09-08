import RecommendedPost from "@/components/recommendedPost";
import TrendingPost from "@/components/trendingPost";
import Reviews from "@/components/reviews";


export default function Home() {
  return (
  <>
  <TrendingPost />
  <RecommendedPost />
  <Reviews />
  </>
  );
}
