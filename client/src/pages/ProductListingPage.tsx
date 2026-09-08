import { useState } from 'react'
import { liteClient as algoliasearch } from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits, Pagination, RefinementList, RangeInput, useInstantSearch, ClearRefinements, SortBy } from 'react-instantsearch'
import 'instantsearch.css/themes/satellite.css'

import CatalogHero from '../components/catalog/CatalogHero'
import ProductCard from '../components/catalog/ProductCard'
import ProductQuickView from '../components/catalog/ProductQuickView'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import type { Product, ProductCategory } from '../data/products'
import styles from '../styles/pages/ProductListingPage.module.css'
import gridStyles from '../styles/catalog/ProductGrid.module.css'

const searchClient = algoliasearch('CH9RP8TVJP', '284d3f0d4725831b38957dfa16b3a3ae')

function EmptyViewResults({ children }: { children: React.ReactNode }) {
  const { results } = useInstantSearch();
  
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <div className={styles.emptyState}>
        <h3 className={styles.emptyStateTitle}>No encontramos resultados</h3>
        <p>Intenta ajustar tus filtros de categoia o precio, o prueba con otros filtros.</p>
      </div>
    );
  }
  return <>{children}</>;
}

interface AlgoliaProductHit {
  objectID: string;
  title: string;
  image_url: string;
  price: number;
  in_stock: boolean;
  categories?: string[];
  description: string;
}

function ProductAdapter({ hit, onSelect }: { hit: unknown, onSelect: (p: Product) => void }) {
  const algoliaHit = hit as AlgoliaProductHit;
  
  const product: Product = {
    id: algoliaHit.objectID,
    name: algoliaHit.title,
    image: algoliaHit.image_url,
    price: algoliaHit.price,
    inStock: algoliaHit.in_stock,
    category: (algoliaHit.categories && algoliaHit.categories.length > 0 ? algoliaHit.categories[0] : 'General') as ProductCategory,
    description: algoliaHit.description,
    specifications: [] 
  };
  
  return <ProductCard product={product} onProductSelect={onSelect} />;
}

function ProductListingPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <div className={styles.page}>
      <Header />

      <main>
        <CatalogHero />

        <section className={styles.catalog} id="catalog" aria-labelledby="catalog-title">
          <div className={styles.container}>
            <header className={styles.introduction}>
              <div>
                <p className={styles.eyebrow}>Tecnología para cada propósito</p>
                <h2 id="catalog-title">Catálogo de productos</h2>
              </div>
              <p className={styles.description}>
                Explora un espacio diseñado para comparar computación, componentes y
                accesorios con claridad.
              </p>
            </header>

            <InstantSearch searchClient={searchClient} indexName="products_Lab2">
              <div className={styles.searchLayout}>
                
                <aside className={styles.sidebar}>
                  <div className={styles.filtersHeader}>
                    <h3 className={styles.filtersTitle}>Filtros</h3>
                    <ClearRefinements translations={{ resetButtonText: 'Limpiar' }} />
                  </div>
                  
                  <div className={styles.sortByWrapper}>
                    <SortBy
                      items={[
                        { label: 'Ordenar por popularidad', value: 'products_Lab2' },
                        { label: 'Ordenar por precio: bajo a alto', value: 'products_Lab2_price_asc' },
                        { label: 'Ordenar por precio: alto a bajo', value: 'products_Lab2_price_desc' },
                      ]}
                    />
                  </div>

                  <div className={styles.filterSection}>
                    <h4>Categorías</h4>
                    <RefinementList 
                      attribute="categories" 
                      searchable={true} 
                      searchablePlaceholder="Buscar categoría..." 
                    />
                  </div>

                  <div className={styles.filterSection}>
                    <h4>Precio</h4>
                    <RangeInput 
                      attribute="price" 
                      translations={{ submitButtonText: 'Filtrar' }} 
                    />
                  </div>
                </aside>

                <div className={styles.results}>
                  <div className={styles.searchBoxWrapper}>
                    <SearchBox placeholder="Buscar laptops, componentes, accesorios..." />
                  </div>

                  <EmptyViewResults>
                    <Hits 
                      hitComponent={({ hit }) => <ProductAdapter hit={hit} onSelect={setSelectedProduct} />} 
                      classNames={{ list: gridStyles.grid, item: 'product-item-wrapper' }}
                    />
                    
                    <div className={styles.paginationWrapper}>
                      <Pagination />
                    </div>
                  </EmptyViewResults>
                </div>

              </div>
            </InstantSearch>
          </div>
        </section>
      </main>

      <Footer />

      {selectedProduct ? (
        <ProductQuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      ) : null}
    </div>
  )
}

export default ProductListingPage