//import component and rappe into div
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
// import Layout from "./layout/Layout";
import SuccessSubmitForm   from './components/SuccessSubmitForm'
import Admin from './admin/Admin'
import ProtectedRoute from "./protectRoute/ProtectedRoute";
import Login from './login/Login'
import ForgotPassword  from '././components/forgotPassword/ForgotPassword'
function App() {
  return (
    // <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit/success" element={<SuccessSubmitForm/>}/>
       {/* <Route path="/admin" element={<Admin/>}/> */}
      
      
     {/* if localstorage authtoken is present then redirects /admin otherwise not redirects */}
      
     <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        {/* <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/> */}
       <Route path="/login" element={<Login/>} />

       {/* ForgotPassword */}
      <Route  path="/ForgotPassword" element={<ForgotPassword/>}/>
        </Routes>
      </Router>
    // </Layout>
  );
}

export default App;
