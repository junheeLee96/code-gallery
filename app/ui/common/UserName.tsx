import { CircleUserRound } from "lucide-react";
import TimeAgo from "./TimeAgo";
import ActionsButtons from "./ActionButtons";

type UserNameProps = {
  nickname: string;
  isAuthor: boolean;
  reg_dt?: string;
  post_id: string;
};

export default function UserName({
  nickname,
  isAuthor,
  reg_dt,
  post_id,
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
        {isAuthor && <ActionsButtons post_id={post_id} />}
      </div>
      {reg_dt && <TimeAgo date={reg_dt} />}
    </div>
  );
}
