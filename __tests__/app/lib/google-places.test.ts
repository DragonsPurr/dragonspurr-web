import {
  parseGoogleAddressComponents,
  parsePlaceAddressComponents,
} from '@/app/lib/google-places';

function component(
  type: string,
  long: string,
  short = long
): { long_name: string; short_name: string; types: string[] } {
  return { long_name: long, short_name: short, types: [type] };
}

describe('parseGoogleAddressComponents', () => {
  it('maps a typical Canadian address', () => {
    const parsed = parseGoogleAddressComponents([
      component('street_number', '123'),
      component('route', 'Main Street'),
      component('locality', 'Toronto'),
      component('administrative_area_level_1', 'Ontario', 'ON'),
      component('country', 'Canada', 'CA'),
      component('postal_code', 'M5V 2T6'),
    ]);

    expect(parsed).toEqual({
      address1: '123 Main Street',
      address2: '',
      city: 'Toronto',
      postalCode: 'M5V 2T6',
      countryCode: 'ca',
      province: 'ca-on',
    });
  });

  it('maps US state abbreviations', () => {
    const parsed = parseGoogleAddressComponents([
      component('street_number', '1'),
      component('route', 'Broadway'),
      component('locality', 'New York'),
      component('administrative_area_level_1', 'New York', 'NY'),
      component('country', 'United States', 'US'),
      component('postal_code', '10004'),
    ]);

    expect(parsed.province).toBe('us-ny');
    expect(parsed.countryCode).toBe('us');
  });

  it('parses Places API (New) address component shape', () => {
    const parsed = parsePlaceAddressComponents([
      { types: ['street_number'], longText: '123', shortText: '123' },
      { types: ['route'], longText: 'Main Street', shortText: 'Main St' },
      { types: ['locality'], longText: 'Toronto', shortText: 'Toronto' },
      {
        types: ['administrative_area_level_1'],
        longText: 'Ontario',
        shortText: 'ON',
      },
      { types: ['country'], longText: 'Canada', shortText: 'CA' },
      { types: ['postal_code'], longText: 'M5V 2T6', shortText: 'M5V 2T6' },
    ]);

    expect(parsed.address1).toBe('123 Main Street');
    expect(parsed.province).toBe('ca-on');
  });

  it('includes subpremise in address line 2', () => {
    const parsed = parseGoogleAddressComponents([
      component('street_number', '10'),
      component('route', 'King St W'),
      component('subpremise', 'Suite 200'),
      component('locality', 'Toronto'),
      component('administrative_area_level_1', 'Ontario', 'ON'),
      component('country', 'Canada', 'CA'),
      component('postal_code', 'M5H 1A1'),
    ]);

    expect(parsed.address2).toBe('Suite 200');
  });
});
