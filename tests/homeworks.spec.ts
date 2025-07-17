import { test, expect } from '@playwright/test';

test('TEST_Création_devoir_Enseignant', async ({ page }) => {
  await page.goto('http://localhost:8080/teacher/accueil');
  await page.locator('div').filter({ hasText: /^Devoirs$/ }).click();
  await page.getByRole('link', { name: 'Ajouter un devoir >' }).click();
  await page.getByRole('combobox').selectOption('classe a');
  await page.locator('input[type="date"]').fill('2025-07-25');
  await page.getByRole('textbox', { name: 'consigne ici' }).click();
  await page.getByRole('textbox', { name: 'consigne ici' }).fill('Lire text 1 et 2 page 10');
  await page.getByRole('button', { name: 'Valider' }).click();
  await page.getByRole('link', { name: 'Devoirs' }).click();  
  await expect(page.locator('div').filter({ hasText: /^classe aModifierSupprimerPour le 25-07-2025 : Lire text 1 et 2 page 10$/ }).first()).toBeVisible();

});

test('TEST_Modification_devoir_Enseignant', async ({ page }) => {
  await page.goto('http://localhost:8080/teacher/accueil');
  await page.locator('div').filter({ hasText: /^Devoirs$/ }).click();
  await page.getByRole('button', { name: 'Modifier' }).click();
  await page.getByRole('textbox', { name: 'consigne ici' }).click();
  await page.getByRole('textbox', { name: 'consigne ici' }).fill('Lire text 1 et 2 page 15');
  await page.getByRole('button', { name: 'Modifier' }).click();
  await expect(page.locator('div').filter({ hasText: /^classe aModifierSupprimerPour le 25-07-2025 : Lire text 1 et 2 page 15$/ }).first()).toBeVisible();
});


test('TEST_Consultation_des_devoirs_eleve', async ({ page }) => {
  await page.goto('http://localhost:8080/student/accueil');
  await page.locator('div').filter({ hasText: /^Devoirs$/ }).click();
  await expect(page.getByText('Devoirs à faire : 5Toutes les')).toBeVisible();
  await expect(page.getByText('Pour le 25-07-2025français')).toBeVisible();
  await expect(page.getByRole('paragraph').filter({ hasText: 'Lire text 1 et 2 page' })).toBeVisible();
});


test('TEST_Suppression_devoir_Enseignant', async ({ page }) => {
  await page.locator('div').filter({ hasText: /^Devoirs$/ }).click();
  await page.getByRole('button', { name: 'Supprimer' }).click();
});