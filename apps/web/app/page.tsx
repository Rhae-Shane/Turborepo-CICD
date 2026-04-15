import { prisma } from "db";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
      }}
    >
      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            backgroundColor: "#000000",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>
            {user.name || "No Name"}
          </h3>

          <p style={{ margin: "5px 0" }}>
            <strong>Email:</strong> {user.email}
          </p>

          <p style={{ margin: "5px 0", fontSize: "12px", color: "#bebebe" }}>
            <strong>ID:</strong> {user.id}
          </p>

          <p style={{ margin: "5px 0", fontSize: "12px", color: "#bcbcbc" }}>
            <strong>Created At:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
export const dynamic = "force-dynamic";