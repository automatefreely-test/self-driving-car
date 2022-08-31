class Sensor{
    constructor(car){
        this.car=car;
        this.rayCount=4;
        this.rayLength=100;
        this.raySpread=Math.PI/2;

        this.rays=[];
        this.readings=[];

    }
    update(roadBoarders,traffic){
        this.#castRays();
        this.readings=[];
        for(let i=0;i<this.rays.length;i++){
            this.readings.push(this.#getReading(this.rays[i], roadBoarders, traffic));
        }

    }
    #getReading(ray, roadBoarders,graffic){
        let touches=[];
        for(let i=0;i<roadBoarders.length;i++){
            const touch =getIntersection(
                ray[0],
                ray[1],
                roadBoarders[i][0],
                roadBoarders[i][1]
            );
            if(touch){
                touches.push(touch);
            }
        }
        for(let i=0;i<traffic.length;i++){
            const poly=traffic[i].polygon;
            for(let j=0;j<poly.length;j++){
                const touch =getIntersection(
                ray[0],
                ray[1],
                poly[j],
                poly[(j+1)%poly.length]
                );
                if(touch){
                    touches.push(touch);
                }
            }
            
        }
        if(touches.length==0){
            return null;
        }else{
            const offSets = touches.map(x=>x.offset);
            const minOffSet = Math.min(...offSets);
            return touches.find(e=>e.offset==minOffSet);
        }

    }

    #castRays(){
        this.rays=[];
        for(let i=0; i<this.rayCount;i++){
            const rayAngle=lerp(
                this.raySpread/2,
                -this.raySpread/2,
                (this.rayCount!=1)?(i/(this.rayCount-1)):0.5
            );
            const start={x:this.car.x, y:this.car.y};
            const end={
                x:this.car.x-this.rayLength*Math.sin(rayAngle+this.car.angle),
                y:this.car.y-this.rayLength*Math.cos(rayAngle+this.car.angle)
            };
            this.rays.push([start,end]);
        }
    }
    draw(ctx){
        for(let i=0;i<this.rayCount;i++){
            let end=this.rays[i][1];

            if(this.readings[i]){
                end = this.readings[i];
            }

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="yellow";
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="black";
            ctx.moveTo(end.x, end.y);
            ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.stroke();
        }
    }
}