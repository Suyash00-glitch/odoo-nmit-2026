import { prisma } from '../config/db.js';
import { AppError, asyncHandler, sendSuccess } from '../utils/helpers.js';

const computeNetSalary = (baseSalary, allowances = {}, deductions = {}) => {
  const totalAllowances = Object.values(allowances).reduce((sum, v) => sum + Number(v), 0);
  const totalDeductions = Object.values(deductions).reduce((sum, v) => sum + Number(v), 0);
  return Number(baseSalary) + totalAllowances - totalDeductions;
};


export const getMyPayroll = asyncHandler(async (req, res) => {
  const payroll = await prisma.payroll.findUnique({
    where: { employeeId: req.user.id },
    include: { employee: { select: { employeeId: true, email: true, profile: true } } },
  });
  if (!payroll) throw new AppError('Payroll record not found', 404, 'NOT_FOUND');
  sendSuccess(res, payroll, 'Payroll retrieved');
});


export const getEmployeePayroll = asyncHandler(async (req, res) => {
  const payroll = await prisma.payroll.findUnique({
    where: { employeeId: req.params.employeeId },
    include: { employee: { select: { employeeId: true, email: true, profile: true } } },
  });
  if (!payroll) throw new AppError('Payroll record not found', 404, 'NOT_FOUND');
  sendSuccess(res, payroll, 'Employee payroll retrieved');
});


export const updateEmployeePayroll = asyncHandler(async (req, res) => {
  const { baseSalary, allowances = {}, deductions = {}, effectiveDate } = req.body;
  const employeeId = req.params.employeeId;

  const employee = await prisma.user.findUnique({ where: { id: employeeId } });
  if (!employee) throw new AppError('Employee not found', 404, 'NOT_FOUND');

  const netSalary = computeNetSalary(baseSalary, allowances, deductions);

  const payroll = await prisma.payroll.upsert({
    where: { employeeId },
    create: {
      employeeId,
      baseSalary,
      allowances,
      deductions,
      netSalary,
      effectiveDate: new Date(effectiveDate),
    },
    update: {
      baseSalary,
      allowances,
      deductions,
      netSalary,
      effectiveDate: new Date(effectiveDate),
    },
    include: { employee: { select: { employeeId: true, email: true, profile: true } } },
  });

  sendSuccess(res, payroll, 'Payroll updated successfully');
});