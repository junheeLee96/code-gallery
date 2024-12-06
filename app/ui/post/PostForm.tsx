import { auth } from "@/auth";
import Textarea from "../TextArea";

export default function PostForm() {
  const session = auth();
  console.log(session);
  const createInvoice = () => {};
  return (
    <></>
    // <form action={createInvoice}>
    //   <Textarea />
    //   <button className="cursor-pointer">submit</button>
    // </form>
  );
}
