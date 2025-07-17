import { test, expect } from '@playwright/test';


test('TEST_Notation_examen_Enseignant', async ({ page }) => {
  await page.goto('http://localhost:8080/teacher/accueil');
  await page.locator('div').filter({ hasText: /^Notes$/ }).click();
  await page.getByRole('link', { name: 'Ajouter des notes >' }).click();
  await page.getByRole('textbox', { name: 'Titre de l\'examen' }).click();
  await page.getByRole('textbox', { name: 'Titre de l\'examen' }).fill('examen orthographe #1');
  await page.getByRole('combobox').selectOption('classe a');
  await page.getByRole('combobox').selectOption('classe a');
  await page.getByRole('combobox').selectOption('classe a');
  await page.getByRole('combobox').selectOption('classe a');
  await page.getByRole('combobox').selectOption('classe a');
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('10');
  await page.getByRole('row', { name: 'Ath Mahen' }).getByRole('combobox').selectOption('7');
  await page.getByRole('row', { name: 'Martin Leo' }).getByRole('combobox').selectOption('7');
  await page.getByRole('row', { name: 'Dubois Clara' }).getByRole('combobox').selectOption('9');
  await page.getByRole('row', { name: 'Petit Noah' }).getByRole('combobox').selectOption('9');
  await page.getByRole('row', { name: 'Roux Lina' }).getByRole('combobox').selectOption('7');
  await page.getByRole('button', { name: 'Valider' }).click();
  await page.getByRole('link', { name: 'Notes' }).click();
  await expect(page.getByText('Titre : examen orthographe #1')).toBeVisible();
  await page.getByText('Classe : classe a').click();
  await page.getByRole('cell', { name: 'Moyenne générale' }).click();
  await page.getByRole('cell', { name: '7.8' }).click();
  await page.getByRole('cell', { name: 'Ath' }).click();
  await page.getByRole('cell', { name: 'Mahen' }).click();
  await page.getByRole('cell', { name: '7' }).first().click();
  await expect(page.getByText('Classe : classe a')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Moyenne générale' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '7.8' })).toBeVisible();
});


test('TEST_Modification_note_Enseignant', async ({ page }) => {
  await page.goto('http://localhost:8080/teacher/accueil');
  await page.locator('div').filter({ hasText: /^Notes$/ }).click();
  await page.getByRole('button', { name: 'Modifier' }).click();
  await page.getByRole('row', { name: 'Petit Noah' }).getByRole('combobox').selectOption('5');
  await page.getByRole('button', { name: 'Modifier' }).click();
  await page.getByRole('link', { name: 'Notes' }).click();
  await expect(page.getByRole('cell', { name: 'Petit' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Noah' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '5' })).toBeVisible();
});

test('TEST_Modification_examen_Enseignant', async ({ page }) => {
  await page.goto('http://localhost:8080/teacher/accueil');
  await page.locator('div').filter({ hasText: /^Notes$/ }).click();
  await page.getByRole('button', { name: 'Modifier' }).click();
  await page.getByRole('textbox', { name: 'Titre de l\'examen' }).click();
  await page.getByRole('textbox', { name: 'Titre de l\'examen' }).fill('examen orthographe numéro 1');
  await page.getByRole('button', { name: 'Modifier' }).click();
  await expect(page.getByText('Titre : examen orthographe numéro 1 ---Classe : classe aModifierSupprimer')).toBeVisible();
});

test('TEST_Affichage_des_notes_eleve', async ({ page }) => {
  await page.goto('http://localhost:8080/student/accueil');
  await page.locator('div').filter({ hasText: /^Notes$/ }).click();
  await expect(page.getByText('Moyenne générale : 16.5/')).toBeVisible();
  await expect(page.locator('span').filter({ hasText: 'français' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Date d\'ajout' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '16-07-' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Titre' }).nth(2)).toBeVisible();
  await expect(page.getByRole('main')).toContainText('examen orthographe numéro 1');
  await expect(page.getByRole('cell', { name: 'Note' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '7/' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Moyenne générale' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '14/' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: 'anglais' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '19/' })).toBeVisible();
});

test('TEST_Suppression_des_notes_examen_Enseignant', async ({ page }) => {
  await page.locator('div').filter({ hasText: /^Notes$/ }).click();
  await page.getByRole('button', { name: 'Supprimer' }).click();
});