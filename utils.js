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