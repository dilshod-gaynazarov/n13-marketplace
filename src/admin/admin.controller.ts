import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { SigninAdminDto } from './dto/signin-admin.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { SuperadminGuard } from 'src/guard/superadmin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post('superadmin')
  addSuperadmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.addSuperadmin(createAdminDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminGuard)
  @UseGuards(JwtAuthGuard)
  @Post('add')
  addAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.addAdmin(createAdminDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() signinAdminDto: SigninAdminDto) {
    return this.adminService.signin(signinAdminDto);
  }
}
