import { timeAgo } from "@/app/lib/utils";

type TimeAgoProps = {
  date: Date;
};

export default function TimeAgo({ date }: TimeAgoProps) {
  console.log(date);
  return (
    <div className="mt-2 text-light-gary text-sm">
      {timeAgo(date.toLocaleString())}
    </div>
  );
}
