import { CircleUserRound } from "lucide-react";
import TimeAgo from "./TimeAgo";

type UserNameProps = {
  nickname: string;
  isAuthor: boolean;
  reg_dt?: string;
};

export default function UserName({
  nickname,
  isAuthor,
  reg_dt,
}: UserNameProps) {
  return (
    <div className="w-full mb-3 pb-3 border-b border-gray-300">
      <div className="w-full flex justify-between items-center  ">
        <div className="flex items-center">
          <span>
            <CircleUserRound />
          </span>
          <span className="ml-1">{nickname}</span>
        </div>
        {isAuthor && <div></div>}
      </div>
      {reg_dt && <TimeAgo date={reg_dt} />}
    </div>
  );
}
