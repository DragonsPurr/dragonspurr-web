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
