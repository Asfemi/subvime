export function getBandwidthKey(organizationId: string): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `bw:${organizationId}:${year}-${month}`;
}
