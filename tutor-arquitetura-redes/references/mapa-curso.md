# Mapa do curso "Arquitetura de Redes" (Gabriel Torres, Udemy)

- URL: https://www.udemy.com/course/redes-modulo-1/learn/
- Course ID (API): **907618**
- 19 seções, 226 aulas, ~27,5 h. Nível iniciante. Última atualização vista: outubro/2026.
- Formato das linhas: `nº | título | minutos | lecture id` (o id serve para puxar a legenda, ver `transcricoes.md`).
- `[sem legenda]` = a aula não tem legenda na Udemy; não dá para conferir o que foi dito. Explicar pelo conhecimento geral e avisar.

## Panorama de cobertura (levantado das transcrições em 22/10/2026)

**Fortes:** transmissão de dados (multiplexação, codificação, modulação, checksum/CRC), Wi-Fi (faixas e padrões 802.11 até Wi-Fi 7), celular (1G a 5G), equipamentos, OSI/TCP-IP conceitual, segurança conceitual.

**O curso NÃO ensina (ou só cita de passagem):** máscara/sub-rede/CIDR, IPv6 em detalhe, VLAN na prática, STP, ARP, ICMP, NAT, ACL, roteamento (estático, OSPF, BGP), DHCP e DNS em profundidade, comandos de diagnóstico (ping/traceroute/ipconfig/nslookup), qualquer laboratório (Packet Tracer/Wireshark). A aula "Camada 3 - Rede" tem só ~8 min.
Quando a dúvida cair nesses temas: explicar, mas marcar como **"além do curso"** e ligar à fase de Packet Tracer.

**Legendas de qualidade média:** são transcrições com erros ("Switch L3 Inglesa", "virtual louco Network" = virtual LAN). Ao citar a aula, corrigir o termo, nunca repetir o erro.

## Seção 1: Introdução ao curso
1 | Seja bem-vindo! | 1 | 6509884
2 | Material de apoio | 4 | 15093240
3 | Sobre a avaliação do curso | 1 | 18674370
4 | Sobre a seção "Perguntas e Respostas" | 12 | 18675126

## Seção 2: Introdução a redes
5 | O que são redes? | 5 | 6544876  ← cita "trade-off" (segurança × confiabilidade × atraso × custo)
6 | Classificações de redes quanto à abrangência | 14 | 6545038
7 | Internet | 11 | 24678330
8 | Intranet e extranet | 7 | 6545042
9 | Deep web e dark web | 10 | 27109434
10 | Questões de concurso - parte 1 | 8 | 10478378 [sem legenda]
11 | Questões de concurso - parte 2 | 11 | 10478448
Teste da seção

## Seção 3: Números binários  [sem legenda, exceto a aula 28]
12 | Números binários | 2 | 55311783
13 | O sistema digital | 8 | 6568410
14 | Bases numéricas | 11 | 6573970
15 | Zeros à esquerda | 6 | 20386205
16 | Overflow | 5 | 21280364
17 | Conversão de binário para decimal | 7 | 9271278
18 | Conversão de decimal para binário | 9 | 9271294
19 | Conversão de binário para hexadecimal | 9 | 9334640
20 | Conversão de hexadecimal para binário | 7 | 9342130
21 | Conversão de hexadecimal para decimal | 5 | 9357072
22 | Conversão de decimal para hexadecimal | 7 | 9366434
23 | Ordenação de bits | 4 | 9472300
24 | Palavras binárias | 7 | 6573978
25 | Ordenação de bytes | 9 | 9509544
26 | Ordens de grandeza: base 10 | 14 | 55245185
27 | Ordens de grandeza: base 2 - parte 1 | 5 | 55245187
28 | Ordens de grandeza - base 2 - parte 2 | 14 | 55261949  ← única da seção COM legenda
29 | Norma IEC 80000-13:2008 - parte 1 | 10 | 55245195
30 | Norma IEC 80000-13:2008 - parte 2 | 7 | 55293409
31 | Uso correto das ordens de grandeza | 8 | 55293659
32 | Cálculos na base 10 | 6 | 55312021
33 | Cálculos na base 2 | 6 | 55312027
34 | Cálculos entre bases | 12 | 55312031
35 | Conversão de bits e bytes | 10 | 55313667
36 | Exemplos práticos de uso de binário | 8 | 9612302
37 | Questões de concurso - parte 1 | 11 | 9388198
38 | Questões de concurso - parte 2 | 10 | 9388202
39 | Questões de concurso - parte 3 | 8 | 55196401
40 | Questões de concurso problemáticas - parte 1 | 7 | 55197289
41 | Questões de concurso problemáticas - parte 2 | 10 | 55197291
Teste da seção
> Base do subnetting (que o curso não ensina). Aqui vale exercício à mão todo dia.

## Seção 4: Transmissão de dados
42 | Modos de transmissão: simplex e half-duplex | 7 | 6588892
43 | Modos de transmissão: full-duplex | 8 | 34503208
44 | Meio e canal | 4 | 6589634
45 | Conexão ponto a ponto | 6 | 6590414
46 | Barramento | 7 | 20028778
47 | Controle de acesso ao meio: contenção | 7 | 6629512
48 | Controle de acesso ao meio: passagem de ficha e varredura | 5 | 21074436
49 | Métodos de transmissão | 11 | 6620224
50 | Multiplexação por divisão espacial (SDM) | 10 | 37519330
51 | Multiplexação por divisão de frequência (FDM e OFDM) | 3 | 37519176
52 | Multiplexação por divisão de tempo (TDM) | 4 | 37519174
53 | Multiplexação por divisão de código (CDM) | 3 | 37516840
54 | Multiplexação por comprimento de onda (WDM) | 3 | 37516822
55 | Multiplexação: resumo | 3 | 37516808
56 | Sincronia | 6 | 6605380
57 | Codificação | 9 | 6614906
58 | Modulação | 11 | 6617626
59 | Pacotes de dados | 5 | 6620332
60 | Tipos de mensagem | 6 | 19991260
61 | Confirmação de entrega de dados | 8 | 6621512
62 | Conexão | 6 | 21096598
63 | Detecção de erros | 8 | 6621530
64 | Exemplo de cálculo do checksum | 10 | 9071866
65 | Exemplo de cálculo do CRC | 9 | 18658088
66 | Correção de erros | 5 | 27111166
67 | Previsibilidade de funcionamento | 3 | 6622176
68 | Comutação de pacotes | 6 | 6622180
69 | Comutação de circuito | 9 | 21179920
70 | Questões de concurso - parte 1 | 13 | 10618808
71 | Questões de concurso - parte 2 | 11 | 10625932
72 | Questões de concurso - parte 3 | 10 | 10488180
Teste da seção

## Seção 5: Desempenho
73 | Taxa de transferência | 7 | 6635812
74 | Largura de banda: telecomunicações | 4 | 21600924
75 | Largura de banda: redes | 3 | 6653982
76 | Fatores que influenciam a taxa de transferência | 12 | 6654106
77 | Latência | 1 | 6654548
78 | Melhor esforço | 7 | 21137792
79 | Qualidade de serviço (QoS) | 4 | 6654578
80 | Questões de concurso - parte 1 | 9 | 58239937
81 | Questões de concurso - parte 2 | 8 | 58239939
Teste da seção

## Seção 6: Modelos computacionais
82 | Computação centralizada e serviço de terminal | 5 | 6552314
83 | Computação distribuída: redes cliente-servidor - parte 1 | 13 | 6552504
84 | Computação distribuída: redes cliente-servidor - parte 2 | 4 | 26255762
85 | Computação distribuída: redes ponto a ponto (P2P) | 11 | 6552514
86 | Computação distribuída: redes front-end/back-end | 2 | 6553770
87 | Computação distribuída: computação em nuvem | 9 | 6553850
88 | Computação cooperativa (paralelismo): cluster e grade | 4 | 6553866
89 | Questões de concurso - parte 1 | 11 | 58239943  [sem legenda]
90 | Questões de concurso - parte 2 | 7 | 58239945
Teste da seção

## Seção 7: Cache
91 | Cache | 3 | 24743364
92 | Arquivos temporários da Internet | 3 | 58239921
93 | Servidor proxy | 4 | 58239925
94 | CDN (Content Delivery Network) | 6 | 58239927
95 | Recursos estáticos vs. dinâmicos | 11 | 26148504  [sem legenda]
96 | Cache de recursos dinâmicos | 10 | 26148516  [sem legenda]
97 | Cache em servidores dedicados | 11 | 24743366
98 | Cache: resumo das vantagens | 4 | 26148518
99 | Questões de concurso | 6 | 58240065
Teste da seção

## Seção 8: Proxy
100 | Proxy | 1 | 58240797
101 | Proxy direto | 7 | 6727244
102 | Proxy reverso | 8 | 8052934  [sem legenda]
103 | Questões de concurso | 10 | 58240801  [sem legenda]
Teste da seção

## Seção 9: VPN (Virtual Private Network)  [toda sem legenda]
104 | VPN (Virtual Private Network) | 1 | 58255689
105 | VPN site-to-site | 7 | 22046332
106 | VPN host-to-host | 13 | 22942036
107 | Criptografia na VPN | 9 | 22942434
108 | Software VPN | 4 | 22943376
109 | Questões de concurso | 12 | 58255643
Teste da seção

## Seção 10: Protocolos  [a seção mais importante para a carreira]
110 | Protocolos | 6 | 6655142
111 | O modelo OSI | 8 | 6660076
112 | PDU e SAP | 8 | 21356058
113 | TCP/IP - parte 1 | 7 | 21356066
114 | TCP/IP - parte 2 | 8 | 21415270
115 | TCP/IP - parte 3 | 5 | 21426904
116 | Camada 7 - Aplicação | 5 | 6660644
117 | Camada 6 - Apresentação | 7 | 6660688
118 | Camada 5 - Sessão | 1 | 6660856
119 | Camada 4 - Transporte | 8 | 6660862
120 | Camada 3 - Rede | 8 | 6660864
121 | Camada 2 - Link de dados | 8 | 6660866
122 | Camada 1 - Física | 2 | 6660870
123 | Endereçamento físico vs. lógico | 9 | 21514512
124 | Questões de concurso - parte 1 | 12 | 11825758
125 | Questões de concurso - parte 2 | 12 | 11825582
Teste da seção

## Seção 11: Topologias
126 | Topologia totalmente conectada | 8 | 6558982
127 | Topologia em malha | 5 | 6559192
128 | Topologia em anel | 3 | 6559414
129 | Topologia em barramento ou linear | 6 | 6559988
130 | Topologia em estrela | 10 | 6559996
131 | Topologia em árvore ou hierárquica | 4 | 6563414
132 | Topologia sem fio e híbrida | 1 | 6563982
133 | Questões de concurso - parte 1 | 11 | 11840416
134 | Questões de concurso - parte 2 | 11 | 11840418
Teste da seção

## Seção 12: Cabeamento de rede
135 | Cabeamento de rede | 1 | 19337804
136 | Cabo coaxial | 7 | 19337826
137 | Par trançado | 9 | 19337828
138 | Fibra óptica - parte 1 | 11 | 19337832
139 | Fibra óptica - parte 2 | 7 | 19460624
140 | Cabeamento estruturado | 8 | 19337838
141 | Questões de concurso - parte 1 | 11 | 19442050
142 | Questões de concurso - parte 2 | 11 | 19337850
143 | Questões de concurso - parte 3 | 11 | 19442054
Teste da seção

## Seção 13: Equipamentos de rede
144 | Equipamentos de rede | 3 | 7055560
145 | Interface de rede (NIC) | 10 | 19905758
146 | Modem | 5 | 23019308
147 | Hub e repetidor | 4 | 7055564
148 | Switch e ponte | 8 | 7055566
149 | Roteador e switch camada três (L3) | 5 | 7055568
150 | Firewall | 7 | 39667254
151 | Ponto de acesso sem fio | 13 | 7055570
152 | Roteador de banda larga | 10 | 7055574
153 | Repetidor sem fio | 3 | 38931564
154 | Balanceador de carga | 1 | 7055576
155 | Armazenamento: DAS, NAS e SAN | 9 | 18601472
156 | Armazenamento: RAID | 12 | 18608322
157 | Questões de concurso - parte 1 | 10 | 11848118
158 | Questões de concurso - parte 2 | 10 | 11848120
Teste da seção

## Seção 14: Redes Wi-Fi  [a maior seção do curso]
159 | Redes sem fio | 10 | 19655462
160 | Modos de operação | 11 | 40386046
161 | Serviços | 5 | 36686480
162 | Acesso ao meio | 8 | 36686482
163 | Uso do espectro eletromagnético | 13 | 36720456
164 | Faixa de 2,4 GHz | 10 | 36721194
165 | Faixa de 5 GHz | 12 | 36721200
166 | Faixa de 6 GHz | 12 | 36721202
167 | Diferenças práticas entre as faixas | 8 | 36792140
168 | Introdução ao padrão IEEE 802.11 | 9 | 36792148
169 | IEEE 802.11-1997 ("Wi-Fi 0") | 4 | 36792180
170 | IEEE 802.11b ("Wi-Fi 1") | 1 | 36792302
171 | IEEE 802.11a ("Wi-Fi 2") | 3 | 36792324
172 | IEEE 802.11g ("Wi-Fi 3") | 2 | 36792374
173 | IEEE 802.11n (Wi-Fi 4) | 10 | 36792422
174 | IEEE 802.11ac (Wi-Fi 5) - parte 1 | 11 | 36792430
175 | IEEE 802.11ac (Wi-Fi 5) - parte 2 | 6 | 37532170
176 | IEEE 802.11ax (Wi-Fi 6/6E) | 9 | 36792436
177 | IEEE 802.11be (Wi-Fi 7) | 9 | 36792442
178 | Segurança em redes Wi-Fi | 12 | 19828026
179 | Questões de concurso - parte 1 | 10 | 19824656
180 | Questões de concurso - parte 2 | 12 | 19824662
Teste da seção

## Seção 15: Redes de telefonia celular
181 | Redes de telefonia celular | 5 | 36978364
182 | Estações rádio base e células | 13 | 38272082
183 | Gerações das redes de telefonia celular | 11 | 36978376
184 | Redes 1G | 9 | 38224288
185 | Redes 2G - parte 1 | 10 | 38224292
186 | Redes 2G - parte 2 | 5 | 38229488
187 | Redes 3G | 8 | 38224296
188 | Redes 4G - parte 1 | 8 | 38224298
189 | Redes 4G - parte 2 | 7 | 38244646
190 | Redes 5G | 7 | 38224308
191 | Questões de concurso | 8 | 36778120
Teste da seção

## Seção 16: Virtualização
192 | Virtualização | 2 | 9110466
193 | Virtualização de máquinas | 12 | 9110532
194 | Virtualização de redes: interna | 5 | 9110562
195 | Virtualização de redes: SDN/VLAN | 5 | 9110618  ← única menção real a VLAN no curso
196 | Virtualização de redes: NFV | 2 | 9110652
197 | Virtualização de desktop | 3 | 9110676
198 | Virtualização de armazenamento | 1 | 9110688
199 | Questões de concurso - parte 1 | 9 | 11988312
200 | Questões de concurso - parte 2 | 12 | 11988314
Teste da seção

## Seção 17: Segurança
201 | Segurança | 4 | 6665664
202 | Princípios básicos de segurança - parte 1 | 9 | 21580074
203 | Princípios básicos de segurança - parte 2 | 9 | 38524004
204 | Terminologia básica | 8 | 21581656
205 | Engenharia social | 6 | 6670152
206 | Como ataques acontecem | 8 | 6665760
207 | Segurança por obscuridade | 3 | 6665936
208 | Senhas | 11 | 6666518
209 | Criptografia | 5 | 6667146
210 | Senha vs. chave | 4 | 6667430
211 | Autenticação de dois passos | 2 | 6670156
212 | Segurança física | 6 | 6667762
213 | Firewall: estudo de caso | 8 | 6670020
214 | Sistema de detecção e prevenção de intrusos (IDPS) | 6 | 21563454
215 | Caso prático 1: como hackeiam redes sociais | 8 | 21103412
216 | Caso prático 2: segurança por obscuridade - parte 1 | 5 | 21116298
217 | Caso prático 3: segurança por obscuridade - parte 2 | 10 | 34513006
218 | Caso prático 4: Clube do Hardware - parte 1 | 12 | 21116314
219 | Caso prático 5: Clube do Hardware - parte 2 | 7 | 21134696
220 | Segurança: conclusão | 2 | 21563622
221 | Questões de concurso - parte 1 | 10 | 12000838
222 | Questões de concurso - parte 2 | 9 | 12000840
Teste da seção

## Seção 18: Conclusão do curso
223 | Conclusão do curso | 4 | 6670160
224 | Como emitir o seu certificado de conclusão | 3 | 18675672
225 | Qual curso fazer em seguida? | 8 | 40580754

## Seção 19: Seção Bônus
226 | Aula bônus: livros e cursos de Gabriel Torres | 1 | 13759858
