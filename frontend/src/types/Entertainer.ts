export interface Entertainer {
    entertainerId: number;
    entStageName: string;
    entSsn: string;
    entStreetAddress: string;
    entCity: string;
    entState: string;
    entZipCode: string;
    entPhoneNumber: string;
    entWebPage: string | null;
    entEmailAddress: string | null;
    dateEntered: string; // You'll format this with Date objects when needed
  }
  