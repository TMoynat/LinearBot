export class DataDto {
  id: string;

  createdAt: string;

  updatedAt: string;

  title: string;

  edited: boolean;

  issueId: string;

  creatorId: string;

  assigneeId: string;

  state: {
    name: string;
  };
}
