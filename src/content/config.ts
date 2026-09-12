backend:
  name: git-gateway
  branch: main

media_folder: "public/images/uploads"
public_folder: "/images/uploads"

collections:
  - name: "articles"
    label: "Articles"
    folder: "src/content/articles"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Slug", name: "slug", widget: "string", hint: "URL-friendly name (e.g., maria-perdio-su-negocio)" }
      - { label: "Publish Date", name: "pubDate", widget: "datetime" }
      - { label: "Language", name: "lang", widget: "select", options: ["en", "es"], default: "en", hint: "Select whether this article is in English or Spanish" }
      - { label: "Category", name: "category", widget: "select", options: [
          "Save Time & Stress", 
          "Protect Your Business", 
          "Get More Clients", 
          "Ahorra tiempo y estres", 
          "Protege tu negocio", 
          "Consigue mas clientes"
        ] }
      - { label: "Description", name: "description", widget: "text" }
      - { label: "Featured", name: "featured", widget: "boolean", default: false, required: false }
      - { label: "Cover Image", name: "coverImage", widget: "image", required: false }
      - { label: "Body", name: "body", widget: "markdown" }