import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI environment variable is not set");
  process.exit(1);
}

const DEFAULT_ADMIN = {
  email: "admin@livebaz.com",
  password: "Admin@123456", // Change this after first login!
  name: "LiveBaz Admin",
  role: "admin",
};

async function seedAdmin() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db("livebaz");

    console.log("[v0] Connected to MongoDB");

    // Hash the password
    const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, 10);

    const adminData = {
      email: DEFAULT_ADMIN.email,
      password: hashedPassword,
      name: DEFAULT_ADMIN.name,
      role: DEFAULT_ADMIN.role,
      permissions: [
        "manage_articles",
        "manage_matches",
        "manage_teams",
        "manage_leagues",
        "manage_users",
        "view_analytics",
        "manage_seo",
        "manage_translations",
      ],
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Check if admin already exists
    const existingAdmin = await db
      .collection("admin_users")
      .findOne({ email: DEFAULT_ADMIN.email });

    if (existingAdmin) {
      console.log("[v0] Admin already exists:", DEFAULT_ADMIN.email);
      return;
    }

    // Insert admin
    const result = await db.collection("admin_users").insertOne(adminData);

    console.log("\n✅ Admin credentials seeded successfully!");
    console.log("📧 Email:", DEFAULT_ADMIN.email);
    console.log("🔑 Password:", DEFAULT_ADMIN.password);
    console.log("⚠️  IMPORTANT: Change this password after first login!");
    console.log("\nAdmin ID:", result.insertedId);
  } catch (error) {
    console.error("[v0] Error seeding admin:", error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedAdmin();
