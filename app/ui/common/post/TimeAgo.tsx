import { timeAgo } from "@/app/lib/utils";

type TimeAgoProps = {
  date: string;
};

export default function TimeAgo({ date }: TimeAgoProps) {
  return (
    <div className="mt-2 text-light-gary text-sm">
      {timeAgo(date.toLocaleString())}
    </div>
  );
}
