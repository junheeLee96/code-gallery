import Wrapper from "../../common/Wrapper";

export default function PostSkeleton() {
  return (
    <Wrapper>
      <div className="w-full flex justify-between items-center py-3 border-b border-gray-300 mb-3">
        <div className="flex items-center">
          <span>
            <div className="w-[20px] h-[20px] rounded-full bg-gray-200"></div>
          </span>
          <span className="ml-1">
            <div className="w-[80px] h-[20px] bg-gray-200 rounded"></div>
          </span>
        </div>
      </div>
      <div>
        <div className="w-full h-[200px] bg-gray-200 rounded"></div>
      </div>
      <div className="mt-3 pt-2 border-t border-gray-300">
        <div className="w-full h-[40px] rounded bg-gray-200 "></div>
      </div>
    </Wrapper>
  );
}
