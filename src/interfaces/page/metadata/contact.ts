import IMetadata from "../metadata";

interface IContactMetadata extends IMetadata {
  _map: string,
  _subtitle: string,
  _company: {
    name: string,
    orgID: string,
    iban: string,
  },
  _address: {
    street: string,
    locality: string,
    country: string,
    postalCode: string,
  },
  _phone: string,
}

export default IContactMetadata;
