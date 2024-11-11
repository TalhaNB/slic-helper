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

interface Client extends User {
  premiumDueDate: string;
  premiumAmount: number;
}

interface SalesManagerType extends User {
  salesRepresentatives: {
    [key: string]: SalesRep;
  };
  clients: {
    [key: string]: Client;
  };
}

interface SalesRepType extends User {
  clients: {
    [key: string]: Client;
  };
}

export interface RootObject extends User {
  [key: string]: SalesManagerType; // Key is string (user ID) and value is either User or Manager type
}
