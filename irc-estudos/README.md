# Meu Rim · Estudos IRC

Plataforma para **vários trabalhos de pesquisa** na região IRC, começando pela epidemiologia de doença renal crônica (DRC).

## O que faz

- Criar múltiplos **trabalhos/estudos** (não só um)
- Cadastrar paciente com **nome, idade, sexo, creatinina, doença de base e estatina**
- Calcular automaticamente a **TFG pela CKD-EPI 2021** (sem raça) e o estágio G1–G5
- Ver **prevalência de DRC**, distribuição por estágio, doença de base e faixa etária
- **Exportar CSV** do estudo e **backup JSON** de tudo (para daqui a meses ou outro computador)

## Início rápido

```bash
cd irc-estudos
npm install
npm run dev
```

Abra o endereço indicado no terminal (geralmente http://localhost:5173).

## Fluxo sugerido

1. Abra o trabalho demo **Prevalência de DRC na região IRC** (ou crie outro em **Novo trabalho**)
2. Cadastre pacientes — a TFG aparece na hora
3. Acompanhe o painel (prevalência, estágios, diabetes/HAS, estatina)
4. Em 6 meses (ou quando quiser), use **Exportar CSV** / **Backup**

## Persistência

Os dados ficam no **navegador** (`localStorage`). Em região com internet instável isso ajuda no dia a dia — mas faça **Backup** com frequência e guarde o arquivo JSON em local seguro.

## Aviso

Ferramenta de apoio à pesquisa. Não substitui consulta, diagnóstico ou conduta clínica.
