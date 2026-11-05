# menu-cms

Painel administrativo (CMS) do Cardápio Digital da hamburgueria **Mater Burguer**. Permite gerenciar categorias, produtos e mesas, acompanhar as comandas em aberto e alterar o status dos pedidos.

O CMS consome a API NestJS do projeto [menu-backend](https://github.com/Simionato4/menu-backend). Nenhum dado é fixo no código: tudo vem da API.

## Funcionalidades

| Área | Rota | O que faz |
|---|---|---|
| Categorias | `/categories` | Lista nome, ícone, ordem de exibição e situação; cadastra, edita e exclui com confirmação. |
| Produtos | `/products` | Lista imagem, nome, categoria, preço em reais e indicadores de vegetariano e novidade; filtra por categoria; cadastra, edita e exclui com confirmação. |
| Mesas | `/spots` | Lista, cadastra, edita e exclui mesas com confirmação. |
| Comandas | `/guest-checks` | Lista as comandas em aberto com mesa, data de abertura e total acumulado. |
| Pedidos da comanda | `/guest-checks/:id` | Mostra os pedidos com itens, subtotais e total, e altera o status de cada pedido. |
| Kanban (bônus) | `/kanban` | Uma coluna por status; arrastar o cartão grava o novo status na API. |

Todas as telas de leitura tratam carregamento, erro e lista vazia, e toda gravação mostra uma mensagem de sucesso ou de erro.

## Tecnologias

- Vite + React + TypeScript
- Tailwind CSS
- shadcn/ui
- Axios
- TanStack Query

## Estrutura

```
src/
  lib/          instância do Axios, formatação de moeda e data, mensagem de erro da API
  components/
    ui/         componentes gerados pelo shadcn/ui
    layout/     cabeçalho com o menu, layout das páginas e título de página
    shared/     estados de carregamento, erro e vazio; diálogo de confirmação de exclusão
  cases/        uma pasta por área (categories, products, spots, guest-checks, orders)
                com dtos, services (Axios), hooks (TanStack Query) e components
  pages/        uma página por rota, montando os componentes de cases/
```

## Como executar

Pré-requisito: a API do [menu-backend](https://github.com/Simionato4/menu-backend) rodando (por padrão em `http://localhost:3000`), na versão com os campos de ícone, ordem, vegetariano e novidade, o status `DELIVERED` e as rotas `GET /guest-checks?status=` e `GET /orders?guestCheckId=`.

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie o arquivo `.env` a partir do `.env.example` e ajuste a URL da API, se necessário:

   ```
   VITE_API_URL=http://localhost:3000
   ```

3. Rode o projeto:

   ```bash
   npm run dev
   ```

4. Acesse o endereço exibido no terminal (por padrão `http://localhost:5173`).

## Dependências fora da stack obrigatória

| Dependência | Justificativa |
|---|---|
| `react-router-dom` | Rotas entre as áreas do CMS (Categorias, Produtos, Mesas, Comandas, Kanban). |
| `lucide-react` | Biblioteca de ícones usada pelo shadcn/ui. |
| `@base-ui/react` | Base dos componentes do shadcn/ui no estilo `base-vega`. |
| `class-variance-authority` | Variantes de estilo dos componentes do shadcn/ui. |
| `cn` | Junta e resolve conflitos de classes do Tailwind nos componentes. |
| `tw-animate-css` | Animações usadas pelos componentes do shadcn/ui. |
| `shadcn` | Fornece o `shadcn/tailwind.css` importado no `index.css` e a CLI que gera os componentes. |
| `sonner` | Mensagens (toast) de sucesso e de erro após cada ação. |
| `@dnd-kit/core` | Arrastar e soltar os cartões entre as colunas do Kanban de pedidos (bônus), biblioteca citada como permitida no enunciado. |
