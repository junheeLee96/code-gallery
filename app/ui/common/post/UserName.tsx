import { CircleUserRound } from "lucide-react";
import PostActionsButtons from "./PostActionButtons";
import TimeAgo from "./TimeAgo";

type UserNameProps = {
  username: string;
  isAuthor: boolean;
  reg_dt?: Date;
  post_id?: number;
};

export default function UserName({
  username,
  isAuthor,
  reg_dt,
  post_id,
}: UserNameProps) {
  return (
    <div className="w-full mb-3 pb-3 border-b border-gray-300 dark:border-black">
      <div className="w-full flex justify-between items-center  ">
        <div className="flex items-center">
          <span>
            <CircleUserRound />
          </span>
          <span className="ml-1">{username}</span>
        </div>
        {isAuthor && post_id && <PostActionsButtons post_id={post_id} />}
      </div>
      {reg_dt && <TimeAgo date={reg_dt} />}
    </div>
  );
}
