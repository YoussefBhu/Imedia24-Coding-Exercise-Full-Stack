import React from "react";
import { connect } from "react-redux";
import { Menu , Modal, Button , Form , message  ,Input } from 'antd';
import { FiPlus , FiList , FiEdit2 , FiTrash } from "react-icons/fi";
import { retrieveCategories  } from "../../Actions/category";
import { retrieveProducts , clearProducts  } from "../../Actions/product";
import { setCurrentCategory } from "../../Actions/param"
import  CategoryDataService  from '../../Services/category.service'
import {apiUrl} from '../../Environement'
import './CategoriesList.scss'

const { SubMenu } = Menu;

class CategoriesList extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            parentOfNewCat : null , 
            selectedCat : null , 
            Loading : false , 
            currentCategory : null, 
            visible : false , 
        }
        
    }

    formRef = React.createRef();   //using reference on the form to be able to change the value of "categorie name" input 

    setInputValue = (value) =>{
        this.formRef.current.setFieldsValue({
            name : value
          });
    }

    async componentDidMount() {
       this.refreshData()
      }
    
    refreshData = () =>{
        this.props.retrieveCategories();
    }

    getCatOpertaionsItems = (cat) => { 
            return(
                <Menu.ItemGroup  title="Operations">
                    <Menu.Item onClick={() => this.addCategory(cat.id)}><FiPlus  /> Add sub category of {cat.name}</Menu.Item>
                    <Menu.Item onClick={() => this.updateCategory(cat)}><FiEdit2 /> Edit category</Menu.Item>
                    <Menu.Item onClick={() => this.deleteCategory(cat.id)}><FiTrash /> Delete category</Menu.Item>
                </Menu.ItemGroup>
            )   
    }
    
    getCategories(categories){
        let categoriesElements = []
        categories.forEach(category => {
            const element = (
                <SubMenu onTitleClick={()=> this.selectCategory(category)} key={category.id} title={category.name}>
                    {(category.subCategories!== 0 ? this.getCategories(category.subCategories,false) : null)}
                    {this.getCatOpertaionsItems({id : category.id , name : category.name}) /* to avoid sending subCategories*/ } 
                </SubMenu>
            )
            categoriesElements.push(element)
         });
        return categoriesElements
    }

    selectCategory = async (cat) => {
        message.loading({content : "Loading" , key : "selectCat" , duration : 60})
        await this.props.setCurrentCategory(cat)
        await this.props.retrieveProducts(cat.id)
        message.success({content : "Done" , key : "selectCat"})
    }

    addCategory = (id) => {
       this.setState({ parentOfNewCat : id })
       this.showForm(); 
    }

    updateCategory = async (cat) => {
        this.setState({ selectedCat : cat })
        await this.showForm()
        this.setInputValue(cat.name)
    }

    deleteCategory = async (id) => {
        await CategoryDataService.delete(id)
        if(this.props.currentCat && this.props.currentCat.id === id ){
            this.props.clearProducts()
            this.props.setCurrentCategory(null)
        }
            
        this.refreshData()
        message.success({content : "success"})
    }

    showForm = () => {
        this.setState({visible : true})
    };

    handleCancel = () => {
        this.setState({
            parentOfNewCat : null , 
            visible : false , 
            selectedCat : null
        })
        this.setInputValue("")
    };

    submit = async (val) =>{
        this.setState({Loading : true})
        message.loading({content : "loading" , key : "loading" , duration : 60})
        try { 
            if(this.state.selectedCat){
                await CategoryDataService.update(this.state.selectedCat.id,val)  
                if(this.props.currentCat && this.props.currentCat.id === this.state.selectedCat.id )
                    this.props.setCurrentCategory({id : this.state.selectedCat.id , name : val.name })
            }
            else 
            {   
                if(this.state.parentOfNewCat)
                    await CategoryDataService.create({...val, parentCategory : `${apiUrl}/categories/${this.state.parentOfNewCat}`})
                else 
                    await CategoryDataService.create(val)
            }
            message.success({content : "Succes" , key:"loading"})
            this.refreshData()
            this.handleCancel()
        }
        catch(err){
            message.warn({content : 'The name of the category need to be unique' , key:"loading"})
        }
        this.setState({Loading : false})
    }

    render(){
        const { categories } = this.props
        const { visible , Loading , selectedCat } = this.state
        return(
            <div className="List">
            <div className="Title"><FiList style={{paddingTop : 4}} size="20"/> Categories</div>
                <Menu selectable={false} className="Menu" mode="vertical">
                    {this.getCategories(categories,true)}
                    <Menu.Item onClick={() => this.addCategory(null)}><FiPlus/> Add new category</Menu.Item>
                </Menu>
                <Modal
                    title={selectedCat ? "Edit Category" : "Add Category"}
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={Loading}
                    onCancel={this.handleCancel}
                    okText={selectedCat ? "Update" : "Create"}
                    footer={[
                        <>
                            <Button onClick={() => {this.handleCancel()}}>
                                Cancel
                            </Button>
                            <Button type="primary" form="add-update" key="submit" htmlType="submit">
                                {selectedCat ? "Update" : "Create"}
                            </Button>
                        </>
                        ]}>
                    <Form
                        ref={this.formRef}
                        id="add-update"
                        onFinish={this.submit}>
                        
                        <Form.Item
                            label={selectedCat ? "New name" : "Category name"}
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
                    </Form>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories , 
        currentCat : state.params.currentCat
    };
  }

export default connect(mapStateToProps, {retrieveCategories ,  setCurrentCategory , retrieveProducts , clearProducts  })(CategoriesList);