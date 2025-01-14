export default function CommentsSkeleton() {
  const array = Array(10).fill(0); // Creates an array of length 10 filled with 0s

  return (
    <div className="bg-white">
      {array.map((_, key) => (
        <div className="mb-8 bg-white rounded " key={key}>
          <div>
            <div className="w-full mb-3 pb-3 border-b border-gray-300">
              <div className="w-full flex justify-between items-center  ">
                <div className="flex items-center">
                  <span>
                    <div className="w-[50px] h-[50px] rouned border-1"></div>
                  </span>
                  <span className="ml-1 h-"></span>
                </div>
              </div>
              <div className="mt-2 text-light-gary text-sm h-[10px]"></div>
            </div>
          </div>
          {/* 
          //  */}
        </div>
      ))}
    </div>
  );
}
