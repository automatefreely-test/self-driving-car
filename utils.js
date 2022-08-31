function lerp(A,B,t){
    return A+(B-A)*t;
}

function getIntersection(A,B,C,D){
    const tTop = (A.x-C.x)*(D.y-C.y)-(A.y-C.y)*(D.x-C.x);
    const uTop = (C.y-A.y)*(B.x-A.x)-(C.x-A.x)*(B.y-A.y);
    const bottom = (B.y-A.y)*(D.x-C.x)-(B.x-A.x)*(D.y-C.y);
    if(bottom!=0){
        t=tTop/bottom;
        u=uTop/bottom;
        if(t>=0 &&t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t), 
                y:lerp(A.y,B.y,t), 
                offset:t
                };
        }
     }
    return null;
}

function polyIntersect(poly1,poly2){
    for(let i=0;i<poly1.length;i++){
        for(let j=0;j<poly2.length;j++){
            if(getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length]
                
            )){
                return true;
            }
        }
    }
    return false;
}