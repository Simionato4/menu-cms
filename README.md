# menu-cms

Painel administrativo (CMS) do Cardápio Digital da hamburgueria **Mater Burguer**. Permite gerenciar categorias, produtos e mesas, acompanhar as comandas em aberto e alterar o status dos pedidos.

O CMS consome a API NestJS do projeto [menu-backend](https://github.com/Simionato4/menu-backend). Nenhum dado é fixo no código: tudo vem da API.

## Tecnologias

- Vite + React + TypeScript
- Tailwind CSS
- shadcn/ui
- Axios
- TanStack Query

## Como executar

Pré-requisito: a API do `menu-backend` rodando (por padrão em `http://localhost:3000`).

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
| `react-router-dom` | Rotas entre as áreas do CMS (Categorias, Produtos, Mesas, Comandas). |
| `lucide-react` | Biblioteca de ícones usada pelo shadcn/ui. |
| `@base-ui/react` | Base dos componentes do shadcn/ui no estilo `base-vega`. |
| `class-variance-authority` | Variantes de estilo dos componentes do shadcn/ui. |
| `cn` | Junta e resolve conflitos de classes do Tailwind nos componentes. |
| `tw-animate-css` | Animações usadas pelos componentes do shadcn/ui. |
| `shadcn` | Fornece o `shadcn/tailwind.css` importado no `index.css` e a CLI que gera os componentes. |
| `sonner` | Mensagens (toast) de sucesso e de erro após cada ação. |
