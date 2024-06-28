import Sidebar from "../Components/sidebar/Sidebar";
const UserLayout = async ({ children} : {children: React.ReactNode;}) => {
  return (
    <Sidebar>
        <div className="h-full">
          hello
          {children}
        </div>
    </Sidebar>
  )
}

export default UserLayout;
