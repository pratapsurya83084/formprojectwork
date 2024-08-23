import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Input, message } from 'antd';

const AdminPasswordUpdateModal = ({ visible, onClose, userEmail }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState(userEmail || '');

  const handleUpdatePassword = async () => {
  
    const authToken = localStorage.getItem('authToken');

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

      // Check if response status is OK
      if (response.status === 200) {
        console.log(response.data);
        
        message.success('Password updated successfully');
        onClose(); // Close the modal
      } else {
        message.error('Password update failed');
      }
    } catch (error) {
      // Check for specific error message if available
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
