import NavBar from "../components/NavBar";

const HomePage = ({currUser, handleLogout}) => {
    return(
        <>  <NavBar currUser={currUser} handleLogout={handleLogout}/>
            <h1>Welcome to your Task Manager App</h1>
        </>
    );
}
export default HomePage;