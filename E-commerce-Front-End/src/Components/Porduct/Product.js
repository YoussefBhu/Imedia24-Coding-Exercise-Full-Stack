import { Image , Button , message } from 'antd';
import { FiEdit2 , FiTrash } from "react-icons/fi";
import {imageUrl} from '../../Environement'
import './Product.scss'

const Product = (props) => {
    const {product ,showModal , deleteProduct} = props

    const HandleDeleteClick = async () => {
        message.loading({content : "Loading" , key : "deleteProduct" , duration : 60})
        await deleteProduct(product.id)
        message.success({content : "Success" , key : "deleteProduct" })
    }
    return(
        <>
            <div className="Product">
                <div className="Image">
                    <Image preview={(product.image ? true : false)} height={"100%"} src={`${imageUrl}/${(product.image ? product.image : "NoImage.jpg")}`}/>
                </div>
                <div className="Name">
                    <h2>{product.name}</h2>
                    <p >{product.description}</p>
                </div>
                <div className="Description">
                    <Button onClick={HandleDeleteClick} type="danger" shape="circle" icon={<FiTrash />}  />
                    <Button onClick={() => showModal(product)} type="primary" shape="circle" icon={<FiEdit2 />}  />
                </div>
                <div className="Price">
                    {product.price} EUR
                </div>
            </div>
        </>
    )
}

export default Product