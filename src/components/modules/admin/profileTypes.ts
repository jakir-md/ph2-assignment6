export interface IWallet {
  _id: string;
  balance: number;
  createdAt: string;
  phone: string;
  status: string;
  updatedAt: string;
  userId: string;
}

export interface IUser {
  _id: string;
  address: string;
  createdAt: string;
  email: string;
  isActive: string;
  isDeleted: boolean;
  isVerified: boolean;
  name: string;
  nomineeNID: string;
  nomineeName: string;
  phone: string;
  picture: string;
  role: string;
  updatedAt: string;
  userNID: string;
  walletId: IWallet;
}
