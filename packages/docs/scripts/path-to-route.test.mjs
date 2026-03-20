import assert from 'node:assert/strict';
import test from 'node:test';

import { markdownRelPathToRouteId } from './path-to-route.mjs';

test('guide/getting-started.md -> guide.getting-started', () => {
  assert.equal(markdownRelPathToRouteId('guide/getting-started.md'), 'guide.getting-started');
});

test('guide/components/box.md -> guide.components.box', () => {
  assert.equal(markdownRelPathToRouteId('guide/components/box.md'), 'guide.components.box');
});
