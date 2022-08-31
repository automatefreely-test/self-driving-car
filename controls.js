class Controls{
    constructor(controlType){
        this.forword=false;
        this.reverse=false;
        this.left=false;
        this.right=false;
        switch(controlType){
            case "KEYS":
                this.#addKeyboardListeners();
                break;
            case "DUMMY":
                this.forword = true;
                break;
            
        }
        if(controlType=="KEYS"){
            
        }
        
    }
    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forword = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
            
        }
        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forword = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
            // console.table(this);
        }
        
    }

}