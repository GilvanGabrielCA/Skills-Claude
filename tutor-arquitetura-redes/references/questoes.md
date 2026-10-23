# Como montar questões (do nível 1 ao 5)

Os níveis seguem a lógica da taxonomia de Bloom: primeiro lembrar, por último projetar. Cada nível exige o anterior.

| Nível | Nome | O que testa | Formato típico |
|---|---|---|---|
| **N1** | Lembrar | Definição, sigla, qual camada, qual faixa | Múltipla escolha, completar a lacuna, certo/errado |
| **N2** | Entender | Explicar com as próprias palavras, comparar dois conceitos | "Qual a diferença entre...", "Por que..." |
| **N3** | Aplicar | Usar o conceito numa conta ou situação concreta | Converter binário, calcular tempo de transferência, escolher o cabo certo |
| **N4** | Analisar | Diagnosticar, achar o erro, ligar causa e efeito | "O usuário relata X. Qual a causa provável e como confirmar?" |
| **N5** | Avaliar e projetar | Decidir com trade-off, desenhar solução, criticar uma afirmação | "Monte a rede do escritório X com orçamento Y e justifique" |

## Regras

- **Padrão de um bloco:** 5 questões, uma de cada nível (N1 a N5), sobre a aula ou a seção pedida. Se ele pedir um nível só, faça 5 daquele nível.
- **Entregar sem gabarito.** Esperar a resposta dele. Depois corrigir uma por uma: certo/errado, por quê, e o que faltou. Nunca dar o gabarito antes de ele tentar, a não ser que peça.
- **Aceitar resposta com palavras dele.** Na correção, avaliar se o conceito está certo, não se bateu com a frase do livro.
- **Adaptar no bloco seguinte** (o bloco atual fica com as 5 questões entregues): se ele acertou N1 a N3 e errou N4 ou N5, o próximo bloco tem mais questões N4/N5. Se errou N1 ou N2, o próximo bloco volta a ter mais questões desses níveis, de outro ângulo, antes de subir.
- **Pelo menos uma questão com cenário do trabalho dele** (empresa dele, suporte, usuários, VPN, Wi-Fi do escritório, relógio de ponto offline, RDP...) nos níveis N3 a N5.
- **Estilo concurso:** o curso é preparatório para concurso, então inclua às vezes um item "certo ou errado" no estilo Cebraspe, de preferência uma pegadinha clássica do assunto.
- **Estilo certificação:** quando o assunto for cobrado no Network+ ou no CCNA, avisar ("isso cai no Network+") e fazer uma questão no estilo da prova (cenário curto, 4 alternativas, uma claramente melhor).
- **Errou → registrar** em `estado/revisao.md` (caixa 1), com a pergunta e a resposta certa em uma linha.
- **Não inventar dado técnico** (velocidade de padrão, distância de cabo, frequência). Se não tiver certeza do número, não use o número na questão.

## Exemplos (assunto: aula 5, "O que são redes?")

- **N1:** Em uma rede, o que significa dizer que existe um *trade-off* entre segurança e desempenho?
- **N2:** Explique com suas palavras por que não dá para ter, ao mesmo tempo e sem custo nenhum, a rede mais segura, mais confiável e com menor atraso.
- **N3:** A empresa quer colocar criptografia em todo o tráfego interno. Cite um ganho e uma perda que isso traz.
- **N4:** Depois de ativarem a inspeção de tráfego no firewall, os usuários reclamam que o sistema ficou lento. Que trade-off está acontecendo e como você confirmaria?
- **N5:** Você tem orçamento para só uma melhoria: link de internet redundante ou firewall novo. Qual escolhe para uma fábrica que para se a internet cair? Justifique pelo trade-off.

## Exportar para o Anki

Quando ele aceitar a oferta (não gerar arquivo sem ele pedir), criar `estado/anki/secao-NN-AAAA-MM-DD.csv`. Se o arquivo já existir, **não sobrescrever**: usar o sufixo `-2`, `-3`...
- Primeira linha `#separator:Semicolon` e segunda `#html:true` (o Anki lê esses cabeçalhos e já configura a importação).
- Depois, uma linha por cartão: `frente;verso`. Se o texto tiver `;` ou aspas, colocar o campo entre aspas e dobrar as aspas internas (`""`).
- **Nunca quebrar linha dentro do campo**: quebra de linha cria um cartão quebrado. Para duas linhas no verso, use `<br>`.
- Uma ideia por cartão. Frente em forma de pergunta. Verso com no máximo 2 linhas.
- Na primeira exportação, ensinar a importar: Anki → Arquivo → Importar → escolher o CSV → conferir tipo de nota "Básico" e o baralho → Importar. Depois, marcar `anki_ensinado: sim` em `estado/progresso.md` para não repetir a explicação.
