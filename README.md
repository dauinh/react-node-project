# First React & Node App

My first web app using React and Node 🎉

## **Description**

### *What your application does*

Users can register and log in as either **Admin** or **User**.
- **Admin** can manage users and tasks: 
  - update users info (name, breed, admin status)
  - delete users
  - assign tasks to users
  - add users to previous tasks
  - delete tasks
- **User** can only see tasks that are assigned to them.

### *Future features*

- **User** can check off task
- General board where users can interact
- Comment section for each task
- **Admin** can set deadlines for tasks
- Calendar feature to see all tasks
- **Admin** and **User** can change their own passwords.

## **Installation**

This project requires the following tools:

- [Node.js](https://nodejs.org/en/): an open-source, cross-platform, back-end JavaScript runtime environment
- [NPM](https://www.npmjs.com/): a package manager for Node.js
- [PostgreSQL](https://www.postgresql.org/): a relational database system

**Clone repository**

In your folder, run following commands:

```
git clone https://github.com/dauinh/react-node-project.git
cd react-node-project
```

**Install dependencies**

This project needs to install dependencies for both backend server and frontend.

```
# in project root directory, install backend dependencies
npm install

# install frontend dependencies
cd client
npm install
```

**Create environment variables**

Before starting the app, you need to create a `.env` file in root directory with the following variables:

```SECRET_KEY=key_to_create_password_hash
ADMIN_PASSWORD=password_for_first_admin

DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=your_postgres_database_name
DB_HOST=127.0.0.1    # http://localhost
```

*Note: `ADMIN_PASSWORD` is the password of the app's first **Admin**, but it only works before seeding. Undo most recent seeds by running `npx sequelize-cli db:seed:undo`.*

**Run server**

To start the app, you can run these commands in the project directory:

```
# start migrating
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# start server
npm start
```

## **Usage**

Create a new account from register form and log in to see **User**'s display.

Or log into **Admin**'s account created from seeder:

```
Username: bimbim
Password: [ADMIN_PASSWORD]    // or "sunshine" if ADMIN_PASSWORD is empty
```
*Note: `ADMIN_PASSWORD` for the demo is not publicly accessible.*
