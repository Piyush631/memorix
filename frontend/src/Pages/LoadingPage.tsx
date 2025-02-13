import { Loading } from "../components/Loading";

export function LoadingPage() {
  return (
    <div className="flex flex-wrap gap-8">
      {[...Array(4)].map((_, i) => (
        <Loading key={i} />
      ))}
    </div>
  );
}
