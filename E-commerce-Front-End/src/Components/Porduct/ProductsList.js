import {useState , useEffect } from 'react'
import { connect } from "react-redux";
import { Image , Button , Modal , Form , Input ,Select , Upload, message , Pagination} from 'antd';
import currencies from '../../Ressources/Currencies.json'
import {retrieveProducts , updateProduct , createProduct , deleteProduct, searchProduct} from "../../Actions/product"
import { FiUpload , FiPlus } from "react-icons/fi";
import Product from './Product'
import UploadService from '../../Services/upload.service'
import CurrencyService from '../../Services/currency.service'
import './ProductsList.scss'

const { TextArea } = Input;
const { Option } = Select ; 

const ProductList = (props) =>{
    const [form] = Form.useForm();
    const [visible , setVisible] = useState(false)
    const [currentProuct , setcurrentProduct] = useState(null)
    const [image,setImage] = useState(null)
    const [currentPage , setcurrentPage] = useState(1) 
    const {currentCat , searchKey  } = props.params
    const {createProduct , updateProduct , deleteProduct , products , retrieveProducts ,searchProduct } = props

    const handleCancel = () =>{
        if(currentProuct)
            setcurrentProduct(null)
        if(Image)
            setImage(null)
        form.resetFields()
        setVisible(false)
    }

    useEffect(()=>{
        setcurrentPage(1)
    },[currentCat])

    useEffect( () => {
        if(currentCat)
            retrieveProducts(currentCat.id , (currentPage-1))
        if(searchKey) 
            searchProduct(searchKey, (currentPage-1))
            // eslint-disable-next-line 
      },[currentPage]); 

    const showModal = (product) => {
        if(product) {
            setcurrentProduct(product)
            form.setFieldsValue({...product , price : {amount : product.price , currency : "EUR"}})
        } 
        setVisible(true)
    }

    const onSubmit = async (value)=> {
        message.loading({content : "loading" , key : "loading" , duration : 60})
        if(image)
            value.image = await UploadService.uploadImage(image)

        if(value.price.currency !== "EUR")
            value.price = await CurrencyService.convertToEuro(value.price.amount,value.price.currency) // prices in database are in euro  
        else 
            value.price = value.price.amount

        if(currentProuct){
            value = {...currentProuct , ...value }
            const res = await updateProduct(value)
            if(res)
                message.success({content : "Succes" , key:"loading"})
        }
        else {
            value.catId = currentCat.id
            const res = createProduct(value) 
            if(res)
                message.success({content : "Succes" , key:"loading"})
        }
        handleCancel()
    }

    const handlePageChange = async (value) => {
        await setcurrentPage(value)
    }

    return (
        (currentCat  || searchKey  ? 
        <div className="Container">
            {currentCat && 
                <div className="header">
                    <h2>Category : {currentCat.name}</h2>
                    <Button onClick={()=>showModal()} type="primary" shape="round" icon={<FiPlus style={{marginRight : 10}}/>} size={30}>
                        Add product
                    </Button>
                </div>
            }
            {searchKey && <div className="header" ><h2>Results for "{searchKey}"</h2></div>}
            {products && products._embedded.products.map(product => {
                return <Product showModal={showModal} product={product} deleteProduct={deleteProduct}/>
            })}
            
            <div className="Pagination">
                {products && products.page.totalPages > 1 && <Pagination pageSize={5} onChange={handlePageChange} current={currentPage} total={products.page.totalElements}/> } 
            </div>
            
            {currentCat &&
                     <Modal
                     width={"50%"}
                     title={((currentProuct ? `Edit Product` : `Add product to ${currentCat.name} category` ))}
                     visible={visible}
                     onCancel={handleCancel}
                     footer={[
                         <>
                             <Button onClick={() => {handleCancel()}}>
                                 Cancel
                             </Button>
                             <Button type="primary" form="add-update-product" key="submit" htmlType="submit">
                                 Submit
                             </Button>
                         </>
                         ]}>
                     <Form
                         form={form}
                         initialValues={{price : {currency : "EUR"}}}
                         id="add-update-product"
                         labelCol={{ span: 5}}
                         onFinish={onSubmit}
                     >
                         <Form.Item
                             label="Product name"
                             name="name"
                                 rules={[
                                     {
                                         required: true,
                                         message: 'Please enter the category name!',
                                     },
                                 ]}
                         > 
                             <Input/>    
                         </Form.Item>
                         <Form.Item
                             label="Description"
                             name="description"
                                 rules={[
                                     {
                                         required: false,
                                         message: 'Please enter the category name!',
                                     },
                                 ]}
                         > 
                             <TextArea rows={4}/>    
                         </Form.Item>
                         <Form.Item 
                             required={true}
                             rules={[{required : true}]}
                             label="Price"> 
                             <Input.Group compact>
                                 <Form.Item
                                     name={['price' , 'amount']}
                                     noStyle
                                         rules={[
                                             {
                                                 required: true,
                                                 message: 'Please enter the price!',
                                             },
                                         ]}
                                 > 
                                     <Input min="0" type="number" style={{width : "30%"}}/>
                                 </Form.Item>
                                 <Form.Item
                                     name={['price' , 'currency']}
                                     noStyle
                                         rules={[
                                             {
                                                 required: false
                                             },
                                         ]}
                                 > 
                                     <Select
                                         style={{width : "20%"}}
                                         placeholder="Currency"
                                         >
                                         {Object.keys(currencies).map(key =>{
                                             return (<Option value={key}>{key}</Option>)
                                         })}
                                     </Select>
                                 </Form.Item>
                             </Input.Group>
                         </Form.Item>
                         <Form.Item 
                          label="Product Image"
                          >
                             <Upload 
                                 onRemove={()=> {setImage(null)}}
                                 beforeUpload={(file) => { setImage(file); return false}}
                                 listType="picture"
                                 accept="image/*"
                                 maxCount={1}
                                 style={{display : "inline-block"}}
                                 showUploadList={image}
                                 >
                                 <Button> <FiUpload style={{marginRight : 10}}/> Select File</Button>
                             </Upload>
                         </Form.Item> 
                     </Form>
                 </Modal>}
       
        </div>
        :
        <></> )
    )

}

const mapStateToProps = (state) => {
    return {
        products : state.products , 
        params : state.params
    };
  }

export default connect(mapStateToProps , {createProduct , updateProduct , deleteProduct , retrieveProducts , searchProduct}) (ProductList)