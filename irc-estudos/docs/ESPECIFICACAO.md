# Especificação — Meu Rim · Estudos IRC

## Problema

Na região IRC há demanda por trabalhos de pesquisa em saúde (começar por doença renal) e poucas ferramentas locais para coletar, calcular e acompanhar dados ao longo do tempo.

## Solução

Plataforma **multi-trabalho**: cada estudo é independente. O modelo inicial cobre epidemiologia de DRC; novos trabalhos podem ser abertos sem refazer o sistema.

## Dados do paciente (modelo DRC)

| Campo | Uso |
|-------|-----|
| Nome | Identificação no estudo |
| Idade | Entrada da CKD-EPI e estratificação |
| Sexo | Entrada da CKD-EPI |
| Creatinina (mg/dL) | Entrada da CKD-EPI |
| Doença de base | Diabetes, HAS, ambas, glomerulopatia, etc. |
| Estatina | Sim/não |
| Observações | Texto livre |

**Calculados automaticamente:** TFG (CKD-EPI 2021, sem raça), estágio G1–G5, flag DRC (TFG &lt; 60).

## Relatórios

- Contagem de pacientes
- Prevalência de DRC
- Distribuição por estágio e por doença de base
- DRC por faixa etária
- Taxa de uso de estatina
- Exportação CSV e backup JSON

## Persistência (fase atual)

Armazenamento no navegador + backup/restauração. Próximo passo natural: backend compartilhado (ex.: Supabase) quando houver servidor/credenciais.

## Extensão

Novos trabalhos na IRC reutilizam a mesma ficha ou evoluem com campos extras por template (`ckd_epidemiology` | `general` hoje).
