CREATE DATABASE db_retrogames;
USE db_retrogames;

CREATE TABLE jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    plataforma VARCHAR(50) NOT NULL,
    desenvolvedora VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    imagem_url TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jogos (titulo, plataforma, desenvolvedora, descricao, imagem_url, preco) VALUES
('Super Mario World', 'SNES', 'Nintendo', 'A clássica aventura do encanador na Terra dos Dinossauros.', 'Imagens/mario.jpg', 199.90),
('Sonic the Hedgehog', 'Mega Drive', 'SEGA', 'O ouriço mais rápido do mundo em alta velocidade contra o Dr. Eggman.', 'Imagens/sonic.webp', 149.50),
('Castlevania: SotN', 'PlayStation 1', 'Konami', 'Explore o vasto castelo de Dracula com Alucard nesta obra-prima.', 'Imagens/castlevania.webp', 299.00),
('Chrono Trigger', 'SNES', 'Square', 'Uma jornada épica através do tempo para salvar o futuro do planeta.', 'Imagens/chrono.jpg', 349.00),
('Street Fighter II', 'Arcade', 'Capcom', 'O jogo de luta definitivo que definiu gerações nos fliperamas.', 'Imagens/street.webp', 129.00);