import bcrypt from 'bcryptjs';

const users = [
    {
        name : "Admin User",
        email : "admin@email.com",
        password : bcrypt.hashSync('12345',10),
        isAdmin : true
    },
    {
        name : "Muhammad Tayyab",
        email : "tayyab@email.com",
        password : bcrypt.hashSync('12345',10),
        isAdmin : true
    },
    {
        name : "Saad",
        email : "saad@email.com",
        password : bcrypt.hashSync('12345',10),
        isAdmin : false
    },
]   