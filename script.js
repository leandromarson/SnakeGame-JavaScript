window.onload = function (){
    
    
    
        var pontos = document.getElementById("pontos")
        var pnt = 0
        var tela = document.getElementById("tela")
        var ctx = tela.getContext("2d")//contexto do canvas em 2d
        
        setInterval(game, 150)//intervalo de chamada da funçao game()
            
        
        const vel = 1 //constante de velocidade

        var vx = vy = 0 //velocidadade x e y = 0
        var px = py = 10 //posiçao da cabeça
        var ax = ay = 15 //posiçao inicial da maça
        var tamP = 20 //tamanho de cada quadrado
        var qtdP = 20  //qtd de peças
        var rastro = [] //rastro da cobra
        var calda = 1


        function game(){

            px += vx //posiçao x da cabeça da compra recebera += da velocidade de x
            py += vy

            if(px<0){//se e a cobra passar a borda da tela
                px = qtdP-1//diminuira uma qtdPeça 
            }
            if(px>qtdP-1){
                px = 0
            }

            if(py<0){
                py = qtdP-1
            }
            if(py>qtdP-1){
                py=0
            }
            var grd = ctx.createLinearGradient(0,0, tela.width, tela.height);
            grd.addColorStop(0, "#333399");
            grd.addColorStop(1, "#660066");

            ctx.fillStyle = grd //define a cor
            ctx.fillRect(0,0, tela.width, tela.height)//faz tela do canvas

            ctx.fillStyle = "red"//cor da maça
            ctx.fillRect(ax*tamP, ay*tamP, tamP, tamP)//coloca a maça na posiçao x e y da tela
        
            ctx.fillStyle = "white"//cor da cobra
            for(var i=0; i< rastro.length; i++){
                ctx.fillRect(rastro[i].x*tamP, rastro[i].y*tamP, tamP-1, tamP-1)
                
                if(rastro[i].x == px && rastro[i].y == py){//checa se a cabeça bater no rastro
                    pnt = 0
                    px = 10
                    py = 10
                    rastro = []
                    calda = 1
                    vx = 0
                    vy = 0
                    ax=ay=15
                    
                }
            }
            rastro.push({x:px,y:py})//objeto que possui um elemento x e y
            while(rastro.length>calda){
                rastro.shift();//tira o pedaçao da cobra
            }

            if(ax==px && ay==py){//se acertar a maça
                calda++
                pnt++
                 
                                
            }
            for(var i=0; i< rastro.length; i++){
                while((ax==rastro[i].x) && (ay==rastro[i].y)){
                    ax = appleSpawn()
                    ay = appleSpawn()
                }                        
            }
            pontos.innerHTML = `${pnt}` 
                
        }
        document.addEventListener('keydown', function(keyPush){//tecla precionada
            //previne que a cobra ande para traz
            if(keyPush.which === 65 && vx===0){//tecla a
                vx = -vel
                vy = 0

            }else if(keyPush.which === 87 && vy===0){//tecla w
                vx = 0
                vy = -vel

            }else if(keyPush.which === 68 && vx===0){//tecla d
                    vx = vel
                    vy = 0
            
            }else if(keyPush.which === 83 && vy===0){ //tecla s
                    vx = 0
                    vy = vel
                    
            }
        
        })
        function appleSpawn(){
            return Math.floor(Math.random()*qtdP)//altera a posiçao da maça
        }
}





