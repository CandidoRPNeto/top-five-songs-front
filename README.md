# top-five-songs-front
Pagina web que exibe uma lista das 5 musicas mais tocadas da dupla caipira Tião Carreiro e Pardinho e permite que o usuário sugira novas musicas informando um link válido no YouTube.

## Configuração e Execução

requisitos 
- node >= 23.2
- docker
- git

colone o repositorio via Https ou SSH ( [siga esse tutorial](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) )

## Com o repositório clonado execute os seguinte passos:

### 1 - Instale as dependências do projeto
```bash
 npm install
```

### 2 - Crie um .env baseado no exemplo
```bash
 cp .env.example .env 
```

### 3 - Dê a permissão necessaria para o entrypoint
```bash
chmod +x entrypoint.sh
```

### 4 - Execute o docker do sistema com o banco de dados local
```bash
docker compose up -d
```