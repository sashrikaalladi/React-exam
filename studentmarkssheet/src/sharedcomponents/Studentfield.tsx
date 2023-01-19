import TextFieldForm from "./TextFieldForm";


export const Studentfield=(fieldName:string,item:any)=>{
    switch(fieldName){
        case "TextFieldForm":
            return <TextFieldForm {...item}/>;
            default:
                return "missing component";
    }
};
export default Studentfield;