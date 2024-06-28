import Sidebar from "../Components/sidebar/Sidebar";
import UserList from "./components/UserList";
import getUsers from "../actions/getUsers";
const UserLayout = async ({ children} : {children: React.ReactNode;}) => {

  const users = await getUsers();

  return (
    <Sidebar>
        <div className="h-full">
        <UserList items={users} />
          {children}
        </div>
    </Sidebar>
  )
} 

export default UserLayout;
