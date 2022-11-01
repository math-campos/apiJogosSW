const Jogo = require('./Jogo');

module.exports =  class JogoDAO{
    constructor(  ){
        this.jogos = [];
    }

    add(jogo){
        this.jogos[jogo.id] = jogo;
    }

    get(id){
        return this.jogos[id];
    }

    remove(id){
        this.jogos.splice(id,1);
    }

    update(jogo){
        this.jogos[jogo.id] = jogos;
    }

    all(){
        return this.jogos;
    }

    getNextID(){
        return this.jogos.length;
    }

}