<h1 align="center">APIRest - Desafio de Desenvolver Júnior</h1>

<p align="center">

# Como rodar o projeto passo a passo:

### 1 - Clone o projeto. Você pode buscar o link indo no botão verde escrito **<> Code** e copiando o link

#### 1.1 - digite no seu terminal o seguinte código

```
    git clone {link do repositório}
```

### 2 - Após de clonar o projeto e abrir o mesmo dentro da sua IDE, rode o comando

```
    npm i ou npm install
```

#### OBS: o comando é para que ele baixe todos os pacotes necessários para que o projeto possa funcionar.

### 3 - Crie o arquivo **.env** na raiz do projeto e copie o que está dentro do arquivo **.env.example**.

#### 3.1 - Adicione a url do banco de dados como está escrito no exemplo do arquivo **.env.example**. As outras informações estão dentro do arquivo **docker-compose.yml**.

#### OBS - O valor do **Host** dentro da URL é o valor padrão: localhost

### 4 - Após ter feito todos os processos acima, você pode iniciar o projeto inserindo os seguintes comandos dentro do terminal, respectivamente:

```
    npm run build
        &
    npm run start
```

#### 4.1 - Você pode iniciar o **Postman** passando para a requisição do tipo post o endereço URL da funcionalidade para adicionar uma inscrição no formulário. A URL para adicionar no **Postman** é a seguinte:

```
    http://localhost:3001/forms
```

#### 4.2 - Vai passar como parâmetros no body da requisição os seguintes valores:

- name
- email
- cpf
- phone

<p> lembrando que o valor antes cadastrado, do email e cpf, não pode ser repetido pois são valores únicos dentro do banco de dados</p>

### OBS: O projeto vai iniciar na porta patrão adicionada dentro do arquivo **server.ts**, onde você pode ficar a vontade para mudar o número da porta.

### 5 - Caso queira visualizar se os testes estão passando, você pode inserir no terminal os seguintes comandos:

- **npm run test**: este comando vai carregar todos os testes feitos no projeto
- **npm run test:ci**: este comando também vai fazer o mesmo que o de cima e mostrar o coverage (porcentagem) dos arquivos de testes.
