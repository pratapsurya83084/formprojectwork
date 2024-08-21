// PasswordUpdateModal.js
import React, { useState } from 'react';
import { Modal, Button, Input, message } from 'antd';
const AdminPasswordUpdateModal = ({ visible, onClose, userId }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');


  const adminid=34;
  const handleUpdatePassword = async () => {
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await axios.post(
        '/api/update-password',
        {
          email: userEmail,
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      message.success('Password updated successfully');
      onClose(); // Close the modal
    } catch (error) {
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
          Update
        </Button>,
      ]}
    >
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
