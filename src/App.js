import React, { Component } from 'react';
import Title from './components/Title';
import Search from './components/Search';
import Sort from './components/Sort';
import Form from './components/Form';
import ListItem from './components/ListItem';
import './../node_modules/sweetalert/dist/sweetalert.css';
import Items from './mockdata/Items';
import { v4 as uuidv4 } from 'uuid';
import { orderBy as orderByld } from 'lodash';


class App extends Component {
    constructor(props){
        super(props);
        let arrayLevel = [];
        if(Items.length > 0) {
            for(let i = 0; i < Items.length; i++) {
                if(arrayLevel.indexOf(Items[i].level) === -1) {
                    arrayLevel.push(Items[i].level);
                }
            }
        }
        this.state = {
            items : Items ,
            arrayLevel: arrayLevel,
            showForm : false,
            valueItem : '',
            levelItem : 0,
            sortType: '',
            sortOrder: ''  
        }
    }
    //xử lý showform 
     handleShowForm = () => {
        this.setState({
            showForm: !this.state.showForm
        });
    }
    //thay đổi giá trị input trong form add item
    handleFormInputChange = (value) => {
        this.setState({
            valueItem : value
        });
    }
    //thay doi level select trong form add
    handleFormSelectChange = (value)=>{
        this.setState({
            levelItem : value
        });
    }
    //nut cancel cho form add item
    handleFormClickCancel = () => {
        this.setState({
            valueItem: '',
            levelItem: 0
        });
    }
    //nut Submit cua form add item
    handleFormClickSubmit = () => {
        let {valueItem,levelItem} = this.state; //Lấy giá trị tên sản phẩm, level sản phẩm muốn add
        if(valueItem.trim() === 0) return false;//Kiểm tra nếu tên sp rỗng thì không add
        //nếu khác rỗng thì tạo đối tượng sp mới
        let newItem = {
            id: uuidv4(),//Thêm package uuid để gán id cho sp
            name: valueItem,
            level: +levelItem
        }; 
        //Cập nhật lại state các sp
        Items.push(newItem);
        this.setState({
            items: Items,
            valueItem: '',
            levelItem: 0,
            showForm: false
        });
    }

    //Thay doi gia tri sortType va sortOrder
    handleSort = (sortType,sortOrder) => {
        console.log(sortType + " - " + sortOrder);
        this.setState({
            sortType: sortType,
            sortOrder: sortOrder
        });
        let {items} = this.state;
        this.setState({
            items: orderByld(items, [sortType],[sortOrder])
        });
    }

    render() {
        return (            
            <div className="container">

                <Title />
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <Search />
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <Sort
                            sortType={this.state.sortType}
                            sortOrder={this.state.sortOrder}
                            handleSort = {this.handleSort}
                        />
                    </div>
                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        <button 
                            type="button" 
                            className="btn btn-info btn-block marginB10"
                            onClick={this.handleShowForm}    
                        >
                             { (this.state.showForm) ? 'Close Item' : 'Add Item' }
                        </button>
                    </div>
                </div>
                <div className="row marginB10">
                    <div className="col-md-offset-7 col-md-5">
                        <Form 
                            showForm= {this.state.showForm}
                            arrayLevel={this.state.arrayLevel}
                            valueItem ={this.state.valueItem}
                            handleFormInputChange={this.handleFormInputChange}
                            levelItem={this.state.levelItem}
                            handleFormSelectChange={this.handleFormSelectChange}
                            handleFormClickCancel = {this.handleFormClickCancel}
                            handleFormClickSubmit = {this.handleFormClickSubmit}
                        />
                    </div>
                </div>
                <ListItem/>
            </div>
        );
    }
}

export default App;