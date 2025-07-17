import { test, expect } from '@playwright/test';

test('TEST_Création_quiz_Enseignant', async ({ page }) => {
  await page.goto('http://localhost:8080/teacher/accueil');
  await page.locator('div').filter({ hasText: /^Quiz$/ }).click();
  await page.getByRole('link', { name: 'Ajouter un quiz >' }).click();
  await page.getByRole('textbox', { name: 'Titre du quiz' }).click();
  await page.getByRole('textbox', { name: 'Titre du quiz' }).fill('Orthographe #1');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('Quiz d\'orthographe numéro 1');
  await page.getByRole('combobox').selectOption('classe a');
  await page.getByRole('combobox').selectOption('classe b');
  await page.getByRole('textbox', { name: 'Question' }).click();
  await page.getByRole('textbox', { name: 'Question' }).fill('Quelle phrase contient une faute d\'orthographe ?');
  await page.getByRole('textbox', { name: 'Réponse 1' }).click();
  await page.getByRole('textbox', { name: 'Réponse 1' }).fill('Elle a trouvé un trésor.');
  await page.getByRole('textbox', { name: 'Réponse 2' }).click();
  await page.getByRole('textbox', { name: 'Réponse 2' }).fill('Il sont partis en voyage.');
  await page.getByRole('textbox', { name: 'Réponse 3' }).click();
  await page.getByRole('textbox', { name: 'Réponse 3' }).fill('Nous avons mangé des fruits.');
  await page.getByRole('textbox', { name: 'Réponse 4' }).click();
  await page.getByRole('textbox', { name: 'Réponse 4' }).fill('Tu écris très bien.');
  await page.getByRole('checkbox').nth(1).check();
  await page.getByRole('button', { name: 'Ajouter la question >' }).click();
  await page.getByRole('textbox', { name: 'Question' }).click();
  await page.getByRole('textbox', { name: 'Question' }).fill('Comment écrit-on correctement le mot au pluriel ?');
  await page.getByRole('textbox', { name: 'Réponse 1' }).click();
  await page.getByRole('textbox', { name: 'Réponse 1' }).fill('Chevals');
  await page.getByRole('textbox', { name: 'Réponse 2' }).click();
  await page.getByRole('textbox', { name: 'Réponse 2' }).fill('Chevaux');
  await page.getByRole('textbox', { name: 'Réponse 3' }).click();
  await page.getByRole('textbox', { name: 'Réponse 3' }).fill('Chevaus');
  await page.getByRole('textbox', { name: 'Réponse 4' }).dblclick();
  await page.getByRole('textbox', { name: 'Réponse 4' }).fill('Chevale');
  await page.getByRole('checkbox').nth(1).check();
  await page.getByRole('button', { name: 'Ajouter la question >' }).click();
  await page.getByRole('button', { name: 'Valider la création du quiz >' }).click();
  await expect(page.getByText('Orthographe #')).toBeVisible();
  await expect(page.getByText('Pour :classe a - classe b -')).toBeVisible();
});



test('TEST_Modification_quiz_Enseignant', async ({ page }) => {
  await page.goto('http://localhost:8080/teacher/accueil');
  await page.locator('div').filter({ hasText: /^Quiz$/ }).click();
  await page.getByRole('button', { name: 'Modifier' }).click();
  await page.getByRole('textbox', { name: 'Titre du quiz' }).click();
  await page.getByRole('textbox', { name: 'Titre du quiz' }).fill('Quiz Orthographe #1');
  await page.getByRole('button', { name: 'Modifier le quiz >' }).click();
  await expect(page.getByText('Quiz Orthographe #')).toBeVisible();
});



test('TEST_Réalisation_quiz_eleve', async ({ page }) => {
  await page.goto('http://localhost:8080/student/accueil');
  await page.locator('div').filter({ hasText: /^Quiz$/ }).click();
  await page.getByText('Quiz Orthographe #').click();
  await page.getByRole('heading', { name: 'Titre : Quiz Orthographe #' }).click();
  await expect(page.getByRole('heading', { name: 'Titre : Quiz Orthographe #' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Matière : français' })).toBeVisible();
  await expect(page.getByText('Date d\'ajout:16-07-')).toBeVisible();
  await expect(page.getByText('Publié par:BERNARD Sophie')).toBeVisible();
  await expect(page.getByText('Description:Quiz d\'')).toBeVisible();
  await page.getByRole('button', { name: 'Lancer le quiz' }).click();
  await page.locator('div').filter({ hasText: /^Il sont partis en voyage\.$/ }).click();
  await page.getByRole('button', { name: 'Valider' }).click();
  await page.getByRole('button', { name: 'Question suivante' }).click();
  await page.locator('div').filter({ hasText: /^Chevaux$/ }).click();
  await page.getByRole('button', { name: 'Valider' }).click();
  await page.getByRole('button', { name: 'Question suivante' }).click();
  await expect(page.getByText('🎉 Quiz terminé !Quiz effectu')).toBeVisible();
  await expect(page.getByText('Score : 2 /')).toBeVisible();
});

test('TEST_Suppression_quiz_Enseignant', async ({ page }) => {
  await page.locator('div').filter({ hasText: /^Quiz$/ }).click();
  await page.getByRole('button', { name: 'Supprimer' }).click();
});