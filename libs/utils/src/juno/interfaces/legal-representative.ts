import { JunoLegalRepresentativeTypes } from '../enums/juno-legal-rep-type';

export interface JunoLegalRepresentative {
  name: string;
  document: string;
  birthDate: string;
  motherName: string;
  type: JunoLegalRepresentativeTypes;
}
