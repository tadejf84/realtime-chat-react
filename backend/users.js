/**
 * Helper functions for users
 * 
 */
const users = [];

// Add a user
const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Check if user already exists in the room
    const existingUser = users.find(() => {
        return user.room === room && user.name === name;
    });

    // If user exists, throw error
    if( existingUser ) return { 'error': 'Username is taken!' };

    // Else create user and push to users arr
    const user = { id, name, room };
    users.push(user);

    return { user };
}

// Remove a user
const removeUser = (id) => {

    // Check if user exists
    const index = users.find((user) => user.id === id);

    // If user exists, remove it from users arr
    if(index !== -1) return users.splice(index, 1)[0];
}

// Get user by id
const getUser = (id) => users.find((user) => user.id === id);

// Get all users in the same room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// Export functions
module.exports = { addUser, removeUser, getUser, getUsersInRoom };