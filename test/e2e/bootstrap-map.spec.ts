import { expect, test } from '@playwright/test';

test('published bootstrap map loads and tracks one happy path', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Project Bootstrap Meta' })).toBeVisible();
  await expect(page.getByRole('link', { name: /star the repository/i })).toHaveAttribute(
    'href',
    'https://github.com/baditaflorin/project-bootstrap-meta'
  );
  await expect(page.getByRole('link', { name: /support the work/i })).toHaveAttribute(
    'href',
    'https://www.paypal.com/paypalme/florinbadita'
  );
  await expect(page.getByText('Version', { exact: true })).toBeVisible();
  await expect(page.getByText('Commit', { exact: true })).toBeVisible();

  await page.getByRole('button', { name: /project name is kebab-case/i }).click();
  await expect(page.getByText('1/27 checks')).toBeVisible();

  expect(errors).toEqual([]);
});
