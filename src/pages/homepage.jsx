import PageNav from "../components/PageNav";
import { Link } from "react-router-dom"; 
import AppNav from "../components/AppNav";
function Homepage() {
 
  return (
    <div>
      <AppNav />
      <PageNav />
     <Link to="/app">Go To The App</Link>
    </div>
  );
}

export default Homepage;