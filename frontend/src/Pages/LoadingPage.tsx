import { Loading } from "../components/Loading";

export function LoadingPage() {
  return (
    <div className="flex flex-wrap gap-8">
      {[...Array(6)].map((_, i) => (
        <Loading key={i} />
      ))}
    </div>
  );
}
