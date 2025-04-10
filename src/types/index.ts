export interface SupplyPoint {
  id: string;
  address: string;
  status: 'active' | 'inactive' | 'suspended';
  isPriority: boolean;
  hasEmergency: boolean;
  lastReading: number;
  lastReadingDate: string;
}

export interface Invoice {
  id: string;
  supplyPointId: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  consumption: number;
  installments?: number;
}

export interface Occurrence {
  id: string;
  supplyPointId: string;
  type: 'disconnection' | 'reconnection' | 'emergency' | 'maintenance';
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'operator' | 'customer';
  email: string;
}

export interface EmergencyFormData {
  clientReport: string;
  supplyFailureScope: string;
  vitalClientStatus: string;
  caseNumber?: string;
  observations: string;
  status: string;
  openingDateTime: string;
  company: string;
  equipment: string;
  batteryAutonomy: string;
  urgentReason: string;
  priority: string;
  urgentData: string;
  originChannel: string;
  subChannel: string;
  ownerID: string;
  contactName: string;
  contactPhone: string;
}