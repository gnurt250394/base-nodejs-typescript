import multer from 'multer';
import fs from 'fs';

const MIME: any = {
  // list: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
  'audio/aac': 'aac',
  'application/x-abiword': 'abw',
  'text/csv': 'csv',
  'application/octet-stream': 'bin',
  'image/bmp': 'bmp',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'image/gif': 'gif',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/jpg': 'jpg',
  'audio/mpeg': 'mp3',
  'video/mpeg': 'mpeg',
  'application/pdf': 'pdf',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'application/x-rar-compressed': 'rar',
  'audio/wav': 'wav',
  'audio/webm': 'weba',
  'video/webm': 'webm',
  'image/webp': 'webp',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/zip': 'zip',
  'video/3gpp': '3gp',
  'video/3gpp2': '3g2',
  'application/x-7z-compressed': '7z',
  'application/x-shockwave-flash': 'swf',
  'application/x-tar': 'tar',
  'image/tiff': 'tiff',
  'text/plain': 'txt',
};
const storage = multer.diskStorage({
  destination: (req: any, res: any, cb: any) => {
    var dir = './uploads';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, './uploads/');
  },
  filename: (req: any, file: any, cb: any) => {
    var filetype = MIME[file.mimetype];
    console.log('file: ', file);
    console.log('filetype: ', filetype);
    cb(null, 'jay-' + Date.now() + '.' + filetype);
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
export default upload;
