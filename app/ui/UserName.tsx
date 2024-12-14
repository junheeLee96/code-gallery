import { CircleUserRound } from "lucide-react";

type UserNameProps = {
  nickname: string;
  isAuthor: boolean;
};

export default function UserName({ nickname, isAuthor }: UserNameProps) {
  return (
    <div className="w-full flex justify-between items-center py-3 border-b border-gray-300 mb-3">
      <div className="flex items-center">
        <span>
          <CircleUserRound />
        </span>
        <span className="ml-3">{nickname}</span>
      </div>
      {isAuthor && <div></div>}
    </div>
  );
}
