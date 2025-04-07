# Top 5 musicas Tião Carreiro & Pardinho
Pagina web que exibe uma lista das 5 musicas mais tocadas da dupla caipira Tião Carreiro e Pardinho e permite que o usuário sugira novas musicas informando um link válido no YouTube.

### Esse é o front-end do projeto, para ter acesso a API [clique aqui](https://github.com/CandidoRPNeto/top-five-songs-api#)
### E para ter acesso a documentação que fez esse projeto ser concluido [clique aqui](https://docs.google.com/document/d/1vACHjs0kJnu2AlwZyGqdHVVEOsl0eEGDQH5MzY7Pfy4/edit?usp=sharing)

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
