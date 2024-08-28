import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const AdminPasswordUpdateModal = ({ visible, onClose, userEmail }) => {
  
  const navigate=useNavigate()

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
            'Content-Type': 'application/json',
          },
        }
      );

      const updatePasswordStatus = response.data.update;
      
      if (updatePasswordStatus) {
        message.success('Password updated successfully');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        message.error('Invalid password or email. Please enter the correct credentials.');
      }
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || 'Password update failed. Please try again.');
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
