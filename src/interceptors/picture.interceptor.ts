import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as uuid from 'uuid';

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = `${uuid.v1()}`;
    callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileInterceptor = FileInterceptor('image', {
    storage: diskStorage({
        destination: './images',
        filename: editFileName,
    }),
    fileFilter: imageFileFilter,
});