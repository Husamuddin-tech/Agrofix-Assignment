// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../../lib/auth";
// import { redirect } from "next/navigation";
// import AdminDashboard from "./components/AdminDashboard";

// export default async function AdminPage() {
//   const session = (await getServerSession(authOptions)) as {
//     user: { role: string };
//   } | null;

//   if (!session || session.user.role !== "admin") {
//     redirect("/unauthorized"); // Or fallback route like "/"
//   }

//   return <AdminDashboard />;
// }
