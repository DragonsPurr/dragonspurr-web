import '@testing-library/jest-dom';
import React from 'react';

jest.mock('@portabletext/react', () => ({
  PortableText: ({ value }: { value: Array<{ children?: Array<{ text?: string }> }> }) => {
    const text = (value || [])
      .flatMap((block) => (block.children || []).map((c) => c.text ?? ''))
      .join('');
    return React.createElement('span', null, text);
  },
}));

// EmailJS env for Contact form tests (set before any modules load)
process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'test-service';
process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'test-template';
process.env.NEXT_PUBLIC_EMAILJS_USER_ID =
  process.env.NEXT_PUBLIC_EMAILJS_USER_ID || 'test-user';
