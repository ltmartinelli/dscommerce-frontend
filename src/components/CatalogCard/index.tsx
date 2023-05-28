import './styles.css';

type Props = {
    name : string,
    price : number,
    imgUrl: string,

}

export default function CatalogCard({name, price, imgUrl}: Props)
{
    return (
        <div className="dsc-card">
            <div className="dsc-catalog-card-top dsc-line-bottom">
                <img src={imgUrl} alt={name} />
            </div>
            <div className="dsc-catalog-card-bottom">
                <h3>R$ {price}</h3>
                <h4>
                    {name}
                </h4>
            </div>
        </div>
    );
}