import { expect, test } from '@playwright/test';
import { newest, PROJECTS_SHOWN } from '../src/data/newest';

// Pure logic, no browser needed. Runs once (phone project only).
test.beforeEach(({}, info) => test.skip(info.project.name !== 'phone', 'Runs once'));

const p = (title: string, completed: string) => ({ data: { title, completed: new Date(completed) } });

test('shows at most six projects', () => {
  const items = Array.from({ length: 9 }, (_, i) => p(`Job ${i}`, `2026-0${i + 1}-01`));
  expect(newest(items)).toHaveLength(PROJECTS_SHOWN);
});

test('newest first', () => {
  const items = [p('Old', '2025-01-10'), p('New', '2026-05-01'), p('Middle', '2025-09-30')];
  expect(newest(items).map(i => i.data.title)).toEqual(['New', 'Middle', 'Old']);
});

test('keeps the six newest, drops the oldest', () => {
  const items = Array.from({ length: 8 }, (_, i) => p(`Job ${i}`, `2026-0${i + 1}-01`));
  const titles = newest(items).map(i => i.data.title);
  expect(titles).not.toContain('Job 0');
  expect(titles).not.toContain('Job 1');
  expect(titles[0]).toBe('Job 7');
});

test('no projects gives an empty list', () => {
  expect(newest([])).toEqual([]);
});

test('does not change the original list', () => {
  const items = [p('A', '2025-01-01'), p('B', '2026-01-01')];
  newest(items);
  expect(items.map(i => i.data.title)).toEqual(['A', 'B']);
});
