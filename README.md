# Site Óticas do Carmo

Site estático (HTML, CSS e JavaScript puros). Não precisa de instalação nem de build.

## Estrutura
- `index.html` – página inicial
- `sobre.html` – página Sobre nós
- `css/style.css` – estilos e animações
- `js/main.js` – slides do banner, menu do celular, janela "Fale conosco", vídeos e animações ao rolar
- `assets/` – imagens e vídeos

## Publicar no GitHub Pages
1. Crie um repositório no GitHub e envie todo o conteúdo desta pasta para a raiz dele.
2. No repositório: Settings → Pages → Source: "Deploy from a branch" → Branch `main`, pasta `/ (root)` → Save.
3. Em alguns minutos o site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Depois de publicar (Google)
- Em `index.html` e `sobre.html`, acrescente a tag `<link rel="canonical">` com o endereço final (há um comentário marcando o lugar).
- Troque `assets/slide-1.jpg` em `og:image` pelo endereço completo da imagem.
- Cadastre o endereço no Google Search Console e cole a tag de verificação no `<head>` (há um comentário marcando o lugar).
- Crie um `sitemap.xml` com os dois endereços finais (página inicial e sobre) e envie no Search Console.
- Coloque o endereço do site no Perfil da Empresa no Google.

## Trocar banners
Os slides do topo ficam em `assets/slide-*.jpg`, todos em 2400 × 1000 px. Para trocar um, substitua o arquivo mantendo o nome e o tamanho.
