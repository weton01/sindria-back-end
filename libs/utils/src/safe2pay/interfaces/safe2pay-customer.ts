export interface Safe2PayCustomer {
  Name: string;
  Identity: string;
  Phone: string;
  Email: string;
  Address: {
    ZipCode: string;
    Street: string;
    Number: string;
    Complement: string;
    District: string;
    CityName: string;
    StateInitials: string;
    CountryName: string;
  };
}
