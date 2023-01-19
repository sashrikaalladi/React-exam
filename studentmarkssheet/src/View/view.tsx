
import axios from 'axios';
import React,{useEffect, useState} from 'react';
import {IColumn,DetailsList,DetailsListLayoutMode, PrimaryButton} from '@fluentui/react';
import {Link} from 'react-router-dom';
import {AiFillEdit} from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import './view.scss';

const View = () => {
  const[data,setData]=useState();
  const getData=async()=>{
    try{
        const url="http://localhost:5000/data"
        const result:any=await axios.get(url);
        setData(result.data)

    }catch(err){
        console.log(err);
    }
  };
   const deleteRequest=async(id:any)=>{
    try{
    const url=`http://localhost:5000/data/${id}`;
    const result:any=await axios.delete(url);
    console.log(result);
    getData();
   }catch(error){
    console.log(error)
   }
}
useEffect(() => {
    getData();
  }, [])

 useEffect(()=>
 {
  getData();
 },[data])

const columns: IColumn[]=[
    
        {
            key: 'column1',
            name: 'Name',
            fieldName: 'Name',
            minWidth:40,
            maxWidth:60,
            isResizable: true
        },
        {
            key: 'column2',
            name: 'Rollnumber',
            fieldName: 'Rollnumber',
            minWidth:90,
            maxWidth:90,
            isResizable: true
        },
        {
            key: 'column3',
            name: 'English',
            fieldName: 'English',
            minWidth:40,
            maxWidth: 80,
            isResizable: true
        },
        {
            key: 'column4',
            name: 'Telugu',
            fieldName: 'Telugu',
            minWidth:40,
            maxWidth: 80,
            isResizable: true
        },
        {
            key: 'column5',
            name: 'Science',
            fieldName: 'Science',
            minWidth: 40,
            maxWidth: 80,
            isResizable: true
        },
        {
            key: 'column6',
            name: 'Hindhi',
            fieldName: 'Hindhi',
            minWidth: 40,
            maxWidth: 80,
            isResizable: true
        },
        {
            key: 'column7',
            name: 'Social',
            fieldName: 'Social',
            minWidth: 40,
            maxWidth: 80,
            isResizable: true
        },
        {
            key: 'column8',
            name: 'Activities',
            fieldName: 'Activities',
            minWidth: 40,
            maxWidth: 80,
            isResizable: true
        },
        {
            key: 'column9',
            name: 'Totalmarks',
            fieldName: 'Totalmarks',
            minWidth: 100,
            maxWidth: 90,
            isResizable: true,
        },{
            key: 'column10',
            name: '',
            fieldName: 'id',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true,
        
            onRender:(item:any)=>(
            item.id&&
            <>
            <Link className='btn' to={`/view/${item.id}`}>View</Link>
            <Link className='btn' to={`/update/${item.id}`}><AiFillEdit/></Link>
            <Link className='btn' onClick={() => deleteRequest(item.id)} to=''><MdDelete/></Link>
        </>

            )
        
        },


]
    return (
       
       
        <div className='one'>
        {data &&
            <DetailsList
                items={data}
                columns={columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
            />}
    </div>
  )
  
}

export default View