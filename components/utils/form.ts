// components/utils/form.ts

export function mapEnquiryType(value: string | undefined): string {
  if (!value) return '';

  const v = value.toLowerCase();

  if (v.includes('demo') || v.includes('trial')) {
    return 'Demo Class Scheduling';
  }
  if (v.includes('class') || v.includes('enroll') || v.includes('enrol')) {
    return 'Class Enquiry';
  }
  if (v.includes('performance') || v.includes('show') || v.includes('concert')) {
    return 'Performance/Concert Enquiry';
  }

  return 'Booking';
}
