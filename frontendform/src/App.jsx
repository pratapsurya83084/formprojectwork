//import component and rappe into div
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
// import Layout from "./layout/Layout";
import SuccessSubmitForm   from './components/SuccessSubmitForm'
import Admin from './admin/Admin'

import Login from './login/Login'

function App() {
  return (
    // <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit/success" element={<SuccessSubmitForm/>}/>
       <Route path="/admin" element={<Admin/>}/>
       <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    // </Layout>
  );
}

export default App;
