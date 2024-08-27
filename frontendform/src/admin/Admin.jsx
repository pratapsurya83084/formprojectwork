import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Swal from "sweetalert2";
import axios from "axios";
import {useNavigate}  from 'react-router-dom'
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import AdminPasswordUpdateModal from "./AdminPasswordUpdate";
// import AdminLogoutModal from '../modal/AdminLogoutModal';
const AdminDashboard = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const userEmail = 'admin@gmail.com';
  // curent password admin11 
  const navigate=useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  // const [userId, setUserId] = useState(36);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };



  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/registers"); // Adjust the endpoint as necessary
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        // console.log(result);

        setData(result); // Assuming the result is an array of users
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // delete entry button
  const handleDelete = async (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send delete request to the backend
          const response = await axios.delete(
            `http://127.0.0.1:8000/api/registers/${id}`
          );
          if (response.status === 200) {
            // Show success message
            Swal.fire("Deleted!", "Your entry has been deleted.", "success");
            // Optionally, refresh the data or remove the deleted item from the state
          }
        } catch (error) {
          // Show error message
          Swal.fire(
            "Error!",
            "There was a problem deleting the entry.",
            "error"
          );
        }
      }
    });
  };

  // yet to be add  searching userName
  const downlodExcelPdf = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item, index) => ({
        SNo: index + 1,
        Username: item.username,
        Email: item.email,
        "Course Enroll Date": item.course_enroll_date,
        Course: item.course,
        "Phone Number": item.phone_number,
        Job: item.job,
        Country: item.country,
        Service: item.service,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const excelBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(excelBlob, "data.xlsx");

    // Generate PDF file
    const doc = new jsPDF();
    doc.text("User Data", 10, 10);

    data.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.username} | ${item.email} | ${
          item.course_enroll_date
        } | ${item.course} | ${item.phone_number} | ${item.job} | ${
          item.country
        } | ${item.service}`,
        10,
        20 + index * 10
      );
    });

    doc.save("data.pdf");
  };

  //logout admin from localstorage
  // async function logoutAdmin() {
  //   try {
  //     // Fetch the data to find the user to be deleted
  //     const response = await fetch("/api/registers"); // Adjust the endpoint as necessary
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const result = await response.json();

  //     // Find the user to delete
  //     const user = result.find(user => user.username === 'pratap' && user.email === 'pratap@gmail.com');

  //     if (user) {
  //       // Delete the user by sending a request to the server
  //       const deleteResponse = await fetch(`/api/deleteUser/${user.username}`, {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if (!deleteResponse.ok) {
  //         throw new Error("Failed to delete user");
  //       }

  //       // Clear local storage
  //       localStorage.removeItem("userdetail");

  //       // Redirect to homepage
  //       window.location.href = "/";
  //     } else {
  //       console.error("User not found");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  //logut admin
  const handleLogout = () => {
    // Show confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      // Remove authToken from localStorage
      localStorage.removeItem("token");

      // Redirect to login page
      window.location.href = "/login";
    }
  };



//update password then redirect /login
const handlePasswordUpdateClick = () => {
  navigate('/login') // Redirect to /login
};




  return (
    <div>
      <div className="flex justify-center pb-2">
        <img src="logo.png" alt="" />
      </div>

      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Tabs className="flex w-full">
          <div
            className={`fixed md:static top-0 left-0 h-full w-64 bg-indigo-800 text-white transition-transform transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
          >
            <div className="flex items-center justify-center h-20 shadow-md">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <TabList className="flex flex-col p-4 space-y-2">
              <Tab
                className="cursor-pointer p-2 rounded-md hover:bg-indigo-600"
                selectedClassName="bg-indigo-600"
              >
                Dashboard
              </Tab>
              <Tab
                className="cursor-pointer p-2 rounded-md hover:bg-indigo-600"
                selectedClassName="bg-indigo-600"
              >
                Users
              </Tab>
              {/* <Tab className="cursor-pointer p-2 rounded-md hover:bg-indigo-600" selectedClassName="bg-indigo-600">
              Settings
            </Tab> */}

              <div
                onClick={handleLogout}
                className="cursor-pointer p-2 rounded-md hover:bg-indigo-600"
                selectedClassName="bg-indigo-600"
              >
                Logout
              </div>

              <div>
      <div
        className="cursor-pointer p-2 rounded-md hover:bg-indigo-600"
        onClick={() => setShowPasswordModal(true)}
      >
        Update Password
      </div>
      <AdminPasswordUpdateModal
        visible={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        userEmail={userEmail}
      />
    </div>
            </TabList>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Navbar bg-white  */}
            <header className=" bg-indigo-600 text-white flex justify-between items-center shadow-md px-6 py-4 md:hidden">
              <div className="text-2xl font-semibold">Dashboard</div>

              <button
                onClick={toggleSidebar}
                className="text- focus:outline-none"
              >
                {isSidebarOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
              <TabPanel>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                    <p className="text-2xl">{data.length}</p>
                  </div>
                  {/* add more box.. */}
                </div>
              </TabPanel>

              {/* user table */}
              <TabPanel>
                <div className="bg-white shadow rounded-lg p-4">
                  {/* flex justify-between */}
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold mb-2">Users List</h3>
                      <button
                        onClick={downlodExcelPdf}
                        className="bg-green-600 py-2 px-2 rounded
              text-white font-bold mb-2"
                      >
                        Download Pdf
                      </button>
                    </div>

                    {/* search user Name */}
                    {/* <div className="p-2 ">
                <input type="text"className="p-1 border rounded"  placeholder="search username" />
              </div> */}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
                            Sr. No
                          </th>
                          <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
                            Username
                          </th>
                          <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
                            Course Opting Date
                          </th>
                          <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
                            Course Name
                          </th>
                          <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
                            Contact No
                          </th>
                          <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
                            Job Profile
                          </th>
                          <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
                            Country
                          </th>
                          <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
                            Service
                          </th>
                          <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {item.username}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {item.email}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {item.course_enroll_date}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {item.course}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {item.phone_number}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {item.job}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {item.country}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {item.service}
                            </td>
                            {/* delete button */}
                            <td className="text-center px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <button
                                className="bg-red-500 p-1 rounded px-3 text-white"
                                onClick={() => handleDelete(item.id)} // Call handleDelete with the item's id
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>

              {/* <TabPanel>
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Settings</h3>
                <p>System settings...</p>
              </div>
            </TabPanel> */}

              {/* <TabPanel>
              <h2 className="text-xl font-bold  ml-2 mb-2">logout</h2>
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Logout</h3>
                <p>Logout content...</p>
              </div>
            </TabPanel> */}
            </main>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
