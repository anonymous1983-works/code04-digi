module.exports = function() {
    data = { users: [] }
    // Create 1000 users
    for (var i = 0; i < 1000; i++) {
        data.users.push({ name: 'user' + i })
    }
    return data
}