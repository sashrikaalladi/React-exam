import axios from 'axios';
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as yup from "yup"
import Studentfield from '../sharedcomponents/Studentfield';
import { STUDENT_DETAILS, newSTUDENT_DETAILS } from './helper';
import { PrimaryButton } from '@fluentui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import './Form.scss';


const StudentForm = () => {

    interface IStudentForm {
        Name?: string;
        rollnumber?: number;
        English?: number;
        Telugu?: number;
        Science?: number;
        Hindhi?: number;
        Social?: number;
        Activities?: number;
        totalmarks?: number;
    }
    const StudentSchema: yup.SchemaOf<IStudentForm> = yup.object().shape({
        Name: yup.string().required().min(5).max(10),
        rollnumber: yup.number(),
        English: yup.number().max(100),
        Telugu: yup.number().max(100),
        Science: yup.number().max(100),
        Hindhi: yup.number().max(100),
        Social: yup.number().max(100),
        Activities: yup.number().max(100),
        totalmarks: yup.number().max(100)
    });
    const StudentDetails = useForm<any>({
        mode: "all",
        resolver: async (data, context, options) => {
            return yupResolver(StudentSchema)(data, context, options);
        },
    });
    const [enterData, setEnterData] = React.useState();
    const id = useParams();
    const navigation = useNavigate();
    const StudentFormSubmit: SubmitHandler<any> = async (
        data: any,
    ) => {
        setEnterData(data)
        console.log(id)
        if (id.id) {
            editForm(data);
        } else {
            createForm(data);
        }
        StudentDetails.reset({});
        navigation('/View')
    };

    const getAdditionalProps = (item: any) => {
        item.control = StudentDetails.control;
        item.setValue = StudentDetails.setValue;
        item.register = StudentDetails.register;
        return item;
    };

    // const id = useParams();
    const [data, setData] = React.useState<any>();
    const getStudentData = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/data/${id.id}`)
            setData(result.data);
        } catch (error) {
            console.log(error)
        }
    }
    const editForm = async (updatedData: any) => {
        try {
            const result = await axios.put(`http://localhost:5000/data/${id.id}`, updatedData)
            setData(result.data);
        } catch (error) {
            console.log(error)
        }
    }
    const createForm = async (updatedData: any) => {
        const generateId: any = Math.random();
        const newData = { ...updatedData, 'id': generateId }
        try {
            const result = await axios.post(`http://localhost:5000/data`, newData);
            setData(result.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getStudentData();
    }, [id]);
    useEffect(() => {
        data &&
            Object.entries(data).forEach(([key, value]: any) => {
                StudentDetails.setValue(key, value, { shouldValidate: true });
            });
    }, [data]);
    console.log(StudentDetails.watch(), StudentDetails.formState.errors)
    return (
        <div className="form">
            <div className="form_header">
                <h1>Student</h1>
                <p>Details</p>
                
           </div>
            
            <FormProvider {...StudentDetails}>
            <div><hr/></div>
                <form onSubmit={StudentDetails.handleSubmit(StudentFormSubmit)}>
                    <div className="form_container">
                        {STUDENT_DETAILS?.map((rows: any) => {
                            return (
                                <div className={`rowThree ${rows.className}`}>
                                    {rows.controls?.map((item: any) => {
                                        const updatedItem = getAdditionalProps(item);
                                        return Studentfield(item.type, updatedItem);
                                    })}
                                </div>
                            );
                        })}

                    </div>

                    <div className="form_footer">
                        <PrimaryButton type="submit" onClick={StudentDetails.handleSubmit(StudentFormSubmit)}>
                            Submit
                        </PrimaryButton>
                    </div>
                </form>
            </FormProvider>
        </div>
    )


}

export default StudentForm;