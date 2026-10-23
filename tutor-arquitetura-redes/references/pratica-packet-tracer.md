# Ponte com o Packet Tracer (mini-labs por seção)

O objetivo dele: terminar o curso e depois ir para o Cisco Packet Tracer. Esses mini-labs são **opcionais durante o curso** (10 a 20 min cada) e servem para fixar a teoria. Alguns são feitos fora do Packet Tracer, no PC ou no celular, quando o PT não mostra bem o assunto. Oferecer no fim da seção, sem insistir. Os labs de verdade (sub-redes, VLAN, roteamento) ficam para a fase prática.

| Depois da seção | Mini-lab | O que observar |
|---|---|---|
| 2. Introdução a redes | Ligar 2 PCs com cabo cruzado, configurar IP manual e dar ping | O que é preciso, no mínimo, para duas máquinas conversarem |
| 3. Binários | Ver o IP e a máscara de um PC em binário (fazer a conversão à mão) | IP é só um número de 32 bits |
| 4. Transmissão | Hub × switch com 4 PCs no modo Simulation | No hub o quadro vai para todos; no switch, só para o destino |
| 5. Desempenho | Fora do Packet Tracer (ele não simula velocidade real): no seu PC, `ping` no gateway e depois em `8.8.8.8`, e um teste de velocidade | Latência (ms) × taxa de transferência (Mbps) são coisas diferentes. Na rede da empresa, se o `8.8.8.8` não responder, pode ser o firewall bloqueando ICMP: isso também é aprendizado |
| 6. Modelos computacionais | Um servidor (HTTP ou DNS) e dois clientes | Cliente-servidor na prática |
| 7 e 8. Cache e proxy | Teoria. Usar o navegador real: ver o cache e os cabeçalhos no F12 | Recurso estático × dinâmico |
| 9. VPN | Fora do Packet Tracer: `ipconfig` antes e depois de conectar a VPN da empresa | A VPN cria uma placa de rede virtual com outro IP |
| 10. Protocolos | Modo Simulation, clicar num pacote e abrir as camadas OSI | Encapsulamento camada a camada (PDU) |
| 11. Topologias | Montar estrela, anel e malha com switches | Ponto único de falha. No anel e na malha, um link fica laranja: é o STP bloqueando o loop (assunto além do curso) |
| 12. Cabeamento | Ligar dois PCs com cabo direto e depois com cruzado; tentar ligar fibra numa porta de cobre | Link vermelho = cabo errado. O PT nem deixa conectar fibra em porta de cobre |
| 13. Equipamentos | Ligar duas redes diferentes por um roteador (configurar o IP de cada interface do roteador e o gateway em cada PC) | Switch não passa de uma rede para outra; roteador passa. Sem gateway configurado, o PC não sai da própria rede |
| 14. Wi-Fi | Access point + notebook com SSID e senha WPA2 | Associação e autenticação. Pegadinha: desligar o notebook e trocar a placa de rede com fio por uma sem fio (ex. WPC300N) na aba Physical |
| 15. Celular | Teoria. No celular, ver nas configurações se está em 4G ou 5G e comparar com o Wi-Fi | Geração da rede × tecnologia de acesso |
| 16. Virtualização | Teoria. Se quiser, criar uma VM no Hyper-V ou VirtualBox | Hipervisor e placa de rede virtual |
| 17. Segurança | ACL simples bloqueando um PC. É feita na linha de comando do roteador (além do curso): passar os comandos prontos e explicar cada um | Firewall = regra de permitir/negar, lida de cima para baixo |

Ao propor um lab: listar os equipamentos, os passos em até 6 linhas e a pergunta que o lab responde. Não dar a solução completa de cara; deixar ele tentar e ajudar quando travar.
