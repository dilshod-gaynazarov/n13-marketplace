import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AdminModel } from './models/admin.model';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninAdminDto } from './dto/signin-admin.dto';
import { generateTokens } from 'src/utils/generateTokens';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(AdminModel) private adminModel: typeof AdminModel,
    private jwtService: JwtService,
  ) { }

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

  async signin(signinAdminDto: SigninAdminDto) {
    try {
      const { username, password } = signinAdminDto;
      const admin = await this.adminModel.findOne({ where: { username } });
      if (!admin) {
        throw new BadRequestException('username or password incorrect');
      }
      const is_valid_password = await compare(password, admin.hashed_password);
      if (!is_valid_password) {
        throw new BadRequestException('username or password incorrect');
      }
      const payload = { id: admin.id, role: admin.role };
      const { access_token, refresh_token } = await generateTokens(this.jwtService, payload);
      return {
        statusCode: 200,
        message: 'success',
        token: access_token
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
