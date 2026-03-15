'use client';

import { useState, useEffect, useCallback } from 'react';
import { commonClasses } from '@/app/lib/constants';
import Image from 'next/image';

const PHOTOS_PER_PAGE = 18;

interface PortfolioPhoto {
  id: string;
  title: string;
  description: string;
  url: string | null;
  urlMedium: string | null;
  urlLarge: string | null;
  urlModal: string | null;
}

interface PortfolioData {
  photos: PortfolioPhoto[];
  page: number;
  pages: number;
  total: number;
}

export default function Portfolio() {
  const [data, setData] = useState<PortfolioData>({ photos: [], page: 1, pages: 0, total: 0 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalPhoto, setModalPhoto] = useState<PortfolioPhoto | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/portfolio?page=${page}`)
      .then((res) => {
        if (!res.ok) return res.json().then((body: { error?: string }) => Promise.reject(new Error(body.error || res.statusText)));
        return res.json();
      })
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  const closeModal = useCallback(() => setModalPhoto(null), []);

  useEffect(() => {
    if (!modalPhoto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalPhoto, closeModal]);

  const hasPrev = page > 1;
  const hasNext = page < data.pages;

  const cellClass =
    'block w-full min-w-0 aspect-square overflow-hidden rounded-lg bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black cursor-pointer';

  return (
    <div className="container mx-auto">
      <div className={commonClasses.pageHeader}>
        <strong>Portfolio</strong>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-900/50 border border-red-700 px-4 py-3 text-red-200" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 min-h-[300px] place-items-center">
          {Array.from({ length: PHOTOS_PER_PAGE }).map((_, i) => (
            <div
              key={i}
              className="w-full aspect-square max-w-sm rounded-lg bg-gray-800/60 animate-pulse"
              aria-hidden
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 min-w-0">
          {data.photos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setModalPhoto(photo)}
              className={`${cellClass} p-0 border-0 text-left`}
              aria-label={photo.title ? `View ${photo.title}` : 'View portfolio image'}
            >
              <Image
                src={photo.urlMedium ?? ''}
                alt={photo.title || 'Portfolio image'}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
                width={500}
                height={500}
              />
            </button>
          ))}
        </div>
      )}

      {!loading && !error && data.pages > 1 && (
        <nav
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
          aria-label="Portfolio pagination"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!hasPrev}
            className={commonClasses.formButton}
            aria-label="Previous page"
          >
            Previous
          </button>
          <span className="font-cormorant_garamond text-xl text-white">
            Page {data.page} of {data.pages}
            {data.total > 0 && ` (${data.total} photos)`}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
            disabled={!hasNext}
            className={commonClasses.formButton}
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      )}

      {modalPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white hover:text-red-500 text-2xl font-bold z-10"
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="relative flex-1 min-h-0 rounded-lg overflow-hidden bg-gray-900">
              <Image
                src={modalPhoto.urlModal ?? modalPhoto.urlLarge ?? modalPhoto.urlMedium ?? ''}
                alt={modalPhoto.title || 'Portfolio image'}
                className="w-full h-auto max-h-[70vh] object-contain"
                width={1200}
                height={800}
              />
            </div>
            <div className="mt-4 px-2 text-white">
              {modalPhoto.title && (
                <h2 id="modal-title" className="font-cinzel_decorative text-xl text-red-600 mb-1">
                  {modalPhoto.title}
                </h2>
              )}
              {modalPhoto.description && (
                <p id="modal-description" className="font-cormorant_garamond text-lg text-gray-200">
                  {modalPhoto.description}
                </p>
              )}
              {modalPhoto.url && (
                <a
                  href={modalPhoto.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block font-cinzel text-red-600 hover:text-red-500"
                >
                  View project →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
