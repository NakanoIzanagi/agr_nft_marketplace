import * as fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), '/public/data.json');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContents);
  res.status(200).json(data);
}