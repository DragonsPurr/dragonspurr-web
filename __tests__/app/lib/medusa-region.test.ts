jest.mock('@/app/lib/medusa', () => ({
  isMedusaConfigured: jest.fn(),
  sdk: {
    store: {
      region: {
        list: jest.fn(),
      },
    },
  },
}));

import { isMedusaConfigured, sdk } from '@/app/lib/medusa';
import { getDefaultRegionId } from '@/app/lib/medusa-region';

const mockIsMedusaConfigured = jest.mocked(isMedusaConfigured);
const mockRegionList = jest.mocked(sdk.store.region.list);

describe('getDefaultRegionId', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.MEDUSA_DEFAULT_REGION_ID;
    mockIsMedusaConfigured.mockReturnValue(true);
    mockRegionList.mockReset();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns null when Medusa is not configured', async () => {
    mockIsMedusaConfigured.mockReturnValue(false);

    await expect(getDefaultRegionId()).resolves.toBeNull();
    expect(mockRegionList).not.toHaveBeenCalled();
  });

  it('returns env value when MEDUSA_DEFAULT_REGION_ID is set', async () => {
    process.env.MEDUSA_DEFAULT_REGION_ID = ' reg_01abc ';

    await expect(getDefaultRegionId()).resolves.toBe('reg_01abc');
    expect(mockRegionList).not.toHaveBeenCalled();
  });

  it('falls back to first region when env is unset', async () => {
    mockRegionList.mockResolvedValue({ regions: [{ id: 'reg_fallback' }] });

    await expect(getDefaultRegionId()).resolves.toBe('reg_fallback');
    expect(mockRegionList).toHaveBeenCalledWith({ limit: 1 });
  });

  it('falls back when env is blank and returns null if no regions', async () => {
    process.env.MEDUSA_DEFAULT_REGION_ID = '   ';
    mockRegionList.mockResolvedValue({ regions: [] });

    await expect(getDefaultRegionId()).resolves.toBeNull();
    expect(mockRegionList).toHaveBeenCalledWith({ limit: 1 });
  });
});
