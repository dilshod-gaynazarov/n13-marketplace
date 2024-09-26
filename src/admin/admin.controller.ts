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
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('superadmin')
  addSuperadmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.addSuperadmin(createAdminDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('add')
  addAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.addAdmin(createAdminDto);
  }
}
