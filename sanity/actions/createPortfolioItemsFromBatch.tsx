'use client';

import { useState } from 'react';
import type { DocumentActionComponent } from 'sanity';
import { useClient } from 'sanity';

function getAssetRef(item: unknown): string | null {
  if (!item || typeof item !== 'object') return null;
  const obj = item as Record<string, unknown>;
  const asset = obj.asset as Record<string, unknown> | undefined;
  if (!asset || typeof asset._ref !== 'string') return null;
  return asset._ref;
}

export const createPortfolioItemsFromBatch: DocumentActionComponent = (props) => {
  const { type, draft, published, id } = props;
  const client = useClient({ apiVersion: '2024-01-01' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ created: number; error?: string } | null>(null);

  if (type !== 'portfolioBatch') return null;

  const doc = draft ?? published;
  const images = (doc?.images as unknown[] | undefined) ?? [];
  const refs = images.map(getAssetRef).filter((ref): ref is string => Boolean(ref));
  const count = refs.length;

  if (count === 0) {
    return {
      label: 'Create portfolio items',
      disabled: true,
      title: 'Add at least one image to this batch first.',
    };
  }

  const run = async () => {
    setBusy(true);
    setResult(null);
    try {
      const tx = client.transaction();
      const baseId = id.replace(/^drafts\./, '');
      refs.forEach((ref, i) => {
        tx.createOrReplace({
          _id: `portfolioItem-${baseId}-${i}-${Date.now()}`,
          _type: 'portfolioItem',
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: ref },
          },
        });
      });
      await tx.commit();
      setResult({ created: count });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setResult({ created: 0, error: message });
    } finally {
      setBusy(false);
    }
  };

  return {
    label: busy ? 'Creating…' : 'Create portfolio items',
    disabled: busy,
    tone: 'primary' as const,
    onHandle: () => setDialogOpen(true),
    dialog: dialogOpen && {
      type: 'dialog' as const,
      header: 'Create portfolio items',
      onClose: () => {
        setDialogOpen(false);
        setResult(null);
      },
      content: (
        <div style={{ padding: 16 }}>
          {result === null ? (
            <>
              <p style={{ marginBottom: 16 }}>
                This will create <strong>{count}</strong> portfolio item{count === 1 ? '' : 's'} (one per image).
                You can edit their titles and descriptions afterward.
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={run}
                  disabled={busy}
                  style={{
                    padding: '8px 16px',
                    background: busy ? '#666' : '#e03e2d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: busy ? 'not-allowed' : 'pointer',
                  }}
                >
                  {busy ? 'Creating…' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => setDialogOpen(false)}
                  disabled={busy}
                  style={{
                    padding: '8px 16px',
                    background: '#333',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: busy ? 'not-allowed' : 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : result.error ? (
            <p style={{ color: '#c53030' }}>Error: {result.error}</p>
          ) : (
            <p style={{ color: '#2f855a' }}>
              Created {result.created} portfolio item{result.created === 1 ? '' : 's'}.
            </p>
          )}
        </div>
      ),
    },
  };
};
