import Login from "@/components/login/Login";
import { ChatEpic } from "@/components/clients/ChatEpic";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen w-screen justify-center items-center">
      <Login />
      <ChatEpic />
    </div>
  );
}
