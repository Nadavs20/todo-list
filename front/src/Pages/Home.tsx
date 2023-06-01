import TaskTable from "../Components/TaskTable";
import NavBar from "../Components/NavBar";
import Pickers from "../Components/Pickers";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Pickers />
      <TaskTable />
    </div>
  );
};

export default Home;
