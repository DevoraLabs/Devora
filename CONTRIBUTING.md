# Contributing Guide

## Ветки

- `main` - ветка для релизов, мержим в неё через Pull Request из `dev`, когда готовы к релизу.
- `dev` - основная ветка для разработки, сюда попадают все изменения через Pull Request.
- `feature/<название-фичи>` - ветка для разработки новых фич.
- `fix/<название-бага>` - ветка для исправления багов.

## Как начать работу над задачей

1. Перейти на актуальный `dev`:
    ```bash
   git checkout dev
   git pull origin dev
    
2. Создать новую ветку от dev:
    ```bash
    git checkout -b feature/<название-фичи>
    или
    git checkout -b fix/<название-бага>
    
3. Сделать изменения, закоммитить:
    ```bash
    git add .
    git commit -m "Краткое описание изменений"
    git push -u origin feature/<название-фичи>
    или
    git push -u origin fix/<название-бага>
    
4. Создать Pull Request из своей ветки (feature/<номер-issue> или fix/<номер-issue>) в dev.
  
5. Если случайно начали вносить изменения прямо в main или dev:
    Сохраняем изменения:
    ```bash
    git stash -u
    ```
    
    Переходим в нужную ветку (например, feature/<номер-issue>):
    ```bash
    git checkout feature/<название-фичи>
    ```
    
    Возвращаем сохранённые изменения:
    ```bash
    git stash pop
    ```

## Стиль коммитов
<тип>: <краткое описание>

Примеры:
```text
feat: add startup search by technologies
fix: update user profile design
