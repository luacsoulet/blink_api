# 🌐 **Echo — Mini Social Network API**

**Echo** is a secure REST API built with **Fastify**, **TypeScript**, **PostgreSQL**, and **Swagger**.  
It enables users to register, log in, and publish short messages, similar to a simplified Twitter clone.

---

## **🚀 Features**

- 🔐 **JWT authentication** (login & signup)  
- 👤 **User management** (CRUD)  
- 📝 **Post creation and retrieval**  
- 🔒 **Password hashing** with `bcrypt`  
- 📖 **Interactive documentation** with Swagger  

---

## **🛠️ Tech Stack**

- [Fastify](https://www.fastify.io/) + TypeScript  
- [PostgreSQL](https://www.postgresql.org/)  
- [Swagger](https://swagger.io/) via `fastify-swagger`  
- `pino-pretty` for clean logging  
- `jsonwebtoken`, `bcrypt`, `pg`, and more  

---

## **⚙️ Installation**

### **1. Clone the project**

```bash
git clone https://github.com/your-username/echo-api.git
cd echo-api
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Create your `.env` file**

At the root of the project, create a file named `.env` with the following content:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/echo_db
JWT_SECRET=your_super_secret_key
```

> Replace `username`, `password`, and `echo_db` with your actual PostgreSQL credentials and database name.

---

## **📦 Start the API in development**

```bash
npm run dev
```

---

## **📚 Swagger API Documentation**

Once the server is running, visit:  
📄 [http://localhost:3000/docs](http://localhost:3000/docs)

---

## **📂 Project Structure**

```
.
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── plugins/
│   ├── schemas/
│   ├── dtos/
│   └── index.ts
├── .env
├── tsconfig.json
├── package.json
└── README.md
```

---

## **🧪 Useful Scripts**

| Command         | Description               |
|-----------------|---------------------------|
| `npm run dev`   | Run development server    |
| `npm run build` | Compile TypeScript        |
| `npm run start` | Start compiled app        |

---

## **✅ Project Status**

📦 Currently in development — a great way to demonstrate backend/API skills in a professional context.

---

## **👤 Author**

**Lucas Magalhaes** – Full Stack Developer & AI/Data Student