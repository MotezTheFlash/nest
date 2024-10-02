import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';
@Injectable()
export class EmployeesService {
  constructor(private readonly dbService: DbService) {}
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.dbService.employee.create({ data: createEmployeeDto });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.dbService.employee.findMany({
        where: {
          role,
        },
      });
    }
    return this.dbService.employee.findMany();
  }

  async findOne(id: number) {
    return this.dbService.employee.findUnique({ where: { id } });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.dbService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.dbService.employee.delete({ where: { id } });
  }
}
