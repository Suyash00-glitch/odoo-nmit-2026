import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT_ROUNDS = 12;

const employmentTypes = ['Full-time', 'Part-time', 'Contract'];

const employeeData = [
  { first: 'Alice', last: 'Johnson', dept: 'Engineering', title: 'Software Engineer' },
  { first: 'Bob', last: 'Williams', dept: 'Marketing', title: 'Marketing Specialist' },
  { first: 'Carol', last: 'Davis', dept: 'HR', title: 'HR Manager' },
  { first: 'David', last: 'Martinez', dept: 'Finance', title: 'Financial Analyst' },
  { first: 'Emma', last: 'Wilson', dept: 'Engineering', title: 'Senior Developer' },
  { first: 'Frank', last: 'Anderson', dept: 'Sales', title: 'Sales Executive' },
  { first: 'Grace', last: 'Thompson', dept: 'Operations', title: 'Operations Lead' },
  { first: 'Henry', last: 'Taylor', dept: 'Engineering', title: 'DevOps Engineer' },
];

function randomDate(daysBack) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysBack));
  return d;
}

function todayMinus(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(0, 0, 0, 0);
  return d;
}

function checkInTime(date) {
  const d = new Date(date);
  d.setHours(8 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60), 0, 0);
  return d;
}

function checkOutTime(checkIn) {
  const d = new Date(checkIn);
  d.setHours(d.getHours() + 8 + Math.floor(Math.random() * 2));
  return d;
}

async function main() {
  console.log('🌱 Starting seed...');

  await prisma.notification.deleteMany();
  await prisma.leaveRequest.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.payroll.deleteMany();
  await prisma.document.deleteMany();
  await prisma.employeeProfile.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Cleared existing data');

  const passwordHash = await bcrypt.hash('password123', SALT_ROUNDS);

  const admin = await prisma.user.create({
    data: {
      employeeId: 'ADMIN001',
      email: 'admin@dayflow.dev',
      passwordHash,
      role: 'ADMIN',
      isEmailVerified: true,
      profile: {
        create: {
          firstName: 'Sarah',
          lastName: 'Connor',
          phone: '+1-555-0100',
          jobTitle: 'HR Director',
          department: 'HR',
          dateOfJoining: new Date('2020-01-15'),
          employmentType: 'Full-time',
        },
      },
    },
  });
  console.log('✅ Admin created:', admin.email);

  const employees = [];
  for (let i = 0; i < employeeData.length; i++) {
    const emp = employeeData[i];
    const empId = `EMP00${i + 1}`;
    const email = `${emp.first.toLowerCase()}.${emp.last.toLowerCase()}@dayflow.dev`;

    const user = await prisma.user.create({
      data: {
        employeeId: empId,
        email,
        passwordHash,
        role: 'EMPLOYEE',
        isEmailVerified: true,
        profile: {
          create: {
            firstName: emp.first,
            lastName: emp.last,
            phone: `+1-555-0${100 + i + 1}`,
            address: `${100 + i} Main St, San Francisco, CA 94105`,
            jobTitle: emp.title,
            department: emp.dept,
            dateOfJoining: randomDate(730),
            employmentType: employmentTypes[i % employmentTypes.length],
            managerId: admin.id,
            documents: {
              create: [
                { name: 'Signed Employment Contract', url: 'https://dayflow.dev/docs/contract.pdf' },
                { name: 'Government ID Verification', url: 'https://dayflow.dev/docs/id_proof.pdf' },
                { name: 'Non-Disclosure Agreement (NDA)', url: 'https://dayflow.dev/docs/nda.pdf' },
              ],
            },
          },
        },
        payroll: {
          create: {
            baseSalary: 70000 + i * 5000,
            allowances: { hra: 5000, transport: 1500, medical: 2000 },
            deductions: { tax: 8000, pf: 3000 },
            netSalary: 70000 + i * 5000 + 5000 + 1500 + 2000 - 8000 - 3000,
            effectiveDate: new Date('2024-01-01'),
          },
        },
      },
    });

    employees.push(user);
    console.log(`✅ Employee created: ${email}`);
  }

  const attendanceStatuses = [
    'PRESENT',
    'PRESENT',
    'PRESENT',
    'PRESENT',
    'HALF_DAY',
    'ABSENT',
  ];

  for (const employee of employees) {
    for (let day = 1; day <= 14; day++) {
      const date = todayMinus(day);
      if (date.getDay() === 0 || date.getDay() === 6) continue;

      const status = attendanceStatuses[Math.floor(Math.random() * attendanceStatuses.length)];
      const cin = status !== 'ABSENT' ? checkInTime(date) : null;
      const cout = cin ? checkOutTime(cin) : null;

      try {
        await prisma.attendance.create({
          data: {
            employeeId: employee.id,
            date,
            checkIn: cin,
            checkOut: cout,
            status,
          },
        });
      } catch {
        // Skip duplicate date entries
      }
    }
  }
  console.log('✅ Attendance records created');

  const leaveScenarios = [
    { empIdx: 0, type: 'PAID', daysFromNow: 7, duration: 3, status: 'PENDING', remarks: 'Family vacation' },
    { empIdx: 1, type: 'SICK', daysFromNow: 2, duration: 2, status: 'PENDING', remarks: 'Doctor appointment' },
    { empIdx: 2, type: 'UNPAID', daysFromNow: 14, duration: 5, status: 'APPROVED', remarks: 'Personal work' },
    { empIdx: 3, type: 'PAID', daysFromNow: -5, duration: 2, status: 'APPROVED', remarks: 'Annual leave' },
    { empIdx: 4, type: 'SICK', daysFromNow: -2, duration: 1, status: 'REJECTED', remarks: 'Unwell', reviewComments: 'Please provide medical certificate' },
    { empIdx: 5, type: 'PAID', daysFromNow: 3, duration: 2, status: 'PENDING', remarks: 'Wedding anniversary' },
  ];

  for (const scenario of leaveScenarios) {
    const employee = employees[scenario.empIdx];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + scenario.daysFromNow);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + scenario.duration - 1);

    await prisma.leaveRequest.create({
      data: {
        employeeId: employee.id,
        leaveType: scenario.type,
        startDate,
        endDate,
        remarks: scenario.remarks,
        status: scenario.status,
        reviewedById: scenario.status !== 'PENDING' ? admin.id : null,
        reviewComments: scenario.reviewComments ?? null,
      },
    });
  }
  console.log('✅ Leave requests created');

  await prisma.notification.createMany({
    data: [
      {
        userId: employees[2].id,
        title: 'Leave Request Approved',
        message: 'Your unpaid leave from next week has been approved.',
        isRead: false,
      },
      {
        userId: employees[3].id,
        title: 'Leave Request Approved',
        message: 'Your paid leave has been approved.',
        isRead: true,
      },
      {
        userId: employees[4].id,
        title: 'Leave Request Rejected',
        message: 'Your sick leave was rejected. Please provide a medical certificate.',
        isRead: false,
      },
    ],
  });
  console.log('✅ Notifications created');

  console.log('\n🎉 Seed complete! Demo credentials:');
  console.log('   Admin:    admin@dayflow.dev / password123');
  console.log('   Employee: alice.johnson@dayflow.dev / password123');
  console.log('   Employee: bob.williams@dayflow.dev / password123');
  console.log('   (All employees use password: password123)');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
