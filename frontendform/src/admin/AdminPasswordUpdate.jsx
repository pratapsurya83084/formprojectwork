import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Input, message } from 'antd';
import { Navigate } from 'react-router-dom';

const AdminPasswordUpdateModal = ({ visible, onClose, userEmail }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState(userEmail || '');

  const handleUpdatePassword = async () => {
  
    // const authToken = localStorage.getItem('authToken');

    try {
      const response = await axios.post(
        '/api/update-password',
        {
          email,
          currentPassword,
          newPassword,
        },
        {
          headers: {
            // Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );



     
  // Check if the response indicates success
  if (response.data.update === true) {
    // Show a green success message
    message.success('Password updated successfully');
   Navigate('/login')
    onClose(); // Close the modal or perform any other necessary actions
  } else {
    // Show a red error message
    message.error('Invalid password or email');
  }
} catch (error) {
  // Show a red error message for any other errors (e.g., network issues)
  message.error(error.response?.data?.message || 'Password update failed');
}
  };







  return (
    <Modal
      title="Update Password"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdatePassword}>
          Update Password
        </Button>,
      ]}
    >
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Input.Password
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Input.Password
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
    </Modal>
  );
};

export default AdminPasswordUpdateModal;
