import { leerInput, inquirermenu, pausa, listarlugares } from './helpers/inquirer.js';
import { Busquedas } from './models/busquedas.js';



const main = async() =>{

    const busquedas= new Busquedas();
    let opt;

    do{
        //imprime el menu
    
        opt = await inquirermenu();//imprime el menu y retorna una opcion
        switch (opt) {
            case 1:

                // mostrar mensaje

                const termino = await leerInput('Ciudad:');
         
                // buscar los lugares
                const lugares = await busquedas.ciudad(termino);
                
                // seleccionar lugar
                const id =await listarlugares(lugares);

                if (id == '3') continue;

                // seleccionar lugar
                const lugarSel= lugares.find(l => l.id === id);

                
                // guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre);

                // clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);


                console.log('\nInformacion de la ciudad\n'.blue);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Minima:',clima.min);
                console.log('Maxima:',clima.max);
                console.log('Estado del clima:',clima.desc);

                
            break;

            case 2:

                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i+1}.` .blue;
                    console.log(`${idx} ${lugar}`);
                })

                


            
            break;
        }
        if(opt !== 3 ) await pausa(); 
    
    
    } while(opt !== 3);
    
    
    
}
    

main();