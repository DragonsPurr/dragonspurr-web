import {
  getProvinceFieldLabel,
  getSubdivisionsForCountry,
  normalizeProvinceForCountry,
} from '@/app/lib/address-locations';

describe('address-locations', () => {
  it('returns subdivisions for US and Canada', () => {
    expect(getSubdivisionsForCountry('us').length).toBeGreaterThan(40);
    expect(getSubdivisionsForCountry('ca').length).toBe(13);
  });

  it('normalizes province names and abbreviations', () => {
    expect(normalizeProvinceForCountry('ca', 'Ontario')).toBe('ca-on');
    expect(normalizeProvinceForCountry('ca', 'on')).toBe('ca-on');
    expect(normalizeProvinceForCountry('us', 'New York')).toBe('us-ny');
    expect(normalizeProvinceForCountry('us', 'ny')).toBe('us-ny');
  });

  it('uses context-aware province labels', () => {
    expect(getProvinceFieldLabel('us')).toBe('State');
    expect(getProvinceFieldLabel('ca')).toBe('Province / territory');
    expect(getProvinceFieldLabel('gb')).toBe('Province / state');
  });
});
