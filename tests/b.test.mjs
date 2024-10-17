'use strict';

import b from '../src/b.mjs';

test('Test retrieving inner html content.', () => {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
    <div>
      <span class="test-span">Hello</span>
      <span class="test-span">Hello</span>
      <span class="test-span">Hello</span>
    </div>
    `;

    const span = b('test-span');

    expect(span.getHtml()).toBe('Hello');
  });
});

test('Test forEach for multiple tags', () => {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
    <div>
      <span id="foo" class="test-span">Hello</span>
      <span class="test-span">Hello</span>
      <span class="test-span">Hello</span>
    </div>
    `;

    const spans = b('test-span');
    spans.forEach((v) => {
      expect(v.getHtml()).toBe('Hello');
    });
    spans.forEach((v, i, arr) => {
      expect(v.getHtml()).toBe(arr[i]);
      expect(v).toBe(arr[i]);
      expect(v.getHtml()).toBe(arr[i].getHtml());
    });
  });
});

test('Test forEach for single tag', () => {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
    <div>
      <span id="foo" class="test-span">Hello</span>
      <span class="test-span">Hello</span>
      <span class="test-span">Hello</span>
    </div>
    `;

    const span = b('foo');
    let value = span.forEach((v) => {
      expect(v.getHtml()).toBe('Hello');
    });
    value = span.forEach((v, i, arr) => {
      expect(v.getHtml()).toBe('Hello');
      expect(v).toBe(arr[i]);
      expect(v.getHtml()).toBe(arr[i].getHtml());
    });
    expect(Array.isArray(value)).not.toBe(true);
  });
});
