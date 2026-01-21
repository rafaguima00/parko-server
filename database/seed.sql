INSERT INTO status_debts (id, status) VALUES (1, "Pendente");
INSERT INTO status_debts (id, status) VALUES (2, "Pago");
INSERT INTO status_payment (id, status) VALUES (1, "Aprovado");
INSERT INTO status_payment (id, status) VALUES (2, "Rejeitado");
INSERT INTO status_payment (id, status) VALUES (3, "Cancelado");
INSERT INTO status_payment (id, status) VALUES (4, "Pendente");
INSERT INTO status_payment (id, status) VALUES (5, "Reembolsado");
INSERT INTO status_reservation (id, status) VALUES (1, "Pendente");
INSERT INTO status_reservation (id, status) VALUES (2, "Confirmado");
INSERT INTO status_reservation (id, status) VALUES (3, "Recusado");
INSERT INTO status_reservation (id, status) VALUES (4, "Finalizado");
INSERT INTO type_colaborators (id, type_colaborator) VALUES (1, "Funcionário(a)");
INSERT INTO type_colaborators (id, type_colaborator) VALUES (2, "Coordenador(a)");
INSERT INTO type_colaborators (id, type_colaborator) VALUES (3, "Administrador(a)");
INSERT INTO type_hiring (id, type) VALUES (1, "Carteira assinada");
INSERT INTO type_hiring (id, type) VALUES (2, "Autônomo(PJ)");
INSERT INTO type_hiring (id, type) VALUES (3, "MEI");
INSERT INTO type_occurrence (id, name) VALUES (1, "Perda de Ticket");
INSERT INTO type_occurrence (id, name) VALUES (2, "Furto de bens do cliente");
INSERT INTO type_occurrence (id, name) VALUES (3, "Furto de itens do patrimônio");

INSERT INTO establishments (
  id, razao_social, name, contato, cnpj,
  inscricao_estadual, inscricao_municipal,
  end, cep, estado, cidade, bairro,
  longitude, latitude, email, numero_vagas, 
  vagas_ocupadas, numero, type_of_charge, test
) VALUES (
  100, "Shopping Belo Dia LTDA", "Shopping Belo Dia", "(99) 88888-0505",
    "33.689.144/0001-56", "123456789123", "12345678-9", "Alameda Martins",
    "41098-020", "Bahia", "Salvador", "Horto Bela Vista", -38.474777, -12.969904,
    "belo.dia@email.com", 120, 0, 92, "tabela_fixa", 1
);

INSERT INTO price_table (
  tempo_tolerancia, valor_hora, valor_fracao_hora, id_estacionamento
 ) VALUES (
 	10, 5, 1, 100
 );

INSERT INTO colaborators (
    name, email, cpf, rg, tel, 
    data_nasc, created_at, inicio_contrato, 
    password, e_admin, tipo_contratacao, unidade
) VALUES (
    "Teste usuário", "usertest@email.com", "015.374.210-00", 
    "14999997", "77555559999", "1997-11-10", "31/12/2025, 00:00:00", 
    "2026-01-01", "$2a$12$KpyyQVL6/rfJk1L6zsjhMuOCn/HITWkMfQam3UuTCxMxuQnvrrlbO", 
    3, 2, 100
);