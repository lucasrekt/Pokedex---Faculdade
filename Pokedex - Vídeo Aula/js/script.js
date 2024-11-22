const nomePokemon = $('.name_pokemon')
const idPokemon = $('.id_pokemon')
const imagemPokemon = $('.image_pokemon')
const form = $('.form')
const input = $('.input_search')
const botaoVoltar = $('.btn-voltar')
const botaoProximo = $('.btn-proximo')

let searchPokemon = 1

function buscarPokemon(pokemon) {
    return $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
        method: 'GET',
        dataType: 'json'
    }).catch(() => null)
}

function parseRetorno(retorno) {
    if (!retorno) {
        imagemPokemon.hide()
        nomePokemon.text('Não encontrado.')
        idPokemon.text('')
        return
    }

    searchPokemon = retorno.id
    imagemPokemon.show()
    nomePokemon.text(retorno.name)
    idPokemon.text(retorno.id)
    imagemPokemon.attr('src', retorno.sprites.versions['generation-v']['black-white'].animated.front_default)
    input.val('')
}

async function renderPokemon(pokemon) {
    nomePokemon.text('Loading ...')
    const retorno = await buscarPokemon(pokemon)

    parseRetorno(retorno)
}

form.on(`submit`, (event) => {
    event.preventDefault()
    renderPokemon(input.val().toLowerCase())
})

botaoVoltar.on('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

botaoProximo.on('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)