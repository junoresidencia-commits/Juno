-- Ranking e gabarito: liberar só depois que todos terminarem (ou após a janela).
UPDATE public.exams
SET ranking_release = 'after_all_done'
WHERE COALESCE(exam_kind, 'daily') IN ('daily', 'weekly_expert')
  AND ranking_release IS DISTINCT FROM 'after_all_done';
