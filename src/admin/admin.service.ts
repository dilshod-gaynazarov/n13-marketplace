import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AdminModel } from './models/admin.model';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(AdminModel) private adminModel: typeof AdminModel,
    private jwtService: JwtService,
  ) {}

  // one time method for create a superadmin
  async addSuperadmin(createAdminDto: CreateAdminDto) {
    try {
      const hashed_password = await hash(createAdminDto.password, 7);
      const superadmin = await this.adminModel.create({
        role: 'superadmin',
        username: createAdminDto.username,
        hashed_password,
        email: createAdminDto?.email || null,
      });
      return {
        statusCode: 201,
        message: 'success',
        data: superadmin,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async addAdmin(createAdminDto: CreateAdminDto) {
    try {
      const hashed_password = await hash(createAdminDto.password, 7);
      const admin = await this.adminModel.create({
        role: 'admin',
        username: createAdminDto.username,
        hashed_password,
        email: createAdminDto?.email || null,
      });
      return {
        statusCode: 201,
        message: 'success',
        data: admin,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
