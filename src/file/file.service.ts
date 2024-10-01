import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { extname, join, resolve } from "path";
import { v4 } from 'uuid';

@Injectable()
export class FileService {
    async uploadFile(file: Express.Multer.File) {
        try {
            const ext = extname(file.originalname);
            const file_name = file.originalname + '_' + v4() + ext.toLowerCase();
            const file_path = resolve(__dirname, '..', '..', '..', 'uploads');
            if (!existsSync(file_path)) {
                mkdirSync(file_path, { recursive: true });
            }
            writeFileSync(join(file_path, file_name), file.buffer);
            return file_name;
        } catch (error) {
            throw new InternalServerErrorException(`Error on uploading file: ${error}`);
        }
    }
}
