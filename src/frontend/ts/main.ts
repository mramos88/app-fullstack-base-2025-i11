
class Main implements EventListenerObject{
    nombre: string = "Matias";
    per: Persona = new Persona("", 3);
    
    
    public mostrarEnConsola( mensaje: string) {
        console.log(mensaje);
    }
    handleEvent(object: Event): void{
        console.log(object)
        let elementoClick =<HTMLInputElement> object.target;

        if(elementoClick.id=="btn_1"){
           this.per.obtenerDatos()
            
        } else if(elementoClick.id=="btnMostrar" && object.type=="click"){
            this.consultarAlServidor();
        } else {
            console.log("pase por el boton!")
        }

    }
    
    public consultarAlServidor() {
        let xmlReq = new XMLHttpRequest();

        xmlReq.onreadystatechange = () => {
            if (xmlReq.readyState == 4) {
                if (xmlReq.status == 200) {
                    console.log(xmlReq.responseText);
                    let textArea = document.getElementById("textarea_1");
                    textArea.innerHTML = xmlReq.responseText;
                    
                    let devices:Array<Device> = JSON.parse(xmlReq.responseText);
                    for (let o of devices) {
                        console.log(o.id);    
                        console.log(o.name);    
                        console.log(o.description); 
                        console.log(o.state);
                    }

                    let div = document.getElementById("lista");
                    /**
                     * Aca deberian  mostra la lista de dispositivos utilizando 
                     * etiquetas <h1> <p> <li> <ul>
                     * 
                     */
                    div.innerHTML = "<h1>Titulo</h1>"
                    div.innerHTML += "<p> descripcion</p>"
                    div.innerHTML+="<input type='button'>"
                    
                } else {
                    
                    alert("fallo la consulta");
                }
            }
        }
   
        xmlReq.open("GET", "http://localhost:8000/devices", true);
        let oJson ={name:"nombre",passwo:"sdasadas"}
        xmlReq.send(JSON.stringify(oJson));

    }
    
}

window.addEventListener("load", () => {
   let main: Main = new Main();
     
    let btn = document.getElementById("btn_1");
   // let o: EventListenerObject = main;
    btn.addEventListener("click", main);
    let btnM = document.getElementById("btnMostrar");

   // btnM.addEventListener("mouseover", main);
    btnM.addEventListener("click", main);
   
});

