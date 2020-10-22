import { DataDto } from './data.dto';

export class PayloadDto {
  action: string;

  data: DataDto;

  type: string;

  url: string;

  createdAt: string;

  updatedFrom: DataDto;
}
