# Importar prova oficial (USP / ENARE / similares)

## O que fazer

1. Admin → **Importar prova**
2. Escolha uma entrada:
   - **PDF** (upload)
   - **Link** direto do PDF/página oficial
   - **Template** TXT ou JSON (baixe, preencha, cole)
3. Clique **Extrair e montar questões** (PDF/link)
4. Revise o preview → marque a confirmação de fonte pública → **Enviar para revisão**
5. Aprove em **Questões → Revisão**

## Limites

- PDF precisa ter **texto selecionável**. Scan/imagem → use OCR e o template TXT.
- Nada publica sozinho (`pending_review`).
- Prefira provas **2024+** e fontes públicas permitidas.

## Arquivos

- UI: `src/app/admin/importar/prova/page.tsx`
- Extração: `src/app/api/admin/question-imports/extract/route.ts`
- Templates: `public/templates/MEDRANK_PROVA_OFICIAL_MODELO.{txt,json}`
