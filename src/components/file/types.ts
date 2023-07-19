export interface UserFile {
  id: string;
  name: string;
  createdByUserId: string;
  createdByUser?: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  url: string;
}

export interface FilesFetchResponse {
  files: UserFile[];
  totalCount: number;
}

export interface FilesFetchRequest {
  limit?: number;
  offset?: number;
}
