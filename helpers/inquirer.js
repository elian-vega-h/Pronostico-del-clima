import colors from 'colors';
import inquirer from 'inquirer';



const menupt =[
    {
        type: 'list',
        name: 'opcion',
        message: '¿que desea hacer?',
        choices:[
            {
                value: 1,
                name: `${'1.'.blue} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.blue} Historial`
            },
            {
                value: 3,
                name: `${'3.'.blue} Salir`
            },
           
        ]

        
    }

];

const inquirermenu= async () =>{

    console.clear();
    console.log('======================='.blue);
    console.log(' Seleccione una opcion '.blue);
    console.log('=======================\n'.blue);

    const {opcion} = await inquirer.prompt(menupt);

    return opcion;

}

const pausa = async() =>{
    const question =[{
        type:'input',
        name:'enter',
        message:`presione ${'enter'.blue} para continuar`
    }];


    console.log('\n');
    await inquirer.prompt(question);
     

}

const leerInput = async (message) =>{ 

    const question = [
        {
            type:'input',
            name: 'desc',
            message, // si alguien escribe afuera de este archivo el va a poder escribir el texto que quiera gracias al message
            validate(value){ // esta funcion obliga a meter un valor
                if (value.length === 0){
                    return 'por favor ingresa un valor'
                }
                return true; //significa que la validacion paso
            }
        }
    ];
    const {desc} = await inquirer.prompt(question); // usamos la funcion question mostrando una question
    return desc; //destructura la descripcion


}

const listarlugares= async(lugares = []) =>{

    const choices = lugares.map ((lugar, i) =>{
        const idx= `${i+1}`.blue;

        return{
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }

    });

    choices.unshift({
        value:'3',
        name:'3.'.blue + 'Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name:'id',
            message:'Seleccione lugar:',
            choices
        }
    ] 
    const {id} = await inquirer.prompt(preguntas);
    return id;

  

}

const confirmar = async (message) => {

    const question=[
        {
            type:'confirm',
            name:'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;

}

const mostarListadoChecklist= async(tareas = []) =>{

    const choices = tareas.map ((tarea, i) =>{
        const idx= `${i+1}`.blue;

        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }

    });
    const pregunta = [
        {
            type: 'checkbox',
            name:'ids',
            message:'seleccione',
            choices
        }
    ] 
    const {ids} = await inquirer.prompt(pregunta);
    return ids;

  

}



export {inquirermenu};
export {pausa, listarlugares, confirmar, mostarListadoChecklist };
export {leerInput};