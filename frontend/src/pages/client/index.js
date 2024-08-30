import WelcomeBackComponent from "@/components/FrontPage/WelcomeBack";
import UpcomingEvents from "@/components/FrontPage/UpComingEvents";
import RegisteredEvents from "@/components/FrontPage/RegisteredEvents";
import Appointments from "@/components/FrontPage/Appointments";
import { ChatEpic } from "@/components/clients/ChatEpic";

const HomePage = () => {
    return(
       <div>
        <WelcomeBackComponent />
        <UpcomingEvents />
        <Appointments />
        <RegisteredEvents />
        <ChatEpic />
        </div>
       
    );
};

export default HomePage;
