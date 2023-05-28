import HeaderClient from '../../components/HeaderClient';
import './styles.css';
import SearchBar from '../../components/SearchBar';
import CatalogCard from '../../components/CatalogCard';
import ButtonNextPage from '../../components/ButtonNextPage';
import { ProductDTO } from '../../models/product';

const product: ProductDTO = {
    id: 2,
    name: "TV",
    description: "Top",
    imgUrl: "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg",
    price: 2500.99,
    categories: [
        {
            id: 2,
            name: "Eletrônicos"
        },
        {
            id: 3,
            name: "Computadores"
        }
    ]
};


export default function Catalog()
{
    return (
        <>
            <HeaderClient />
            <main>
                <section id="catalog-section" className="dsc-container">
                   <SearchBar />

                    <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
                        
                        <CatalogCard name={product.name} price={product.price} imgUrl={product.imgUrl}/>
                        <CatalogCard name={product.name} price={product.price} imgUrl={product.imgUrl}/>
                        <CatalogCard name={product.name} price={product.price} imgUrl={product.imgUrl}/>
                        <CatalogCard name={product.name} price={product.price} imgUrl={product.imgUrl}/>
                        <CatalogCard name={product.name} price={product.price} imgUrl={product.imgUrl}/>
                        <CatalogCard name={product.name} price={product.price} imgUrl={product.imgUrl}/>
                        <CatalogCard name={product.name} price={product.price} imgUrl={product.imgUrl}/>
                        <CatalogCard name={product.name} price={product.price} imgUrl={product.imgUrl}/>
                        <CatalogCard name={product.name} price={product.price} imgUrl={product.imgUrl}/>
                        <CatalogCard name={product.name} price={product.price} imgUrl={product.imgUrl}/>
                        <CatalogCard name={product.name} price={product.price} imgUrl={product.imgUrl}/>
                        <CatalogCard name={product.name} price={product.price} imgUrl={product.imgUrl}/>
                        
                    </div>
                    
                    <ButtonNextPage />

                </section>
            </main>
        </>
    );
}