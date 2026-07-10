-- Ranking visível após a prova (janela 7h–22h), não no dia seguinte

UPDATE public.exams
SET ranking_release = 'after_window'
WHERE ranking_release = 'next_day';
