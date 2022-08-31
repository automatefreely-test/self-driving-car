class Car{
    constructor(x,y,width, height, controlType="KEYS",maxSpeed=3){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        
        this.controls=new Controls(controlType);

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=maxSpeed;
        this.friction=0.05;

        this.damaged= false;
        if(controlType!="DUMMY"){
            this.sensor=new Sensor(this);
        }
        

        this.angle=0;
    }
    draw(ctx, color){
        if(this.damaged){
            ctx.fillStyle="gray";
        }else{
            ctx.fillStyle=color;
        }

        ctx.beginPath();
        
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for(let i=1;i<this.polygon.length;i++){
            ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
        }
        
        ctx.fill();
        if(this.sensor){
            this.sensor.draw(ctx);
        }
    }
    update(roadBoarders,traffic){
        if(!this.damaged){
            this.#move();
            this.polygon=this.#createPolygon();
            this.damaged = this.#acessDamage(roadBoarders,traffic);
        }
        if(this.sensor){
            this.sensor.update(roadBoarders,traffic);
        }
    }

    #acessDamage(roadBoarders,traffic){
        for(let i=0;i<roadBoarders.length;i++){
            if(polyIntersect(this.polygon,roadBoarders[i])){
                return true;
            } 
        }
        for(let j=0;j<traffic.length;j++){
            if(polyIntersect(this.polygon,traffic[j].polygon)){
                return true;
            
            } 
        }


        return false;
    }

    #createPolygon(){
        const points = [];
        const alpha = Math.atan2(this.width,this.height);
        const rad = Math.hypot(this.width, this.height)/2;

        points.push({
            x:this.x-rad*Math.sin(-alpha+this.angle),
            y:this.y-rad*Math.cos(-alpha+this.angle)
        });
        points.push({
            x:this.x-rad*Math.sin(alpha+this.angle),
            y:this.y-rad*Math.cos(alpha+this.angle)
        });
        points.push({
            x:this.x-rad*Math.sin(Math.PI-alpha+this.angle),
            y:this.y-rad*Math.cos(Math.PI-alpha+this.angle)
        });
        points.push({
            x:this.x-rad*Math.sin(Math.PI+alpha+this.angle),
            y:this.y-rad*Math.cos(Math.PI+alpha+this.angle)
        });
        return points;
    }
    #move(){
        if(this.controls.forword){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }
        
        if (this.speed>this.maxSpeed){
            this.speed= this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }
        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }
        if(this.speed!=0){
            const flip = this.speed>0?1:-1;
            if(this.controls.right){
                this.angle-=0.03*flip;
            }
            if(this.controls.left){
                this.angle+=0.03*flip;
            }

        }

        this.x-=this.speed*Math.sin(this.angle);
        this.y-=this.speed*Math.cos(this.angle);
    }
}