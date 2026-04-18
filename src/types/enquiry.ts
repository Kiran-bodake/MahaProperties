export type EnquirySource = "enquiry" | "ai-chat" | "callback" | "whatsapp";
export type EnquiryStatus = "new" | "contacted" | "converted" | "closed";

export interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  propertyId?: string;
  property?: { title: string; slug: string };
  message?: string;
  source: EnquirySource;
  status: EnquiryStatus;
  isRead: boolean;
  notes?: string;
  createdAt: string;
}

export interface Lead {
  name: string;
  phone: string;
  email?: string;
  propertyId?: string;
  message?: string;
  source: EnquirySource;
}
