type User = {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  birthday: string; // Assuming ISO 8601 date format (YYYY-MM-DD)
  code: string;
  birthdayAlert: boolean;
};

export interface ClientType extends User {
  premiumDueDate: string;
  premiumAmount: number;
}

export interface SalesManagerType extends User {
  salesRepresentatives: {
    [key: string]: SalesRep;
  };
  clients: Array<ClientType>;
}

export interface SalesRepType extends User {
  clients: Array<ClientType>;
}

export interface RootObject extends User {
  [key: string]: SalesManagerType; // Key is string (user ID) and value is either User or Manager type
  clients: Array<ClientType>;
}
