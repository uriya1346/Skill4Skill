// Import necessary dependencies and components
import React, { useState } from "react";
import { v4 as uuid } from "uuid"; // For generating unique group IDs
import "../css/newGroup.css"

function LearningGroupForm({ users, onGroupCreate }) {
    
  const [groupName, setGroupName] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Generate a unique group ID
    const groupId = uuid();

    // Create a new group object
    const newGroup = {
      id: groupId,
      name: groupName,
      createdBy: selectedUser,
      members: [selectedUser],
    };

    // Pass the new group object to the parent component
    onGroupCreate(newGroup);

    // Reset form fields
    setGroupName("");
    setSelectedUser("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="groupName">Group Name:</label>
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={handleGroupNameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="selectedUser">Select User:</label>
        <select
          id="selectedUser"
          value={selectedUser}
          onChange={handleUserChange}
          required
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Create Group</button>
    </form>
  );
}

function LearningGroup({ group, onJoinRequest }) {
  const handleJoinRequest = () => {
    // Pass the group ID to the parent component
    onJoinRequest(group.id);
  };

  return (
    <div>
      <h3>{group.name}</h3>
      <p>Created by: {group.createdBy}</p>
      <button onClick={handleJoinRequest}>Join Group</button>
    </div>
  );
}

function LearningGroupsPage() {
  const [groups, setGroups] = useState([]);
  const [users] = useState([
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ]);

  const handleGroupCreate = (newGroup) => {
    // Add the new group to the existing groups
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const handleJoinRequest = (groupId) => {
    // Find the group by ID
    const group = groups.find((group) => group.id === groupId);

    if (group) {
      // Update the group by adding the requesting user to the members
      const updatedGroup = {
        ...group,
        members: [...group.members, "Current User"], // Replace "Current User" with the actual user ID or username
      };

      // Replace the old group with the updated group
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId ? updatedGroup : group
        )
      );
    }
  };

  return (
    <div>
      <h2>Create a New Learning Group</h2>
      <LearningGroupForm users={users} onGroupCreate={handleGroupCreate} />

      <h2>Learning Groups</h2>
      {groups.map((group) => (
        <LearningGroup
          key={group.id}
          group={group}
          onJoinRequest={handleJoinRequest}
        />
      ))}
    </div>
  );
}

export default LearningGroupsPage;
