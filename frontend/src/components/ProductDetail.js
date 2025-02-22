import logo from '../logo.svg';
import {Link} from 'react-router-dom'
import SingleRelatedProduct from './SingleRelatedProduct';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
function ProductDetail(){
    const baseUrl='http://127.0.0.1:8000/api';
    const [productData, setproductData] = useState({}); 
    const [productImgs,setproductImgs]=useState([]);
    const [productTags,setproductTags]=useState([]);
    const [relatedProducts,setRelatedProducts]=useState([]);
    const {product_slug,product_id} = useParams();

    useEffect(() => {
        fetchData(`${baseUrl}/product/${product_id}`);
        fetchRelatedData(baseUrl+'/related-products/'+product_id);
    }, [product_id]);

    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                console.log("API Response:", data);
                console.log("Product Images:", data.product_imgs);
                setproductData(data);
                setproductImgs(data.product_imgs || []);
                setproductTags(data.tag_list);
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
            });
    }
    function fetchRelatedData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                console.log("Related Products API Response:", data);
                setRelatedProducts(data.results);
            })
            .catch((error) => {
                console.error("Error fetching related products:", error);
            });
    }
    function chunkArray(array, chunkSize) {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    }
    //chunks of 4
    const groupedRelatedProducts = chunkArray(relatedProducts, 4);
    const tagsLinks=[]
    for(let i=0; i<productTags.length; i++){
        let tag=productTags[i].trim();
        tagsLinks.push(<Link className='badge bg-secondary text-white me-1' to={`/products/${tag}`}>{tag}</Link>)
    }
    return(
        <section className="container mt-4">
            <div className="row">
                <div className="col-4">
                    <div id="productThumbnailSlider" className="carousel carousel-dark slide carousel-fade" data-bs-ride="true">
                        <div className="carousel-indicators">
                            {productImgs.map((img,index)=>{
                                if(index === 0){
                                    return <button type="button" data-bs-target="#productThumbnailSlider" data-bs-slide-to={index} className="active" aria-current="true" aria-label="Slide 1"></button>
                                }
                                else{
                                    return <button type="button" data-bs-target="#productThumbnailSlider" data-bs-slide-to={index} aria-current="true" aria-label="Slide 1"></button>
                                }
                            })}
                        </div>
                        <div className="carousel-inner">
                            {productImgs.map((img,index)=>
                                {
                                    if(index===0){
                                        return <div className="carousel-item active">
                                        <img src={img.image} className="img-thumbnail mb-5" alt={index} />
                                        </div> 
                                    }else{
                                        return <div className="carousel-item">
                                        <img src={img.image} className="img-thumbnail mb-5" alt={index} />
                                        </div> 
                                }
                                })}
                        </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#productThumbnailSlider" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#productThumbnailSlider" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>
                </div>
                <div className="col-8">
                    <h1>{productData.title}</h1>
                    <p>{productData.detail}</p>
                    <h5 className='card-title'>Price: Rs. {productData.price}</h5>
                    <p className='mt-3'>
                        <button title='Add to Cart' className='btn btn-success'>
                            <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                        </button>
                        <button title='Buy Now' className='btn btn-warning ms-1'>
                            <i className="fa-solid fa-bag-shopping"></i> Buy Now
                        </button>
                        <button title='Add to Wishlist' className='btn btn-danger ms-1'>
                            <i className="fa fa-heart"></i> Wishlist
                        </button>
                    </p>
                    <hr/>
                    <div className='producttags mt-4'>
                        <h5>Tags</h5>
                        <p>
                            {tagsLinks}
                        </p>
                    </div>
                </div>

            </div>
            {/* Related Products */}
            <h3 className="mt-5 mb-3 text-center">Related Products</h3>
            <div id="relatedProductsSlider" className="carousel carousel-dark slide bg-light" data-bs-ride="true">
                <div className="carousel-indicators">
                    {groupedRelatedProducts.map((group, index) => (
                        <button
                            type="button"
                            data-bs-target="#relatedProductsSlider"
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-current={index === 0}
                            aria-label={`Slide ${index + 1}`}
                            key={index}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner ms-3">
                    {groupedRelatedProducts.map((group, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                            <div className="row row-cols-1 row-cols-md-4 g-3">
                                {group.map((product) => (
                                    <div className="col" key={product.id}>
                                        <SingleRelatedProduct product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* <button className="carousel-control-prev" type="button" data-bs-target="#relatedProductsSlider" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#relatedProductsSlider" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button> */}
                </div>
            {/* End Related Products */}
        </section>
    );
}

export default ProductDetail;