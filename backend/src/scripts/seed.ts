import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../utils/auth"

const prisma = new PrismaClient()

async function main() {
    console.log("🌱 Starting database seeding...")

    // Create admin user
    const adminPassword = await hashPassword("admin123")
    const admin = await prisma.user.upsert({
        where: { email: "admin@company.com" },
        update: {},
        create: {
            email: "admin@company.com",
            password: adminPassword,
            name: "Admin User",
            role: "ADMIN",
            department: "IT",
        },
    })

    // Create manager user
    const managerPassword = await hashPassword("manager123")
    const manager = await prisma.user.upsert({
        where: { email: "manager@company.com" },
        update: {},
        create: {
            email: "manager@company.com",
            password: managerPassword,
            name: "Manager User",
            role: "MANAGER",
            department: "Engineering",
        },
    })

    // Create employee user
    const employeePassword = await hashPassword("employee123")
    const employee = await prisma.user.upsert({
        where: { email: "employee@company.com" },
        update: {},
        create: {
            email: "employee@company.com",
            password: employeePassword,
            name: "Employee User",
            role: "EMPLOYEE",
            department: "Engineering",
            managerId: manager.id,
        },
    })

    // Create leave types
    const leaveTypes = await Promise.all([
        prisma.leaveType.upsert({
            where: { name: "Annual Leave" },
            update: {},
            create: {
                name: "Annual Leave",
                description: "Regular annual leave entitlement",
                color: "#3B82F6",
                maxDays: 25,
            },
        }),
        prisma.leaveType.upsert({
            where: { name: "Sick Leave" },
            update: {},
            create: {
                name: "Sick Leave",
                description: "Leave for illness or medical appointments",
                color: "#EF4444",
                maxDays: 10,
            },
        }),
        prisma.leaveType.upsert({
            where: { name: "Personal Leave" },
            update: {},
            create: {
                name: "Personal Leave",
                description: "Personal or family matters",
                color: "#10B981",
                maxDays: 5,
            },
        }),
        prisma.leaveType.upsert({
            where: { name: "Bereavement Leave" },
            update: {},
            create: {
                name: "Bereavement Leave",
                description: "Leave for bereavement",
                color: "#6B7280",
                maxDays: 3,
            },
        }),
    ])

    // Create leave balances for current year
    const currentYear = new Date().getFullYear()
    await Promise.all([
        prisma.leaveBalance.upsert({
            where: {
                userId_leaveTypeId_year: {
                    userId: employee.id,
                    leaveTypeId: leaveTypes[0].id, // Annual Leave
                    year: currentYear,
                },
            },
            update: {},
            create: {
                userId: employee.id,
                leaveTypeId: leaveTypes[0].id,
                currentBalance: 25,
                totalEarned: 25,
                totalUsed: 0,
                year: currentYear,
            },
        }),
        prisma.leaveBalance.upsert({
            where: {
                userId_leaveTypeId_year: {
                    userId: employee.id,
                    leaveTypeId: leaveTypes[1].id, // Sick Leave
                    year: currentYear,
                },
            },
            update: {},
            create: {
                userId: employee.id,
                leaveTypeId: leaveTypes[1].id,
                currentBalance: 10,
                totalEarned: 10,
                totalUsed: 0,
                year: currentYear,
            },
        }),
    ])

    console.log("✅ Database seeded successfully!")
    console.log("👤 Admin user: admin@company.com / admin123")
    console.log("👤 Manager user: manager@company.com / manager123")
    console.log("👤 Employee user: employee@company.com / employee123")
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
